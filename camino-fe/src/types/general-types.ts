export interface IOffer {
  id: number;
  productType: number;
  supplierAddress: string;
  description: string;
  ipfsHash: string;
  startDate: Date;
  endDate: Date;
}

export interface IPackage {
  id: number;
  offers: IOffer[];
  totalPrice: number;
}

export interface ISearchCriteria {
  productTypes: number[];
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

export interface BusinessForm {
  productType: number | null;
  origin: string | null;
  destination: string | null;
  departureDate: Date | null;
  arrivalDate: Date | null;
  numberOfGuests: number | null;
  salesPrice: number | null;
}
