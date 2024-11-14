import React, { useState } from 'react';
import { SearchForm } from '../components/SearchForm';
import { PackageCard } from '../components/PackageCard';
import { useWallet } from '../contexts/WalletContext';
import { IPackage, ISearchCriteria } from '../types/general-types';

export const Home: React.FC = () => {
  const [packages, setPackages] = useState<IPackage[]>([]);
  const { walletState } = useWallet();

  const handleSearch = async (criteria: ISearchCriteria) => {
    // Here you would typically fetch packages from your smart contract
    // For now, we'll use mock data
    const mockPackages: IPackage[] = [
      {
        id: '1',
        totalPrice: 1500,
        products: [
          {
            id: '1',
            type: 'flight',
            name: 'Direct Flight',
            description: 'Round-trip flight',
            price: 800,
            supplier: '0x123...',
            location: {
              departure: criteria.departureLocation,
              arrival: criteria.arrivalLocation,
            },
            dateRange: {
              start: criteria.departureDate,
              end: criteria.arrivalDate,
            },
          },
          {
            id: '2',
            type: 'hotel',
            name: 'Luxury Hotel',
            description: '4-star hotel stay',
            price: 700,
            supplier: '0x456...',
            location: {
              arrival: criteria.arrivalLocation,
            },
            dateRange: {
              start: criteria.departureDate,
              end: criteria.arrivalDate,
            },
          },
        ],
      },
    ];

    setPackages(mockPackages);
  };

  const handlePurchase = async (packageId: string) => {
    if (!walletState.isConnected) {
      alert('Please connect your wallet first!');
      return;
    }

    // Here you would interact with your smart contract
    console.log('Purchasing package:', packageId);
  };

  return (
    <div className="container">
      <SearchForm onSearch={handleSearch} />

      {packages.map((pkg) => (
        <PackageCard key={pkg.id} package={pkg} onPurchase={handlePurchase} />
      ))}
    </div>
  );
};
