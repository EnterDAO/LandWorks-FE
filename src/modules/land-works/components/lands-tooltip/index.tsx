import Icon from 'components/custom/icon';
import { Tooltip, TooltipProps } from 'components/custom/tooltip';

import './index.scss';

export const LandsTooltip: React.FC<TooltipProps> = (props) => {
  const { placement, target, children } = props;

  return (
    <Tooltip target={children} placement={placement} className="tooltip-wrapper">
      {target ? target : <Icon name="about" className="info-icon" />}
    </Tooltip>
  );
};
