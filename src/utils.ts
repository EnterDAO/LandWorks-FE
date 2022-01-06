import BigNumber from 'bignumber.js';
import add from 'date-fns/add';
import formatDuration from 'date-fns/formatDuration';
import intervalToDuration from 'date-fns/intervalToDuration';
import { isAddress } from 'web3-utils';
import { DEFAULT_ADDRESS } from 'web3/utils';

import { PricePerMagnitude } from './modules/land-works/api';

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

export function getFormattedTime(value: number): string {
  const start = new Date().getTime();
  const end = add(start, { seconds: value }).valueOf();

  const duration = intervalToDuration({
    start,
    end: start > end ? start : end,
  });

  const formattedDuration = formatDuration(duration, {
    format: ['months', 'days', 'hours', 'minutes', 'seconds'],
    delimiter: ',',
    zero: false,
  });

  // Gets the biggest denomination
  return formattedDuration.split(',')[0];
}

export function formatBigNumber(value: BigNumber): string {
  if (value.gt(1)) {
    return value.toFixed(2)
  } else {
    return value.toPrecision(1)
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

export function doSequential<T, K = any>(
  tasks: T[],
  callback: (task: T, index: number) => Promise<K>,
): Promise<(K | undefined)[]> {
  const results: (K | undefined)[] = [];

  return tasks
    .reduce(
      (p, task, index) =>
        p
          .then(() => callback(task, index))
          .then(result => results.push(result))
          .catch(() => results.push(undefined)) as Promise<any>,
      Promise.resolve(),
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
