import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { IPackage } from '../types/general-types';

interface PackageCardProps {
  package: IPackage;
  onPurchase: (packageId: string) => void;
}

export const PackageCard: React.FC<PackageCardProps> = ({ package: pkg, onPurchase }) => {
  const header = (
    <div className="flex justify-content-between align-items-center">
      <h3 className="m-0">Package #{pkg.id}</h3>
      <span className="text-xl font-bold">${pkg.totalPrice}</span>
    </div>
  );

  const footer = (
    <div className="flex justify-content-end">
      <Button label="Purchase" icon="pi pi-shopping-cart" onClick={() => onPurchase(pkg.id)} />
    </div>
  );

  return (
    <Card header={header} footer={footer} className="mb-4">
      <div className="grid">
        {pkg.products.map((product) => (
          <div key={product.id} className="col-12 md:col-6 lg:col-4">
            <Card>
              <h4>{product.type}</h4>
              <p className="font-bold">{product.name}</p>
              <p>{product.description}</p>
              {product.location && (
                <p>
                  {product.location.departure} → {product.location.arrival}
                </p>
              )}
              {product.dateRange && (
                <p>
                  {new Date(product.dateRange.start).toLocaleDateString()} -{new Date(product.dateRange.end).toLocaleDateString()}
                </p>
              )}
              <p className="text-right font-bold">${product.price}</p>
            </Card>
          </div>
        ))}
      </div>
    </Card>
  );
};
