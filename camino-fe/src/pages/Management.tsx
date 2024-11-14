import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { IProduct } from '../types/general-types';
import { useWallet } from '../contexts/WalletContext';

const Management: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [displayDialog, setDisplayDialog] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<IProduct>>({});
  const { walletState } = useWallet();

  const productTypes = [
    { label: 'Flight', value: 'flight' },
    { label: 'Hotel', value: 'hotel' },
    { label: 'Car Rental', value: 'car' },
    { label: 'Activities', value: 'activities' },
  ];

  const addProduct = () => {
    if (!walletState.isConnected) {
      alert('Please connect your wallet first!');
      return;
    }

    const product: IProduct = {
      id: Date.now().toString(),
      type: newProduct.type || '',
      name: newProduct.name || '',
      description: newProduct.description || '',
      price: newProduct.price || 0,
      supplier: walletState.accounts[0],
    };

    // Here you would interact with your smart contract
    setProducts([...products, product]);
    setDisplayDialog(false);
    setNewProduct({});
  };

  const footer = (
    <div>
      <Button label="Cancel" icon="pi pi-times" onClick={() => setDisplayDialog(false)} className="p-button-text" />
      <Button label="Save" icon="pi pi-check" onClick={addProduct} />
    </div>
  );

  return (
    <div className="container">
      <Card>
        <div className="flex justify-content-between mb-4">
          <h2>Product Management</h2>
          <Button label="Add Product" icon="pi pi-plus" onClick={() => setDisplayDialog(true)} />
        </div>

        <DataTable value={products} responsiveLayout="scroll">
          <Column field="id" header="ID" />
          <Column field="type" header="Type" />
          <Column field="name" header="Name" />
          <Column field="description" header="Description" />
          <Column field="price" header="Price" body={(rowData) => `$${rowData.price}`} />
          <Column field="supplier" header="Supplier" />
        </DataTable>

        <Dialog visible={displayDialog} style={{ width: '450px' }} header="Add New Product" modal footer={footer} onHide={() => setDisplayDialog(false)}>
          <div className="grid p-fluid">
            <div className="col-12 mb-2">
              <label htmlFor="type">Type</label>
              <Dropdown
                id="type"
                value={newProduct.type}
                options={productTypes}
                onChange={(e) => setNewProduct({ ...newProduct, type: e.value })}
                placeholder="Select Type"
              />
            </div>
            <div className="col-12 mb-2">
              <label htmlFor="name">Name</label>
              <InputText id="name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
            </div>
            <div className="col-12 mb-2">
              <label htmlFor="description">Description</label>
              <InputText id="description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
            </div>
            <div className="col-12 mb-2">
              <label htmlFor="price">Price</label>
              <InputNumber
                id="price"
                value={newProduct.price}
                onValueChange={(e: InputNumberValueChangeEvent) => {
                  if (e && e.value) setNewProduct({ ...newProduct, price: e.value });
                }}
                mode="currency"
                currency="USD"
              />
            </div>
          </div>
        </Dialog>
      </Card>
    </div>
  );
};

export default Management;
