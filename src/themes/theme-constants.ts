export const THEME_FONT_FAMILY = '"Poppins", sans-serif';

export const THEME_SPACING_BASE = 5;

export const THEME_OVERLAY_OPACITY_SMALL = 0.1;
export const THEME_OVERLAY_OPACITY_MEDIUM = 0.2;

export const THEME_COLORS = {
  primaryGradient: 'linear-gradient(83.81deg, #ac2ccb -19.8%, #dd3dcb 22%, #ef9c92 100%)',
  accentBlue: '#5d8ff0',
  red: '#d7606e',
  yellow: '#dfb068',
  green: '#6cd27e',
  neonPink: '#dd3dcb',
  peachPink: '#EF9C92',
  darkBlue01: '#161622',
  darkBlue02: '#1e1e2e',
  grey01: '#27273a',
  grey02: '#68687b',
  grey03: '#b9b9d3',
  grey04: '#3a3a4e',
  light: '#f8f8ff',
} as const;

export const BUTTON_2_STYLES = {
  fontFamily: THEME_FONT_FAMILY,
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '21px',
} as const;

export const GRADIENT_TEXT = {
  background: THEME_COLORS.primaryGradient,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
} as const;
