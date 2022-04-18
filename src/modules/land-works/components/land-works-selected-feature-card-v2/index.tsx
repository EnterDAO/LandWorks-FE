import React from 'react';

import { Box, Grid } from 'design-system';
import { getDecentralandNftImageUrl, getEstateImageUrl, getLandImageUrl } from 'helpers/helpers';
import { DecentralandNFT, Estate } from 'modules/interface';
import { AssetEntity, CryptoVoxelsType } from 'modules/land-works/api';
import { Token } from 'modules/land-works/contracts/decentraland/land/LANDRegistryContract';

import s from './s.module.scss';

interface ISelectedListCard {
  asset?: AssetEntity;
}

const SelectedListCard: React.FC<ISelectedListCard> = ({ asset }) => {
  const assetCoords = asset?.decentralandData?.coordinates;
  const srcForAsset = getLandImageUrl(asset);
  return (
    <Grid className={s.wrapper} item>
      <Grid className={s.card}>
        {asset && (
          <>
            <Grid className={s.imageListWrapper}>
              <Box
                component="img"
                sx={{
                  minHeight: 100,
                  width: '100%',
                  maxHeight: { xs: 233, md: 167 },
                }}
                className={s.image}
                alt="The property from the offer."
                src={srcForAsset}
              />
            </Grid>
            <Grid flexDirection="column" alignContent="flex-start" textAlign="left">
              <Grid textAlign="left" className={s.name}>
                <span>{asset.name?.toLowerCase()}</span>
              </Grid>
              {assetCoords && asset.decentralandData?.isLAND ? (
                <Grid textAlign="left" className={s.details}>
                  <span style={{ marginRight: '20px' }}>
                    X: {assetCoords[0].x} Y: {assetCoords[0].y}
                  </span>
                  <span>
                    Parcel {assetCoords[0].x}:{assetCoords[0].y}
                  </span>
                </Grid>
              ) : (
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
              )}
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default SelectedListCard;
