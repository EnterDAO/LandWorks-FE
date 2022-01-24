import { DatePicker } from 'antd';
import moment, { Moment } from 'moment';

const { RangePicker } = DatePicker;

export const RentDatePicker = (props: any) => {
  const { minStartDate, minRentPeriod, maxEndDate, handleRentDateChange } = props;

  function range(start: any, end: any) {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  const disabledDate = (current: any) => {
    const isBefore = current.isBefore(minRentPeriod, 'year');
    const isAfter = current.isAfter(maxEndDate, 'hour');
    const isSameEndDay = current.isSame(maxEndDate, 'day');

    if (isBefore) {
      return isBefore;
    }

    if (isAfter && !isSameEndDay) {
      return isAfter;
    }
  };

  function disabledRangeTime(current: Moment | null, type: string): any {
    const minRentDate = current?.date() === minRentPeriod.date();
    const minRentMonth = current?.month() === minRentPeriod.month();
    const minRentYear = current?.year() === minRentPeriod.year();

    const maxDate = current?.date() === maxEndDate.date();
    const maxMonth = current?.month() === maxEndDate.month();
    const maxYear = current?.year() === maxEndDate.year();

    const isMaxRangeDate = maxDate && maxMonth && maxYear;
    const isMinRentDate = minRentDate && minRentMonth && minRentYear;

    let disabledHours: number[] = [];
    let disabledMins: number[] = [];

    if (isMinRentDate) {
      const dHours = range(0, 24).filter((h) => h < minRentPeriod.hour());

      // Disable the hours only if its the same hour
      if (current?.hour() === minRentPeriod.hour()) {
        const dMins = range(0, 60).filter((m) => m < minRentPeriod.minute());
        disabledMins = [...disabledMins, ...dMins];
      }

      disabledHours = [...disabledHours, ...dHours];
    }

    if (isMaxRangeDate) {
      const dHours = range(0, 24).filter((h) => h > maxEndDate.hour());
      disabledHours = [...disabledHours, ...dHours];

      // Disable the hours only if its the same hour
      if (current?.hour() === maxEndDate.hour()) {
        const dMins = range(0, 60).filter((m) => m > maxEndDate.minute());
        disabledMins = [...disabledMins, ...dMins];
      }
    }

    return {
      disabledHours: () => disabledHours,
      disabledMinutes: () => disabledMins,
    };
  }

  return (
    <RangePicker
      disabledDate={disabledDate}
      disabledTime={disabledRangeTime}
      onChange={handleRentDateChange}
      defaultValue={[minStartDate, minRentPeriod]}
      showTime={{ format: 'HH:mm' }}
      disabled={[true, false]}
      className="button-primary"
      bordered={false}
      allowClear={false}
    />
  );
};
