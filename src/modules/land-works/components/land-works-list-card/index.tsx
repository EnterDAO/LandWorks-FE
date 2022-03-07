import React, { useState } from 'react';

import { Box, Grid } from 'design-system';
import { getDecentralandNftImageUrl } from 'helpers/helpers';
import { DecentralandNFT } from 'modules/interface';

import s from './s.module.scss';

interface ILandWorksCardProps {
  land: DecentralandNFT;
  handleClick: (option: DecentralandNFT) => void;
  isSelectedProperty: boolean;
}

const LandWorksListCard: React.FC<ILandWorksCardProps> = ({ land, handleClick, isSelectedProperty }) => {
  const [selected, setSelected] = useState(false);

  return (
    <Grid className={s.wrapper} item>
      <Grid
        className={`${isSelectedProperty ? s.selected : s.card}`}
        onClick={() => {
          setSelected(!selected);
          handleClick(land);
        }}
      >
        <Grid className={s.imageListWrapper}>
          <Box
            component="img"
            sx={{
              minHeight: 100,
              width: '100%',
              maxHeight: { xs: 110, md: 90 },
              maxWidth: { xs: 350, md: 250 },
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
            <span>
              X: {land.coords[0]} Y: {land.coords[1]}
            </span>
          </Grid>
          <Grid textAlign="left" className={s.details}>
            <span>
              Parcel {land.coords[0]}:{land.coords[1]}
            </span>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LandWorksListCard;
