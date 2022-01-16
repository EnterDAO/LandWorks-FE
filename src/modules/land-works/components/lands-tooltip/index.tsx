import React, { useState } from 'react';
import { Col, Row, Tooltip } from 'antd';
import { TooltipPlacement } from 'antd/lib/tooltip';

import Icon from 'components/custom/icon';

import './index.scss';

type TooltipProps = {
  placement: TooltipPlacement;
  trigger: string;
  text: any;
};

export const LandsTooltip: React.FC<TooltipProps> = (props) => {
  const { placement, trigger, text } = props;

  return (
    <Tooltip title={text} placement={placement} trigger={trigger} overlayClassName="tooltip-wrapper">
      <Icon name="info-outlined" className="info-icon" />
    </Tooltip>
  );
};
