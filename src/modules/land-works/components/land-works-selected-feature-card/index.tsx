import React from 'react';

import { Box, Grid } from 'design-system';
import { getDecentralandNftImageUrl, getEstateImageUrl, getLandImageUrl } from 'helpers/helpers';
import { CryptoVoxelNFT, DecentralandNFT, Estate } from 'modules/interface';
import { AssetEntity } from 'modules/land-works/api';
import { Token } from 'modules/land-works/contracts/decentraland/land/LANDRegistryContract';

import s from './s.module.scss';

interface ISelectedListCard {
  land: any;
  asset?: AssetEntity;
  landsContent?: Token[];
}

const SelectedListCard: React.FC<ISelectedListCard> = ({ land, landsContent, asset }) => {
  const coords = landsContent && landsContent.map((i: Token) => i.coords);
  const assetCoords = asset?.decentralandData?.coordinates;
  const srcForImage = land.isLAND ? getDecentralandNftImageUrl(land) : getEstateImageUrl(land);

  return (
    <Grid className={s.wrapper} item>
      <Grid className={s.card}>
        {land && (
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
                src={srcForImage}
              />
            </Grid>
            <Grid flexDirection="column" alignContent="flex-start" textAlign="left">
              <Grid textAlign="left" className={s.name}>
                <span>{land.name.toLowerCase()}</span>
              </Grid>
              {land.isLAND ? (
                <Grid textAlign="left" className={s.details}>
                  <span style={{ marginRight: '20px' }}>
                    X: {land.coords[0]} Y: {land.coords[1]}
                  </span>
                  <span>
                    Parcel {land.coords[0]}:{land.coords[1]}
                  </span>
                </Grid>
              ) : (
                <Grid className={s.details}>
                  {landsContent && landsContent?.length > 3
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
              )}
            </Grid>
          </>
        )}

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
                src={getLandImageUrl(asset)}
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
