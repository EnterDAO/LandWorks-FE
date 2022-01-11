import BigNumber from 'bignumber.js';
import add from 'date-fns/add';
import formatDuration from 'date-fns/formatDuration';
import intervalToDuration from 'date-fns/intervalToDuration';
import { isAddress } from 'web3-utils';
import { DEFAULT_ADDRESS } from 'web3/utils';

import { DecentralandData, PricePerMagnitude } from './modules/land-works/api';

import {
  DAY_IN_SECONDS,
  HOUR_IN_SECONDS,
  MINUTE_IN_SECONDS,
  MONTH_IN_SECONDS,
  WEEK_IN_SECONDS,
  YEAR_IN_SECONDS,
} from './utils/date';

export function getNowTs(): number {
  return Math.floor(Date.now() / 1_000);
}

export function inRange(value: number, min: number, max: number): boolean {
  return min < value && value < max;
}

export function getFormattedTime(value: number, options?: string[]): string {
  const start = new Date().getTime();
  const end = add(start, { seconds: value }).valueOf();

  const duration = intervalToDuration({
    start,
    end: start > end ? start : end,
  });

  const formattedDuration = formatDuration(duration, {
    format: options?.length ? options : ['months', 'days', 'hours', 'minutes', 'seconds'],
    delimiter: ',',
    zero: false,
  });

  // Gets the biggest denomination
  return formattedDuration.split(',')[0];
}

export function formatBigNumber(value: BigNumber): string {
  if (value.gt(1)) {
    return value.toFixed(2);
  } else {
    return value.toPrecision(1);
  }
}

/**
 * Converts pricePerSecond to a price depending on the magnitude (year, month, week, day, hour, minute, second)
 * @param pricePerSecond
 * @param magnitude - year, month, week, day, hour, minute, second
 */
export function calculatePricePerMagnitude(pricePerSecond: BigNumber, magnitude: string): PricePerMagnitude {
  switch (magnitude) {
    case 'year':
    case 'years':
      return {
        price: pricePerSecond.multipliedBy(YEAR_IN_SECONDS).toString(10),
        magnitude: 'year',
      };
    case 'month':
    case 'months':
      return {
        price: pricePerSecond.multipliedBy(MONTH_IN_SECONDS).toString(10),
        magnitude: 'month',
      };
    case 'week':
    case 'weeks':
      return {
        price: pricePerSecond.multipliedBy(WEEK_IN_SECONDS).toString(10),
        magnitude: 'week',
      };
    case 'day':
    case 'days':
      return {
        price: pricePerSecond.multipliedBy(DAY_IN_SECONDS).toString(10),
        magnitude: 'day',
      };
    case 'hour':
    case 'hours':
      return {
        price: pricePerSecond.multipliedBy(HOUR_IN_SECONDS).toString(10),
        magnitude: 'hour',
      };
    case 'minute':
    case 'minutes':
      return {
        price: pricePerSecond.multipliedBy(MINUTE_IN_SECONDS).toString(10),
        magnitude: 'minute',
      };
    default:
      return {
        price: pricePerSecond.toString(10),
        magnitude: 'second',
      };
  }
}

export function getFormattedDuration(value?: number, endValue?: number): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  const start = new Date().getTime();
  const end = endValue !== undefined ? endValue : add(start, { seconds: value }).valueOf();

  const duration = intervalToDuration({
    start,
    end: start > end ? start : end,
  });

  return formatDuration(duration, {
    format: ['months', 'days', 'hours', 'minutes', 'seconds'],
    delimiter: ' ',
    zero: true,
    locale: {
      formatDistance(token, val) {
        let v: number | undefined;

        switch (token) {
          case 'xMonths':
            return val > 0 ? `${val}mo` : '';
          case 'xDays':
            v = duration.months ?? 0;
            return val > 0 || v > 0 ? `${val}d` : '';
          case 'xHours':
            v = (duration.months ?? 0) + (duration.days ?? 0);
            return val > 0 || v > 0 ? `${val}h` : '';
          case 'xMinutes':
            v = (duration.months ?? 0) + (duration.days ?? 0) + (duration.hours ?? 0);
            return val > 0 || v > 0 ? `${val}m` : '';
          case 'xSeconds':
            v = (duration.months ?? 0) + (duration.days ?? 0) + (duration.hours ?? 0) + (duration.minutes ?? 0);
            return val > 0 || v > 0 ? `${val}s` : '';
          default:
        }

        return undefined;
      },
    },
  });
}

export function isValidAddress(value: string | undefined): boolean {
  return !!value && isAddress(value) && value !== DEFAULT_ADDRESS;
}

export function getDecentralandAssetName(decentralandData: DecentralandData): string {
  if (decentralandData === null) {
    return '';
  }
  if (decentralandData.metadata !== '') {
    return decentralandData.metadata;
  }
  if (decentralandData.coordinates.length > 1) {
    return `Estate (${decentralandData.coordinates.length} LAND)`;
  }
  const coordinates = decentralandData.coordinates[0].id.split('-');
  return `LAND (${coordinates[0]}, ${coordinates[1]})`;
}

export function doSequential<T, K = any>(
  tasks: T[],
  callback: (task: T, index: number) => Promise<K>
): Promise<(K | undefined)[]> {
  const results: (K | undefined)[] = [];

  return tasks
    .reduce(
      (p, task, index) =>
        p
          .then(() => callback(task, index))
          .then((result) => results.push(result))
          .catch(() => results.push(undefined)) as Promise<any>,
      Promise.resolve()
    )
    .then(() => results);
}

export function toNumber(value: number | string | undefined): number | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }

  const val = Number(value);

  if (!Number.isFinite(val)) {
    return undefined;
  }

  return val;
}

export type ParsedDate = {
  minutes: number;
  hours: number;
  days: number;
  weeks: number;
};

export function secondsToDuration(value: number): ParsedDate {
  const result: ParsedDate = {
    minutes: 0,
    hours: 0,
    days: 0,
    weeks: 0,
  };
  const secondsToMinutes = (value: number) => {
    return value / 60;
  };

  const minutesToHours = (value: number) => {
    return value / 60;
  };

  const hoursToDays = (value: number) => {
    return value / 24;
  };

  const daysToWeeks = (value: number) => {
    return value / 7;
  };

  result.minutes = secondsToMinutes(value);
  result.hours = minutesToHours(result.minutes);
  result.days = hoursToDays(result.hours);
  result.weeks = daysToWeeks(result.days);

  return result;
}

type ExtractedTime = {
  timeType: string;
  timeValue: number;
};

const TIME_TYPES = {
  MINUTES: 'minutes',
  HOURS: 'hours',
  DAYS: 'days',
  WEEKS: 'weeks',
};

export function getTimeType(values: ParsedDate): ExtractedTime {
  const result: ExtractedTime = {
    timeType: 'minutes',
    timeValue: 0,
  };

  const lessThanHour = values.minutes < 60;
  if (lessThanHour) {
    result.timeType = TIME_TYPES.MINUTES;
    result.timeValue = values.minutes;
  }

  const moreThanHour = values.hours >= 1;
  if (moreThanHour) {
    result.timeType = TIME_TYPES.HOURS;
    result.timeValue = values.hours;
  }

  const moreThanDay = values.days >= 1;
  if (moreThanDay) {
    result.timeType = TIME_TYPES.DAYS;
    result.timeValue = values.days;
  }

  const moreThanWeek = values.weeks >= 1;
  if (moreThanWeek) {
    result.timeType = TIME_TYPES.WEEKS;
    result.timeValue = values.weeks;
  }

  return result;
}
