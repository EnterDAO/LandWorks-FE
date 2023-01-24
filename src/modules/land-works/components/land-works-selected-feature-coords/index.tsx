import React from 'react';

import { Grid } from 'design-system';
import { DecentralandNFT, Estate } from 'modules/interface';

import s from './s.module.scss';

interface ISelectedFeatureCoords {
  asset: DecentralandNFT | Estate;
  isListing?: boolean;
}

const LandCoordinates: React.FC<{ x: string; y: string; isListing?: boolean }> = ({ x, y, isListing }) => {
  return (
    <Grid textAlign="left" className={s.details}>
      <span style={{ marginRight: '20px' }}>
        X: {x} Y: {y}
      </span>
      {!isListing && (
        <span>
          Parcel {x}:{y}
        </span>
      )}
    </Grid>
  );
};

// TODO: refactor
const EstateCoordinates: React.FC<{
  size: string | number;
}> = ({ size }) => {
  return (
    <Grid className={s.details}>
      <span>{size}</span>
    </Grid>
  );
};

// TODO: refactor
const SelectedFeatureCoords: React.FC<ISelectedFeatureCoords> = ({ asset, isListing }) => {
  if (asset.isLAND) {
    return <LandCoordinates x={asset.coords[0]} y={asset.coords[1]} isListing={isListing} />;
  }

  const estateSize = (asset as any)?.landIds?.estateSize || null;

  if (!asset.isLAND && estateSize) {
    return <EstateCoordinates size={estateSize} />;
  }

  return <>No co-ordinates available</>;
};

export default SelectedFeatureCoords;
