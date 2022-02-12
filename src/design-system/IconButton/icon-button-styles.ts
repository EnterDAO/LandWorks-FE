import { BEFORE_ELEMENT_BASE, OVERLAY_MEDIUM, OVERLAY_SMALL } from '../../themes/utility-styles';

import { THEME_COLORS } from '../../themes/theme-constants';

export default {
  position: 'relative',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0',
  border: 'none',
  cursor: 'pointer',
  flexShrink: 0,
  '&.rectangular': {
    borderRadius: '10px',
    '&.large': {
      width: '60px',
      height: '60px',
    },
    '&.medium': {
      width: '52px',
      height: '52px',
    },
    '&.small': {
      borderRadius: '8px',
      width: '36px',
      height: '36px',
    },
  },
  '&.circular': {
    borderRadius: '50%',
    '&.large': {
      width: '28px',
      height: '28px',
    },
    '&.medium': {
      width: '24px',
      height: '24px',
    },
    '&.small': {
      width: '20px',
      height: '20px',
    },
    '&:not(:disabled)&:focus-visible&::after': {
      ...BEFORE_ELEMENT_BASE,
      top: '-5px',
      left: '-5px',
      borderRadius: 'inherit',
      padding: '2px',
      border: `3px solid ${THEME_COLORS.accentBlue}`,
    },
    '&:not(:disabled)&.outline-grey&:focus-visible&::after': {
      borderColor: THEME_COLORS.grey02,
    },
    '&:not(:disabled)&.outline-darkblue&:focus-visible&::after': {
      borderColor: THEME_COLORS.darkBlue01,
    },
    '&:not(:disabled)&.outline-rectangular&:focus-visible&::after': {
      borderRadius: '5px',
    },
  },
  '&:focus': {
    outline: 'none',
  },
  '&:disabled': {
    cursor: 'not-allowed',
  },
  '&.color-grey': {
    color: THEME_COLORS.light,
    background: THEME_COLORS.grey01,
    '&:not(:disabled)&:hover&::before': {
      ...OVERLAY_SMALL,
      borderRadius: 'inherit',
      background: THEME_COLORS.light,
    },
    '&.rectangular&:not(:disabled)&:focus-visible&::before': {
      ...OVERLAY_SMALL,
      borderRadius: 'inherit',
      background: THEME_COLORS.light,
    },
    '&:not(:disabled)&:active&::before': {
      ...OVERLAY_MEDIUM,
      borderRadius: 'inherit',
      background: THEME_COLORS.light,
    },
    '&:disabled': {
      color: THEME_COLORS.grey02,
      '&::before': {
        ...OVERLAY_SMALL,
        borderRadius: 'inherit',
        background: THEME_COLORS.light,
      },
    },
  },
  '&.color-light': {
    color: THEME_COLORS.grey01,
    background: THEME_COLORS.light,
    '&:not(:disabled)&:hover&::before': {
      ...OVERLAY_SMALL,
      borderRadius: 'inherit',
      background: THEME_COLORS.darkBlue01,
    },
    '&.rectangular&:not(:disabled)&:focus-visible&::before': {
      ...OVERLAY_SMALL,
      borderRadius: 'inherit',
      background: THEME_COLORS.darkBlue01,
    },
    '&:not(:disabled)&:active&::before': {
      ...OVERLAY_MEDIUM,
      borderRadius: 'inherit',
      background: THEME_COLORS.darkBlue01,
    },
    '&:disabled': {
      color: THEME_COLORS.grey02,
      background: THEME_COLORS.darkBlue02,
      '&::before': {
        ...OVERLAY_SMALL,
        borderRadius: 'inherit',
        background: THEME_COLORS.light,
      },
    },
  },
  '&.color-darkblue': {
    color: THEME_COLORS.light,
    background: THEME_COLORS.darkBlue02,
    '&:not(:disabled)&:hover&::before': {
      ...OVERLAY_SMALL,
      borderRadius: 'inherit',
      background: THEME_COLORS.light,
    },
    '&.rectangular&:not(:disabled)&:focus-visible&::before': {
      ...OVERLAY_SMALL,
      borderRadius: 'inherit',
      background: THEME_COLORS.light,
    },
    '&:not(:disabled)&:active&::before': {
      ...OVERLAY_MEDIUM,
      borderRadius: 'inherit',
      background: THEME_COLORS.light,
    },
    '&:disabled': {
      color: THEME_COLORS.grey02,
      '&::before': {
        ...OVERLAY_SMALL,
        borderRadius: 'inherit',
        background: THEME_COLORS.light,
      },
    },
  },
  '&.color-accentblue': {
    color: THEME_COLORS.light,
    background: THEME_COLORS.accentBlue,
    '&:not(:disabled)&:hover&::before': {
      ...OVERLAY_SMALL,
      borderRadius: 'inherit',
      background: THEME_COLORS.light,
    },
    '&.rectangular&:not(:disabled)&:focus-visible&::before': {
      ...OVERLAY_SMALL,
      borderRadius: 'inherit',
      background: THEME_COLORS.light,
    },
    '&:not(:disabled)&:active&::before': {
      ...OVERLAY_MEDIUM,
      borderRadius: 'inherit',
      background: THEME_COLORS.light,
    },
    '&:disabled': {
      color: THEME_COLORS.grey02,
      background: THEME_COLORS.darkBlue02,
      '&::before': {
        ...OVERLAY_SMALL,
        borderRadius: 'inherit',
        background: THEME_COLORS.light,
      },
    },
  },
  '&.color-lightOpacity': {
    color: THEME_COLORS.light,
    background: 'transparent',
    '&::before': {
      ...BEFORE_ELEMENT_BASE,
      borderRadius: 'inherit',
      background: THEME_COLORS.light,
      opacity: 0.2,
    },
    '&:not(:disabled)&:hover&::before': {
      opacity: 0.3,
    },
    '&.rectangular&:not(:disabled)&:focus-visible&::before': {
      opacity: 0.3,
    },
    '&:not(:disabled)&:active&::before': {
      opacity: 0.4,
    },
    '&:disabled': {
      color: THEME_COLORS.grey02,
      background: THEME_COLORS.darkBlue02,
      '&::before': {
        ...OVERLAY_SMALL,
        borderRadius: 'inherit',
        background: THEME_COLORS.light,
      },
    },
  },
  '&.color-transparent': {
    color: THEME_COLORS.light,
    background: 'transparent',
    '&:not(:disabled)&:hover': {
      opacity: 0.9,
    },
    '&.rectangular&:not(:disabled)&:focus-visible': {
      opacity: 0.9,
    },
    '&:not(:disabled)&:active': {
      opacity: 0.8,
    },
    '&:disabled': {
      color: THEME_COLORS.grey02,
    },
  },
} as const;
