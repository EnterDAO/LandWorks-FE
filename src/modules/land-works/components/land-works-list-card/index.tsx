import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Col, Image, Row } from 'antd';

import { Box, Grid } from 'design-system';
import { getLandImageUrl } from 'helpers/helpers';
import { AssetOption } from 'modules/interface';

import { AssetEntity } from '../../api';
import landImage from './assets/land.png';

import s from './s.module.scss';

interface ILandWorksCardProps {
  land: AssetOption;
  handleClick: () => void;
  coords: any[];
}

const LandWorksListCard: React.FC<ILandWorksCardProps> = ({ land, handleClick, coords }) => {
  const history = useHistory();
  return (
    <Grid className={s.wrapper} item>
      <Grid className={s.card} onClick={handleClick}>
        <Grid className={s.imageListWrapper}>
          <Image
            placeholder={<Image className={s.image} src={landImage} preview={false} />}
            className={s.image}
            src={getLandImageUrl(land.land)}
            preview={false}
          />
          {/* <Box
            component="img"
            sx={{
              height: 233,
              width: 350,
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 },
            }}
            className={s.image}
            alt="The house from the offer."
            placeholder={<Image className={s.image} src={landImage} preview={false} />}
            src={getLandImageUrl(land)}
          /> */}
        </Grid>
        <Grid>
          <Grid className={s.name}>
            <span>{land.name.toLowerCase()}</span>
          </Grid>
          <Grid className={s.details}>
            <span>X:{land.coords[0]} Y:{land.coords[1]}</span>
          </Grid>
          <Grid className={s.details}>
            <span>Parcel: {land.coords[0]}:{land.coords[1]}</span>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LandWorksListCard;
