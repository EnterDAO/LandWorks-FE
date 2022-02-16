import Popover from '@mui/material/Popover';
import { styled } from '@mui/material/styles';

import { THEME_COLORS } from 'themes/theme-constants';

const StyledPopover = styled(Popover)({
  '& .MuiPaper-root': {
    borderRadius: 11,
    backgroundColor: THEME_COLORS.darkBlue02,
    border: 'none',
  },
});

export { StyledPopover };
