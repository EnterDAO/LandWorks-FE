/* eslint-disable @typescript-eslint/no-explicit-any */
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
  landIds?: any[];
  coords: any[];
};

export type Estate = {
  id: string;
  name: string;
  isLAND: boolean;
  landIds?: any[];
  coords: any[];
};

export type ParsedTime = {
  timeValue: string | number;
  timeType: string;
};
