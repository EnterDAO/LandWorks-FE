/* eslint-disable @typescript-eslint/ban-ts-comment */
import BigNumber from 'bignumber.js';

import { AssetEntity } from 'modules/land-works/api';
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

export const sortColumns = ['totalRents', 'pricePerSecond', 'pricePerSecond'];

export const sortDirections = [SortDirection.DESC, SortDirection.ASC, SortDirection.DESC];

export const metaverseOptions = ['Decentraland'];

export const TILES_URL_DECENTRALEND = 'https://api.decentraland.org/v2/tiles';

export const BASE_URL_DECENTRALEND = 'https://api.decentraland.org/v1';

export const DEFAULT_SLICED_PAGE = 4;

export const DEFAULT_TOKEN_ADDRESS = '';
// export const DEFAULT_TOKEN_ADDRESS = '0x0000000000000000000000000000000000000001';

export const MY_PROPERTIES_TAB_STATE_ALL = 'all';

export const MY_PROPERTIES_TAB_STATE_RENTED = 'rented';

export const MY_PROPERTIES_TAB_STATE_LENT = 'lent';

const row: AssetEntity = {
  id: '48',
  metaverseAssetId: '46618684268168569494482321218152244969611',
  minPeriod: new BigNumber('604800'),
  maxPeriod: new BigNumber('1814400'),
  maxFutureTime: new BigNumber('1814400'),
  unclaimedRentFee: new BigNumber('0'),
  pricePerSecond: new BigNumber('11574074074074'),
  lastRentEnd: '0',
  status: 'LISTED',
  totalRents: '0',
  paymentToken: {
    id: '0x0000000000000000000000000000000000000001',
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
    // @ts-ignore
    __typename: 'PaymentToken',
  },
  decentralandData: {
    metadata: '',
    isLAND: true,
    coordinates: [
      {
        id: '137-139',
        x: '137',
        y: '139',
        __typename: 'CoordinatesLAND',
      },
    ],
    // @ts-ignore
    __typename: 'DecentralandData',
  },
  __typename: 'Asset',
  humanPricePerSecond: new BigNumber('0.000011574074074074'),
  name: 'LAND (137, 139)',
  isHot: false,
  operator: '0x0000000000000000000000000000000000000000',
  minPeriodTimedType: '1 week',
  maxPeriodTimedType: '3 weeks',
  maxFutureTimeTimedType: '3 weeks',
  isAvailable: true,
  availability: {
    isRentable: true,
    isCurrentlyAvailable: true,
    availabilityAfter: '0 minutes',
    startRentDate: 1647531534,
    minRentDate: 1648136334,
    maxRentDate: 1649345934,
    label: '1 week-3 weeks',
    availabilityTime: {
      minAvailabilityTime: 1,
      minAvailabilityType: 'week',
      maxAvailabilityType: 'weeks',
      maxAvailabilityTime: 3,
    },
    maxRentPeriodType: 'minutes',
    maxRentPeriodTime: 0,
  },
  pricePerMagnitude: {
    price: new BigNumber('0.9999999999999936'),
    usdPrice: new BigNumber('2814.769999999981985472'),
    magnitude: 'day',
  },
};

const assetEntityFake: AssetEntity[] = [];

for (let ix = 0; ix < 45; ix++) {
  assetEntityFake.push(row);
}

export const fakeData = assetEntityFake;
