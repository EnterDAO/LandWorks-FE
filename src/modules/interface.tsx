import { AssetEntity } from './land-works/api';

export interface Option {
  readonly label: string;
  readonly value: string | number;
  icon?: React.ReactNode;
}

export interface AssetOption {
  land: AssetEntity;
  name: string;
  coords: any[];
  parcel: any[];
}

export type DecentralandNFT = {
  id: string;
  name: string;
  isLAND: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  landIds?: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  coords: any[];
};

export type LandIds = {
  estateSize: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  landIds: any[];
};

export type Estate = {
  id: string;
  isLAND: boolean;
  landIds: LandIds;
  name: string;
};

export type ParsedTime = {
  timeValue: string | number;
  timeType: string;
};
