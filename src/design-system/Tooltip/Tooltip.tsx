import { FC } from 'react';
import TooltipUnstyled, { TooltipProps } from '@mui/material/Tooltip';

import { styles } from './tooltip-styles';

const Tooltip: FC<TooltipProps> = (props) => {
  const { children } = props;
  //eslint-disable-next-line
  //@ts-ignore
  return (
    <TooltipUnstyled componentsProps={{ tooltip: { sx: styles.tooltip }, arrow: { sx: styles.arrow } }} {...props}>
      {children}
    </TooltipUnstyled>
  );
};

export default Tooltip;
