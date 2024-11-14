import React, { useState } from 'react';
import { MultiSelect } from 'primereact/multiselect';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { ISearchCriteria } from '../types/general-types';

interface SearchFormProps {
  onSearch: (criteria: ISearchCriteria) => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [criteria, setCriteria] = useState<ISearchCriteria>({
    productTypes: [],
    departureLocation: '',
    arrivalLocation: '',
    departureDate: new Date(),
    arrivalDate: new Date(),
    guests: 1,
  });

  const productTypeOptions = [
    { label: 'Flight', value: 'flight' },
    { label: 'Hotel', value: 'hotel' },
    { label: 'Car Rental', value: 'car' },
    { label: 'Activities', value: 'activities' },
  ];

  const locationOptions = [
    { label: 'New York', value: 'NYC' },
    { label: 'London', value: 'LON' },
    { label: 'Paris', value: 'PAR' },
    { label: 'Tokyo', value: 'TYO' },
  ];

  const handleSearch = () => {
    onSearch(criteria);
  };

  return (
    <Card className="mb-4">
      <div className="grid">
        <div className="col-12 md:col-6 lg:col-3">
          <label className="block mb-2">Product Types</label>
          <MultiSelect
            value={criteria.productTypes}
            options={productTypeOptions}
            onChange={(e) => setCriteria({ ...criteria, productTypes: e.value })}
            placeholder="Select Products"
            className="w-full"
          />
        </div>

        <div className="col-12 md:col-6 lg:col-3">
          <label className="block mb-2">Departure Location</label>
          <Dropdown
            value={criteria.departureLocation}
            options={locationOptions}
            onChange={(e) => setCriteria({ ...criteria, departureLocation: e.value })}
            placeholder="Select Departure"
            className="w-full"
          />
        </div>

        <div className="col-12 md:col-6 lg:col-3">
          <label className="block mb-2">Arrival Location</label>
          <Dropdown
            value={criteria.arrivalLocation}
            options={locationOptions}
            onChange={(e) => setCriteria({ ...criteria, arrivalLocation: e.value })}
            placeholder="Select Arrival"
            className="w-full"
          />
        </div>

        <div className="col-12 md:col-6 lg:col-3">
          <label className="block mb-2">Number of Guests</label>
          <InputNumber value={criteria.guests} onValueChange={(e) => setCriteria({ ...criteria, guests: e.value || 1 })} min={1} max={10} className="w-full" />
        </div>

        <div className="col-12 md:col-6 lg:col-3">
          <label className="block mb-2">Departure Date</label>
          <Calendar value={criteria.departureDate} onChange={(e) => setCriteria({ ...criteria, departureDate: e.value as Date })} showTime className="w-full" />
        </div>

        <div className="col-12 md:col-6 lg:col-3">
          <label className="block mb-2">Return Date</label>
          <Calendar value={criteria.arrivalDate} onChange={(e) => setCriteria({ ...criteria, arrivalDate: e.value as Date })} showTime className="w-full" />
        </div>

        <div className="col-12 flex justify-content-end">
          <Button label="Search Packages" icon="pi pi-search" onClick={handleSearch} />
        </div>
      </div>
    </Card>
  );
};
