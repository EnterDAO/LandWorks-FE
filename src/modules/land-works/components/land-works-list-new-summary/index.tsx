import React from 'react';

import { Grid } from 'design-system';

import s from './s.module.scss';

interface IListNewSummary {
  // land: DecentralandNFT;
  minRentPeriod: any;
  maxRentPeriod: any;
  rentPrice: any;
}

const ListNewSummary: React.FC<IListNewSummary> = ({ minRentPeriod, maxRentPeriod, rentPrice }) => {
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
                {minRentPeriod.toString()} - {maxRentPeriod.toString()}
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
