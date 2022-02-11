import { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import { Box, SxProps } from '@mui/material';

import { animationsCss, heroCarouselStyles } from './hero-carousel-styles';
import HeroCarouselControl from './HeroCarouselControl';
import HeroCarouselItem from './HeroCarouselItem';

type HeroCarouselProps = {
  slides: {
    name: string;
    description: string;
    image: string;
    actionElement?: JSX.Element;
    onClick(): void;
  }[];
  sx?: SxProps;
};

let timerTimeout: NodeJS.Timer | null = null;

const HeroCarousel: FC<HeroCarouselProps> = ({ slides, sx }) => {
  const heroCarouselContainerRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (heroCarouselContainerRef.current) {
      const firstSlide = heroCarouselContainerRef.current.querySelector('[data-slide-index="0"]');
      const firstControl = heroCarouselContainerRef.current.querySelector('[data-control-index="0"]');

      firstSlide?.classList.add('first-load');
      firstSlide?.classList.add('show');
      firstControl?.classList.add('control-active');
    }

    return () => {
      if (timerTimeout !== null) {
        clearInterval(timerTimeout);
      }
    };
  }, []);

  const changeSlide = useCallback(
    (nextIndex: number, callback: () => void) => {
      if (heroCarouselContainerRef.current) {
        const prevHidden = heroCarouselContainerRef.current.querySelector('.hide');
        prevHidden?.classList.remove('hide');

        const currentSlide = heroCarouselContainerRef.current.querySelector('.show');
        const currentIndex = currentSlide?.getAttribute('data-slide-index');

        if (currentIndex && +currentIndex === nextIndex) {
          slides[+currentIndex].onClick();
          return;
        }

        const firstLoad = heroCarouselContainerRef.current.querySelector('.first-load');
        firstLoad?.classList.remove('first-load');

        if (currentSlide) {
          currentSlide.classList.remove('show');
          currentSlide.classList.add('hide');
        }

        const currentControl = heroCarouselContainerRef.current.querySelector('.control-active');
        currentControl?.classList.remove('control-active');

        const nextSlide = heroCarouselContainerRef.current.querySelector(`[data-slide-index="${nextIndex}"]`);
        const nextControl = heroCarouselContainerRef.current.querySelector(`[data-control-index="${nextIndex}"]`);

        nextSlide?.classList.add('show');
        nextControl?.classList.add('control-active');

        if (timerTimeout !== null) {
          clearInterval(timerTimeout);
          timerTimeout = setInterval(callback, 7000);
        }
      }
    },
    [slides]
  );

  const changeToNextSlide = useCallback(() => {
    if (heroCarouselContainerRef.current) {
      const currentSlide = heroCarouselContainerRef.current.querySelector('.show');
      const currentIndex = currentSlide?.getAttribute('data-slide-index');

      if (currentIndex) {
        let nextIndex = +currentIndex + 1;

        if (nextIndex > slides.length - 1) {
          nextIndex = 0;
        }

        changeSlide(nextIndex, changeToNextSlide);
      }
    }
  }, [changeSlide, slides.length]);

  useEffect(() => {
    timerTimeout = setInterval(changeToNextSlide, 7000);

    return () => {
      if (timerTimeout !== null) {
        clearInterval(timerTimeout);
      }
    };
  }, [changeToNextSlide]);

  const handleItemClick = useCallback(
    (index: number) => {
      slides[index].onClick();
    },
    [slides]
  );

  const handleControlClick = useCallback(
    (index: number) => {
      changeSlide(index, changeToNextSlide);
    },
    [changeSlide, changeToNextSlide]
  );

  const progressLinesMemo = useMemo(
    () => (
      <>
        <Box component="span" className="progress-line progress-line-1" />
        <Box component="span" className="progress-line progress-line-2" />
        <Box component="span" className="progress-line progress-line-3" />
        <Box component="span" className="progress-line progress-line-4" />
      </>
    ),
    []
  );

  const slidesMemo = useMemo(() => {
    const items: JSX.Element[] = [];
    const controls: JSX.Element[] = [];

    const count = slides.length > 5 ? 5 : slides.length;

    for (let index = 0; index < count; index += 1) {
      const slide = slides[index];

      items.push(
        <HeroCarouselItem
          key={index}
          index={index}
          description={slide.description}
          image={slide.image}
          actionElement={slide.actionElement}
          onClick={() => handleItemClick(index)}
        />
      );

      controls.push(
        <HeroCarouselControl
          key={index}
          index={index}
          name={slide.name}
          image={slide.image}
          onClick={() => handleControlClick(index)}
          progressLines={progressLinesMemo}
        />
      );
    }

    return {
      items,
      controls,
    };
  }, [slides, handleItemClick, handleControlClick, progressLinesMemo]);

  return (
    <Box sx={{ ...heroCarouselStyles.heroCarouselContainer, ...sx }} ref={heroCarouselContainerRef}>
      <style>{animationsCss}</style>
      <Box sx={heroCarouselStyles.itemsContainer}>{slidesMemo.items}</Box>
      <Box ml={6} sx={heroCarouselStyles.controlsContainer}>
        {slidesMemo.controls}
      </Box>
    </Box>
  );
};

export default HeroCarousel;
