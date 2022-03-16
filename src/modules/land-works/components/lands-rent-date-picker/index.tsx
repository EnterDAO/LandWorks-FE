import { useEffect, useState } from 'react';
import { Grid, TextField } from '@mui/material';
import moment, { Moment } from 'moment';
import { RangeValue } from 'rc-picker/lib/interface';

import Icon from 'components/custom/icon';
import { Input, InputLabel, Tooltip } from 'design-system';

import './index.scss';

export const RentDatePicker = (props: {
  endDate: string | undefined;
  minStartDate: Moment;
  minRentPeriod: Moment;
  maxEndDate: Moment;
  handleRentDateChange: (values: RangeValue<Moment>, formatString?: [string, string]) => void;
}): React.ReactElement => {
  const { minStartDate, minRentPeriod, maxEndDate, handleRentDateChange, endDate } = props;

  const minRentTime = minRentPeriod.format('HH:mm');
  const minTime = minStartDate.format('HH:mm');

  const [date, setDate] = useState<string>(minRentPeriod.format().split('T')[0]);
  const [hours, setHours] = useState<string>(minRentTime);

  const handleHours = (hours: string) => {
    setHours(hours);
    const newHours = moment(new Date(`${date} ${hours}`).getTime());
    handleRentDateChange([minStartDate, newHours]);
  };
  const handleDate = (date: string) => {
    setDate(date);
    const newDate = moment(new Date(`${date} ${hours}`).getTime());

    handleRentDateChange([minStartDate, newDate]);
  };

  const isMinEqualMax = () => minRentPeriod.unix() === maxEndDate.unix();

  const fixedMinRentPeriodMinutes = () => {
    return moment(minRentPeriod).format('HH:mm');
  };

  useEffect(() => {
    if (isMinEqualMax()) {
      handleRentDateChange([minStartDate, maxEndDate]);
    }
  }, []);

  return (
    <Grid container spacing={1} className="dateRange">
      <InputLabel>
        <p>
          Start Date
          <Tooltip
            placement="bottom-end"
            title="The address that will be authorised to deploy scenes and experiences on the rented property during your renting period."
          >
            <span>
              <Icon name="about" className="info-icon" />
            </span>
          </Tooltip>
        </p>

        <Input className="input" defaultValue={minStartDate.format('DD MMM YYYY')} readOnly disabled />
      </InputLabel>

      <InputLabel>
        <p>Start Time</p>
        <Input className="input" defaultValue={minTime} readOnly disabled />
      </InputLabel>
      <div className="rangeDivider" />

      <InputLabel>
        <p>End Date</p>
        <TextField
          className="input date-input"
          type="date"
          disabled={isMinEqualMax()}
          onChange={(e) => handleDate(e.target.value)}
          defaultValue={minRentPeriod.format().split('T')[0]}
          InputProps={{
            inputProps: { min: minRentPeriod.format().split('T')[0], max: maxEndDate.format().split('T')[0] },
          }}
        />
      </InputLabel>

      <InputLabel>
        <p>
          End Time
          <Tooltip
            placement="bottom-end"
            title="The address that will be authorised to deploy scenes and experiences on the rented property during your renting period."
          >
            <span>
              <Icon name="about" className="info-icon" />
            </span>
          </Tooltip>
        </p>
        <TextField
          className="input time-input"
          type="time"
          disabled={isMinEqualMax()}
          onChange={(e) => handleHours(e.target.value)}
          defaultValue={endDate?.slice(-5) || fixedMinRentPeriodMinutes()}
          inputProps={{ min: minRentTime }}
        />
      </InputLabel>
    </Grid>
  );
};
