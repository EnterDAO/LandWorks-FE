/* eslint-disable @typescript-eslint/no-explicit-any */
import { AssetEntity } from './land-works/api';

export type Metaverse = 'Decentraland' | 'Voxels';
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

export interface DecentralandNFT extends BaseNFT {
  isLAND?: boolean;
  landIds?: any[];
  coords: any[];
}

export interface CryptoVoxelXYcoords {
  x: string;
  y: string;
}

export interface CryptoVoxelNFT extends BaseNFT {
  place: string;
  formattedCoords: string;
}

export interface BaseNFT {
  id: string;
  name: string;
  image: string;
  contractAddress: string;
  metaverseName: Metaverse;
  place?: string;
}

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

export interface LocationState {
  from: string;
  title: string;
  tab: string;
  previousPage?: {
    from: string;
    title: string;
  };
}
