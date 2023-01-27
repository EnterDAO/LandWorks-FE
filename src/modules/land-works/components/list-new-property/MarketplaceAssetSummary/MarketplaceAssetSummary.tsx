import React from 'react';
import BigNumber from 'bignumber.js';

import Icon from 'components/custom/icon';
import TokenIcon from 'components/custom/token-icon';
import { Stack } from 'design-system';
import { Box, Grid, Typography } from 'design-system';
import { getTokenIconName } from 'helpers/helpers';
import { MarketplaceAsset } from 'hooks/useGetAssetsForBuyingQuery';
import { Option } from 'modules/interface';
import { PaymentToken } from 'modules/land-works/api';

import { DAY_IN_SECONDS, HOUR_IN_SECONDS, MINUTE_IN_SECONDS, MONTH_IN_SECONDS, WEEK_IN_SECONDS } from 'utils/date';

import s from './s.module.scss';

// TODO: refactor
interface MarketplaceAssetSummaryProps {
  asset: MarketplaceAsset;
  minRentPeriod: BigNumber;
  maxRentPeriod: BigNumber;
  rentPrice: BigNumber;
  minPeriodSelectedOption: string;
  maxPeriodSelectedOption: string;
  maxFutureSelectedOption: string;
  maxFuturePeriod: BigNumber;
  paymentToken: PaymentToken;
  metaverse?: Option;
}

// TODO: refactor
const MarketplaceAssetSummary = ({
  minRentPeriod,
  maxRentPeriod,
  rentPrice,
  maxFuturePeriod,
  minPeriodSelectedOption,
  maxPeriodSelectedOption,
  maxFutureSelectedOption,
  paymentToken,
  metaverse,
  asset,
}: MarketplaceAssetSummaryProps) => {
  const min = minRentPeriod?.toNumber();
  const max = maxRentPeriod?.toNumber();
  const maxFuture = maxFuturePeriod?.toNumber();

  const mins = MINUTE_IN_SECONDS;
  const hours = HOUR_IN_SECONDS;
  const days = DAY_IN_SECONDS;
  const weeks = WEEK_IN_SECONDS;
  const months = MONTH_IN_SECONDS;

  const getCalcByTimeSelection = (n: number, t: string) => {
    if (n !== undefined && n !== 1) {
      if (t === 'mins') {
        return n / mins;
      } else if (t === 'hours') {
        return n / hours;
      } else if (t === 'days') {
        return n / days;
      } else if (t === 'weeks') {
        return n / weeks;
      } else if (t === 'months') {
        return n / months;
      }
    } else return 0;
  };

  return (
    <Grid className={s.wrapper} mt={metaverse ? 0 : 4} zeroMinWidth item>
      <Grid className={s.card}>
        <Stack textAlign="left" gap="4px">
          <Typography color="var(--theme-light-color)" fontWeight={600}>
            {asset.name}
          </Typography>
          <Typography variant="body2" color="var(--theme-grey700-color)">
            {asset.metadata.coords
              ? `Location: X: ${asset.metadata.coords.x} Y: ${asset.metadata.coords.y}`
              : `Lands: ${asset.metadata.size}`}
          </Typography>
          <Typography
            variant="body2"
            color="var(--theme-grey700-color)"
            display="flex"
            alignItems="center"
            gap="4px"
            noWrap
          >
            Buy from {asset.source.name} for:
            <Typography component="span" variant="inherit" color="var(--theme-light-color)" display="flex" gap="2px">
              <TokenIcon name={asset.price.currency.symbol.toLowerCase()} size={15} />
              <Typography component="span" variant="inherit" noWrap maxWidth={60}>
                {asset.price.amount.native}
              </Typography>
            </Typography>
            <Typography component="span" variant="inherit" color="var(--theme-subtle-color)" noWrap maxWidth={60}>
              $1234.56
            </Typography>
          </Typography>
        </Stack>
        <div className={s.divider} />
        <Grid flexDirection="column" alignContent="flex-start" textAlign="left">
          <Grid textAlign="left" className={s.subtitle}>
            <span>Rent Details</span>
          </Grid>
          <Grid container textAlign="left" spacing={2} className={s.details}>
            <Grid item xs={6} display="flex" flexDirection="column">
              Rent Period
              <p>
                {getCalcByTimeSelection(min, minPeriodSelectedOption)} {minPeriodSelectedOption} - {''}
                {getCalcByTimeSelection(max, maxPeriodSelectedOption)} {maxPeriodSelectedOption}
              </p>
            </Grid>
            <Grid item xs={6} display="flex" flexDirection="column">
              Available for rent{' '}
              <p>
                {getCalcByTimeSelection(maxFuture, maxFutureSelectedOption)} {maxFutureSelectedOption}
              </p>
            </Grid>
            <Grid item xs={6} display="flex" flexDirection="column">
              Price Per Day
              <p>
                <Icon
                  name={getTokenIconName(paymentToken.symbol || 'png/eth')}
                  style={{ width: '16px', height: '16px', verticalAlign: 'middle', marginRight: '5px' }}
                />
                {rentPrice.toNumber()} {paymentToken.symbol}
              </p>
            </Grid>
            {metaverse && (
              <Grid item xs={6} display="flex" flexDirection="column">
                Metaverse
                <Box component="p" display="flex" alignItems="center">
                  {metaverse.icon && (
                    <Box display="inline-flex" mr={1} sx={{ img: { width: 15, height: 15 } }}>
                      {metaverse.icon}
                    </Box>
                  )}
                  {metaverse.label}
                </Box>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MarketplaceAssetSummary;
