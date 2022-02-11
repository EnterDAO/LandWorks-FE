import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';

import { heroCarouselStyles } from './hero-carousel-styles';

import { THEME_COLORS } from '../../themes/theme-constants';

type HeroCarouselItemProps = {
  index: number;
  description: string;
  image: string;
  actionElement?: JSX.Element;
  onClick(): void;
};

const HeroCarouselItem: FC<HeroCarouselItemProps> = ({
  index,
  description,
  image,
  actionElement,
  onClick,
}: HeroCarouselItemProps) => {
  return (
    <Box
      data-slide-index={index}
      sx={[heroCarouselStyles.item, heroCarouselStyles.backgroundImage, { backgroundImage: `url('${image}')` }]}
      component="div"
      role="button"
      onClick={onClick}
    >
      <Typography variant="subtitle1" component="span" color={THEME_COLORS.light} sx={heroCarouselStyles.itemText}>
        {description}
      </Typography>
      {actionElement && (
        <Box sx={heroCarouselStyles.itemActionsWrapper} mt={6}>
          {actionElement}
        </Box>
      )}
    </Box>
  );
};

export default HeroCarouselItem;
