import React, { useEffect, useMemo, useRef } from 'react';
import { Box, SxProps } from '@mui/material';

import Carousel from '../Carousel/Carousel';
import { gameCarouselStyles } from './game-carousel-styles';

type GameCarouselProps = {
  slides: string[];
  sx?: SxProps;
};

const GameCarousel = ({ slides, sx }: GameCarouselProps) => {
  const itemsCarouselRef = useRef<{ slideChange: (index: number) => void }>(null);
  const controlsCarouselRef = useRef<{ carouselContentRef: React.RefObject<HTMLDivElement> }>(null);

  useEffect(() => {
    if (controlsCarouselRef.current && controlsCarouselRef.current.carouselContentRef.current) {
      controlsCarouselRef.current.carouselContentRef.current
        .querySelector('[data-control-index="0"]')
        ?.classList.add('active');
    }
  }, []);

  const handleClick = (index: number) => {
    if (itemsCarouselRef.current && controlsCarouselRef.current) {
      const contentRefCurrent = controlsCarouselRef.current.carouselContentRef.current;

      if (contentRefCurrent) {
        const currentActive = contentRefCurrent.querySelector('.active');
        const next = contentRefCurrent.querySelector(`[data-control-index="${index}"]`);

        itemsCarouselRef.current.slideChange(index);
        currentActive?.classList.remove('active');
        next?.classList.add('active');
      }
    }
  };

  const slidesMemo = useMemo(() => {
    const items: JSX.Element[] = [];
    const controls: JSX.Element[] = [];

    for (let index = 0; index < slides.length; index += 1) {
      const slide = slides[index];

      items.push(
        <Box
          key={index}
          sx={[
            gameCarouselStyles.carouselItem,
            gameCarouselStyles.backgroundCenter,
            { backgroundImage: `url('${slide}')` },
          ]}
        />
      );

      controls.push(
        <Box
          key={index}
          sx={[
            gameCarouselStyles.carouselControl,
            gameCarouselStyles.backgroundCenter,
            { backgroundImage: `url('${slide}')` },
          ]}
          data-control-index={index}
          component="button"
          onClick={() => handleClick(index)}
        />
      );
    }

    return {
      items,
      controls,
    };
  }, [slides]);

  return (
    <Box sx={{ ...gameCarouselStyles.carouselContainer, ...sx }}>
      <Carousel
        ref={itemsCarouselRef}
        items={slidesMemo.items}
        itemsToShow={1}
        hideArrows
        sx={{
          mb: 4,
        }}
      />
      <Carousel ref={controlsCarouselRef} items={slidesMemo.controls} smallGutter />
    </Box>
  );
};

export default GameCarousel;
