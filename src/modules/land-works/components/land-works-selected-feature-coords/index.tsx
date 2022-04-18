import React from 'react';

import { Grid } from 'design-system';
import { DecentralandNFT, Estate } from 'modules/interface';

import s from './s.module.scss';

interface ISelectedFeatureCoords {
  asset: DecentralandNFT;
}

const LandCoordinates: React.FC<{ x: string; y: string }> = ({ x, y }) => {
  console.log({ x, y });
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

const EstateCoordinates: React.FC<{ assetCoords: { x: string; y: string }[] }> = ({ assetCoords }) => {
  console.log({ assetCoords });
  return (
    <Grid className={s.details}>
      {assetCoords && assetCoords?.length > 3
        ? assetCoords?.slice(0, 3).map((c) => {
            return (
              <>
                <span style={{ marginRight: '8px' }}>
                  X: {c.x} Y: {c.y}
                  {''}
                </span>
                <span>. . .</span>
              </>
            );
          })
        : assetCoords?.map((c) => {
            return (
              <span style={{ marginRight: '8px' }}>
                X: {c.x} Y: {c.y}
                {''}
              </span>
            );
          })}
    </Grid>
  );
};

const SelectedFeatureCoords: React.FC<ISelectedFeatureCoords> = ({ asset }) => {
  console.log({ asset });
  if (asset.coords) {
    return (
      <>
        {asset.isLAND ? (
          <LandCoordinates x={asset.coords[0]} y={asset.coords[1]} />
        ) : (
          <EstateCoordinates assetCoords={asset.coords} />
        )}
      </>
    );
  } else {
    return <>No co-ordinates available</>;
  }
};

export default SelectedFeatureCoords;
