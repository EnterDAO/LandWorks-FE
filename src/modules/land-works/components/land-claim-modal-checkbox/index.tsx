import React, { useState } from 'react';
import { Checkbox, Col, Row } from 'antd';

import Icon from 'components/custom/icon';
import SmallAmountTooltip from 'components/custom/small-amount-tooltip';

import { getTokenIconName } from '../../../../helpers/helpers';
import { AssetEntity } from '../../api';

import './index.scss';

interface props {
  data: AssetEntity;
  onSelected: (isRemoved: boolean, asset: AssetEntity) => void;
}

export const LandClaimCheckBox: React.FC<props> = (props) => {
  const { name, unclaimedRentFee, paymentToken, metaverse } = props.data;

  const onChecked = (isChecked: boolean) => {
    setChecked(isChecked);
    props.onSelected(isChecked, props.data);
  };

  const [checked, setChecked] = useState(false);
  return (
    <Row className={`claim-input-container ${checked ? 'checked' : ''}`} align={'middle'}>
      <Col span={18}>
        <Checkbox className="land-name-checkbox" onChange={(e) => onChecked(e.target.checked)}>
          {name} - {metaverse.name}
        </Checkbox>
      </Col>
      <Col span={6} className="price">
        <SmallAmountTooltip className="price-checkbox" amount={unclaimedRentFee} />
        <Icon name={getTokenIconName(paymentToken.symbol)} className="eth-icon" />
      </Col>
    </Row>
  );
};
