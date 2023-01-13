import React from 'react';
import BigNumber from 'bignumber.js';

import { ReactComponent as AlertIcon } from 'assets/icons/warning.svg';
import promotionalSceneTooltipThumbnail from 'assets/img/listing-ad.jpg';
import Icon from 'components/custom/icon';
import SmallAmountTooltip from 'components/custom/small-amount-tooltip';
import { Tooltip } from 'design-system';
import { Box, Grid, Typography } from 'design-system';
import { getTokenIconName } from 'helpers/helpers';
import { Option } from 'modules/interface';
import { AssetEntity, PaymentToken } from 'modules/land-works/api';

import { DAY_IN_SECONDS, HOUR_IN_SECONDS, MINUTE_IN_SECONDS, MONTH_IN_SECONDS, WEEK_IN_SECONDS } from 'utils/date';

import { THEME_COLORS } from 'themes/theme-constants';

import s from './s.module.scss';

interface IListNewSummary {
  minRentPeriod: BigNumber;
  maxRentPeriod: BigNumber;
  rentPrice: BigNumber;
  minPeriodSelectedOption: string;
  maxPeriodSelectedOption: string;
  maxFutureSelectedOption: string;
  maxFuturePeriod: BigNumber;
  paymentToken: PaymentToken;
  feeText: string;
  asset?: AssetEntity;
  withoutText?: boolean;
  metaverse?: Option;
  coordinatesChild?: React.ReactNode;
  name?: string;
  isEstate?: boolean;
  isAdvertisementEnabled?: boolean;
}

const ListNewSummary: React.FC<IListNewSummary> = ({
  minRentPeriod,
  maxRentPeriod,
  rentPrice,
  maxFuturePeriod,
  minPeriodSelectedOption,
  maxPeriodSelectedOption,
  maxFutureSelectedOption,
  paymentToken,
  feeText,
  asset,
  withoutText,
  metaverse,
  coordinatesChild,
  name,
  isEstate,
  isAdvertisementEnabled,
}) => {
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

  const sceneDetail = isAdvertisementEnabled
    ? {
        label: 'SCENE',
        content: 'Partner Name Ads Billboard',
        tooltip: {
          title: 'PrecisionX Ads Billboard',
          description:
            'A billboard showing ads will be placed on this land. You will earn USDC per unique view. Rewards can be claimed every month. ',
        },
      }
    : {
        label: 'SCENE',
        content: 'LandWorks Promotional Scene',
        tooltip: {
          title: 'Promotional Scene',
          description:
            'A “For Rent” scene with an embedded link will be deployed on the property. The scene boosts chances for rent.',
        },
      };

  return (
    <Grid className={s.wrapper} mt={metaverse ? 0 : 4} item>
      <Grid className={s.card}>
        {name && coordinatesChild && (
          <Grid container flexDirection="column">
            <Grid item textAlign="left" className={s.name}>
              <span>{name}</span>
            </Grid>
            <Grid item className={s.title}>
              {isEstate ? 'Lands : ' : 'Location : '} {coordinatesChild}
            </Grid>
            <div className={s.divider} />
          </Grid>
        )}
        <Grid flexDirection="column" alignContent="flex-start" textAlign="left">
          <Grid textAlign="left" className={s.subtitle}>
            <span>{metaverse ? 'Rent Details' : 'Summary'}</span>
          </Grid>
          <Grid container textAlign="left" spacing={3} className={s.details}>
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
              <div>
                <Icon
                  name={getTokenIconName(paymentToken.symbol || 'png/eth')}
                  style={{ width: '16px', height: '16px', verticalAlign: 'middle', marginRight: '5px' }}
                />
                {asset ? (
                  <SmallAmountTooltip
                    className="price-eth"
                    amount={
                      rentPrice || (asset?.pricePerMagnitude ? asset?.pricePerMagnitude?.price : new BigNumber('0'))
                    }
                  />
                ) : (
                  <>
                    {rentPrice.toNumber()} {paymentToken.symbol}
                  </>
                )}
              </div>
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
            {metaverse?.value == 1 && (
              <Grid item xs={12} display="flex" flexDirection="column">
                <Typography variant="inherit" component="span" display="inline-flex" alignItems="center" gap="4px">
                  {sceneDetail.label}
                  <Tooltip
                    arrow
                    title={
                      <Box display="flex" gap={2}>
                        <Box borderRadius="10px" src={promotionalSceneTooltipThumbnail} component="img" width={170} />
                        <Box>
                          <Typography mb={1} fontWeight={400} variant="body2" color={THEME_COLORS.darkBlue01}>
                            {sceneDetail.tooltip.title}
                          </Typography>
                          <Typography fontWeight={400} variant="body2">
                            {sceneDetail.tooltip.description}
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
                <p>{sceneDetail.content}</p>
              </Grid>
            )}
          </Grid>
          {!withoutText && (
            <Grid className={s.blueBox}>
              <div className={s.alert}>
                <AlertIcon style={{ width: '20px', height: '20px' }} />
              </div>
              <div>
                <div>Keep in mind</div>
                <p>{feeText}</p>
              </div>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ListNewSummary;
