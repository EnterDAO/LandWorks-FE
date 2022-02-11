import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Box, SxProps, Typography } from '@mui/material';
import debounce from 'lodash.debounce';

import IconButton from '../IconButton/IconButton';
import { ArrowLeftIcon, ArrowRightIcon } from '../icons';
import { carouselStyles } from './carousel-styles';

type CarouselProps = {
  heading?: string;
  actionElement?: JSX.Element;
  items: JSX.Element[];
  itemsToShow?: number;
  smallGutter?: boolean;
  hideArrows?: boolean;
  sx?: SxProps;
};

const DEFAULT_ITEMS_TO_SHOW = 5;

const Carousel = forwardRef((props: CarouselProps, ref) => {
  const carouselContentRef = useRef<HTMLDivElement>(null);

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [sliderOffset, setSliderOffset] = useState(0);

  const { heading, actionElement, items, itemsToShow, smallGutter, hideArrows, sx } = props;

  const currentItemsToShow = itemsToShow || DEFAULT_ITEMS_TO_SHOW;
  const totalSlides = Math.ceil(items.length / currentItemsToShow);
  const slideItemPercentWidth = 100 / currentItemsToShow;

  const onSlideChange = useCallback(
    (index: number, currentTotalSlides: number) => {
      if (carouselContentRef.current) {
        const slideFirstItem = carouselContentRef.current.children[0];

        if (slideFirstItem) {
          const slideItemPixelWidth = slideFirstItem.getBoundingClientRect().width;
          let currentSliderOffset = index * currentItemsToShow * slideItemPixelWidth;

          if (index === currentTotalSlides - 1 && slideItemPercentWidth < 100) {
            const totalItems = items.length;
            const totalItemsToFillSlide = currentItemsToShow * (index + 1);
            const itemsMissFillLastSlide = totalItemsToFillSlide - totalItems;
            currentSliderOffset -= itemsMissFillLastSlide * slideItemPixelWidth;
          }

          setActiveSlideIndex(index);
          setSliderOffset(currentSliderOffset);
        }
      }
    },
    [currentItemsToShow, items.length, slideItemPercentWidth]
  );

  const onArrowClick = useCallback(
    (direction: 'back' | 'forward') => {
      const currentIndex = direction === 'back' ? activeSlideIndex - 1 : activeSlideIndex + 1;
      if (currentIndex < totalSlides && currentIndex >= 0) {
        onSlideChange(currentIndex, totalSlides);
      }
    },
    [onSlideChange, activeSlideIndex, totalSlides]
  );

  const onResizeSlider = debounce(() => {
    if (totalSlides > 1) onSlideChange(activeSlideIndex, totalSlides);
  }, 300);

  useEffect(() => {
    window.addEventListener('resize', onResizeSlider);

    return () => {
      window.removeEventListener('resize', onResizeSlider);
    };
  });

  useImperativeHandle(ref, () => ({
    slideChange: (index: number) => {
      onSlideChange(index, totalSlides);
    },
    carouselContentRef,
  }));

  const headingMemo = useMemo(
    () => (
      <Box display="flex" alignItems="center">
        <Typography variant="h2" mr={4}>
          {heading}
        </Typography>
        {actionElement}
      </Box>
    ),
    [heading, actionElement]
  );

  const carouselItemsMemo = useMemo(
    () =>
      items.map((item, index) => {
        return (
          <Box
            key={`item-${1 * index}`}
            sx={{
              ...carouselStyles.carouselItem,
              width: `${slideItemPercentWidth}%`,
              ...{ ...(smallGutter && carouselStyles.carouselItemSmallGutter) },
            }}
          >
            {item}
          </Box>
        );
      }),
    [items, slideItemPercentWidth, smallGutter]
  );

  const backArrowMemo = useMemo(
    () => (
      <IconButton
        mr={!heading && !hideArrows ? 4 : 2}
        variant="circular"
        btnSize="large"
        icon={<ArrowLeftIcon />}
        colorVariant="grey"
        disabled={activeSlideIndex === 0}
        onClick={() => {
          onArrowClick('back');
        }}
      />
    ),
    [activeSlideIndex, onArrowClick, heading, hideArrows]
  );

  const forwardArrowMemo = useMemo(
    () => (
      <IconButton
        ml={!heading && !hideArrows ? 4 : 0}
        variant="circular"
        btnSize="large"
        icon={<ArrowRightIcon />}
        colorVariant="grey"
        disabled={activeSlideIndex === totalSlides - 1}
        onClick={() => {
          onArrowClick('forward');
        }}
      />
    ),
    [activeSlideIndex, totalSlides, onArrowClick, heading, hideArrows]
  );

  return (
    <Box
      sx={{
        ...carouselStyles.carouselContainer,
        ...{ ...(!heading && !hideArrows && carouselStyles.carouselContainerWithArrows) },
        ...sx,
      }}
    >
      {heading && (
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={6}>
          {headingMemo}
          {totalSlides > 1 && (
            <Box>
              {backArrowMemo}
              {forwardArrowMemo}
            </Box>
          )}
        </Box>
      )}
      {!heading && !hideArrows && backArrowMemo}
      <Box sx={carouselStyles.carouselSlidesWrapper}>
        <Box
          ref={carouselContentRef}
          sx={{
            ...carouselStyles.carouselContent,
            transform: `translateX(-${sliderOffset}px)`,
          }}
        >
          {carouselItemsMemo}
        </Box>
      </Box>
      {!heading && !hideArrows && forwardArrowMemo}
    </Box>
  );
});

export default Carousel;
