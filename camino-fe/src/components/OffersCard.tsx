import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { IPackage } from '../types/general-types';
import { PRODUCT_TYPE_OPTIONS, PRODUCT_TYPE_ICONS } from '../utils/constants';

type OfferCardProps = {
  offerPackage: IPackage;
  index: number;
  onPurchase: (packageId: number) => void;
};

const OfferCard = ({ offerPackage, index, onPurchase }: OfferCardProps) => {
  const purchase = () => {
    onPurchase(offerPackage.id);
  };

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  };

  const formatDateRange = (startDate: Date, endDate: Date): string => {
    const start = formatDate(startDate);
    const end = formatDate(endDate);

    return `${start} - ${end}`;
  };

  return (
    <Card className="mb-4 surface-100">
      <div className="flex flex-column">
        <div className="text-xl font-bold mb-3">Offer {String.fromCharCode(65 + index)}</div>
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
                      <span className="text-sm text-600">{formatDateRange(offer.dateRange.start, offer.dateRange.start)}</span>
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
