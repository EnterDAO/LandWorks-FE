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
        <Typography variant="button" alignItems="center" display="flex" mt={3} justifyContent="space-between">
          Amount
          <Typography color="var(--theme-grey700-color)">per day</Typography>
        </Typography>
        <Grid mt="13px">
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
      <Box className="blueBox" display="flex" alignItems="center" justifyContent="space-between">
        <Box
          flex="1 1 100%"
          overflow="hidden"
          display="flex"
          justifyContent="center"
          alignItems="flex-start"
          flexDirection="column"
        >
          <Grid display="flex" width={1} flexDirection="row" alignItems="center" mb="2px">
            <Icon
              name={getTokenIconName(paymentToken.symbol || 'png/eth')}
              style={{ width: '16px', height: '16px', verticalAlign: 'middle', marginRight: '5px' }}
            />
            <SmallAmountTooltip className="amount" amount={new BigNumber(earnings || '0')} />
          </Grid>
          <Typography
            display="flex"
            sx={{ whiteSpace: 'nowrap' }}
            alignItems="center"
            variant="body2"
            color="var(--theme-accent-color)"
          >
            Your Earnings
          </Typography>
        </Box>
        <Box flexShrink={0} mx={2}>
          <BluePlus />
        </Box>
        <Box
          width={1}
          flexGrow={1}
          overflow="hidden"
          display="flex"
          justifyContent="center"
          alignItems="flex-end"
          flexDirection="column"
        >
          <Box maxWidth={1}>
            <Grid display="flex" flexDirection="row" alignItems="center" mb="2px">
              <Icon
                name={getTokenIconName(paymentToken.symbol || 'png/eth')}
                style={{ width: '16px', height: '16px', verticalAlign: 'middle', marginRight: '5px' }}
              />
              <Box sx={{ overflow: 'hidden' }} className="earnings-num">
                <SmallAmountTooltip className="amount" amount={new BigNumber(protocolFee || '0')} />
              </Box>
            </Grid>
            <Typography display="flex" alignItems="center" variant="body2" color="var(--theme-accent-color)">
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
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default RentPrice;
