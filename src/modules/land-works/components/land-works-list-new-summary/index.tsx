import React from 'react';
import BigNumber from 'bignumber.js';

import { Grid, Icon } from 'design-system';
import { AlertIcon } from 'design-system/icons';

import { DAY_IN_SECONDS, HOUR_IN_SECONDS, MINUTE_IN_SECONDS, WEEK_IN_SECONDS } from 'utils/date';

import s from './s.module.scss';

interface IListNewSummary {
  minRentPeriod: BigNumber;
  maxRentPeriod: BigNumber;
  rentPrice: BigNumber;
  minPeriodSelectedOption: string;
  maxPeriodSelectedOption: string;
  maxFutureSelectedOption: string;
  maxFuturePeriod: BigNumber;
}

const ListNewSummary: React.FC<IListNewSummary> = ({
  minRentPeriod,
  maxRentPeriod,
  rentPrice,
  maxFuturePeriod,
  minPeriodSelectedOption,
  maxPeriodSelectedOption,
  maxFutureSelectedOption,
}) => {
  const min = minRentPeriod?.toNumber();
  const max = maxRentPeriod?.toNumber();
  const maxFuture = maxFuturePeriod?.toNumber();

  const mins = MINUTE_IN_SECONDS;
  const hours = HOUR_IN_SECONDS;
  const days = DAY_IN_SECONDS;
  const weeks = WEEK_IN_SECONDS;

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
      }
    } else return 0;
  };

  return (
    <Grid className={s.wrapper} mt={4} item>
      <Grid className={s.card}>
        <Grid flexDirection="column" alignContent="flex-start" textAlign="left">
          <Grid textAlign="left" className={s.name}>
            <span>Summary</span>
          </Grid>
          <Grid container flexDirection="row" justifyContent="space-between" textAlign="left" className={s.details}>
            <Grid flexDirection="column" alignItems="flex-start">
              Rent Period
              <p>
                {getCalcByTimeSelection(min, minPeriodSelectedOption)} {minPeriodSelectedOption} - {''}
                {getCalcByTimeSelection(max, maxPeriodSelectedOption)} {maxPeriodSelectedOption}
              </p>
            </Grid>
            <Grid flexDirection="column" alignItems="flex-start">
              Available for rent{' '}
              <p>
                {getCalcByTimeSelection(maxFuture, maxFutureSelectedOption)} {maxFutureSelectedOption}
              </p>
            </Grid>
            <Grid flexDirection="column" alignItems="flex-start">
              Rent Price <p>{rentPrice.toString()}</p>
            </Grid>
          </Grid>
          <Grid className={s.blueBox}>
            <div className={s.alert}>
              <Icon iconElement={<AlertIcon />} iconSize="s" />
            </div>
            <div>
              <div>Keep in mind</div>
              <p>There is a network fee in order to save the changes.</p>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ListNewSummary;
