import React from 'react';

import { Box, Grid } from 'design-system';
import { getDecentralandNftImageUrl, getEstateImageUrl } from 'helpers/helpers';
import { DecentralandNFT, Estate } from 'modules/interface';
import { Token } from 'modules/land-works/contracts/decentraland/land/LANDRegistryContract';

import s from './s.module.scss';

interface ISelectedListCard {
  land: DecentralandNFT | Estate;
  landsContent?: Token[];
}

const SelectedListCard: React.FC<ISelectedListCard> = ({ land, landsContent }) => {
  const coords = landsContent && landsContent.map((i: Token) => i.coords);

  return (
    <Grid className={s.wrapper} item>
      <Grid className={s.card}>
        <Grid className={s.imageListWrapper}>
          <Box
            component="img"
            sx={{
              minHeight: 100,
              width: '100%',
              maxHeight: { xs: 233, md: 167 },
            }}
            className={s.image}
            alt="The house from the offer."
            src={land.isLAND ? getDecentralandNftImageUrl(land) : getEstateImageUrl(land)}
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
            <Grid>
              {coords?.map((co) => {
                return (
                  <span style={{ marginRight: '10px' }}>
                    X: {co[0]} Y: {co[1]}
                    {''}
                  </span>
                );
              })}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SelectedListCard;
