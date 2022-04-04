import { THEME_OVERLAY_OPACITY_MEDIUM, THEME_OVERLAY_OPACITY_SMALL } from './theme-constants';

// TODO: Use this file to export utility objects for the sx prop of components
export const BEFORE_ELEMENT_BASE = {
  content: '" "',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
};

export const OVERLAY_SMALL = {
  ...BEFORE_ELEMENT_BASE,
  opacity: THEME_OVERLAY_OPACITY_SMALL,
} as const;

export const OVERLAY_MEDIUM = {
  ...OVERLAY_SMALL,
  opacity: THEME_OVERLAY_OPACITY_MEDIUM,
} as const;
