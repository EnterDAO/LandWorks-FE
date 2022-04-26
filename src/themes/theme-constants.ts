export const THEME_FONT_FAMILY = '"Poppins", sans-serif';

export const THEME_SPACING_BASE = 5;

export const THEME_OVERLAY_OPACITY_SMALL = 0.1;
export const THEME_OVERLAY_OPACITY_MEDIUM = 0.2;

export const THEME_COLORS = {
  primaryGradient: 'var(--theme-primary-gradient)',
  accentBlue: 'var(--theme-accent-color)',
  red: 'var(--theme-red-color)',
  yellow: 'var(--theme-yellow-color)',
  green: 'var(--theme-green-color)',
  neonPink: 'var(--theme-neon-pink-color)',
  darkBlue01: 'var(--theme-body-color)',
  darkBlue02: 'var(--theme-card-color)',
  darkBlue03: 'var(--theme-modal-color)',
  grey01: 'var(--theme-grey200-color)',
  grey02: 'var(--theme-grey700-color)',
  grey03: 'var(--theme-subtle-color)',
  grey04: 'var(--theme-grey400-color)',
  light: 'var(--theme-grey900-color)',
} as const;

export const BUTTON_2_STYLES = {
  fontFamily: THEME_FONT_FAMILY,
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '21px',
} as const;

export const GRADIENT_TEXT = {
  background: 'var(--theme-primary-gradient)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
} as const;
