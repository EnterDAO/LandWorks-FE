import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';

import { THEME_COLORS } from 'themes/theme-constants';

export const StyledInputBase = styled(InputBase)({
  'label + &': {
    marginTop: 5,
  },
  '& .MuiInputBase-input': {
    borderRadius: 11,
    position: 'relative',
    backgroundColor: THEME_COLORS.grey01,
    border: THEME_COLORS.grey01,
    width: '100px',
    fontSize: 16,
    padding: '15px 26px 15px 12px',
    color: THEME_COLORS.light,
    //transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    '&:focus': {
      borderRadius: 11,
      backgroundColor: THEME_COLORS.grey01,
      borderColor: THEME_COLORS.grey01,
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
});

export const StyledMenuItem = styled(MenuItem)({
  '& .MuiButtonBase-root-MuiMenuItem-root': {
    background: 'red',
  },
  '.MuiButtonBase-root-MuiMenuItem-root': {
    background: 'red',
  },
});
