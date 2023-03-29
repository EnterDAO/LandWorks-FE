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

export const DEFAULT_LIST_MAX_PERIOD = new BigNumber(2);

export const DEFAULT_LIST_MAX_FUTURE_PERIOD = new BigNumber(3);

export const DECENTRALAND_METAVERSE = '1';

export const VOXEL_METAVERSE = '2';

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
  'size',
];

export const sortDirections: Array<'asc' | 'desc'> = [
  SortDirection.DESC,
  SortDirection.ASC,
  SortDirection.DESC,
  SortDirection.ASC,
  SortDirection.DESC,
  SortDirection.DESC,
  SortDirection.DESC,
  SortDirection.DESC,
];

export const TILES_URL_DECENTRALEND = 'https://api.decentraland.org/v2/tiles';

export const BASE_URL_DECENTRALEND = 'https://api.decentraland.org/v1';

export const TILES_URL_VOXEL = 'https://www.cryptovoxels.com/api/parcels/map.json';

export const DEFAULT_SLICED_PAGE = 4;

export const DEFAULT_SLICED_HISTORY = 6;

export const DEFAULT_TOKEN_ADDRESS = '';

export const TWITTER_PROMOTE_TEXT = `gm. My property just became available on @landworksxyz.\n`;

export const orderEnum: {
  [key: string]: string;
} = {
  totalRents: 'isHot',
  pricePerSecond: 'pricePerMagnitude.usdPrice',
  minPeriod: 'minPeriod',
  maxPeriod: 'maxPeriod',
  timestamp: 'timestamp',
  lastRentTimestamp: 'lastRentTimestamp',
  size: 'additionalData.size',
};

export const DISCORD_CHANNEL_URL = 'https://discord.com/invite/7QJvEctG2G';

export const voxelTypes = [
  {
    value: 0,
    title: 'All',
    desc: 'All available properties in Voxels',
  },
  {
    value: 1,
    title: 'Parcels',
    desc: 'Parcels, or plots, are buildable volumes that are at ground level.',
  },
  {
    value: 2,
    title: 'Unit',
    desc: 'Units are apartments and tend not to be at ground level. In other words, units are usually in a tower.',
  },
  {
    value: 3,
    title: 'Inner',
    desc: 'Turn-key parcels which come prebuilt directly from Voxels.',
  },
];

export const landTypes = [
  {
    value: 0,
    title: 'All',
    desc: 'All parcels and estates.',
  },
  {
    value: 1,
    title: 'Land',
    desc: 'A Land is the smallest possible unit (1x1) in Decentraland.',
  },
  {
    value: 2,
    title: 'Estate',
    desc: 'An Estate is a collection of Lands (more than 1) that are grouped together.',
  },
];

export const listNotificationMessage = [
  '',
  'Once you list your property you can edit the entered rent period but you’ll have to pay a network fee.',
  'Once you list your property you can edit the entered rent price but you’ll have to pay a network fee.',
  '',
  'There is a network fee in order to list the property.',
];

export const listTypes = [
  [],
  [
    { value: 0, label: 'All types' },
    { value: 1, label: 'Land' },
    { value: 2, label: 'Estate' },
  ],
  [
    { value: 0, label: 'All types' },
    { value: 1, label: 'Parcel' },
    { value: 2, label: 'Unit' },
    { value: 3, label: 'Inner' },
  ],
];

export const buyingListTypes = [
  { value: 1, label: 'Land' },
  // { value: 2, label: 'Estate' },
];

export enum RentStatus {
  All = 0,
  Available = 1,
  Rented = 2,
}
