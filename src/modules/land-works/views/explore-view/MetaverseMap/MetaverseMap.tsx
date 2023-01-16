import React, { ComponentType, ReactNode } from 'react';

import { AssetEntity } from 'modules/land-works/api';
import { MetaverseId } from 'modules/land-works/data/metaverses';

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
  type: string;
}

const metaverseMapByType: Record<MetaverseId, ComponentType<MetaverseMapCommonProps>> = {
  [DECENTRALAND_METAVERSE]: DecentralandMap,
  [VOXEL_METAVERSE]: VoxelsMap,
};

const MetaverseMap = ({ type, ...otherProps }: MetaverseMapProps) => {
  const SpecificMap = metaverseMapByType[type as any as MetaverseId];

  if (SpecificMap) {
    return <SpecificMap {...otherProps} />;
  }

  return null;
};

export default MetaverseMap;
