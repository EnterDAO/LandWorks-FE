import { BEFORE_ELEMENT_BASE, OVERLAY_MEDIUM } from '../../themes/utility-styles';

import { THEME_COLORS } from '../../themes/theme-constants';

const cardStyles = {
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'baseline',
    width: '100%',
    '&:hover': {
      '.card-image-box::before': {
        ...OVERLAY_MEDIUM,
        background: THEME_COLORS.light,
        borderRadius: '15px',
      },
      '.card-hover-action-container': {
        display: 'flex',
      },
    },
    overflow: 'hidden',
  },
  cardContainerRow: {
    flexDirection: 'row',
  },
  imageBox: {
    position: 'relative',
    marginBottom: 3,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    boxShadow: `0 0 0 3px ${THEME_COLORS.light} inset`,
    borderRadius: '15px',
    border: 'unset',
    outline: 'none',
    cursor: 'pointer',
    '&:focus::before': {
      ...OVERLAY_MEDIUM,
      background: THEME_COLORS.light,
      borderRadius: '15px',
    },
    '&::after': {
      ...BEFORE_ELEMENT_BASE,
      boxShadow: `0 0 0 3px ${THEME_COLORS.light} inset`,
      borderRadius: '15px',
      filter: 'blur(5px)',
      boxSizing: 'border-box',
      zIndex: -1,
    },
  },
  sizeLarge: {
    height: '315px',
  },
  sizeMedium: {
    height: '150px',
  },
  sizeSmall: {
    height: '109px',
    width: '90px',
    marginBottom: 0,
    marginRight: 3,
    flexShrink: 0,
  },
  dateLabel: {
    position: 'absolute',
    padding: '10px 16px',
    top: '15px',
    left: '0px',
    background: THEME_COLORS.light,
    borderRadius: '0px 20px 20px 0px',
    boxShadow: '0px 3px 20px rgba(63, 63, 63, 0.6)',
  },
  dateLabelNow: {
    left: '15px',
    borderRadius: '20px',
  },
  dataLabelNowDot: {
    width: '8px',
    height: '8px',
    background: THEME_COLORS.red,
    borderRadius: '50%',
  },
  hoverActionContainer: {
    display: 'none',
    position: 'absolute',
    top: '15px',
    right: '15px',
  },
} as const;

const cardTextsBoxStyles = {
  textsBoxSmall: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'baseline',
    minWidth: '0px',
  },
  textUppercase: {
    textTransform: 'uppercase',
  },
  description: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: '2',
    WebkitBoxOrient: 'vertical',
  },
} as const;

export { cardStyles, cardTextsBoxStyles };
