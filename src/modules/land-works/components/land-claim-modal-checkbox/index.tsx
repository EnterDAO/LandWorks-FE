import React, { useState } from 'react';

import Icon from 'components/custom/icon';
import SmallAmountTooltip from 'components/custom/small-amount-tooltip';
import { Checkbox, Grid } from 'design-system';

import { getTokenIconName } from '../../../../helpers/helpers';
import { AssetEntity } from '../../api';

import './index.scss';

interface props {
  data: AssetEntity;
  onSelected: (isRemoved: boolean, asset: AssetEntity) => void;
}

export const LandClaimCheckBox: React.FC<props> = (props) => {
  const { name, unclaimedRentFee, paymentToken, metaverse } = props.data;

  const [checked, setChecked] = useState(false);

  const onChecked = (isChecked: boolean) => {
    setChecked(isChecked);
    props.onSelected(isChecked, props.data);
  };

  return (
    <Grid
      container
      justifyContent="flex-start"
      alignContent="flex-start"
      className={`claim-input-container ${checked ? 'checked' : ''}`}
    >
      <Grid item xs={8}>
        <Checkbox onChange={(e) => onChecked(e.target.checked)} />
        {name} - {metaverse.name}
      </Grid>
      <Grid item xs={4} className="price">
        <SmallAmountTooltip className="price-checkbox" amount={unclaimedRentFee} />
        <Icon name={getTokenIconName(paymentToken.symbol)} className="eth-icon" />
      </Grid>
    </Grid>
  );
};
