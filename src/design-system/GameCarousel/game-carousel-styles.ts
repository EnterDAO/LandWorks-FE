import { BEFORE_ELEMENT_BASE } from 'themes/utility-styles';

import { THEME_COLORS } from 'themes/theme-constants';

const gameCarouselStyles = {
  carouselContainer: {
    position: 'relative',
    flex: 1,
  },
  carouselItem: {
    width: '100%',
    height: '360px',
    borderRadius: '20px',
  },
  carouselControl: {
    position: 'relative',
    width: '100%',
    height: '70px',
    padding: '0px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    '&::before': {
      ...BEFORE_ELEMENT_BASE,
      borderRadius: 'inherit',
      background: THEME_COLORS.darkBlue01,
      opacity: 0.4,
      transition: 'opacity 200ms ease-in-out 0s',
    },
    '&:hover::before': {
      opacity: 0,
    },
    '&.active': {
      boxShadow: `0 0 0 2px ${THEME_COLORS.light} inset`,
    },
    '&.active::after': {
      ...BEFORE_ELEMENT_BASE,
      borderRadius: 'inherit',
      boxShadow: `0 0 0 2px ${THEME_COLORS.light} inset`,
      filter: 'blur(4px)',
      boxSizing: 'border-box',
      zIndex: -1,
    },
    '&.active::before': {
      opacity: 0,
    },
  },
  backgroundCenter: {
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
} as const;

export { gameCarouselStyles };
