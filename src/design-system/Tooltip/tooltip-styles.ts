import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { withStyles } from '@mui/styles';

import { THEME_COLORS } from '../../themes/theme-constants';

const StyledTooltip = withStyles({
  tooltip: {
    background: THEME_COLORS.light,
    color: THEME_COLORS.grey01,
    padding: '13px 24px',
    maxWidth: '285px',
    borderRadius: '10px',
    [`&.${tooltipClasses.tooltipArrow}`]: {
      padding: '15px',
      width: '285px',
    },
  },
  arrow: {
    color: THEME_COLORS.light,
  },
})(Tooltip);

export { StyledTooltip };
