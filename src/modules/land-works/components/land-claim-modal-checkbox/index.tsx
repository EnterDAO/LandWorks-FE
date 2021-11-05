import React, { useState } from 'react';
import { Checkbox, Col, Row } from 'antd';

import Icon, { TokenIconNames } from 'components/custom/icon';

import './index.scss';

interface props {
  data: {
    name: string;
    price: number;
    icon: TokenIconNames;
  };
}

export const LandClaimCheckBox: React.FC<props> = props => {
  const { name, price, icon } = props.data;
  const [checked, setChecked] = useState(false);
  return (
    <Row className={`claim-input-container ${checked ? 'checked' : ''}`} align={'middle'}>
      <Col span={20}>
        <Checkbox className="land-name-checkbox" onChange={e => setChecked(e.target.checked)}>
          {name}
        </Checkbox>
      </Col>
      <Col span={4}>
        <span className="price-checkbox">{price}</span>
        <Icon name={icon} className="eth-icon" />
      </Col>
    </Row>
  );
};
