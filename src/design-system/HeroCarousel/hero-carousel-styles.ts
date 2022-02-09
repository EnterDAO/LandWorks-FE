import { BEFORE_ELEMENT_BASE } from '../../themes/utility-styles';

import { THEME_COLORS } from '../../themes/theme-constants';

const heroCarouselStyles = {
  heroCarouselContainer: {
    position: 'relative',
    display: 'flex',
    height: '483px',
  },
  itemsContainer: {
    position: 'relative',
    flex: '1',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: '30px',
  },
  item: {
    visibility: 'hidden',
    position: 'absolute',
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    opacity: 0,
    padding: '40px',
    cursor: 'pointer',
    '&::before': {
      ...BEFORE_ELEMENT_BASE,
      background:
        'linear-gradient(360deg, rgba(0, 0, 0, 0.75) 2.28%, rgba(0, 0, 0, 0.306335) 48.49%, rgba(0, 0, 0, 0) 70.69%)',
      zIndex: -1,
    },
    '&.show': {
      zIndex: 1,
      animation: '200ms cubic-bezier(0.17, 0.17, 0.23, 1) 200ms 1 normal forwards running show-slide',
      visibility: 'visible',
    },
    '&.hide': {
      animation: '300ms cubic-bezier(0.69, 0, 0.83, 0.83) 0s 1 normal forwards running hide-slide',
    },
    '&.first-load': {
      zIndex: 1,
      opacity: 1,
      visibility: 'visible',
      animation: 'none',
    },
  },
  itemText: {
    maxWidth: '365px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: '4',
    WebkitBoxOrient: 'vertical',
  },
  itemActionsWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  backgroundImage: {
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  controlsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexGrow: 0,
    flexShrink: 1,
    width: '227px',
  },
  control: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    height: '20%',
    padding: '15px',
    borderRadius: '15px',
    cursor: 'pointer',
    transition: 'background-color 200ms cubic-bezier(0.17, 0.17, 0.23, 1.00)',
    overflow: 'hidden',
    '&:not(:first-of-type)': {
      marginTop: '3px',
    },
    '&:hover': {
      background: THEME_COLORS.darkBlue02,
    },
    '&.control-active': {
      background: THEME_COLORS.darkBlue02,
      'div::before': {
        opacity: 0,
      },
      '&::before': {
        content: '""',
        position: 'absolute',
        top: '2px',
        left: '2px',
        width: 'calc(100% - 4px)',
        height: 'calc(100% - 4px)',
        background: THEME_COLORS.darkBlue02,
        borderRadius: '13px',
        zIndex: 1,
      },
      '.progress-line': {
        content: '""',
        position: 'absolute',
        backgroundColor: THEME_COLORS.light,
        zIndex: 0,
      },
      '.progress-line-1': {
        top: 0,
        left: '50%',
        width: '50%',
        height: 'calc(100% - 2px)',
        animation: 'progress-line1 2333ms linear',
      },
      '.progress-line-2': {
        bottom: 0,
        right: '7px',
        width: 0,
        height: '2px',
        animation: 'progress-line2 1166ms linear',
        animationDelay: '2333ms',
        animationFillMode: 'forwards',
      },
      '.progress-line-3': {
        bottom: 0,
        right: '50%',
        width: 0,
        height: '2px',
        animation: 'progress-line3 2333ms linear',
        animationDelay: '3499ms',
        animationFillMode: 'forwards',
      },
      '.progress-line-4': {
        top: 0,
        left: '7px',
        width: 0,
        height: '2px',
        animation: 'progress-line4 1126ms linear',
        animationDelay: '5832ms',
        animationFillMode: 'forwards',
      },
    },
  },
  controlImage: {
    position: 'relative',
    width: '60px',
    height: '100%',
    borderRadius: '5px',
    flexShrink: 0,
    zIndex: 1,
    '&::before': {
      ...BEFORE_ELEMENT_BASE,
      background: THEME_COLORS.darkBlue01,
      opacity: 0.4,
      borderRadius: 'inherit',
    },
  },
  controlText: {
    position: 'relative',
    display: '-webkit-box',
    overflow: 'hidden',
    wordBreak: 'break-word',
    WebkitLineClamp: '2',
    WebkitBoxOrient: 'vertical',
    zIndex: 1,
  },
} as const;

// TODO Fix class, id, animation and etc. cannot load from App.global.css
const animationsCss = `
@keyframes hide-slide {
  0% {
    transform: translateX(0);
    opacity: 1;
    visibility: visible;
  }
  25% {
    opacity: 1;
    visibility: visible;
  }
  100% {
    transform: translateX(-100px);
    opacity: 0;
    visibility: hidden;
  }
}

@keyframes show-slide {
  0% {
    transform: translateX(100px);
    opacity: 0;
  }
  75% {
    opacity: 1;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes progress-line1 {
  0% {
    width: 0%;
    height: 2px;
  }

  50% {
    width: 50%;
    height: 2px;
  }

  100% {
    height: calc(100% - 2px);
  }
}

@keyframes progress-line2 {
  0% {
    width: 0%;
  }

  100% {
    width: calc(50% - 7px);
  }
}

@keyframes progress-line3 {
  0% {
    width: 0%;
    height: 2px;
  }

  50% {
    width: 50%;
    height: 2px;
  }

  100% {
    width: 50%;
    height: calc(100% - 2px);
  }
}

@keyframes progress-line4 {
  0% {
    width: 0%;
  }

  100% {
    width: calc(50% - 7px);
  }
}
`;

export { heroCarouselStyles, animationsCss };
