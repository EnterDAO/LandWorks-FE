import { FC } from 'react';
import { TooltipProps } from '@mui/material/Tooltip';

import { StyledTooltip } from './tooltip-styles';

const Tooltip: FC<TooltipProps> = (props) => {
  const { children } = props;

  return <StyledTooltip {...props}>{children}</StyledTooltip>;
};

export default Tooltip;
