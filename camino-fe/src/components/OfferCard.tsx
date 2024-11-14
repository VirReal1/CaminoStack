import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { IOffer, IPackage } from '../types/general-types';
import { PRODUCT_TYPE_OPTIONS, PRODUCT_TYPE_ICONS, SUPPLIERS } from '../utils/constants';

type OfferCardProps = {
  offerPackage: IPackage;
  onPurchase: (packageId: number) => void;
};

const OfferCard = ({ offerPackage, onPurchase }: OfferCardProps) => {
  const purchase = () => {
    onPurchase(offerPackage.id);
  };

  const formatDate = (date: Date, formatWithTime: boolean) => {
    if (formatWithTime) {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();

      return `${day}.${month}.${year}`;
    } else {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');

      return `${day}.${month}.${year} ${hours}:${minutes}`;
    }
  };

  const formatDateRange = (offer: IOffer, formatWithTime: boolean): string => {
    const start: string = formatDate(offer.startDate, formatWithTime);
    let result: string;
    if (offer.productType === 1 || offer.productType === 2) {
      const end: string = formatDate(offer.endDate!, formatWithTime);
      result = `${start} - ${end}`;
    } else {
      result = start;
    }
    return result;
  };

  return (
    <Card className="mb-4 surface-100">
      <div className="flex flex-column">
        <div className="text-xl font-bold mb-3">Recommended Package</div>
        <div className="border-1 surface-border border-round p-4">
          <div className="grid">
            {/* Products Grid */}
            <div className="col-12 lg:col-8">
              <div className="flex flex-column gap-4">
                {offerPackage.offers.map((offer, idx) => (
                  <div key={idx} className="flex align-items-center gap-3">
                    <i className={`${PRODUCT_TYPE_ICONS.find((l) => l.key === offer.productType)!.value} text-xl`}></i>
                    <div className="flex flex-column">
                      <span className="font-semibold">{PRODUCT_TYPE_OPTIONS.find((l) => l.value === offer.productType)?.label}</span>
                      <span className="text text-600">{SUPPLIERS.find((l) => l.address === offer.supplierAddress)?.name}</span>
                      <span className="text-sm text-600">
                        {offer.productType === 1 || offer.productType === 2 ? formatDateRange(offer, true) : formatDateRange(offer, false)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price and Actions */}
            <div className="col-12 lg:col-4 flex flex-column align-items-end justify-content-between">
              <div className="text-3xl font-bold text-right mb-3">{offerPackage.totalPrice} CAM</div>
              <div className="flex flex-column gap-2 w-full">
                <Button onClick={purchase} label="Purchase" className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default OfferCard;
