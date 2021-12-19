import format from 'date-fns/format';
import fromUnixTime from 'date-fns/fromUnixTime';

const dateFormat = 'dd.MM.yyyy HH:ss';

export const isDateBeforeNow = (timestamp: string) => {
  const milisecTimestamp = Number(timestamp + '000');
  const timestampDate = new Date(milisecTimestamp);
  const now = new Date();

  return now < timestampDate;
};

export const timestampSecondsToDate = (timestamp: string) => {
  const endDate = fromUnixTime(Number(timestamp));
  return format(endDate, dateFormat);
};
