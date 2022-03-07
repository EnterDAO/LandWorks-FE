import { Tooltip } from 'antd';
import { RenderFunction, TooltipPlacement } from 'antd/lib/tooltip';

import Icon from 'components/custom/icon';

import './index.scss';

type TooltipProps = {
  placement: TooltipPlacement;
  trigger: string;
  text: React.ReactNode | RenderFunction;
  zIndex?: number
};

export const LandsTooltip: React.FC<TooltipProps> = (props) => {
  const { placement, trigger, text, children, zIndex } = props;

  return (
    <Tooltip style={{zIndex: zIndex}} title={text} placement={placement} trigger={trigger} overlayClassName="tooltip-wrapper">
      {children ? children : <Icon name="about" className="info-icon" />}
    </Tooltip>
  );
};
