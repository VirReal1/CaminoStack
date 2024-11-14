export interface IOffer {
  id: number;
  productType: number;
  name: string;
  description: string;
  price: number;
  supplier: string; // TODO Can
  dateRange: {
    start: Date;
    end: Date;
  };
}

export interface IPackage {
  id: number;
  offers: IOffer[];
  totalPrice: number;
}

export interface ISearchCriteria {
  productTypes: string[];
  departureLocation: string;
  arrivalLocation: string;
  departureDate: Date;
  arrivalDate: Date;
  guests: number;
}

export interface IWalletState {
  accounts: string[];
  isConnected: boolean;
}
