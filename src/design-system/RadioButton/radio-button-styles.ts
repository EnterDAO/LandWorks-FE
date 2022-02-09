import { styled } from '@mui/material/styles';

import { THEME_COLORS } from 'themes/theme-constants';

const Icon = styled('span')(() => ({
  borderRadius: '50%',
  width: 17,
  height: 17,
  border: `3px solid ${THEME_COLORS.light}`,
  'input:hover ~ &': {
    background: THEME_COLORS.grey02,
  },
}));

const CheckedIcon = styled(Icon)({
  background: THEME_COLORS.accentBlue,
  'input:hover ~ &': {
    background: THEME_COLORS.accentBlue,
  },
});

const radioButtonStyles = {
  padding: '0',
  marginRight: '10px',
  '&:hover': {
    bgcolor: 'transparent',
  },
} as const;

export { Icon, CheckedIcon, radioButtonStyles };
