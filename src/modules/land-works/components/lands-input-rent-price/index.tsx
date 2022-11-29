import { ChangeEvent } from 'react';
import { Box } from '@mui/system';
import BigNumber from 'bignumber.js';

import { ReactComponent as BluePlus } from 'assets/icons/blue-plus.svg';
import Icon from 'components/custom/icon';
import SmallAmountTooltip from 'components/custom/small-amount-tooltip';
import { Grid, Tooltip, Typography } from 'design-system';
import { getTokenIconName } from 'helpers/helpers';
import { Option } from 'modules/interface';
import { PaymentToken } from 'modules/land-works/api';

import CustomDropdownInput from '../land-works-input';

import './index.scss';

interface IProps {
  handleCostEthChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleCurrencyChange: (value: number) => void;
  showPriceInUsd: string;
  paymentToken: PaymentToken;
  earnings: BigNumber;
  protocolFee: BigNumber;
  feePercentage: number;
  options: Option[];
  optionsValue: number;
  inputValue?: number | string;
  error: string;
}

export const RentPrice: React.FC<IProps> = ({
  handleCostEthChange,
  handleCurrencyChange,
  showPriceInUsd,
  paymentToken,
  earnings,
  protocolFee,
  feePercentage,
  options,
  optionsValue,
  inputValue,
  error,
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
            placeholder="Set a price"
            defaultInputValue={inputValue}
            onInput={handleCostEthChange}
            handleOptionChange={handleCurrencyChange}
            options={options}
            ethInUsd={showPriceInUsd}
            optionsValue={optionsValue}
            error={error}
          />
        </Grid>
        {!!error && (
          <Typography mt={1} textAlign="left" variant="body2" color="var(--theme-red-color)">
            {error}
          </Typography>
        )}
      </Grid>
      <Grid className="blueBox" display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
        <Grid display="flex" justifyContent="center" alignItems="flex-start" flexDirection="column">
          <Grid display="flex" flexDirection="row" alignItems="center">
            <Icon
              name={getTokenIconName(paymentToken.symbol || 'png/eth')}
              style={{ width: '16px', height: '16px', verticalAlign: 'middle', marginRight: '5px' }}
            />
            <SmallAmountTooltip className="amount" amount={new BigNumber(earnings || '0')} />
          </Grid>
          <Grid display="flex" alignItems="center" className="amount-label">
            Your Earnings
          </Grid>
        </Grid>
        <BluePlus />
        <Grid display="flex" justifyContent="center" alignItems="flex-start" flexDirection="column">
          <Grid display="flex" flexDirection="row" alignItems="center">
            <Icon
              name={getTokenIconName(paymentToken.symbol || 'png/eth')}
              style={{ width: '16px', height: '16px', verticalAlign: 'middle', marginRight: '5px' }}
            />
            <span className="earnings-num">
              <SmallAmountTooltip className="amount" amount={new BigNumber(protocolFee || '0')} />
            </span>
          </Grid>
          <Grid display="flex" alignItems="center" className="amount-label">
            {feePercentage}% Protocol Fee
            <Tooltip
              placement="bottom"
              title={
                <>
                  This is the protocol fee of LandWorks.
                  <br />
                  It occurs when the property is rented.
                </>
              }
            >
              <Box display="flex">
                <Icon name="about" className="info-icon" />
              </Box>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default RentPrice;
