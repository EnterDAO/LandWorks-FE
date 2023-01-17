import React, { ComponentType, ReactNode } from 'react';

import { AssetEntity } from 'modules/land-works/api';

import DecentralandMap from './DecentralandMap';
import VoxelsMap from './VoxelsMap';

import { DECENTRALAND_METAVERSE, VOXEL_METAVERSE } from 'modules/land-works/constants';

export interface MetaverseMapCommonProps {
  onSelect?: (assetId?: string) => void;
  selectedId?: string;
  assets?: AssetEntity[];
  isFullScreen?: boolean;
  children?: ReactNode;
}

export interface MetaverseMapProps extends MetaverseMapCommonProps {
  type: number;
}

type Metaverse = typeof DECENTRALAND_METAVERSE | typeof VOXEL_METAVERSE;

const metaverseMapByType: Record<Metaverse, ComponentType<MetaverseMapCommonProps>> = {
  [DECENTRALAND_METAVERSE]: DecentralandMap,
  [VOXEL_METAVERSE]: VoxelsMap,
};

const MetaverseMap = ({ type, ...otherProps }: MetaverseMapProps) => {
  const SpecificMap = metaverseMapByType[type as any as Metaverse];

  if (SpecificMap) {
    return <SpecificMap {...otherProps} />;
  }

  return null;
};

export default MetaverseMap;
