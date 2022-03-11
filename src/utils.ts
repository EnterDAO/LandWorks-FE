/* eslint-disable @typescript-eslint/no-explicit-any */
import BigNumber from 'bignumber.js';
import add from 'date-fns/add';
import formatDuration from 'date-fns/formatDuration';
import intervalToDuration from 'date-fns/intervalToDuration';
import { isAddress } from 'web3-utils';
import { DEFAULT_ADDRESS } from 'web3/utils';

import { Data, DecentralandData, ExtractedTime, ParsedDate } from './modules/land-works/api';

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
  } else if (value.eq(0)) {
    return '0';
  } else {
    if (value.lt(1e-6)) {
      return `~0.00`;
    } else {
      return value.toPrecision(2).replace(/\.?0+$/, '');
    }
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

  const data = buildData(decentralandData.metadata);
  if (data != null && data.name != '') {
    return data.name;
  }

  if (decentralandData.metadata !== '') {
    return decentralandData.metadata;
  }
  if (decentralandData.coordinates.length > 1) {
    return `Estate (${decentralandData.coordinates.length} LAND)`;
  }
  const coordinates = decentralandData.coordinates[0];
  return `LAND (${coordinates.x}, ${coordinates.y})`;
}

export function buildData(csv: string): Data | null {
  const dataEntity: Data = {} as Data;

  if (csv.charAt(0) != '0') {
    return null;
  }

  const data = parseCSV(csv);
  if (data.length === 0 || data[0] != '0') {
    return null;
  }

  dataEntity.version = data[0];

  if (data.length > 1) {
    dataEntity.name = data[1];
  }
  if (data.length > 2) {
    dataEntity.description = data[2];
  }
  if (data.length > 3) {
    dataEntity.ipns = data[3];
  }

  return dataEntity;
}

/**
 * Used for parseCSV() below
 */
enum CSVState {
  BETWEEN = 0,
  UNQUOTED_VALUE = 1,
  QUOTED_VALUE = 2,
}

/**
 * Parses a CSV string into an array of strings.
 * @param csv CSV string.
 * @returns Array of strings.
 */
export function parseCSV(csv: string): Array<string> {
  const values = new Array<string>();
  let valueStart = 0;
  let state = CSVState.BETWEEN;

  for (let i = 0; i < csv.length; i++) {
    if (state == CSVState.BETWEEN) {
      if (csv.charAt(i) != ',') {
        if (csv.charAt(i) == '"') {
          state = CSVState.QUOTED_VALUE;
          valueStart = i + 1;
        } else {
          state = CSVState.UNQUOTED_VALUE;
          valueStart = i;
        }
      }
    } else if (state == CSVState.UNQUOTED_VALUE) {
      if (csv.charAt(i) == ',') {
        values.push(csv.substr(valueStart, i - valueStart));
        state = CSVState.BETWEEN;
      }
    } else if (state == CSVState.QUOTED_VALUE) {
      if (csv.charAt(i) == '"') {
        values.push(csv.substr(valueStart, i - valueStart));
        state = CSVState.BETWEEN;
      }
    }
  }

  return values;
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

export function secondsToDuration(value: number): ParsedDate {
  const result: ParsedDate = {
    minutes: 0,
    hours: 0,
    days: 0,
    weeks: 0,
    months: 0,
  };
  const secondsToMinutes = (value: number) => {
    return Number((value / 60).toFixed(2));
  };

  const minutesToHours = (value: number) => {
    return Number((value / 60).toFixed(2));
  };

  const hoursToDays = (value: number) => {
    return Number((value / 24).toFixed(2));
  };

  const daysToWeeks = (value: number) => {
    return Number((value / 7).toFixed(2));
  };

  const weeksToMonths = (value: number) => {
    return Number((value / 4).toFixed(2));
  };

  result.minutes = secondsToMinutes(value);
  result.hours = minutesToHours(result.minutes);
  result.days = hoursToDays(result.hours);
  result.weeks = daysToWeeks(result.days);
  result.months = weeksToMonths(result.weeks);

  return result;
}

const TIME_TYPES = {
  MINUTE: 'min',
  MINUTES: 'mins',
  HOUR: 'hour',
  HOURS: 'hours',
  DAY: 'day',
  DAYS: 'days',
  WEEK: 'week',
  WEEKS: 'weeks',
  MONTH: 'month',
  MONTHS: 'months',
};

export function getTimeType(values: ParsedDate): ExtractedTime {
  const result: ExtractedTime = {
    timeType: 'minutes',
    timeValue: 0,
  };

  const lessThanHour = values.minutes < 60;
  if (lessThanHour) {
    if (values.minutes === 1) {
      result.timeType = TIME_TYPES.MINUTE;
    } else {
      result.timeType = TIME_TYPES.MINUTES;
    }
    result.timeValue = values.minutes;
  }

  const moreThanHour = values.hours >= 1;
  if (moreThanHour) {
    if (values.hours === 1) {
      result.timeType = TIME_TYPES.HOUR;
    } else {
      result.timeType = TIME_TYPES.HOURS;
    }
    result.timeValue = values.hours;
  }

  const moreThanDay = values.days >= 1;
  if (moreThanDay) {
    if (values.days === 1) {
      result.timeType = TIME_TYPES.DAY;
    } else {
      result.timeType = TIME_TYPES.DAYS;
    }
    result.timeValue = values.days;
  }

  const moreThanWeek = values.weeks >= 1;
  if (moreThanWeek) {
    if (values.weeks === 1) {
      result.timeType = TIME_TYPES.WEEK;
    } else {
      result.timeType = TIME_TYPES.WEEKS;
    }
    result.timeValue = values.weeks;
  }

  const moreThanMonth = values.months >= 1;
  if (moreThanMonth) {
    if (values.months === 1) {
      result.timeType = TIME_TYPES.MONTH;
    } else {
      result.timeType = TIME_TYPES.MONTHS;
    }
    result.timeValue = values.months;
  }

  return result;
}

export function getTimeTypeStr(values: ParsedDate): string {
  const { timeValue, timeType } = getTimeType(values);

  return `${timeValue} ${timeType}`;
}
