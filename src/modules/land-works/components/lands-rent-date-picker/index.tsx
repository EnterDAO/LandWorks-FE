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
    // The date is before the allowed min period
    const tooEarlyDate = current.date() < minRentPeriod.date();
    const tooEarlyMonth = current.month() === minRentPeriod.month();
    const tooEarlyYear = current.year() === minRentPeriod.year();

    const isТooEarlytDate = tooEarlyDate && tooEarlyMonth && tooEarlyYear;

    if (isТooEarlytDate) {
      return tooEarlyDate;
    }

    // The date is after the allowed max period
    const tooLate = current > maxEndDate;
    return tooLate;
  };

  function disabledRangeTime(current: Moment | null, type: string): any {
    const minRentDate = current?.date() === minRentPeriod.date();
    const minRentMonth = current?.month() === minRentPeriod.month();
    const minRentYear = current?.year() === minRentPeriod.year();

    const isMinRentDate = minRentDate && minRentMonth && minRentYear;

    if (isMinRentDate) {
      return {
        disabledHours: () => range(0, 24).filter(h => h <= minRentPeriod.hour()),
        disabledMinutes: () => range(0, 60).filter(m => m <= minRentPeriod.minute()),
      };
    }

    const maxDate = current?.date() === maxEndDate.date();
    const maxMonth = current?.month() === maxEndDate.month();
    const maxYear = current?.year() === maxEndDate.year();

    const isMaxRangeDate = maxDate && maxMonth && maxYear;

    if (isMaxRangeDate) {
      return {
        disabledHours: () => range(0, 24).filter(h => h >= maxEndDate.hour()),
        disabledMinutes: () => range(0, 60).filter(m => m >= maxEndDate.minute()),
      };
    }
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
