import React, { useState } from 'react';
import { MultiSelect } from 'primereact/multiselect';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { ISearchCriteria } from '../types/general-types';
import { useToast } from '../contexts/ToastContext';
import { LOCATION_OPTIONS, PRODUCT_TYPE_OPTIONS } from '../utils/constants';

interface SearchFormProps {
  onSearch: (criteria: ISearchCriteria) => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const toast = useToast();

  const [criteria, setCriteria] = useState<ISearchCriteria>({
    productTypes: [],
    departureLocation: '',
    arrivalLocation: '',
    departureDate: new Date(),
    arrivalDate: new Date(),
    guests: 1,
  });

  const handleSearch = async () => {
    if (!validateForm()) {
      toast?.showToast({ detail: 'Please check you inputs!', severity: 'warn' });
      return;
    }
    onSearch(criteria);
  };

  const validateForm = (): boolean => {
    // Check product types
    if (criteria.productTypes.length === 0) return false;

    // Check locations
    if (!criteria.departureLocation || !criteria.arrivalLocation) return false;
    if (criteria.departureLocation === criteria.arrivalLocation) return false;

    // Check departure date
    if (criteria.departureDate <= new Date()) return false;

    // Check return date
    if (criteria.arrivalDate <= criteria.departureDate) return false;

    // Check guests
    if (criteria.guests < 1 || criteria.guests > 10) return false;

    return true;
  };

  return (
    <Card className="mb-4">
      <div className="grid">
        <div className="col-12 md:col-6 lg:col-3">
          <label className="block mb-2">Product Types</label>
          <MultiSelect
            value={criteria.productTypes}
            options={PRODUCT_TYPE_OPTIONS}
            onChange={(e) => setCriteria({ ...criteria, productTypes: e.value })}
            placeholder="Select Products"
            className="w-full"
          />
        </div>

        <div className="col-12 md:col-6 lg:col-3">
          <label className="block mb-2">Departure Location</label>
          <Dropdown
            value={criteria.departureLocation}
            options={LOCATION_OPTIONS}
            onChange={(e) => setCriteria({ ...criteria, departureLocation: e.value })}
            placeholder="Select Departure"
            className="w-full"
          />
        </div>

        <div className="col-12 md:col-6 lg:col-3">
          <label className="block mb-2">Arrival Location</label>
          <Dropdown
            value={criteria.arrivalLocation}
            options={LOCATION_OPTIONS}
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
          <Calendar value={criteria.departureDate} onChange={(e) => setCriteria({ ...criteria, departureDate: e.value as Date })} className="w-full" />
        </div>

        <div className="col-12 md:col-6 lg:col-3">
          <label className="block mb-2">Return Date</label>
          <Calendar value={criteria.arrivalDate} onChange={(e) => setCriteria({ ...criteria, arrivalDate: e.value as Date })} className="w-full" />
        </div>

        <div className="col-12 flex justify-content-end">
          <Button label="Search Packages" icon="pi pi-search" onClick={handleSearch} />
        </div>
      </div>
    </Card>
  );
};
