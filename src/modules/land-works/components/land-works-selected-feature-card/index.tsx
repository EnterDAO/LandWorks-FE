import React from 'react';

import { Box, Grid } from 'design-system';

import s from './s.module.scss';

interface ISelectedListCard {
  src: string;
  name: string;
  coordinatesChild: React.ReactNode;
  withoutInfo?: boolean;
}

const SelectedListCard: React.FC<ISelectedListCard> = ({ src, name, coordinatesChild, withoutInfo }) => {
  return (
    <Grid className={s.wrapper} item>
      <Grid className={s.card}>
        <>
          <Grid className={withoutInfo ? s.imageListWrapperExpanded : s.imageListWrapper}>
            <Box
              component="img"
              sx={{
                objectFit: 'cover',
                width: '100%',
                height: '100%',
              }}
              className={s.image}
              alt="The property from the offer."
              src={src}
            />
          </Grid>
          {!withoutInfo && (
            <Grid flexDirection="column" alignContent="flex-start" textAlign="left">
              <Grid textAlign="left" className={s.name}>
                <span>{name}</span>
              </Grid>
              {coordinatesChild}
            </Grid>
          )}
        </>
      </Grid>
    </Grid>
  );
};

export default SelectedListCard;
