export interface IProduct {
  id: string;
  type: string;
  name: string;
  description: string;
  price: number;
  supplier: string;
  location?: {
    departure?: string;
    arrival?: string;
  };
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface IPackage {
  id: string;
  products: IProduct[];
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
