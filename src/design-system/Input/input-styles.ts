import { styled } from '@mui/system';

import { BUTTON_2_STYLES, THEME_COLORS } from '../../themes/theme-constants';

const StyledInputRoot = styled('div')({
  display: 'inline-flex',
  alignItems: 'center',
  height: '52px',
  width: '300px',
  background: THEME_COLORS.grey01,
  border: '1px solid transparent',
  borderRadius: '10px', // TODO: Move radiuses to constants
  cursor: 'text',
  '&.MuiInput-adornedEnd': {
    paddingRight: '20px',
    input: {
      paddingRight: '0px',
    },
  },
  '&.Mui-focused': {
    borderColor: THEME_COLORS.light,
  },
  '&.Mui-error': {
    borderColor: THEME_COLORS.red,
  },
});

const StyledInput = styled('input')({
  ...BUTTON_2_STYLES,
  color: THEME_COLORS.light,
  width: '100%',
  padding: '0px 20px',
  background: 'none',
  border: '0',
  '&::placeholder': {
    color: THEME_COLORS.grey02,
  },
  '&:focus': {
    outline: 'none',
  },
});

export { StyledInputRoot, StyledInput };
