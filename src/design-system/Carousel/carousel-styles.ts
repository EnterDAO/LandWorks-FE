import { THEME_COLORS } from '../../themes/theme-constants';

const carouselStyles = {
  carouselContainer: {
    position: 'relative',
    color: THEME_COLORS.light,
  },
  carouselContainerWithArrows: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  carouselSlidesWrapper: {
    margin: '-10px',
    padding: '10px 0px',
    flex: 1,
    overflow: 'hidden',
  },
  carouselContent: {
    display: 'flex',
    transition: 'transform 0.6s ease-in-out',
  },
  carouselItem: {
    display: 'inline-flex',
    justifyContent: 'center',
    flexGrow: 0,
    flexShrink: 0,
    padding: '0px 10px',
  },
  carouselItemSmallGutter: {
    padding: '0px 5px',
  },
} as const;

export { carouselStyles };
