import BigNumber from 'bignumber.js';

import { ReactComponent as BluePlus } from 'assets/icons/blue-plus.svg';
import Icon from 'components/custom/icon';
import SmallAmountTooltip from 'components/custom/smallAmountTooltip';
import { Grid } from 'design-system';
import { getTokenIconName } from 'helpers/helpers';
import { Option } from 'modules/interface';
import { PaymentToken } from 'modules/land-works/api';

import CustomDropdownInput from '../land-works-input';

import './index.scss';

interface IProps {
  handleCostEthChange: (e: any) => void;
  handleCurrencyChange: (value: number) => void;
  showPriceInEth: string;
  paymentToken: PaymentToken;
  earnings: BigNumber;
  protocolFee: BigNumber;
  feePercentage: number;
  options: Option[];
  value: any;
}

export const RentPrice: React.FC<IProps> = ({
  handleCostEthChange,
  handleCurrencyChange,
  showPriceInEth,
  paymentToken,
  earnings,
  protocolFee,
  feePercentage,
  options,
  value,
}) => {
  return (
    <>
      <Grid>
        <Grid alignItems="center" display="flex" flexDirection="row" mt={3} justifyContent="space-between">
          <span className="light">Amount</span>
          <span className="grey">per day</span>
        </Grid>
        <Grid mt={3}>
          <CustomDropdownInput
            onInput={handleCostEthChange}
            handleOptionChange={handleCurrencyChange}
            options={options}
            ethInUsd={showPriceInEth}
            value={value}
          />
        </Grid>
      </Grid>
      <Grid className="blueBox" display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
        <Grid display="flex" justifyContent="center" alignItems="flex-start" flexDirection="column">
          <Grid display="flex" flexDirection="row" alignItems="center">
            <Icon
              name={getTokenIconName(paymentToken.symbol || 'png/eth')}
              // className="info-icon"
              style={{ width: '16px', height: '16px', verticalAlign: 'middle', marginRight: '5px' }}
            />
            <SmallAmountTooltip className="amount" amount={new BigNumber(earnings || '0')} />
          </Grid>
          <Grid className="amount-label">Your Earnings</Grid>
        </Grid>
        <BluePlus />
        <Grid display="flex" justifyContent="center" alignItems="flex-start" flexDirection="column">
          <Grid display="flex" flexDirection="row" alignItems="center">
            <Icon
              name={getTokenIconName(paymentToken.symbol || 'png/eth')}
              // className="info-icon"
              style={{ width: '16px', height: '16px', verticalAlign: 'middle', marginRight: '5px' }}
            />
            <span className="earnings-num">
              <SmallAmountTooltip className="amount" amount={new BigNumber(protocolFee || '0')} />
            </span>
          </Grid>
          <Grid className="amount-label">{feePercentage}% Protocol Fees</Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default RentPrice;
