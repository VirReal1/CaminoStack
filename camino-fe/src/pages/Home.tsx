import React, { useEffect, useState } from 'react';
import { SearchForm } from '../components/SearchForm';
import { useWallet } from '../contexts/WalletContext';
import { IPackage, ISearchCriteria } from '../types/general-types';
import { useContract } from '../hooks/useContract';
import OfferCard from '../components/OffersCard';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const [offerPackages, setOfferPackages] = useState<IPackage[]>([]);
  const [showTable, setShowTable] = useState<boolean>(false);
  const { walletState } = useWallet();
  const contract = useContract();
  const navigate = useNavigate();

  useEffect(() => {
    const dummyData: IPackage[] = [
      {
        id: 1,
        offers: [
          {
            id: 1,
            description: 'Flight Test',
            productType: 1,
            supplierAddress: '1',
            startDate: new Date(),
            endDate: new Date(),
            ipfsHash: '',
          },
          {
            id: 2,
            description: 'Anelli Test',
            productType: 2,
            supplierAddress: '2',
            startDate: new Date(),
            endDate: new Date(),
            ipfsHash: '',
          },
          {
            id: 3,
            description: 'Safari Test',
            productType: 3,
            supplierAddress: '3',
            startDate: new Date(),
            endDate: new Date(),
            ipfsHash: '',
          },
          {
            id: 4,
            description: 'Boat Test',
            productType: 4,
            supplierAddress: '4',
            startDate: new Date(),
            endDate: new Date(),
            ipfsHash: '',
          },
        ],
        totalPrice: 180,
      },
    ];
    setOfferPackages(dummyData);
  }, []);

  const handleSearch = async (criteria: ISearchCriteria) => {
    // TODO Can
    // setOfferPackages(
    //   await contract.getPackages(
    //     criteria.productTypes,
    //     criteria.departureLocation,
    //     criteria.arrivalLocation,
    //     criteria.departureDate,
    //     criteria.arrivalDate,
    //     criteria.guests
    //   )
    // );

    if (offerPackages && offerPackages.length > 0) {
      setShowTable(true);
    }
  };

  const handlePurchase = async (packageId: number) => {
    if (!walletState.isConnected) {
      alert('Please connect your wallet first!');
      return;
    }

    // TODO Can
    // await contract.buyPackage(packageId);
    navigate('/purchase?status=success');
  };

  return (
    <div className="container">
      <SearchForm onSearch={handleSearch} />
      {showTable ? (
        <div className="p-4">
          {offerPackages.map((offerPackage, index) => (
            <OfferCard key={index} offerPackage={offerPackage} index={index} onPurchase={handlePurchase} />
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Home;
