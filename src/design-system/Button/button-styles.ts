import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/material/styles';

import { BEFORE_ELEMENT_BASE, OVERLAY_MEDIUM, OVERLAY_SMALL } from 'themes/utility-styles';

import { THEME_COLORS, THEME_FONT_FAMILY } from '../../themes/theme-constants';

const lightOverlayStates = {
  [`&:not(.${buttonUnstyledClasses.disabled})&:hover&::before`]: {
    ...OVERLAY_SMALL,
    borderRadius: '12px', // TODO: Move radiuses to constants
    background: THEME_COLORS.light,
  },
  [`&:not(.${buttonUnstyledClasses.disabled})&:focus-visible&::before`]: {
    ...OVERLAY_SMALL,
    borderRadius: '12px', // TODO: Move radiuses to constants
    background: THEME_COLORS.light,
  },
  [`&:not(.${buttonUnstyledClasses.disabled})&:active&::before`]: {
    ...OVERLAY_MEDIUM,
    borderRadius: '12px', // TODO: Move radiuses to constants
    background: THEME_COLORS.light,
  },
};

const darkOverlayStates = {
  [`&:not(.${buttonUnstyledClasses.disabled})&:hover&::before`]: {
    ...OVERLAY_SMALL,
    borderRadius: '12px', // TODO: Move radiuses to constants
    background: THEME_COLORS.darkBlue01,
  },
  [`&:not(.${buttonUnstyledClasses.disabled})&:focus-visible&::before`]: {
    ...OVERLAY_SMALL,
    borderRadius: '12px', // TODO: Move radiuses to constants
    background: THEME_COLORS.darkBlue01,
  },
  [`&:not(.${buttonUnstyledClasses.disabled})&:active&::before`]: {
    ...OVERLAY_MEDIUM,
    borderRadius: '12px', // TODO: Move radiuses to constants
    background: THEME_COLORS.darkBlue01,
  },
};

export default styled('button')({
  position: 'relative',
  fontFamily: THEME_FONT_FAMILY,
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '21px',
  letterSpacing: '0.02em',
  textAlign: 'center' as const,
  textTransform: 'uppercase',
  padding: '0 24px',
  border: 'none',
  borderRadius: '12px', // TODO: Move radiuses to constants
  color: THEME_COLORS.light,
  cursor: 'pointer',
  '&.large': {
    width: '300px',
    height: '52px',
  },
  '&.medium': {
    width: '200px',
    height: '52px',
  },
  '&.small': {
    width: '150px',
    height: '42px',
  },
  '&.xsmall': {
    width: '100px',
    height: '34px',
    padding: '0 8px',
  },
  '&.tertiary': {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0',
    background: 'unset',
    borderRadius: 'unset',
    '&:hover::before': {
      ...BEFORE_ELEMENT_BASE,
      top: 'unset',
      bottom: 0,
      height: '2px',
      background: THEME_COLORS.light,
    },
    '&:focus-visible::after': {
      content: '" "',
      position: 'absolute',
      top: '-5px',
      left: '-6px',
      width: 'calc(100% + 7px)',
      height: 'calc(100% + 4px)',
      border: `3px solid ${THEME_COLORS.grey02}`,
      borderRadius: '5px',
    },
    '&.tertiary-small': {
      fontSize: '12px',
      lineHeight: '18px',
      textTransform: 'unset',
    },
  },
  '&:focus': {
    outline: 'none',
  },
  '&.gradient': {
    background: THEME_COLORS.primaryGradient,
    ...lightOverlayStates,
  },
  '&.primary': {
    background: THEME_COLORS.light,
    color: THEME_COLORS.darkBlue01,
    ...darkOverlayStates,
  },
  '&.secondary': {
    background: THEME_COLORS.grey01,
    ...lightOverlayStates,
  },
  '&.accentblue': {
    background: THEME_COLORS.accentBlue,
    ...lightOverlayStates,
  },
  [`&.${buttonUnstyledClasses.disabled}`]: {
    background: THEME_COLORS.grey01,
    color: THEME_COLORS.grey02,
    cursor: 'not-allowed',
    '&::before': {
      ...OVERLAY_SMALL,
      borderRadius: '12px', // TODO: Move radiuses to constants
      background: THEME_COLORS.light,
    },
  },
});
