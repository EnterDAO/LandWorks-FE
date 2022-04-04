import { styled } from '@mui/system';

import { BUTTON_2_STYLES, THEME_COLORS } from '../../themes/theme-constants';

const StyledTextareaRoot = styled('div')({
  padding: '20px',
  paddingTop: '17px',
  paddingRight: '10px',
  height: '114px',
  width: '300px',
  background: THEME_COLORS.grey01,
  border: '1px solid transparent',
  borderRadius: '12px', // TODO: Move radiuses to constants
  cursor: 'text',
  '&.Mui-focused': {
    borderColor: THEME_COLORS.light,
  },
  '&.Mui-error': {
    borderColor: THEME_COLORS.red,
  },
});

const StyledTextarea = styled('textarea')({
  ...BUTTON_2_STYLES,
  color: THEME_COLORS.light,
  padding: '0px',
  paddingRight: '10px',
  width: '100%',
  height: '100%',
  background: 'none',
  border: '0',
  resize: 'none',
  '&::placeholder': {
    color: THEME_COLORS.grey02,
  },
  '&:focus': {
    outline: 'none',
  },
  '&::-webkit-scrollbar': {
    width: '4px',
  },
  '::-webkit-scrollbar-track': {
    background: 'none',
  },
  '::-webkit-scrollbar-thumb': {
    background: THEME_COLORS.grey02,
    borderRadius: '4px',
  },
  '::-webkit-scrollbar-thumb:hover': {
    background: THEME_COLORS.grey02,
  },
});

export { StyledTextareaRoot, StyledTextarea };
