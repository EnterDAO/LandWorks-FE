import React from 'react';
import BigNumber from 'bignumber.js';

import { ReactComponent as AlertIcon } from 'assets/icons/warning.svg';
import Icon from 'components/custom/icon';
import SmallAmountTooltip from 'components/custom/small-amount-tooltip';
import { Grid } from 'design-system';
import { getTokenIconName } from 'helpers/helpers';
import { Option } from 'modules/interface';
import { AssetEntity, PaymentToken } from 'modules/land-works/api';

import { DAY_IN_SECONDS, HOUR_IN_SECONDS, MINUTE_IN_SECONDS, MONTH_IN_SECONDS, WEEK_IN_SECONDS } from 'utils/date';

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

  const listingStyle = metaverse
    ? {
        xs: 6,
        mb: 3,
      }
    : {};

  return (
    <Grid className={s.wrapper} mt={metaverse ? 0 : 4} item>
      <Grid className={s.card}>
        {name && coordinatesChild && (
          <Grid container flexDirection="column">
            <Grid item textAlign="left" className={s.name}>
              <span>{name}</span>
            </Grid>
            <Grid item className={s.title}>
              Location: {coordinatesChild}
            </Grid>
            <div className={s.divider} />
          </Grid>
        )}
        <Grid flexDirection="column" alignContent="flex-start" textAlign="left">
          <Grid textAlign="left" className={s.name}>
            <span>{metaverse ? 'Rent Details' : 'Summary'}</span>
          </Grid>
          <Grid
            container
            flexDirection="row"
            justifyContent="space-between"
            flexWrap="wrap"
            textAlign="left"
            className={s.details}
          >
            <Grid item {...listingStyle} flexDirection="column" alignItems="flex-start">
              Rent Period
              <p>
                {getCalcByTimeSelection(min, minPeriodSelectedOption)} {minPeriodSelectedOption} - {''}
                {getCalcByTimeSelection(max, maxPeriodSelectedOption)} {maxPeriodSelectedOption}
              </p>
            </Grid>
            <Grid item {...listingStyle} flexDirection="column" alignItems="flex-start">
              Available for rent{' '}
              <p>
                {getCalcByTimeSelection(maxFuture, maxFutureSelectedOption)} {maxFutureSelectedOption}
              </p>
            </Grid>
            <Grid item {...listingStyle} flexDirection="column" alignItems="flex-start">
              Rent Price
              <p>
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
              </p>
            </Grid>
            {metaverse && (
              <Grid item {...listingStyle} flexDirection="row" alignItems="flex-start">
                Metaverse
                {metaverse.icon && <p>{metaverse.icon}</p>}
                <p style={{ marginLeft: '25px' }}>{metaverse.label}</p>
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
