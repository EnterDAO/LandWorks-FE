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
    return isMinEqualMax()
      ? moment(minRentPeriod).format('HH:mm')
      : moment(minRentPeriod).add(1, 'minutes').format('HH:mm');
  };

  useEffect(() => {
    if (isMinEqualMax()) {
      handleRentDateChange([minStartDate, maxEndDate]);
    } else {
      handleRentDateChange([minStartDate, minRentPeriod.add(1, 'minutes')]);
    }
  }, []);

  return (
    <Grid container className="dateRange">
      <InputLabel>
        <p>
          Start Date
          <Tooltip
            placement="bottom-end"
            title="The timestamp your rent will start. If there is no rents for this land, this timestamp will be now. 
            Otherwise the timestamp will be the earliest possible one based on the booked rents. 
            The start of your rent is not configurable - it's the earliest possible timestamp."
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
        <p>
          End Date
          <Tooltip
            placement="bottom-end"
            title="The time and date you wish the rent to end. This is a configurable timestamp based on the parameters set by the landlord."
          >
            <span>
              <Icon name="about" className="info-icon" />
            </span>
          </Tooltip>
        </p>

        <TextField
          style={{ fontSize: '14px' }}
          className="input date-input"
          type="date"
          disabled={isMinEqualMax()}
          onChange={(e) => handleDate(e.target.value)}
          defaultValue={minRentPeriod.format().split('T')[0]}
          InputProps={{
            inputProps: {
              min: minRentPeriod.format().split('T')[0],
              max: maxEndDate.format().split('T')[0],
              style: { fontSize: 14 },
            },
          }}
        />
      </InputLabel>

      <InputLabel>
        <p>End Time</p>
        <TextField
          className="input time-input"
          type="time"
          disabled={isMinEqualMax()}
          onChange={(e) => handleHours(e.target.value)}
          defaultValue={endDate?.slice(-5) || fixedMinRentPeriodMinutes()}
          inputProps={{ min: minRentTime, style: { fontSize: 14 } }}
        />
      </InputLabel>
    </Grid>
  );
};
