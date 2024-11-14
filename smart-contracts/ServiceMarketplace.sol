// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ServiceMarketplace {
    struct Supplier {
        address payable walletAddress;
        string ipfsHash;  // Supplier details stored in IPFS
        bool isActive;
    }
    
    struct ProductTemplate {
        uint256 productTemplateId;
        uint8 serviceTypeId;
        uint40 startDate;      
        uint40 endDate;
        string origin;
        string destination;
        uint8 numGuests;      
        string ipfsHash;      
        bool isActive;
        address creator;       // Track who created the template
    }
    
    struct SupplierProduct {
        uint256 supplierProductId;
        uint256 productTemplateId;
        address supplierAddress;
        uint256 price;
        string ipfsHash;      
        bool isActive;
    }

    struct Package {
        uint256 packageId;
        string ipfsHash;
        bool isActive;
        uint256 totalPrice;         // Total price of all supplier products
        uint256 serviceFee;         // Service fee amount calculated from commission rate
        uint256 finalPrice;         // Total price + service fee
    }

    struct PackageTemplateOffer {
        uint256 productTemplateId;
        uint8 serviceTypeId;
        uint40 startDate;
        uint40 endDate;
        string origin;
        string destination;
        uint8 numGuests;
        address supplierAddress;
        uint256 price;
    }

    // State variables
    address payable public owner;
    uint256 private nextIds;
    uint256 public commissionRate;    // Base points (e.g., 250 = 2.5%)
    uint256 public constant PERCENTAGE_BASE = 10000;

    // Events
    event CommissionRateUpdated(uint256 newRate);
    event ServiceFeeCollected(uint256 packageId, uint256 feeAmount);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event PaymentDistributed(
        uint256 indexed packageId,
        address indexed customer,
        uint256 suppliersAmount,
        uint256 serviceFee
    );

    constructor() {
        owner = payable(msg.sender);
        nextIds = 1;
        commissionRate = 250;  // Default 2.5% commission
    }


    function getPackageDetails(uint256 _packageId) public view returns (
        uint256 suppliersAmount,
        uint256 serviceFee,
        uint256 finalPrice,
        bool isActive
    ) {
        Package storage package = packages[_packageId];
        return (
            package.totalPrice,
            package.serviceFee,
            package.finalPrice,
            package.isActive
        );
    }

    function calculateServiceFee(uint256 amount) public view returns (uint256) {
        return (amount * commissionRate) / PERCENTAGE_BASE;
    }

    // Emergency functions
    function getContractBalance() public view onlyOwner returns (uint256) {
        return address(this).balance;
    }

    function emergencyWithdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");
        owner.transfer(balance);
    }
    
    // Existing mappings
    mapping(uint256 => uint256[]) private packageProductTemplates;
    mapping(uint256 => mapping(uint256 => uint256)) private packageSelectedProducts;
    

    mapping(address => Supplier) public suppliers;
    mapping(uint256 => ProductTemplate) public productTemplates;
    mapping(uint256 => SupplierProduct) public supplierProducts;
    mapping(uint256 => Package) public packages;
    
    // New mappings for template management
   mapping(uint256 => uint256) public templateSupplierCount; // templateId => number of suppliers using it
    
    // Existing mappings
    mapping(uint8 => mapping(uint256 => bool)) public serviceTypeTemplates;
    
        // Optimized mappings for relationships
    mapping(uint256 => mapping(uint256 => bool)) public templateSupplierProducts; // productTemplateId => supplierProductId => exists
    
    // Existing events remain the same
    event SupplierAdded(address indexed supplierAddress, string ipfsHash);
    event ProductTemplateAdded(uint256 indexed productTemplateId, uint8 serviceTypeId, string ipfsHash);
    event SupplierProductAdded(uint256 indexed productTemplateId, string ipfsHash);
    event PackageCreated(uint256 indexed packageId, string ipfsHash);
    event PackageUpdated(uint256 indexed packageId, uint256 newTotalPrice);
    event PaymentDistributed(uint256 indexed packageId, address indexed customer);
    
    // Existing modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }
    
    modifier onlyActiveSupplier() {
        require(suppliers[msg.sender].isActive, "Only active suppliers can perform this action");
        _;
    }
    
     function addSupplier(address payable _supplierAddress, string memory _ipfsHash) public {
        require(!suppliers[_supplierAddress].isActive, "Supplier already exists");
        
        suppliers[_supplierAddress] = Supplier({
            walletAddress: _supplierAddress,
            ipfsHash: _ipfsHash,
            isActive: true
        });
        
        emit SupplierAdded(_supplierAddress, _ipfsHash);
    }
    
    // Modified addProductTemplate to include isPublic parameter
    function addProductTemplate(
        uint8 _serviceTypeId,
        uint40 _startDate,
        uint40 _endDate,
        string memory _origin,
        string memory _destination,
        uint8 _numGuests,
        uint256 _price,
        string memory _ipfsHash
    ) public onlyActiveSupplier {
        
        uint256 productTemplateId = nextIds++;
        
        productTemplates[productTemplateId] = ProductTemplate({
            productTemplateId: productTemplateId,
            serviceTypeId: _serviceTypeId,
            startDate: _startDate,
            endDate: _endDate,
            origin: _origin,
            destination: _destination,
            numGuests: _numGuests,
            ipfsHash: _ipfsHash,
            isActive: true,
            creator: msg.sender
        });
        
        serviceTypeTemplates[_serviceTypeId][productTemplateId] = true;
        
        // Creator automatically gets access
        templateSupplierCount[productTemplateId] = 1;
        
        addSupplierProduct(productTemplateId, _price, _ipfsHash);
        emit ProductTemplateAdded(productTemplateId, _serviceTypeId, _ipfsHash);
    }
    
    
    
    // Modified addSupplierProduct to check template access
    function addSupplierProduct(
        uint256 _productTemplateId,
        uint256 _price,
        string memory _ipfsHash
    ) public onlyActiveSupplier () {
        require(productTemplates[_productTemplateId].isActive, "Product template not active");

        uint256 supplierProductId = nextIds++;
        
        supplierProducts[supplierProductId] = SupplierProduct({
            supplierProductId: supplierProductId,
            productTemplateId: _productTemplateId,
            supplierAddress: msg.sender,
            price: _price,
            ipfsHash: _ipfsHash,
            isActive: true
        });
        
        templateSupplierProducts[_productTemplateId][supplierProductId]=true;
        
        
        emit SupplierProductAdded(_productTemplateId, _ipfsHash);
    }
    
    
    
    // Optimized view functions using pagination
    function getProductSuppliers(
        uint256 _productTemplateId,
        uint256 _offset,
        uint256 _limit
    ) public view returns (
        uint256[] memory supplierProductIds,
        address[] memory supplierAddresses,
        uint256[] memory prices,
        string[] memory ipfsHashes
    ) {
        uint256 count = 0;
        uint256 returnedCount = 0;
        
        // Count total active supplier products
        for (uint256 i = 1; i < nextIds; i++) {
            if (templateSupplierProducts[_productTemplateId][i]) {
                if (supplierProducts[i].isActive) count++;
            }
        }
        
        // Adjust count based on pagination
        if (_offset >= count) return (new uint256[](0), new address[](0), new uint256[](0), new string[](0));
        count = _offset + _limit > count ? count - _offset : _limit;
        
        supplierProductIds = new uint256[](count);
        supplierAddresses = new address[](count);
        prices = new uint256[](count);
        ipfsHashes = new string[](count);
        
        // Populate arrays
        for (uint256 i = 1; i < nextIds && returnedCount < count; i++) {
            if (templateSupplierProducts[_productTemplateId][i]) {
                SupplierProduct storage product = supplierProducts[i];
                if (product.isActive) {
                    if (_offset > 0) {
                        _offset--;
                        continue;
                    }
                    supplierProductIds[returnedCount] = i;
                    supplierAddresses[returnedCount] = product.supplierAddress;
                    prices[returnedCount] = product.price;
                    ipfsHashes[returnedCount] = product.ipfsHash;
                    returnedCount++;
                }
            }
        }
        
        return (supplierProductIds, supplierAddresses, prices, ipfsHashes);
    }

        function setCommissionRate(uint256 _newRate) public onlyOwner {
        require(_newRate <= 1000, "Commission cannot exceed 10%");
        commissionRate = _newRate;
        emit CommissionRateUpdated(_newRate);
    }

    function transferOwnership(address payable _newOwner) public onlyOwner {
        require(_newOwner != address(0), "New owner is the zero address");
        emit OwnershipTransferred(owner, _newOwner);
        owner = _newOwner;
    }

    function createPackage(
        uint256[] memory _productTemplateIds,
        string memory _ipfsHash
    ) public  returns (uint256 _packageId){
        uint256 packageId = nextIds++;
        
        packages[packageId] = Package({
            packageId: packageId,
            ipfsHash: _ipfsHash,
            isActive: true,
            totalPrice: 0,
            serviceFee: 0,
            finalPrice: 0
        });
        
        packageProductTemplates[packageId] = _productTemplateIds;
        
        emit PackageCreated(packageId, _ipfsHash);
        return  packageId;
    }

    function selectProductForPackage(
        uint256 _packageId,
        uint256 _productTemplateId,
        uint256 _supplierProductId
    ) public {
        Package storage package = packages[_packageId];
        require(package.isActive, "Package not active");
        
        SupplierProduct storage supplierProduct = supplierProducts[_supplierProductId];
        require(supplierProduct.isActive, "Supplier product not active");
        require(supplierProduct.productTemplateId == _productTemplateId, "Product template mismatch");
        
        // Verify product template is in package
        bool isValidTemplate = false;
        uint256[] storage requiredTemplates = packageProductTemplates[_packageId];
        for (uint256 i = 0; i < requiredTemplates.length; i++) {
            if (requiredTemplates[i] == _productTemplateId) {
                isValidTemplate = true;
                break;
            }
        }
        require(isValidTemplate, "Product not required for this package");
        
        // Update package prices
        uint256 previousProductId = packageSelectedProducts[_packageId][_productTemplateId];
        if (previousProductId != 0) {
            package.totalPrice -= supplierProducts[previousProductId].price;
        }
        
        packageSelectedProducts[_packageId][_productTemplateId] = _supplierProductId;
        package.totalPrice += supplierProduct.price;
        
        // Calculate service fee and final price
        package.serviceFee = (package.totalPrice * commissionRate) / PERCENTAGE_BASE;
        package.finalPrice = package.totalPrice + package.serviceFee;
        
        emit PackageUpdated(_packageId, package.finalPrice);
    }

    function purchasePackage(uint256 _packageId) public payable {
        Package storage package = packages[_packageId];
        require(package.isActive, "Package not active");
        require(msg.value == package.finalPrice, "Incorrect payment amount");

        uint256[] storage requiredTemplates = packageProductTemplates[_packageId];
        
        // First transfer service fee to owner
        owner.transfer(package.serviceFee);
        emit ServiceFeeCollected(_packageId, package.serviceFee);

        // Then distribute remaining amount to suppliers
        for (uint256 i = 0; i < requiredTemplates.length; i++) {
            uint256 supplierProductId = packageSelectedProducts[_packageId][requiredTemplates[i]];
            require(supplierProductId != 0, "Not all products selected");
            
            SupplierProduct storage supplierProduct = supplierProducts[supplierProductId];
            require(supplierProduct.isActive, "Selected product no longer active");
            
            // Transfer the supplier's price
            suppliers[supplierProduct.supplierAddress].walletAddress.transfer(supplierProduct.price);
        }
        
        emit PaymentDistributed(
            _packageId,
            msg.sender,
            package.totalPrice,
            package.serviceFee
        );
    }
    function getPackages(
    uint8[] memory _serviceTypeIds,
    uint40 _startDate,
    uint40 _endDate,
    string memory _origin,
    string memory _destination,
    uint8 _numGuests
) public returns (uint256 packageId, PackageTemplateOffer[] memory offers) {
    // 1. Create a new package
    uint256[] memory templateIds = new uint256[](_serviceTypeIds.length);
    
    for (uint256 i = 0; i < _serviceTypeIds.length; i++) {
        uint256 minPriceTemplateId = getMinPriceTemplateId(_serviceTypeIds[i], _startDate, _endDate, _origin, _destination, _numGuests);
        require(minPriceTemplateId != 0, "No suitable product template found");
        templateIds[i] = minPriceTemplateId;
    }
    
    packageId = createPackage(templateIds, "");
    
    // 2. Select the best supplier products for the package
    for (uint256 i = 0; i < templateIds.length; i++) {
        uint256 minPriceTemplateId = templateIds[i];
        uint256 minPriceSupplierProductId = getMinPriceSupplierProductId(minPriceTemplateId);
        
        selectProductForPackage(packageId, minPriceTemplateId, minPriceSupplierProductId);
    }
    
    // 3. Prepare the PackageTemplateOffer responses
    offers = new PackageTemplateOffer[](templateIds.length);
    
    for (uint256 i = 0; i < templateIds.length; i++) {
        uint256 minPriceTemplateId = templateIds[i];
        SupplierProduct storage minPriceProduct = supplierProducts[getMinPriceSupplierProductId(minPriceTemplateId)];
        
        offers[i] = PackageTemplateOffer({
            productTemplateId: minPriceTemplateId,
            serviceTypeId: productTemplates[minPriceTemplateId].serviceTypeId,
            startDate: productTemplates[minPriceTemplateId].startDate,
            endDate: productTemplates[minPriceTemplateId].endDate,
            origin: productTemplates[minPriceTemplateId].origin,
            destination: productTemplates[minPriceTemplateId].destination,
            numGuests: productTemplates[minPriceTemplateId].numGuests,
            supplierAddress: minPriceProduct.supplierAddress,
            price: minPriceProduct.price
        });
    }
    
    return (packageId, offers);
}

