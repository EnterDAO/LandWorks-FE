import React, { ComponentType, ReactNode } from 'react';
import { Box } from '@mui/material';

import Typography from 'components/common/Typography';
import { AssetEntity } from 'modules/land-works/api';
import { METAVERSES, MetaverseId } from 'modules/land-works/data/metaverses';

import DecentralandMap from './DecentralandMap';
import VoxelsMap from './VoxelsMap';

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
  [METAVERSES.Decentraland]: DecentralandMap,
  [METAVERSES.Voxels]: VoxelsMap,
};

const MetaverseMap = ({ type, ...otherProps }: MetaverseMapProps) => {
  const SpecificMap = metaverseMapByType[type as any as MetaverseId];

  if (SpecificMap) {
    return <SpecificMap {...otherProps} />;
  }

  return (
    <Box position="relative" width={1} height={1}>
      <Typography position="absolute" top={0} left={0} right={0} bottom={0} margin="auto">
        Map is not implemented yet.
      </Typography>
    </Box>
  );
};

export default MetaverseMap;
