import React from 'react';

import { Box, Grid } from 'design-system';
import { getDecentralandNftImageUrl } from 'helpers/helpers';
import { DecentralandNFT } from 'modules/interface';

import s from './s.module.scss';

interface ISelectedListCard {
  land: DecentralandNFT;
}

const SelectedListCard: React.FC<ISelectedListCard> = ({ land }) => {
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
            src={getDecentralandNftImageUrl(land)}
          />
        </Grid>
        <Grid flexDirection="column" alignContent="flex-start" textAlign="left">
          <Grid textAlign="left" className={s.name}>
            <span>{land.name.toLowerCase()}</span>
          </Grid>
          <Grid textAlign="left" className={s.details}>
            <span style={{ marginRight: '20px' }}>
              X: {land.coords[0]} Y: {land.coords[1]}
            </span>
            <span>
              Parcel {land.coords[0]}:{land.coords[1]}
            </span>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SelectedListCard;
