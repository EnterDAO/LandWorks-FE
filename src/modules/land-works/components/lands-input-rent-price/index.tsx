import BigNumber from 'bignumber.js';

import Icon from 'components/custom/icon';
import SmallAmountTooltip from 'components/custom/smallAmountTooltip';
import { Grid } from 'design-system';
import { getTokenIconName } from 'helpers/helpers';
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
}

export const RentPrice: React.FC<IProps> = ({
  handleCostEthChange,
  handleCurrencyChange,
  showPriceInEth,
  paymentToken,
  earnings,
  protocolFee,
  feePercentage,
}) => {
  return (
    <>
      <Grid>
        <Grid alignItems="center" display="flex" flexDirection="row" mt={3}>
          <span>Amount</span>
        </Grid>
        <Grid mt={3}>
          <CustomDropdownInput
            onInput={handleCostEthChange}
            handleOptionChange={handleCurrencyChange}
            options="currencies"
            ethInUsd={showPriceInEth}
          />
        </Grid>
      </Grid>
      <Grid className="blueBox" display="flex" flexDirection="row" justifyContent="space-between">
        <Grid display="flex" alignItems="flex-start" flexDirection="column">
          <Grid>
            <Icon
              name={getTokenIconName(paymentToken.symbol || 'png/eth')}
              className="info-icon"
              style={{ width: '16px', height: '16px', verticalAlign: 'middle', marginRight: '5px' }}
            />
            <SmallAmountTooltip amount={new BigNumber(earnings || '0')} />
          </Grid>
          <Grid>Your Earnings</Grid>
        </Grid>
        <Grid display="flex" alignItems="flex-start" flexDirection="column">
          <Grid>
            <Icon
              name={getTokenIconName(paymentToken.symbol || 'png/eth')}
              className="info-icon"
              style={{ width: '16px', height: '16px', verticalAlign: 'middle', marginRight: '5px' }}
            />
            <span className="earnings-num">
              <SmallAmountTooltip amount={new BigNumber(protocolFee || '0')} />
            </span>
          </Grid>
          <Grid>{feePercentage}% Protocol Fees</Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default RentPrice;
