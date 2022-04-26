import Icon from 'components/custom/icon';
import { Tooltip, TooltipProps } from 'components/custom/tooltip';

import './index.scss';

export const LandsTooltip: React.FC<TooltipProps> = (props) => {
  const { placement, target, children } = props;

  return (
    <Tooltip target={target} placement={placement} className="tooltip-wrapper">
      {children ? children : <Icon name="about" className="info-icon" />}
    </Tooltip>
  );
};
