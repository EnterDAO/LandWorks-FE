import React from 'react';
import { Image } from 'antd';

import { Grid } from 'design-system';
import { getLandImageUrl } from 'helpers/helpers';
import { AssetOption } from 'modules/interface';

import landImage from './assets/land.png';

import s from './s.module.scss';

interface ILandWorksCardProps {
  land: AssetOption;
  handleClick: () => void;
}

const LandWorksListCard: React.FC<ILandWorksCardProps> = ({ land, handleClick }) => {
  return (
    <Grid className={s.wrapper} item>
      <Grid className={s.card} onClick={handleClick}>
        <Grid className={s.imageListWrapper}>
          {/* Replace with MUI version */}
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
        <Grid flexDirection="column" alignContent="flex-start" textAlign='left'>
          <Grid textAlign='left' className={s.name}>
            <span>{land.name.toLowerCase()}</span>
          </Grid>
          <Grid textAlign='left' className={s.details}>
            <span>
              X:{land.coords[0]} Y:{land.coords[1]}
            </span>
          </Grid>
          <Grid textAlign='left' className={s.details}>
            <span>
              Parcel: {land.coords[0]}:{land.coords[1]}
            </span>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LandWorksListCard;
