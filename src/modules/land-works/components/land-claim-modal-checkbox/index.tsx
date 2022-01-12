import React, { useState } from 'react';
import { Checkbox, Col, Row } from 'antd';

import Icon, { TokenIconNames } from 'components/custom/icon';

import { AssetEntity } from '../../api';

import { formatBigNumber } from '../../../../utils';

import './index.scss';

interface props {
  data: AssetEntity;
  onSelected: (isRemoved: boolean, asset: AssetEntity) => void;
}

export const LandClaimCheckBox: React.FC<props> = (props) => {
  const { name, unclaimedRentFee, paymentToken } = props.data;
  const icon: TokenIconNames = paymentToken.symbol === 'ETH' ? 'token-eth' : 'token-usdc';

  const onChecked = (isChecked: boolean) => {
    setChecked(isChecked);
    props.onSelected(isChecked, props.data);
  };

  const [checked, setChecked] = useState(false);
  return (
    <Row className={`claim-input-container ${checked ? 'checked' : ''}`} align={'middle'}>
      <Col span={18}>
        <Checkbox className="land-name-checkbox" onChange={(e) => onChecked(e.target.checked)}>
          {name}
        </Checkbox>
      </Col>
      <Col span={6} className="price">
        <span className="price-checkbox">{formatBigNumber(unclaimedRentFee)}</span>
        <Icon name={icon} className="eth-icon" />
      </Col>
    </Row>
  );
};
