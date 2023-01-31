import React from 'react';
import BigNumber from 'bignumber.js';
import { formatUSD } from 'web3/utils';

import promotionalSceneTooltipThumbnail from 'assets/img/promotional-scene-thumbnail.jpg';
import Icon from 'components/custom/icon';
import { Stack, Tooltip } from 'design-system';
import { Box, Grid, Typography } from 'design-system';
import { getTokenIconName } from 'helpers/helpers';
import { MarketplaceAsset } from 'hooks/useGetAssetsForBuyingQuery';
import useGetTokenPriceInUsdQuery from 'hooks/useGetTokenPriceInUsdQuery';
import { Option } from 'modules/interface';
import { PaymentToken } from 'modules/land-works/api';

import TokenIcon from '../../token-icon/TokenIcon';

import { DAY_IN_SECONDS, HOUR_IN_SECONDS, MINUTE_IN_SECONDS, MONTH_IN_SECONDS, WEEK_IN_SECONDS } from 'utils/date';

import { THEME_COLORS } from 'themes/theme-constants';

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
  asset,
}: MarketplaceAssetSummaryProps) => {
  const min = minRentPeriod?.toNumber();
  const max = maxRentPeriod?.toNumber();
  const maxFuture = maxFuturePeriod?.toNumber();

  const { data: assetTokenPriceInUsd, isLoading: isAssetTokenPriceInUsdLoading } = useGetTokenPriceInUsdQuery(
    asset.price.currency.symbol
  );

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
    <Grid className={s.wrapper} zeroMinWidth item>
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
              <TokenIcon symbol={asset.price.currency.symbol} size={15} />
              <Typography component="span" variant="inherit" noWrap maxWidth={60}>
                {asset.price.amount.decimal}
              </Typography>
            </Typography>
            <Typography component="span" variant="inherit" color="var(--theme-subtle-color)" noWrap maxWidth={60}>
              {!isAssetTokenPriceInUsdLoading && assetTokenPriceInUsd
                ? formatUSD(new BigNumber(asset.price.amount.decimal).multipliedBy(assetTokenPriceInUsd))
                : '-'}
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
            <Grid item xs={6} display="flex" flexDirection="column">
              Metaverse
              <Box component="p" display="flex" alignItems="center">
                <Box display="inline-flex" mr={1} sx={{ img: { width: 15, height: 15 } }}>
                  <Icon name="png/Decentraland" width="20" height="20" />
                </Box>
                Decentraland
              </Box>
            </Grid>

            <Grid item xs={12} display="flex" flexDirection="column">
              <Typography variant="inherit" component="span" display="inline-flex" alignItems="center" gap="4px">
                SCENE
                <Tooltip
                  arrow
                  title={
                    <Box display="flex" gap={2}>
                      <Box borderRadius="10px" src={promotionalSceneTooltipThumbnail} component="img" width={170} />
                      <Box>
                        <Typography mb={1} fontWeight={400} variant="body2" color={THEME_COLORS.darkBlue01}>
                          Promotional Scene
                        </Typography>
                        <Typography fontWeight={400} variant="body2">
                          A “For Rent” scene with an embedded link will be deployed on the property. The scene boosts
                          chances for rent.
                        </Typography>
                      </Box>
                    </Box>
                  }
                >
                  <Box display="inline-flex" alignItems="center" justifyContent="center">
                    <Icon style={{ marginLeft: 0 }} name="about" className="info-icon" />
                  </Box>
                </Tooltip>
              </Typography>
              <p>LandWorks Promotional Scene</p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MarketplaceAssetSummary;
