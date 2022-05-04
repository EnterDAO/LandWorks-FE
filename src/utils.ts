/* eslint-disable @typescript-eslint/no-explicit-any */
import BigNumber from 'bignumber.js';
import add from 'date-fns/add';
import formatDuration from 'date-fns/formatDuration';
import intervalToDuration from 'date-fns/intervalToDuration';
import { isAddress } from 'web3-utils';
import { DEFAULT_ADDRESS } from 'web3/utils';

import config from './config';
import { AssetEntity, Data, DecentralandData, ExtractedTime, ParsedDate } from './modules/land-works/api';

import { DAY_IN_SECONDS, HOUR_IN_SECONDS, MINUTE_IN_SECONDS, MONTH_IN_SECONDS, WEEK_IN_SECONDS } from './utils/date';

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

export function formatBigNumberInput(value: BigNumber): string {
  if (value.gt(1)) {
    return value.toFixed(2);
  } else if (value.eq(0)) {
    return '0';
  } else {
    if (value.lt(1e-6)) {
      return value.toFixed();
    } else {
      return value.toPrecision(2).replace(/\.?0+$/, '');
    }
  }
}

export function formatShortDescription(desc: string): string {
  const limitStringLength = desc.slice(0, 105);
  const cutOff = limitStringLength.lastIndexOf(' ');
  const shortenedDescription = limitStringLength.substring(0, cutOff);
  if (desc.length > 105) {
    return `${shortenedDescription}...`;
  } else {
    return desc;
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

export function getAssetName(asset: AssetEntity): string {
  if (isDecentralandMetaverseRegistry(asset.metaverseRegistry?.id.toLowerCase() || '')) {
    return getDecentralandAssetName(asset.decentralandData);
  } else {
    return `${asset.metaverse.name} #${asset.metaverseAssetId}`;
  }
}

export function getDecentralandAssetName(decentralandData: DecentralandData | null | undefined): string {
  if (decentralandData === null || decentralandData === undefined) {
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

export function isDecentralandMetaverseRegistry(registry: string): boolean {
  return (
    registry === config.contracts.decentraland.landRegistry.toLowerCase() ||
    registry === config.contracts.decentraland.estateRegistry.toLowerCase()
  );
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
    return Number((value / MINUTE_IN_SECONDS).toFixed(2));
  };

  const secondsToHours = (value: number) => {
    return Number((value / HOUR_IN_SECONDS).toFixed(2));
  };

  const secondsToDays = (value: number) => {
    return Number((value / DAY_IN_SECONDS).toFixed(2));
  };

  const secondsToWeeks = (value: number) => {
    return Number((value / WEEK_IN_SECONDS).toFixed(2));
  };

  const secondsToMonths = (value: number) => {
    return Number((value / MONTH_IN_SECONDS).toFixed(2));
  };

  result.minutes = secondsToMinutes(value);
  result.hours = secondsToHours(value);
  result.days = secondsToDays(value);
  result.weeks = secondsToWeeks(value);
  result.months = secondsToMonths(value);

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

export function getTimeType(duration: ParsedDate): ExtractedTime {
  const result: ExtractedTime = {
    timeType: 'minutes',
    timeValue: 0,
  };

  if (duration.months >= 1) {
    if (duration.months == 1) {
      return {
        timeType: TIME_TYPES.MONTH,
        timeValue: duration.months,
      } as ExtractedTime;
    } else {
      return {
        timeType: TIME_TYPES.MONTHS,
        timeValue: duration.months,
      } as ExtractedTime;
    }
  }

  if (duration.weeks >= 1) {
    if (duration.weeks == 1) {
      return {
        timeType: TIME_TYPES.WEEK,
        timeValue: duration.weeks,
      } as ExtractedTime;
    } else {
      return {
        timeType: TIME_TYPES.WEEKS,
        timeValue: duration.weeks,
      } as ExtractedTime;
    }
  }

  if (duration.days >= 1) {
    if (duration.days == 1) {
      return {
        timeType: TIME_TYPES.DAY,
        timeValue: duration.days,
      } as ExtractedTime;
    } else {
      return {
        timeType: TIME_TYPES.DAYS,
        timeValue: duration.days,
      } as ExtractedTime;
    }
  }

  if (duration.hours >= 1) {
    if (duration.hours == 1) {
      return {
        timeType: TIME_TYPES.HOUR,
        timeValue: duration.hours,
      } as ExtractedTime;
    } else {
      return {
        timeType: TIME_TYPES.HOURS,
        timeValue: duration.hours,
      } as ExtractedTime;
    }
  }

  if (duration.minutes >= 1) {
    if (duration.minutes == 1) {
      return {
        timeType: TIME_TYPES.MINUTE,
        timeValue: duration.minutes,
      } as ExtractedTime;
    } else {
      return {
        timeType: TIME_TYPES.MINUTES,
        timeValue: duration.minutes,
      } as ExtractedTime;
    }
  }

  return result;
}

export function getTimeTypeStr(values: ParsedDate): string {
  const { timeValue, timeType } = getTimeType(values);

  return `${timeValue} ${timeType}`;
}

export const sessionStorageHandler = (
  option: 'get' | 'set',
  key: string,
  name: string,
  value?: string | number | boolean
): any => {
  const filters = sessionStorage.getItem(key);
  if (filters == null) {
    if (option == 'get') {
      return;
    } else {
      return sessionStorage.setItem(key, JSON.stringify({ [`${name}`]: value }));
    }
  }

  return option === 'get'
    ? JSON.parse(filters)[name]
    : sessionStorage.setItem(key, JSON.stringify({ ...JSON.parse(filters), [`${name}`]: value }));
};
