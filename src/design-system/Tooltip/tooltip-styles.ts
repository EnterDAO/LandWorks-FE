import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { withStyles } from '@mui/styles';

import { THEME_COLORS } from '../../themes/theme-constants';

const StyledTooltip = withStyles({
  tooltip: {
    background: 'linear-gradient(0deg, rgba(248, 248, 255, 0.1), rgba(248, 248, 255, 0.1)), #27273A;',
    color: THEME_COLORS.grey03,
    padding: '13px 24px',
    maxWidth: '285px',
    borderRadius: '10px',
    border: '3px solid ' + THEME_COLORS.light,
    textAlign: 'center',
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
