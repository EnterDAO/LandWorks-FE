import React from 'react';
import BigNumber from 'bignumber.js';

import { Grid } from 'design-system';

import s from './s.module.scss';

interface IListNewSummary {
  // land: DecentralandNFT;
  minRentPeriod: BigNumber;
  maxRentPeriod: BigNumber;
  rentPrice: BigNumber;
  minPeriodSelectedOption: string;
  maxPeriodSelectedOption: string;
  maxFutureSelectedOption: string;
}

const ListNewSummary: React.FC<IListNewSummary> = ({
  minRentPeriod,
  maxRentPeriod,
  rentPrice,
  minPeriodSelectedOption,
  maxPeriodSelectedOption,
  maxFutureSelectedOption,
}) => {
  return (
    <Grid className={s.wrapper} mt={4} item>
      <Grid className={s.card}>
        <Grid flexDirection="column" alignContent="flex-start" textAlign="left">
          <Grid textAlign="left" className={s.name}>
            <span>Summary</span>
          </Grid>
          {/* <Grid container flexDirection="row" justifyContent="space-between" textAlign="left" className={s.details}>
            <Grid flexDirection="column" alignItems="flex-start">
              Rent Period
              <p>
                {minRentPeriod.toString()} {minPeriodSelectedOption} {} - {maxRentPeriod.toString()} {maxPeriodSelectedOption}
              </p>
            </Grid>
            <Grid flexDirection="column" alignItems="flex-start">
              Available for rent <p>{available}</p>
            </Grid>
            <Grid flexDirection="column" alignItems="flex-start">
              Rent Price <p>{rentPrice.toString()}</p>
            </Grid>
          </Grid> */}
          <Grid className={s.blueBox}>
            <div>Keep in mind</div>
            <p>There is a network fee in order to save the changes.</p>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ListNewSummary;
