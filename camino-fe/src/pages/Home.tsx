import React, { useEffect, useState } from 'react';
import { SearchForm } from '../components/SearchForm';
import { useWallet } from '../contexts/WalletContext';
import { IOffer, IPackage, ISearchCriteria } from '../types/general-types';
import { useContract } from '../hooks/useContract';
import OfferCard from '../components/OfferCard';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const [offerPackages, setOfferPackages] = useState<IPackage[]>([]);
  const [showTable, setShowTable] = useState<boolean>(false);
  const { walletState } = useWallet();
  const contract = useContract();
  const navigate = useNavigate();

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

  const getRandomIntegerInclusive = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getNextDayMidnight = (input: Date) => {
    // Clone the date to avoid modifying the original input
    const date = new Date(input);

    // Set to the next day at midnight
    date.setDate(date.getDate() + 1);
    date.setHours(0, 0, 0, 0);

    return date;
  };

  const getPreviousDayMidnight = (input: Date) => {
    // Clone the date to avoid modifying the original input
    const date = new Date(input);

    // Set to the previous day at midnight
    date.setDate(date.getDate() - 1);
    date.setHours(0, 0, 0, 0);

    return date;
  };

  const handleSearch = async (criteria: ISearchCriteria) => {
    setOfferPackages([]);

    const data: IPackage[] = [
      // TODO Can
      // ...(await contract.getPackages(
      //   criteria.productTypes,
      //   criteria.departureLocation,
      //   criteria.arrivalLocation,
      //   criteria.departureDate,
      //   criteria.arrivalDate,
      //   criteria.guests
      // )),
    ];

    const dummyFlightOffer: IOffer = {
      id: 1,
      description: 'THY',
      productType: 1,
      supplierAddress: '1',
      startDate: new Date(getRandomIntegerInclusive(criteria.departureDate.getTime(), getNextDayMidnight(criteria.departureDate).getTime())),
      endDate: new Date(getRandomIntegerInclusive(criteria.arrivalDate.getTime(), getNextDayMidnight(criteria.arrivalDate).getTime())),
      ipfsHash: '',
    };

    const dummyData: IPackage = {
      id: 1,
      offers: [
        dummyFlightOffer,
        {
          id: 2,
          description: 'Anelli Hotel',
          productType: 2,
          supplierAddress: '2',
          startDate: new Date(getRandomIntegerInclusive(dummyFlightOffer.startDate.getTime(), getNextDayMidnight(dummyFlightOffer.startDate).getTime())),
          endDate: new Date(getRandomIntegerInclusive(dummyFlightOffer.endDate!.getTime(), getPreviousDayMidnight(dummyFlightOffer.endDate!).getTime())),
          ipfsHash: '',
        },
        {
          id: 3,
          description: 'Antalya Safari Trip',
          productType: 3,
          supplierAddress: '3',
          startDate: new Date(getRandomIntegerInclusive(criteria.departureDate.getTime(), criteria.arrivalDate.getTime())),
          ipfsHash: '',
        },
        {
          id: 4,
          description: 'Antalya Boat Trip',
          productType: 4,
          supplierAddress: '4',
          startDate: new Date(getRandomIntegerInclusive(criteria.departureDate.getTime(), criteria.arrivalDate.getTime())),
          ipfsHash: '',
        },
      ],
      totalPrice: 180,
    };

    dummyData.offers = dummyData.offers.filter((l) => criteria.productTypes.includes(l.productType));
    dummyData.totalPrice = dummyData.totalPrice * criteria.guests;

    // TODO Can
    data.push(dummyData);

    setOfferPackages(data);

    if (data && data.length > 0) {
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
            <OfferCard key={index} offerPackage={offerPackage} onPurchase={handlePurchase} />
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Home;
