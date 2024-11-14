import React, { useEffect, useState } from 'react';
import { SearchForm } from '../components/SearchForm';
import { useWallet } from '../contexts/WalletContext';
import { IPackage, ISearchCriteria } from '../types/general-types';
import { useContract } from '../hooks/useContract';
import OfferCard from '../components/OffersCard';

const Home: React.FC = () => {
  const [offerPackages, setOfferPackages] = useState<IPackage[]>([]);
  const { walletState } = useWallet();
  const contract = useContract();

  useEffect(() => {
    const dummyData: IPackage[] = [
      {
        id: 1,
        offers: [
          {
            id: 1,
            description: 'Flight Test',
            name: 'THY',
            price: 100,
            productType: 1,
            supplier: 'THY',
            dateRange: {
              start: new Date(),
              end: new Date(),
            },
          },
          {
            id: 2,
            description: 'Anelli Test',
            name: 'anelli',
            price: 50,
            productType: 2,
            supplier: 'Anelli',
            dateRange: {
              start: new Date(),
              end: new Date(),
            },
          },
          {
            id: 3,
            description: 'Safari Test',
            name: 'safari',
            price: 20,
            productType: 3,
            supplier: 'Safari',
            dateRange: {
              start: new Date(),
              end: new Date(),
            },
          },
          {
            id: 4,
            description: 'Boat Test',
            name: 'boat',
            price: 10,
            productType: 4,
            supplier: 'Boat',
            dateRange: {
              start: new Date(),
              end: new Date(),
            },
          },
        ],
        totalPrice: 180,
      },
    ];
    setOfferPackages(dummyData);
  }, []);

  const handleSearch = async (criteria: ISearchCriteria) => {
    // await contract.getOffers();
  };

  const handlePurchase = async (packageId: number) => {
    if (!walletState.isConnected) {
      alert('Please connect your wallet first!');
      return;
    }

    console.log('Purchasing package:', packageId);
  };

  return (
    <div className="container">
      <SearchForm onSearch={handleSearch} />
      <div className="p-4">
        {offerPackages.map((offerPackage, index) => (
          <OfferCard key={index} offerPackage={offerPackage} index={index} onPurchase={handlePurchase} />
        ))}
      </div>{' '}
    </div>
  );
};

export default Home;
