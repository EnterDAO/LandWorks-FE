import { FC } from 'react';
import { Box, Typography } from '@mui/material';

import { heroCarouselStyles } from './hero-carousel-styles';

import { THEME_COLORS } from '../../themes/theme-constants';

type HeroCarouselControlProps = {
  index: number;
  name: string;
  image: string;
  progressLines: JSX.Element;
  onClick(): void;
};

const HeroCarouselControl: FC<HeroCarouselControlProps> = ({ index, name, image, progressLines, onClick }) => {
  return (
    <Box
      key={index}
      data-control-index={index}
      sx={heroCarouselStyles.control}
      component="div"
      role="button"
      onClick={onClick}
    >
      <Box
        sx={[
          heroCarouselStyles.controlImage,
          heroCarouselStyles.backgroundImage,
          { backgroundImage: `url('${image}')` },
        ]}
        mr={3}
      />
      <Typography variant="subtitle1" component="span" color={THEME_COLORS.light} sx={heroCarouselStyles.controlText}>
        {name}
      </Typography>
      {progressLines}
    </Box>
  );
};

export default HeroCarouselControl;
