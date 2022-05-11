/* eslint-disable @typescript-eslint/ban-ts-comment */
import BigNumber from 'bignumber.js';

import { SortDirection } from 'modules/land-works/models/SortDirection';

import {
  DAY_IN_SECONDS,
  HOUR_IN_SECONDS,
  MINUTE_IN_SECONDS,
  MONTH_IN_SECONDS,
  ONE_HUNDRED_YEARS_IN_SECONDS,
  WEEK_IN_SECONDS,
} from 'utils/date';

export const PlaceOptions = [
  {
    label: 'Decentraland',
    value: '1',
  },
];

export const MinRentPeriodOptions = [
  {
    label: 'mins',
    value: MINUTE_IN_SECONDS,
  },
  {
    label: 'hours',
    value: HOUR_IN_SECONDS,
  },
  {
    label: 'days',
    value: DAY_IN_SECONDS,
  },
  {
    label: 'weeks',
    value: WEEK_IN_SECONDS,
  },
  {
    label: 'months',
    value: MONTH_IN_SECONDS,
  },
];

export const MaxRentPeriodOptions = [
  {
    label: 'mins',
    value: MINUTE_IN_SECONDS,
  },
  {
    label: 'hours',
    value: HOUR_IN_SECONDS,
  },
  {
    label: 'days',
    value: DAY_IN_SECONDS,
  },
  {
    label: 'weeks',
    value: WEEK_IN_SECONDS,
  },
  {
    label: 'months',
    value: MONTH_IN_SECONDS,
  },
];

export const AtMostRentPeriodOptions = [
  {
    label: 'mins',
    value: MINUTE_IN_SECONDS,
  },
  {
    label: 'hours',
    value: HOUR_IN_SECONDS,
  },
  {
    label: 'days',
    value: DAY_IN_SECONDS,
  },
  {
    label: 'weeks',
    value: WEEK_IN_SECONDS,
  },
  {
    label: 'months',
    value: MONTH_IN_SECONDS,
  },
];

export const DEFAULT_MIN_PERIOD = new BigNumber(1);

export const DEFAULT_MAX_PERIOD = new BigNumber(ONE_HUNDRED_YEARS_IN_SECONDS);

export const FEE_PRECISION = 100_000;

export const DEFAULT_PROPERTY = { label: '', value: '' };

export const DEFAULT_LIST_MAX_PERIOD = new BigNumber(1);

export const DEFAULT_LIST_MAX_FUTURE_PERIOD = new BigNumber(3);

export const DECENTRALAND_METAVERSE = '1';

export const DEFAULT_LAST_RENT_END = '0';

export const pageSizeOptions = ['8', '12', '24'];

export const sortColumns = [
  'totalRents',
  'pricePerSecond',
  'pricePerSecond',
  'minPeriod',
  'maxPeriod',
  'timestamp',
  'lastRentTimestamp',
];

export const sortDirections = [
  SortDirection.DESC,
  SortDirection.ASC,
  SortDirection.DESC,
  SortDirection.ASC,
  SortDirection.DESC,
  SortDirection.DESC,
  SortDirection.DESC,
];

export const TILES_URL_DECENTRALEND = 'https://api.decentraland.org/v2/tiles';

export const BASE_URL_DECENTRALEND = 'https://api.decentraland.org/v1';

export const DEFAULT_SLICED_PAGE = 4;

export const DEFAULT_SLICED_HISTORY = 6;

export const DEFAULT_TOKEN_ADDRESS = '';

export const MY_PROPERTIES_TAB_STATE_ALL = 'all';

export const MY_PROPERTIES_TAB_STATE_RENTED = 'rented';

export const MY_PROPERTIES_TAB_STATE_LENT = 'lent';

export const TWITTER_TEXT = `gm. Just listed my property at @landworksxyz.\n`;
