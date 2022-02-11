import { THEME_COLORS } from 'themes/theme-constants';

export const styles = {
  messageContainer: {
    width: '363px',
    height: '62px',
    background: THEME_COLORS.accentBlue,
    color: THEME_COLORS.light,
    borderRadius: '10px',
    padding: '0 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  closeIcon: {
    color: `${THEME_COLORS.accentBlue} !important`,
    marginLeft: '12px',
  },
} as const;
