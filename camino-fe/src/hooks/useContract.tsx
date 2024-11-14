import { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { useWallet } from '../contexts/WalletContext';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../utils/constants';
import { IPackage } from '../types/general-types';

export interface IProduct {
  productId: number;
  supplierAddress: string;
  name: string;
  price: number;
  isActive: boolean;
}

export interface ISupplier {
  walletAddress: string;
  name: string;
  isActive: boolean;
}

export interface IOffer {
  offerId: number;
  name: string;
  productIds: number[];
  totalPrice: number;
  isActive: boolean;
}

export const useContract = () => {
  const { walletState } = useWallet();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getContract = useCallback(() => {
    if (!walletState.isConnected) {
      throw new Error('Wallet not connected');
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  }, [walletState.isConnected]);

  // Supplier Functions
  const addSupplier = async (supplierAddress: string, name: string) => {
    setLoading(true);
    setError(null);
    try {
      const contract = getContract();
      const tx = await contract.addSupplier(supplierAddress, name);
      await tx.wait();
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deactivateSupplier = async (supplierAddress: string) => {
    setLoading(true);
    setError(null);
    try {
      const contract = getContract();
      const tx = await contract.deactivateSupplier(supplierAddress);
      await tx.wait();
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getSupplier = async (address: string): Promise<ISupplier> => {
    setLoading(true);
    setError(null);
    try {
      const contract = getContract();
      return await contract.suppliers(address);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Product Functions
  const addProduct = async (name: string, price: number) => {
    setLoading(true);
    setError(null);
    try {
      const contract = getContract();
      const tx = await contract.addProduct(name, ethers.utils.parseEther(price.toString()));
      await tx.wait();
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deactivateProduct = async (productId: number) => {
    setLoading(true);
    setError(null);
    try {
      const contract = getContract();
      const tx = await contract.deactivateProduct(productId);
      await tx.wait();
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getProduct = async (productId: number): Promise<IProduct> => {
    setLoading(true);
    setError(null);
    try {
      const contract = getContract();
      return await contract.products(productId);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Offer Functions
  const createPackagedOffer = async (name: string, productIds: number[]) => {
    setLoading(true);
    setError(null);
    try {
      const contract = getContract();
      const tx = await contract.createPackagedOffer(name, productIds);
      await tx.wait();
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deactivateOffer = async (offerId: number) => {
    setLoading(true);
    setError(null);
    try {
      const contract = getContract();
      const tx = await contract.deactivateOffer(offerId);
      await tx.wait();
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getOffer = async (offerId: number): Promise<IOffer> => {
    setLoading(true);
    setError(null);
    try {
      const contract = getContract();
      return await contract.getOffer(offerId);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const purchaseOffer = async (offerId: number, price: number) => {
    setLoading(true);
    setError(null);
    try {
      const contract = getContract();
      const tx = await contract.purchaseOffer(offerId, {
        value: ethers.utils.parseEther(price.toString()),
      });
      await tx.wait();
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addProductTemplate = async (
    serviceTypeId: number,
    startDate: Date,
    endDate: Date,
    origin: string,
    destination: string,
    numGuests: number,
    price: number,
    ipfsHash: string | null
  ) => {
    setLoading(true);
    setError(null);
    try {
      const startDateTick = parseInt(startDate.getFullYear() + '' + startDate.getMonth() + '' + startDate.getDay());
      const endDateTick = parseInt(endDate.getFullYear() + '' + endDate.getMonth() + '' + endDate.getDay());
      const contract = getContract();
      const tx = await contract.addProductTemplate(serviceTypeId, startDateTick, endDateTick, origin, destination, numGuests, price, ipfsHash);
      await tx.wait();
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getPackages = async (
    productTypes: number[],
    departureLocation: string,
    arrivalLocation: string,
    departureDate: Date,
    arrivalDate: Date,
    guests: number
  ): Promise<IPackage[]> => {
    setLoading(true);
    setError(null);
    try {
      const departureDateTick = parseInt(departureDate.getFullYear() + '' + departureDate.getMonth() + '' + departureDate.getDay());
      const arrivalDateTick = parseInt(arrivalDate.getFullYear() + '' + arrivalDate.getMonth() + '' + arrivalDate.getDay());
      const contract = getContract();
      return await contract.getPackages(productTypes, departureDateTick, arrivalDateTick, departureLocation, arrivalLocation, guests);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const buyPackage = async (supplierId: number) => {
    setLoading(true);
    setError(null);
    try {
      const contract = getContract();
      const tx = await contract.buyPackage(supplierId);
      await tx.wait();
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Contract Events
  // const listenToEvents = useCallback(
  //   (callback: (event: any) => void) => {
  //     const contract = getContract();

  //     contract.on('SupplierAdded', (supplierAddress, name) => {
  //       callback({ type: 'SupplierAdded', supplierAddress, name });
  //     });

  //     contract.on('ProductAdded', (productId, name, price) => {
  //       callback({ type: 'ProductAdded', productId, name, price });
  //     });

  //     contract.on('OfferCreated', (offerId, name, totalPrice) => {
  //       callback({ type: 'OfferCreated', offerId, name, totalPrice });
  //     });

  //     contract.on('PaymentDistributed', (offerId, customer) => {
  //       callback({ type: 'PaymentDistributed', offerId, customer });
  //     });

  //     // Return cleanup function
  //     return () => {
  //       contract.removeAllListeners();
  //     };
  //   },
  //   [getContract]
  // );

  return {
    loading,
    error,
    // Supplier functions
    addSupplier,
    deactivateSupplier,
    getSupplier,
    // Product functions
    addProductTemplate,
    addProduct,
    deactivateProduct,
    getProduct,
    // Offer functions
    createPackagedOffer,
    deactivateOffer,
    getOffer,
    purchaseOffer,
    // Packages functions
    getPackages,
    buyPackage,
    // Events
    // listenToEvents,
  };
};
