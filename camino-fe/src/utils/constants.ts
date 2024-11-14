import abi from './Contract.json';

export const CONTRACT_ABI = abi;
export const CONTRACT_ADDRESS = '0x14FbF4800eC30C8A5B0E5AF1b240f826186562Ed';

export const PRODUCT_TYPE_OPTIONS = [
  { label: 'Flight', value: 1 },
  { label: 'Hotel', value: 2 },
  { label: 'Safari', value: 3 },
  { label: 'Boat Trip', value: 4 },
];

export const LOCATION_OPTIONS = [
  { label: 'Antalya', value: 'AYT' },
  { label: 'Ankara', value: 'ANK' },
  { label: 'İzmir', value: 'IZM' },
  { label: 'İstanbul', value: 'IST' },
];

export const PRODUCT_TYPE_ICONS = [
  {
    key: 1,
    value: 'pi pi-send',
  },
  {
    key: 2,
    value: 'pi pi-home',
  },
  {
    key: 3,
    value: 'pi pi-map',
  },
  {
    key: 4,
    value: 'pi pi-compass',
  },
];

export const SUPPLIERS = [
  {
    address: '1',
    name: 'THY',
  },
  {
    address: '2',
    name: 'Anelli',
  },
  {
    address: '3',
    name: 'Antalya Safari Trip',
  },
  {
    address: '4',
    name: 'Antalya Boat Trip',
  },
];
