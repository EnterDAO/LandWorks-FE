import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

import { THEME_COLORS } from 'themes/theme-constants';

const StyledSwitch = styled(Switch)(({ theme }) => ({
  width: 60,
  height: 30,
  padding: 0,
  display: 'flex',

  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 18,
    },
  },

  '& .MuiSwitch-switchBase': {
    padding: 6,
    '&.Mui-checked': {
      transform: 'translateX(30px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 18,
    top: '20px',
    height: 18,
    borderRadius: 15,
  },
  '& .MuiSwitch-track': {
    width: 60,
    height: 30,
    borderRadius: 50,
    opacity: 1,
    backgroundColor: THEME_COLORS.grey02,
    boxSizing: 'border-box',
  },
  '& .Mui-disabled': {
    color: 'var(--theme-subtle-color) !important',
    '& + .MuiSwitch-track': {
      opacity: '1 !important',
    },
  },
}));

export { StyledSwitch };
