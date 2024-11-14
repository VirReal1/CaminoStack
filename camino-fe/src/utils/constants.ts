import abi from './Contract.json';

export const CONTRACT_ABI = abi;
export const CONTRACT_ADDRESS = '0x3041810475FE2961b7cf772c6fDaec4f18aEe72B';

export const PRODUCT_TYPE_OPTIONS = [
  { label: 'Flight', value: 1 },
  { label: 'Hotel', value: 2 },
  { label: 'Safari', value: 3 },
  { label: 'Boat Trip', value: 4 },
];

export const LOCATION_OPTIONS = [
  { label: 'Antalya', value: 'ayt' },
  { label: 'Ankara', value: 'ank' },
  { label: 'İzmir', value: 'izm' },
  { label: 'İstanbul', value: 'ist' },
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
    value: 'pi pi-compass',
  },
  {
    key: 4,
    value: 'pi pi-map',
  },
];
