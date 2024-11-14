import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useWallet } from '../contexts/WalletContext';

interface Transaction {
  id: string;
  date: Date;
  amount: number;
  type: string;
  status: string;
}

export const Business: React.FC = () => {
  const { walletState } = useWallet();
  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      date: new Date(),
      amount: 1500,
      type: 'Payment Received',
      status: 'Completed',
    },
  ]);

  const salesData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sales',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: '#4caf50',
        tension: 0.4,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        labels: {
          color: '#495057',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#495057',
        },
        grid: {
          color: '#ebedef',
        },
      },
      y: {
        ticks: {
          color: '#495057',
        },
        grid: {
          color: '#ebedef',
        },
      },
    },
  };

  return (
    <div className="container">
      <div className="grid">
        {/* <div className="col-12 lg:col-6">
          <Card title="Revenue Overview">
            <div style={{ height: '350px' }}>
              <Chart type="line" data={salesData} options={options} />
            </div>
          </Card>
        </div> */}

        <div className="col-12 lg:col-6">
          <Card title="Quick Stats">
            <div className="grid">
              <div className="col-6">
                <div className="text-center p-3 border-round bg-primary">
                  <div className="text-xl font-bold mb-2">Total Revenue</div>
                  <div className="text-2xl">$15,000</div>
                </div>
              </div>
              <div className="col-6">
                <div className="text-center p-3 border-round bg-secondary">
                  <div className="text-xl font-bold mb-2">Active Products</div>
                  <div className="text-2xl">25</div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="col-12">
          <Card title="Transaction History">
            <DataTable value={transactions} responsiveLayout="scroll">
              <Column field="id" header="ID" />
              <Column field="date" header="Date" body={(rowData) => new Date(rowData.date).toLocaleDateString()} />
              <Column field="amount" header="Amount" body={(rowData) => `$${rowData.amount}`} />
              <Column field="type" header="Type" />
              <Column field="status" header="Status" />
            </DataTable>
          </Card>
        </div>
      </div>
    </div>
  );
};
