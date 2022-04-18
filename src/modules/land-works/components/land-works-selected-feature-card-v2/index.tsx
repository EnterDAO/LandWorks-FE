import React from 'react';

import { Box, Grid } from 'design-system';

import s from './s.module.scss';

interface ISelectedListCard {
  src: string;
  name: string;
  coordinatesChild: React.ReactNode;
}

const SelectedListCard: React.FC<ISelectedListCard> = ({ src, name, coordinatesChild }) => {
  return (
    <Grid className={s.wrapper} item>
      <Grid className={s.card}>
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
              src={src}
            />
          </Grid>
          <Grid flexDirection="column" alignContent="flex-start" textAlign="left">
            <Grid textAlign="left" className={s.name}>
              <span>{name}</span>
            </Grid>
            {coordinatesChild}
          </Grid>
        </>
      </Grid>
    </Grid>
  );
};

export default SelectedListCard;