// Helper function to find the product template with the minimum price
function getMinPriceTemplateId(
    uint8 _serviceTypeId,
    uint40 _startDate,
    uint40 _endDate,
    string memory _origin,
    string memory _destination,
    uint8 _numGuests
) internal view returns (uint256 minPriceTemplateId) {
    uint256 minPrice = type(uint256).max;
    
    for (uint256 i = 1; i < nextIds; i++) {
        if (serviceTypeTemplates[_serviceTypeId][i]) {
            ProductTemplate storage template = productTemplates[i];
//            if (template.startDate >= _startDate &&
//                template.endDate <= _endDate &&
//                (keccak256(bytes(template.origin)) == keccak256(bytes(_origin)) || bytes(template.origin).length==0 )&&
//                keccak256(bytes(template.destination)) == keccak256(bytes(_destination)) &&
//                template.numGuests >= _numGuests
//            ) {
                uint256 minPriceSupplierProductId = getMinPriceSupplierProductId(i);
                if (minPriceSupplierProductId != 0 && supplierProducts[minPriceSupplierProductId].price < minPrice) {
                    minPrice = supplierProducts[minPriceSupplierProductId].price;
                    minPriceTemplateId = i;
                }
//            }
        }
    }
}

// Helper function to find the supplier product with the minimum price for a given template
function getMinPriceSupplierProductId(uint256 _productTemplateId) internal view returns (uint256 minPriceSupplierProductId) {
    uint256 minPrice = type(uint256).max;
    
    for (uint256 i = 1; i < nextIds; i++) {
        if (templateSupplierProducts[_productTemplateId][i]) {
            SupplierProduct storage product = supplierProducts[i];
            if (product.price < minPrice) {
                minPrice = product.price;
                minPriceSupplierProductId = i;
            }
        }
    }
}
}