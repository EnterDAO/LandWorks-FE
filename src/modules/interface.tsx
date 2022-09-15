/* eslint-disable @typescript-eslint/no-explicit-any */
import { AssetEntity, CoordinatesLand } from './land-works/api';

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
  metaverseName: 'Decentraland';
  isLAND?: boolean;
  landIds?: any[];
  coords: any[];
  size: number;
}

export interface CryptoVoxelXYcoords {
  x: string;
  y: string;
}

export interface CryptoVoxelNFT extends BaseNFT {
  metaverseName: 'Voxels';
  place: string;
  formattedCoords: string;
  type?: string;
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
  openClaimModal: boolean;
}

export type VoxelsTileType = {
  name: string;
  id: number;
  description: string;
  address: string;
  geometry: {
    type: string;
    coordinates: number[][][];
  };
};

export type VoxelsMapCollection = {
  type: string;
  features: Array<VoxelMapItem>;
};

type VoxelMapItem = {
  type: string;
  id: string;
  geometry: {
    type: string;
    coordinates: number[][][];
  };
};

export interface LandsExploreMapBaseProps {
  positionX: number;
  positionY: number;
  zoom?: number;
  onZoom?: (zoom: number) => void;
  lands: AssetEntity[];
  highlights?: CoordinatesLand[];
}
