import Menu from '@mui/material/Menu';
import { styled } from '@mui/material/styles';

import { THEME_COLORS } from 'themes/theme-constants';

const StyledMenu = styled(Menu)({
  '.MuiList-root': {
    padding: 0,
  },
  '& .MuiPaper-root': {
    borderRadius: 11,
    marginTop: '15px',
    backgroundColor: THEME_COLORS.darkBlue02,
    color: THEME_COLORS.light,
  },
});

export { StyledMenu };
