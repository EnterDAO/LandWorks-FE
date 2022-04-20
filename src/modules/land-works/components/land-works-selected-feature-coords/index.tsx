import React from 'react';

import { Grid } from 'design-system';
import { DecentralandNFT, Estate } from 'modules/interface';

import s from './s.module.scss';

interface ISelectedFeatureCoords {
  asset: DecentralandNFT | Estate;
  estateLands?: DecentralandNFT[] | undefined;
}

const LandCoordinates: React.FC<{ x: string; y: string }> = ({ x, y }) => {
  return (
    <Grid textAlign="left" className={s.details}>
      <span style={{ marginRight: '20px' }}>
        X: {x} Y: {y}
      </span>
      <span>
        Parcel {x}:{y}
      </span>
    </Grid>
  );
};

const EstateCoordinates: React.FC<{ assetCoords: { x: string; y: string }[]; estateLands: DecentralandNFT[] }> = ({
  assetCoords,
  estateLands,
}) => {
  const coords = estateLands && estateLands.map((i: DecentralandNFT) => i.coords);
  return (
    <Grid className={s.details}>
      {estateLands && estateLands?.length > 3
        ? coords?.slice(0, 3).map((co) => {
            return (
              <>
                <span key={`${co[0]}-${co[1]}`} style={{ marginRight: '8px' }}>
                  X: {co[0]} Y: {co[1]}
                  {''}
                </span>
                <span>. . .</span>
              </>
            );
          })
        : coords?.map((co) => {
            return (
              <span key={`${co[0]}-${co[1]}`} style={{ marginRight: '8px' }}>
                X: {co[0]} Y: {co[1]}
                {''}
              </span>
            );
          })}
    </Grid>
  );
};

const SelectedFeatureCoords: React.FC<ISelectedFeatureCoords> = ({ asset, estateLands }) => {
  if (asset.isLAND) {
    return <LandCoordinates x={asset.coords[0]} y={asset.coords[1]} />;
  }

  if (!asset.isLAND && estateLands && estateLands.length > 0) {
    return <EstateCoordinates assetCoords={asset.coords} estateLands={estateLands} />;
  }

  return <>No co-ordinates available</>;
};

export default SelectedFeatureCoords;
