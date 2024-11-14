import { FormEvent, useState } from 'react';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { LOCATION_OPTIONS, PRODUCT_TYPE_OPTIONS } from '../utils/constants';
import { useContract } from '../hooks/useContract';
import { BusinessForm } from '../types/general-types';

const Business = () => {
  const contract = useContract();

  const [formData, setFormData] = useState<BusinessForm>({
    productType: null,
    origin: '',
    destination: '',
    departureDate: null,
    arrivalDate: null,
    numberOfGuests: null,
    salesPrice: null,
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData && formData.productType && formData.departureDate && formData.arrivalDate && formData.origin && formData.numberOfGuests && formData.salesPrice)
      await contract.addProductTemplate(
        formData.productType,
        formData.departureDate,
        formData.arrivalDate,
        formData.origin,
        formData.destination as string,
        formData.numberOfGuests,
        formData.salesPrice,
        ''
      );
  };

  return (
    <div className="flex align-items-center justify-content-center">
      <div className="surface-card p-4 shadow-2 border-round w-full max-w-5xl">
        <Card title="Create an Offer" className="mb-0">
          <form onSubmit={handleSubmit} className="p-fluid">
            <div className="grid">
              {/* Product Type */}
              <div className="col-12 mb-4">
                <label htmlFor="productType" className="block text-900 font-medium mb-2">
                  Product Type
                </label>
                <Dropdown
                  id="productType"
                  value={formData.productType}
                  options={PRODUCT_TYPE_OPTIONS}
                  onChange={(e) => setFormData({ ...formData, productType: e.value })}
                  placeholder="Select a product type"
                  className="w-full"
                />
              </div>

              {/* Locations */}
              <div className="col-12 md:col-6 mb-4">
                <label htmlFor="origin" className="block text-900 font-medium mb-2">
                  Origin
                </label>
                <Dropdown
                  id="origin"
                  value={formData.origin}
                  options={LOCATION_OPTIONS}
                  onChange={(e) => setFormData({ ...formData, origin: e.value })}
                  placeholder="Select Origin"
                  className="w-full"
                />
              </div>

              <div className="col-12 md:col-6 mb-4">
                <label htmlFor="destination" className="block text-900 font-medium mb-2">
                  Destination
                </label>
                <Dropdown
                  id="destination"
                  value={formData.destination}
                  options={LOCATION_OPTIONS}
                  onChange={(e) => setFormData({ ...formData, destination: e.value })}
                  placeholder="Select Destination"
                  className="w-full"
                />
              </div>

              {/* Dates */}
              <div className="col-12 md:col-6 mb-4">
                <label htmlFor="departureDate" className="block text-900 font-medium mb-2">
                  Departure Date
                </label>
                <Calendar
                  id="departureDate"
                  value={formData.departureDate}
                  onChange={(e) => setFormData({ ...formData, departureDate: e.value! })}
                  showIcon
                  className="w-full"
                />
              </div>

              <div className="col-12 md:col-6 mb-4">
                <label htmlFor="arrivalDate" className="block text-900 font-medium mb-2">
                  Arrival Date
                </label>
                <Calendar
                  id="arrivalDate"
                  value={formData.arrivalDate}
                  onChange={(e) => setFormData({ ...formData, arrivalDate: e.value! })}
                  showIcon
                  className="w-full"
                />
              </div>

              {/* Number of Guests */}
              <div className="col-6 mb-4">
                <label htmlFor="numberOfGuests" className="block text-900 font-medium mb-2">
                  Number of Guests
                </label>
                <InputNumber
                  id="numberOfGuests"
                  value={formData.numberOfGuests}
                  onValueChange={(e) => setFormData({ ...formData, numberOfGuests: e.value! })}
                  placeholder="Enter number of guests"
                  min={1}
                  showButtons
                  className="w-full"
                />
              </div>

              {/* Number of Guests */}
              <div className="col-6 mb-4">
                <label htmlFor="salesPrice" className="block text-900 font-medium mb-2">
                  Sales Price
                </label>
                <InputNumber
                  id="salesPrice (CAM)"
                  value={formData.salesPrice}
                  onValueChange={(e) => setFormData({ ...formData, salesPrice: e.value! })}
                  placeholder="Enter the sales price (CAM)"
                  min={1}
                  showButtons
                  className="w-full"
                />
              </div>

              {/* Submit Button */}
              <div className="col-12">
                <Button type="submit" label="Create Offer" icon="pi pi-plus" className="w-full" />
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Business;
