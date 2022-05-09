/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { gql } from '@apollo/client';
import BigNumber from 'bignumber.js';
import { constants } from 'ethers';

import { getCryptoVoxelsAsset, getLandImageUrl } from 'helpers/helpers';
import { getUsdPrice } from 'providers/known-tokens-provider';

import { GraphClient } from '../../web3/graph/client';
import { AssetStatus } from './models/AssetStatus';

import {
  getDecentralandAssetName,
  getNowTs,
  getTimeType,
  getTimeTypeStr,
  isDecentralandMetaverseRegistry,
  secondsToDuration,
} from '../../utils';
import { DAY_IN_SECONDS, ONE_HUNDRED_YEARS_IN_SECONDS, ONE_SECOND } from '../../utils/date';
import { MAX_UINT_256, getCryptoVexelsPlayUrl, getDecentralandPlayUrl, getHumanValue } from '../../web3/utils';

export const ASSET_SUBSCRIPTION = gql`
  subscription GetAsset($id: String) {
    asset(id: $id) {
      id
      metaverse {
        name
      }
      metaverseRegistry {
        id
      }
      owner {
        id
      }
      consumer {
        id
      }
      minPeriod
      maxPeriod
      maxFutureTime
      lastRentEnd
      paymentToken {
        id
        name
        symbol
        decimals
        feePercentage
      }
      totalRents
      unclaimedRentFee
      pricePerSecond
      lastRentEnd
      status
      consumer
      decentralandData {
        metadata
        isLAND
        coordinates {
          id
          x
          y
        }
      }
      operator
      metaverseAssetId
    }
  }
`;

export const USER_SUBSCRIPTION = (paymentToken?: string | null) => gql`
  subscription GetUser($id: String, $metaverse: String, ${paymentToken ? '$paymentToken: String' : ''}) {
    user(id: $id) {
      id
      consumerTo (where: { metaverse: $metaverse ${paymentToken ? 'paymentToken : $paymentToken' : ''}}) {
        id
        metaverse {
          name
        }
        metaverseRegistry {
          id
        }
        minPeriod
        maxPeriod
        maxFutureTime
        unclaimedRentFee
        pricePerSecond
        lastRentEnd
        status
        totalRents
        paymentToken {
          id
          name
          symbol
          decimals
        }
        decentralandData {
          metadata
          isLAND
          coordinates {
            id
            x
            y
          }
        }
      }
      assets(where: { metaverse: $metaverse ${paymentToken ? 'paymentToken : $paymentToken' : ''}}) {
        id
        metaverseAssetId
        metaverse {
          name
        }
        metaverseRegistry {
          id
        }
        minPeriod
        maxPeriod
        maxFutureTime
        unclaimedRentFee
        pricePerSecond
        lastRentEnd
        status
        totalRents
        paymentToken {
          id
          name
          symbol
          decimals
        }
        decentralandData {
          metadata
          isLAND
          coordinates {
            id
            x
            y
          }
        }
      }
      rents {
        asset {
          metaverseAssetId
          metaverseRegistry {
            id
          }
          totalRents
          decentralandData {
            metadata
            isLAND
            coordinates {
              id
              x
              y
            }
          }
        }
      }
    }
  }
`;

export const USER_CLAIM_SUBSCRIPTION = gql`
  subscription GetUser($id: String) {
    user(id: $id) {
      id
      consumerTo {
        id
        metaverseAssetId
        metaverse {
          name
        }
        metaverseRegistry {
          id
        }
        unclaimedRentFee
        paymentToken {
          id
          name
          symbol
          decimals
        }
        decentralandData {
          id
          metadata
          isLAND
          coordinates {
            id
            x
            y
          }
        }
      }
      assets {
        id
        metaverseAssetId
        metaverse {
          name
        }
        metaverseRegistry {
          id
        }
        unclaimedRentFee
        decentralandData {
          id
          metadata
          isLAND
          coordinates {
            id
            x
            y
          }
        }
        paymentToken {
          id
          name
          symbol
          decimals
        }
      }
    }
  }
`;

export const USER_CLAIM_HISTORY_SUBSCRIPTION = gql`
  subscription GetUserClaimHistory($id: String, $metaverse: String) {
    user(id: $id) {
      id
      claimHistory(orderBy: timestamp, orderDirection: desc, where: { metaverse: $metaverse }) {
        id
        asset {
          metaverseAssetId
          metaverse {
            name
          }
          metaverseRegistry {
            id
          }
          status
          decentralandData {
            id
            metadata
            isLAND
            coordinates {
              id
              x
              y
            }
          }
        }
        paymentToken {
          id
          name
          symbol
          decimals
        }
        txHash
        amount
        timestamp
      }
    }
  }
`;

export const ASSET_RENTS_SUBSCRIPTION = gql`
  subscription GetAssetRents($id: String, $limit: Int, $offset: Int) {
    asset(id: $id) {
      totalRents
      metaverse {
        name
      }
      metaverseRegistry {
        id
      }
      rents(first: $limit, skip: $offset, orderBy: end, orderDirection: desc) {
        id
        renter {
          id
        }
        start
        operator
        end
        txHash
        timestamp
        fee
        paymentToken {
          id
          name
          symbol
          decimals
        }
      }
    }
  }
`;

export const USER_ASSET_RENTS_SUBSCRIPTION = gql`
  subscription GetAssetUserRents($id: String, $renter: String) {
    asset(id: $id) {
      metaverse {
        name
      }
      metaverseRegistry {
        id
      }
      rents(where: { renter: $renter }, orderBy: end, orderDirection: desc) {
        id
        renter {
          id
        }
        start
        operator
        end
        txHash
        timestamp
        fee
        paymentToken {
          id
          name
          symbol
          decimals
        }
      }
    }
  }
`;

export type getNftMetaType = (id: string | number) => Promise<any>;

type PaginatedResult<T extends Record<string, any>> = {
  data: T[];
  meta: {
    count: number;
  };
};

export type APIOverviewData = {
  totalListings: BigNumber;
  totalRents: BigNumber;
  administrativeOperator: string;
};

export function fetchOverviewData(): Promise<APIOverviewData> {
  return GraphClient.get({
    query: gql`
      query GetOverview {
        overview(id: "OVERVIEW") {
          totalListings
          totalRents
          administrativeOperator
        }
      }
    `,
  })
    .then((result) => {
      return {
        ...result.data.overview,
      };
    })
    .catch((e) => {
      console.log(e);
      return { data: {} };
    });
}

export type PricePerMagnitude = {
  price: BigNumber;
  usdPrice: BigNumber | undefined;
  magnitude: string;
};

export type DecentralandData = {
  metadata: string;
  isLAND: boolean;
  coordinates: any[];
  asset: AssetEntity;
};

export type Data = {
  name: string;
  description: string;
  ipns: string;
  version: string;
};

export type CoordinatesLand = {
  id: string;
  x: string;
  y: string;
};

export type CoordinatesLandWithLandId = CoordinatesLand & {
  landId: string;
};

export type PaymentToken = {
  id: string;
  feePercentage: BigNumber | number;
  name: string;
  symbol: string;
  decimals: number;
};

export type AssetEntity = {
  metaverseAssetId: string;
  metaverseRegistry: IdEntity | null;
  id: string;
  name: string;
  type: string;
  minPeriod: BigNumber;
  minPeriodTimedType: string;
  maxPeriod: BigNumber;
  maxPeriodTimedType: string;
  maxFutureTime: BigNumber;
  maxFutureTimeTimedType: string;
  pricePerSecond: BigNumber;
  humanPricePerSecond: BigNumber;
  pricePerMagnitude: PricePerMagnitude;
  unclaimedRentFee: BigNumber;
  paymentToken: PaymentToken;
  consumer?: IdEntity;
  availability: AssetAvailablity;
  attributes: AssetAttributes;
  isHot: boolean;
  imageUrl: string;
  externalUrl: string | undefined;
  decentralandData?: DecentralandData;
  place: string[] | null;
  metaverse: {
    name: string;
  };
  owner: IdEntity;
  operator: string;
  status: string;
  rents: RentEntity[];
  lastRentEnd: string;
  isAvailable: boolean;
  additionalData?: AdditionalDecantralandData;
};

export type AdditionalDecantralandData = {
  size: number;
  externalUrl: string;
  description: string;
  tokenId: string;
  attributes: additionalAttributes;
};

type additionalAttributes = {
  trait_type: 'X' | 'Y' | 'Distance to District' | 'Distance to Plaza' | 'Distance to Road';
  value: number;
  display_type: string;
};

export type CryptoVoxelsType = {
  name: string;
  image: string;
  description: string;
  attributes: AssetAttributes;
  external_url: string;
  background_color: string;
};

type AssetAttributes = {
  area: number;
  width: number;
  depth: number;
  height: number;
  elevation: number;
  suburb: string;
  island: string;
  has_basement: boolean;
  title: string;
  waterfront: boolean;
  closestCommon: string;
};

export type Rent = {
  operator: string;
  asset: AssetEntity;
  end: string;
  start: string;
  id: string | null | undefined;
  name: string;
};

export type AssetAvailablity = {
  isRentable: boolean;
  isCurrentlyAvailable: boolean;
  availabilityAfter: string;
  label: string;
  maxRentDate: number;
  minRentDate: number;
  startRentDate: number;
  availabilityTime: AvailabilityTime;
  maxRentPeriodType: string;
  maxRentPeriodTime: number;
};

export type AvailabilityTime = {
  minAvailabilityTime: number;
  minAvailabilityType: string;
  maxAvailabilityType: string;
  maxAvailabilityTime: number;
};

export type IdEntity = {
  id: string;
};

export type RentEntity = {
  id: string;
  operator: string;
  start: string;
  end: string;
  timestamp: string;
  txHash: string;
  fee: any;
  paymentToken: PaymentToken;
  renter: IdEntity;
  renterAddress: string;
  price: string;
  asset?: AssetEntity;
};

export type UserEntity = {
  id: string;
  hasUnclaimedRent: boolean;
  assets: any;
  consumerTo: any;
  rents: any;
  unclaimedRentAssets: any[];
  ownerAndConsumerAssets: AssetEntity[];
};

export type ClaimHistory = {
  id: string;
  asset: any;
  amount: BigNumber;
  paymentToken: PaymentToken;
  txHash: string;
  timestamp: number;
};

export type ParsedDate = {
  minutes: number;
  hours: number;
  days: number;
  weeks: number;
  months: number;
};

export type ExtractedTime = {
  timeType: string;
  timeValue: number;
};

/**
 * Gets all Decentraland assets, that have coordinates from the provided.
 * @param coordinates An array of coordinates, each coordinate in the following format: `{x}-{y}`.
 */
export function fetchAdjacentDecentralandAssets(coordinates: string[]): Promise<AssetEntity[]> {
  return GraphClient.get({
    query: gql`
      query getAdjacentAssets($ids: [String]) {
        coordinatesLANDs(where: { id_in: $ids }) {
          id
          data {
            id
            asset {
              id
              owner {
                id
              }
              metaverse {
                name
              }
              metaverseAssetId
              metaverseRegistry {
                id
              }
              minPeriod
              maxPeriod
              maxFutureTime
              pricePerSecond
              lastRentEnd
              status
              paymentToken {
                name
                symbol
                decimals
              }
              decentralandData {
                metadata
                isLAND
                coordinates {
                  id
                  x
                  y
                }
              }
            }
          }
        }
      }
    `,
    variables: {
      ids: coordinates,
    },
  })
    .then(async (response) => {
      const mappedAssets = response.data.coordinatesLANDs
        ?.map((coords: any) => coords.data.asset)
        .filter((a: any) => a.status === AssetStatus.LISTED);
      const uniqueAssets = parseAssets([...new Map(mappedAssets.map((v: any) => [v.id, v])).values()]);

      return uniqueAssets;
    })
    .catch((e) => {
      console.log(e);
      return [];
    });
}

/**
 * Gets all token payments, which includes address, symbol, name, decimals and fee percentage.
 */
export function fetchTokenPayments(): Promise<PaymentToken[]> {
  return GraphClient.get({
    query: gql`
      query GetTokenPayments {
        paymentTokens {
          id
          name
          symbol
          decimals
          feePercentage
        }
      }
    `,
  })
    .then(async (response) => {
      return [...response.data.paymentTokens];
    })
    .catch((e) => {
      console.log(e);
      return [];
    });
}

export function fetchMetaverses() {
  return GraphClient.get({
    query: gql`
      {
        metaverses {
          id
          name
        }
      }
    `,
  })
    .then(async (response) => {
      return response.data.metaverses.map((meta: any) => {
        return { label: meta.name, value: +meta.id };
      });
    })
    .catch((e) => {
      console.log(e);
      return [];
    });
}

/**
 * Gets all the information for a given asset, including its first five rents
 * @param id The address of the rent
 */
export function fetchAsset(id: string): Promise<AssetEntity> {
  return GraphClient.get({
    query: gql`
      query GetAsset($id: String, $first: Int, $offset: Int) {
        asset(id: $id) {
          id
          metaverse {
            name
          }
          metaverseRegistry {
            id
          }
          owner {
            id
          }
          consumer {
            id
          }
          minPeriod
          maxPeriod
          maxFutureTime
          lastRentEnd
          paymentToken {
            id
            name
            symbol
            decimals
            feePercentage
          }
          totalRents
          unclaimedRentFee
          pricePerSecond
          lastRentEnd
          status
          consumer
          decentralandData {
            metadata
            isLAND
            coordinates {
              id
              x
              y
            }
          }
          operator
          metaverseAssetId
        }
      }
    `,
    variables: {
      id: id,
    },
  })
    .then(async (response) => {
      return response.data.asset;
    })
    .catch((e) => {
      console.log(e);
      return {} as AssetEntity;
    });
}

/**
 * Gets the rents by chunks for a given asset, ordered by `end` in descending order.
 * @param id The id of the asset
 * @param renter The address of the renter
 * @param page Which page to load. Default 1
 * @param limit How many items per page. Default 5
 */
export function fetchAssetUserRents(
  id: string,
  renter: string,
  page = 1,
  limit = 5
): Promise<PaginatedResult<RentEntity>> {
  return GraphClient.get({
    query: gql`
      query GetAssetUserRents($id: String, $renter: String) {
        asset(id: $id) {
          rents(where: { renter: $renter }, orderBy: end, orderDirection: desc) {
            id
            renter {
              id
            }
            start
            operator
            end
            txHash
            timestamp
            fee
            paymentToken {
              id
              name
              symbol
              decimals
            }
          }
        }
      }
    `,
    variables: {
      id: id,
      renter: renter,
    },
  })
    .then(async (response) => {
      // Paginate the result
      const paginatedRents = response.data.asset.rents.slice(limit * (page - 1), limit * page);

      const result: PaginatedResult<RentEntity> = {
        data: paginatedRents.map((item: any) => ({
          ...item,
          renterAddress: item.renter.id,
          price: item.fee,
        })),
        meta: { count: response.data.asset.rents.length },
      };

      return result;
    })
    .catch((e) => {
      console.log(e);
      return { data: [], meta: { count: 0 } };
    });
}

/**
 * Gets the last rent end for an asset.
 * Returns the current time in seconds:
 * if the last rent is less than now
 * if there are no rents
 * if the request throws an error
 * @param asset The target asset id
 */
export function fetchAssetLastRentEnd(asset: string): Promise<number> {
  return GraphClient.get({
    query: gql`
      query GetAssetLastRentEnd($assetId: String) {
        rents(first: 1, orderBy: end, orderDirection: desc, where: { asset: $assetId }) {
          end
        }
      }
    `,
    variables: {
      assetId: asset,
    },
  })
    .then(async (response) => {
      const now = getNowTs();
      if (response.data.rents.length == 1) {
        const rentEnd = Number(response.data.rents[0].end);
        return rentEnd < now ? now : rentEnd;
      } else {
        return now;
      }
    })
    .catch((e) => {
      console.log(e);
      return getNowTs();
    });
}

/**
 * Gets all the assets and consumerTo assets for a given user.
 * @param address The address of the user
 */
export function fetchUserAssets(address: string): Promise<UserEntity> {
  return GraphClient.get({
    query: gql`
      query GetUser($id: String) {
        user(id: $id) {
          id
          consumerTo {
            id
            metaverse {
              name
            }
            metaverseRegistry {
              id
            }
            minPeriod
            maxPeriod
            maxFutureTime
            unclaimedRentFee
            pricePerSecond
            lastRentEnd
            status
            paymentToken {
              id
              name
              symbol
              decimals
            }
            decentralandData {
              metadata
              isLAND
              coordinates {
                id
                x
                y
              }
            }
          }
          assets {
            id
            metaverse {
              name
            }
            metaverseAssetId
            metaverseRegistry {
              id
            }
            minPeriod
            maxPeriod
            maxFutureTime
            unclaimedRentFee
            pricePerSecond
            lastRentEnd
            status
            paymentToken {
              id
              name
              symbol
              decimals
            }
            decentralandData {
              metadata
              isLAND
              coordinates {
                id
                x
                y
              }
            }
          }
          rents {
            asset {
              metaverseAssetId
              metaverseRegistry {
                id
              }
              decentralandData {
                metadata
                isLAND
                coordinates {
                  id
                  x
                  y
                }
              }
            }
          }
        }
      }
    `,
    variables: {
      id: address.toLowerCase(),
    },
  })
    .then(async (response) => {
      return await parseUser(response.data.user);
    })
    .catch((e) => {
      console.log(e);
      return {} as UserEntity;
    });
}

/**
 * Gets user's first rent by timestamp for the given asset from GraphQL.
 * @param asset The target asset id
 * @param renter The address of the renter
 * @param startTimestamp The start timestamp
 */
export function fetchUserFirstRentByTimestamp(
  asset: string,
  renter: string,
  startTimestamp: number
): Promise<RentEntity> {
  return GraphClient.get({
    query: gql`
      query GetUserFirstRent($assetId: String, $renter: String, $startTimestamp: BigInt) {
        rents(first: 1, orderBy: start, where: { asset: $assetId, start_gte: $startTimestamp, renter: $renter }) {
          id
          start
          end
          timestamp
          renter {
            id
          }
        }
      }
    `,
    variables: {
      assetId: asset,
      renter: renter,
      startTimestamp: startTimestamp,
    },
  })
    .then(async (response) => {
      if (response.data.rents.length > 0) {
        return response.data.rents[0];
      }

      return {};
    })
    .catch((e) => {
      console.log(e);
      return {} as RentEntity;
    });
}

/**
 * Gets user's rents from GraphQL. Filters out only the last rent for an asset.
 * TODO: Can be optimised, query should be done in the reverse order.
 * @param address The address of the user
 * @param page Which page to load. Default 1
 * @param limit How many items per page. Default 6
 */
export function fetchUserRentPerAsset(address: string, availableOnly = false, page = 1, limit = 6): Promise<any> {
  const now = getNowTs();
  return GraphClient.get({
    query: gql`
      query GetUserRents($id: String, $now: BigInt) {
        rents(orderBy: end, orderDirection: asc, where: {renter: $id, ${
          availableOnly ? 'start_lte: $now, end_gt: $now' : ''
        }}) {
          id
          operator
          start
          end
          timestamp
          asset {
            id
            metaverse {
              name
            }
            metaverseAssetId
            metaverseRegistry {
              id
            }
            decentralandData {
              id
              metadata
              isLAND
              coordinates {
                id
                x
                y
              }
            }
          }
        }
      }
    `,
    variables: {
      id: address.toLowerCase(),
      now: now,
    },
  })
    .then(async (response) => {
      // Filter out rents for the same asset
      if (!response?.data?.rents) {
        return {
          data: [],
          meta: { count: 0 },
        };
      }
      const groupedRents = response.data.rents.reduce(
        (entryMap: Map<string, any[]>, e: any) => entryMap.set(e.asset.id, [...(entryMap.get(e.asset.id) || []), e]),
        new Map()
      );
      const now = getNowTs();
      const filteredRents = [] as RentEntity[];
      // TODO: optimise search for target rent
      for (const [, rents] of groupedRents) {
        if (rents.length == 1) {
          filteredRents.push(rents[0]);
        } else {
          let rent = rents.find((r: RentEntity) => Number(r.start) <= now && now < Number(r.end));
          if (!rent) {
            rent = rents.find((r: RentEntity) => now < Number(r.start));
          }
          if (!rent) {
            rent = rents[rents.length - 1];
          }
          filteredRents.push(rent!);
        }
      }

      const paginatedRents = filteredRents
        .sort((a, b) => Number(b.end) - Number(a.end))
        .slice(limit * (page - 1), limit * page);
      return {
        data: paginatedRents.map((element: any) => ({
          ...element,
          name: getDecentralandAssetName(element.asset.decentralandData),
        })),
        meta: { count: filteredRents.length },
      };
    })
    .catch((e) => {
      console.log(e);
      return {} as UserEntity;
    });
}

export function fetchUserRents(address: string, availableOnly = false, metaverse: string): Promise<any> {
  const now = getNowTs();
  return GraphClient.get({
    query: gql`
      query GetUserRents($id: String, $now: BigInt) {
        rents(orderBy: end, orderDirection: desc, where: { metaverse: "${metaverse}",renter: $id, ${
      availableOnly ? 'start_lte: $now, end_gt: $now' : ''
    }}) {
          id
          operator
          start
          end
          timestamp
          txHash
          fee
          paymentToken {
            id
            name
            symbol
            decimals
          }
          renter {
            id
          }
          asset {
            id
            metaverse {
              name
            }
            metaverseAssetId
            metaverseRegistry {
              id
            }
            decentralandData {
              metadata
              isLAND
              coordinates {
                id
                x
                y
              }
            }
          }
        }
      }
    `,
    variables: {
      id: address.toLowerCase(),
      now: now,
    },
  })
    .then(async (response) => {
      return response.data;
    })
    .catch((e) => {
      console.log(e);
      return {} as UserEntity;
    });
}

export function fetchAssetRentByTimestamp(assetId: string, timestamp: number): Promise<RentEntity> {
  return GraphClient.get({
    query: gql`
      query GetAssetRentByTimestamp($assetId: String, $timestamp: BigInt) {
        rents(where: { start_lte: $timestamp, end_gt: $timestamp, asset: $assetId }) {
          id
          renter {
            id
          }
          start
          operator
          end
          txHash
          timestamp
          fee
          paymentToken {
            id
            name
            symbol
            decimals
          }
        }
      }
    `,
    variables: {
      assetId: assetId,
      timestamp: timestamp,
    },
  })
    .then((response) => {
      // Paginate the result
      const rents = response.data.rents;
      if (rents.length > 0) {
        return rents[0];
      }

      return {} as RentEntity;
    })
    .catch((e) => {
      console.log(e);
      return {} as RentEntity;
    });
}

/**
 * Gets Listed Assets by metaverse id, and lt (less than) than the last rent end (if provided)
 * excluding those with status WITHDRAWN,
 * ordered by a given column in ascending/descending order
 * @param page Which page to load. Default 1
 * @param limit How many items per page. Default 6
 * @param metaverse The target metaverse id. Default '1', which is considered Decentraland
 * @param lastRentEnd A timestamp (in seconds), which will be used to query assets with lastRentEnd greater than the given.
 * @param orderColumn The name of the order column
 * @param orderDirection asc or desc
 * Default '0'. Used to determined Availability of assets
 */
export function fetchListedAssetsByMetaverseAndGetLastRentEndWithOrder(
  page = 1,
  limit = 6,
  metaverse = '1',
  lastRentEnd = '0',
  orderColumn = 'totalRents',
  orderDirection: string
): Promise<PaginatedResult<AssetEntity>> {
  return GraphClient.get({
    query: gql`
      query GetAssets(
        $metaverse: String
        $lastRentEnd: String
        $orderColumn: String
        $orderDirection: String
        $statusNot: String
      ) {
        assets(
          where: { metaverse: $metaverse, ${
            lastRentEnd != '0' ? 'lastRentEnd_lt: $lastRentEnd' : ''
          }, status_not: $statusNot }
          orderBy: $orderColumn
          orderDirection: $orderDirection
        ) {
          id
          metaverse {
            name
          }
          metaverseAssetId
          metaverseRegistry {
            id
          }
          metaverse {
            name
          }
          owner {
            id
          }
          minPeriod
          maxPeriod
          maxFutureTime
          pricePerSecond
          paymentToken {
            name
            symbol
            decimals
          }
          decentralandData {
            metadata
            isLAND
            coordinates {
              id
              x
              y
            }
          }
          lastRentEnd
          totalRents
          status
        }
      }
    `,
    variables: {
      lastRentEnd: lastRentEnd,
      metaverse: metaverse,
      orderColumn: orderColumn,
      orderDirection: orderDirection,
      statusNot: AssetStatus.WITHDRAWN,
    },
  })
    .then(async (response) => {
      // Paginate the result
      let parsedAssets = await parseAssets(response.data.assets);
      if (orderColumn === 'pricePerSecond') {
        if (orderDirection === 'asc') {
          parsedAssets = parsedAssets.sort(sortAssetsByAscendingUsdPrice);
        } else {
          parsedAssets = parsedAssets.sort(sortAssetsByDescendingUsdPrice);
        }
      }
      const paginatedAssets = parsedAssets.slice(limit * (page - 1), limit * page);

      return {
        data: await parseAssets(paginatedAssets),
        meta: { count: response.data.assets.length },
      };
    })
    .catch((e) => {
      console.log(e);
      return { data: [], meta: { count: 0, block: 0 } };
    });
}

export function fetchUserAssetsByRents(
  address: string,
  metaverse: string,
  paymentToken: string | null
): Promise<PaginatedResult<AssetEntity>> {
  return GraphClient.get({
    query: gql`
      query GetUserRents($id: String, $now: BigInt, $metaverse: String, $paymentToken: String) {
        rents(
          orderBy: end
          orderDirection: asc
          where: { renter: $id, metaverse: $metaverse, ${paymentToken ? 'paymentToken: $paymentToken' : ''} }
        ) {
          id
          operator
          start
          end
          timestamp
          asset {
            id
            metaverse {
              name
            }
            metaverseAssetId
            metaverseRegistry {
              id
            }
            minPeriod
            maxPeriod
            maxFutureTime
            unclaimedRentFee
            pricePerSecond
            lastRentEnd
            status
            totalRents
            paymentToken {
              id
              name
              symbol
              decimals
            }
            decentralandData {
              metadata
              isLAND
              coordinates {
                id
                x
                y
              }
            }
          }
        }
      }
    `,
    variables: {
      id: address.toLowerCase(),
      metaverse,
      paymentToken,
    },
  })
    .then(async (response) => {
      // Filter out rents for the same asset
      if (!response?.data?.rents) {
        return {
          data: [],
          meta: { count: 0 },
        };
      }
      const groupedRents = response.data.rents.reduce(
        (entryMap: Map<string, any[]>, e: any) => entryMap.set(e.asset.id, [...(entryMap.get(e.asset.id) || []), e]),
        new Map()
      );
      const now = getNowTs();
      const filteredRents = [] as RentEntity[];
      // TODO: optimise search for target rent
      for (const [, rents] of groupedRents) {
        if (rents.length == 1) {
          filteredRents.push(rents[0]);
        } else {
          let rent = rents.find((r: RentEntity) => Number(r.start) <= now && now < Number(r.end));
          if (!rent) {
            rent = rents.find((r: RentEntity) => now < Number(r.start));
          }
          if (!rent) {
            rent = rents[rents.length - 1];
          }
          filteredRents.push(rent!);
        }
      }

      const assets = filteredRents
        .sort((a, b) => Number(b.end) - Number(a.end))
        // .slice(limit * (page - 1), limit * page)
        .map((r) => r.asset);
      return {
        data: await parseAssets(assets),
        meta: { count: filteredRents.length },
      };
    })
    .catch((e) => {
      console.log(e);
      return {
        data: [],
        meta: { count: 0 },
      };
    });
}

/**
 * Gets Listed Assets by metaverse id, and lt (less than) than the last rent end (if provided)
 * excluding those with status WITHDRAWN,
 * ordered by a given column in ascending/descending order
 * @param page Which page to load. Default 1
 * @param limit How many items per page. Default 6
 * @param metaverse The target metaverse id. Default '1', which is considered Decentraland
 * @param lastRentEnd A timestamp (in seconds), which will be used to query assets with lastRentEnd greater than the given.
 * @param orderColumn The name of the order column
 * @param orderDirection asc or desc
 * Default '0'. Used to determined Availability of assets
 */
export function fetchAllListedAssetsByMetaverseAndGetLastRentEndWithOrder(
  metaverse = '1',
  lastRentEnd = '0',
  orderColumn = 'totalRents',
  orderDirection: string,
  paymentTokenId: string,
  owner?: string
): Promise<PaginatedResult<AssetEntity>> {
  return GraphClient.get({
    query: gql`
      query GetAssets(
        $metaverse: String
        $lastRentEnd: String
        $orderColumn: String
        $orderDirection: String
        $statusNot: String
        $paymentTokenId: String
        $owner: String
      ) {
        assets(
          where: { metaverse: $metaverse, ${lastRentEnd != '0' ? 'lastRentEnd_lt: $lastRentEnd' : ''}, 
          ${owner ? 'owner: $owner' : ''}, status_not: $statusNot, 
          ${paymentTokenId.length > 0 ? 'paymentToken: $paymentTokenId' : ''}  }
          orderBy: $orderColumn
          orderDirection: $orderDirection
        ) {
          id
          metaverse {
            name
          }
          metaverseAssetId
          metaverseRegistry {
            id
          }
          minPeriod
          maxPeriod
          maxFutureTime
          pricePerSecond
          paymentToken {
            name
            symbol
            decimals
          }
          decentralandData {
            asset {
              owner {
                id
              }
              consumer {
                id
                consumerTo {
                  id
                }
              }
            }
            metadata
            isLAND
            coordinates {
              id
              x
              y
            }
          }
          lastRentEnd
          timestamp
          totalRents
          status
        }
      }
    `,
    variables: {
      lastRentEnd: lastRentEnd,
      metaverse: metaverse,
      orderColumn: orderColumn,
      orderDirection: orderDirection,
      statusNot: AssetStatus.WITHDRAWN,
      paymentTokenId: paymentTokenId,
      owner: owner,
    },
  })
    .then(async (response) => {
      return {
        data: await parseAssets(response.data.assets),
        meta: { count: response.data.assets.length },
      };
    })
    .catch((e) => {
      console.log(e);
      return { data: [], meta: { count: 0, block: 0 } };
    });
}

export function fetchAssetIdByTxHash(txHash: string): Promise<string> {
  return GraphClient.get({
    query: gql`
      query GetAssetByTxHash($txHash: String) {
        assets(where: { txHash: $txHash }) {
          id
        }
      }
    `,
    variables: {
      txHash: txHash,
    },
  })
    .then(async (response) => {
      const assets = response.data.assets;
      if (assets.length > 0) {
        return assets[0].id;
      }
      return '';
    })
    .catch((e) => {
      console.log(e);
      return '';
    });
}

export function parseAssetRents(asset: any): PaginatedResult<RentEntity> {
  const result: PaginatedResult<RentEntity> = {
    data: (asset.rents ?? []).map((item: any) => ({
      ...item,
      key: item.id,
      renterAddress: item.renter.id,
      price: item.fee,
    })),
    meta: { count: asset.totalRents },
  };

  return result;
}

export function parseUserRents(asset: any, limit: any, page: any): PaginatedResult<RentEntity> {
  const paginatedRents = asset.rents.slice(limit * (page - 1), limit * page);

  const result: PaginatedResult<RentEntity> = {
    data: paginatedRents.map((item: any) => ({
      ...item,
      key: item.id,
      renterAddress: item.renter.id,
      price: item.fee,
    })),
    meta: { count: asset.rents.length },
  };

  return result;
}

export async function parseUser(user: any): Promise<UserEntity> {
  const result = { ...user };
  const ownerAndConsumerAssets = [...result.assets, ...result.consumerTo];
  const uniqueAssets = [...new Map(ownerAndConsumerAssets.map((v) => [v.id, v])).values()].sort(
    (a: AssetEntity, b: AssetEntity) => Number(b.id) - Number(a.id)
  );

  const parsedAssets = await parseAssets(uniqueAssets);
  result.ownerAndConsumerAssets = parsedAssets;
  result.unclaimedRentAssets = [...parsedAssets].filter((a: any) => BigNumber.from(a.unclaimedRentFee)?.gt(0));
  result.hasUnclaimedRent = result.unclaimedRentAssets.length > 0;
  return result;
}

export async function parseAssets(assets: any[]): Promise<AssetEntity[]> {
  const result = [] as AssetEntity[];

  for (const asset of assets) {
    result.push(await parseAsset(asset));
  }
  return result;
}

export async function parseAsset(asset: any): Promise<AssetEntity> {
  const liteAsset: AssetEntity = { ...asset };
  liteAsset.humanPricePerSecond = getHumanValue(new BigNumber(asset.pricePerSecond), asset.paymentToken.decimals)!;
  liteAsset.paymentToken = { ...asset.paymentToken };
  liteAsset.isHot = asset.totalRents > 0;
  liteAsset.unclaimedRentFee = getHumanValue(new BigNumber(asset.unclaimedRentFee), asset.paymentToken.decimals)!;
  liteAsset.operator = asset.operator ?? constants.AddressZero;
  liteAsset.minPeriodTimedType = getTimeTypeStr(secondsToDuration(asset.minPeriod));
  liteAsset.maxPeriodTimedType = getTimeTypeStr(secondsToDuration(asset.maxPeriod));
  liteAsset.maxFutureTimeTimedType = getTimeTypeStr(secondsToDuration(asset.maxFutureTime));
  if (isDecentralandMetaverseRegistry(asset?.metaverseRegistry?.id)) {
    liteAsset.additionalData = await getAdditionalDecentralandData(
      asset.metaverseAssetId,
      asset?.decentralandData?.isLAND
    );
    liteAsset.type = asset?.decentralandData?.isLAND ? 'LAND' : 'ESTATE';
    liteAsset.name = getDecentralandAssetName(asset.decentralandData);
    liteAsset.imageUrl = getLandImageUrl(asset);
    liteAsset.externalUrl = getDecentralandPlayUrl(asset?.decentralandData?.coordinates);
  } else {
    const data = await getCryptoVoxelsAsset(asset.metaverseAssetId);
    liteAsset.name = data.name;
    liteAsset.type = data.attributes?.title.toUpperCase();
    liteAsset.imageUrl = data.image;
    liteAsset.attributes = asset.attributes;
    liteAsset.externalUrl = getCryptoVexelsPlayUrl(asset?.metaverseAssetId);
    liteAsset.place = data?.attributes ? [data?.attributes?.island, data?.attributes?.suburb] : null;
  }
  // Calculates the intervals for availability
  // const now = getNowTs();
  //  const startRent = Math.max(now, Number(asset.lastRentEnd));
  // liteAsset.isAvailable = new BigNumber(startRent).plus(asset.minPeriod).lt(new BigNumber(now).plus(asset.maxFutureTime));

  liteAsset.isAvailable = asset.status === AssetStatus.LISTED;
  liteAsset.availability = getAvailability(liteAsset);
  const price = liteAsset.humanPricePerSecond.multipliedBy(DAY_IN_SECONDS);
  liteAsset.pricePerMagnitude = {
    price: price,
    usdPrice: getUsdPrice(price, asset.paymentToken.symbol),
    magnitude: 'day',
  };

  return liteAsset;
}

function getAvailability(asset: any): AssetAvailablity {
  let minAvailability = '';
  let hasMinAvailability = false;
  let minAvailabilityType = '';
  let minAvailabilityTime = 0;
  let maxAvailability = '';
  let hasMaxAvailablity = false;
  let maxAvailabilityType = '';
  let maxAvailabilityTime = 0;
  let maxRentPeriodType = '';
  let maxRentPeriodTime = 0;

  if (!new BigNumber(asset.minPeriod).eq(ONE_SECOND) && !new BigNumber(asset.minPeriod).eq(MAX_UINT_256)) {
    const parsedDate = secondsToDuration(new BigNumber(asset.minPeriod).toNumber());
    const { timeValue, timeType } = getTimeType(parsedDate);
    const period = `${timeValue} ${timeType}`;
    minAvailability = period;
    hasMinAvailability = true;
    minAvailabilityType = timeType;
    minAvailabilityTime = timeValue;
  }

  const now = getNowTs();
  const startRent = new BigNumber(Math.max(now, Number(asset.lastRentEnd)));
  const minRentDate = startRent.plus(asset.minPeriod);
  const maxRent = startRent.plus(asset.maxPeriod);
  const maxFutureTime = new BigNumber(now).plus(asset.maxFutureTime);

  const maxRentPeriod = maxRent.lt(maxFutureTime) ? new BigNumber(asset.maxPeriod) : maxFutureTime.minus(startRent);

  let maxRentDate = startRent.plus(maxRentPeriod);
  if (maxRentPeriod.lt(ONE_HUNDRED_YEARS_IN_SECONDS)) {
    const parsedDate = secondsToDuration(maxRentPeriod.toNumber());
    const { timeValue, timeType } = getTimeType(parsedDate);
    const period = `${timeValue} ${timeType}`;
    maxAvailability = period;
    hasMaxAvailablity = true;
    maxAvailabilityType = timeType;
    maxAvailabilityTime = timeValue;
  } else {
    maxRentDate = startRent.plus(ONE_HUNDRED_YEARS_IN_SECONDS);
  }

  let result = '';
  if (hasMinAvailability) {
    if (hasMaxAvailablity) {
      result += minAvailability;
    } else {
      result += `Min ${minAvailability}`;
    }
  }

  if (hasMaxAvailablity) {
    if (hasMinAvailability) {
      result += `-${maxAvailability}`;
    } else {
      result += `Max ${maxAvailability}`;
    }
  }

  if (maxRentPeriod) {
    const parsedDate = secondsToDuration(asset.minPeriod - maxRentPeriod.toNumber());
    const { timeValue, timeType } = getTimeType(parsedDate);
    // const period = `${timeValue} ${timeType}`;
    maxRentPeriodType = timeType;
    maxRentPeriodTime = timeValue;
  }

  const parsedDateAfter = secondsToDuration(startRent.toNumber() - now);
  const { timeValue, timeType } = getTimeType(parsedDateAfter);
  const period = `${timeValue} ${timeType}`;

  return {
    isRentable: maxRentPeriod.gte(asset.minPeriod),
    isCurrentlyAvailable: now > Number(asset.lastRentEnd),
    availabilityAfter: period,
    startRentDate: startRent.toNumber(),
    minRentDate: minRentDate.toNumber(),
    maxRentDate: maxRentDate.toNumber(),
    label: result,
    availabilityTime: {
      minAvailabilityTime: minAvailabilityTime,
      minAvailabilityType: minAvailabilityType,
      maxAvailabilityType: maxAvailabilityType,
      maxAvailabilityTime: maxAvailabilityTime,
    },
    maxRentPeriodType,
    maxRentPeriodTime,
  };
}

function sortAssetsByAscendingUsdPrice(a: AssetEntity, b: AssetEntity): number {
  if (a.pricePerMagnitude.usdPrice?.eq(b.pricePerMagnitude.usdPrice!)) {
    return 0;
  } else if (a.pricePerMagnitude.usdPrice?.gt(b.pricePerMagnitude.usdPrice!)) {
    return 1;
  } else {
    return -1;
  }
}

function sortAssetsByDescendingUsdPrice(a: AssetEntity, b: AssetEntity): number {
  if (a.pricePerMagnitude.usdPrice?.eq(b.pricePerMagnitude.usdPrice!)) {
    return 0;
  } else if (a.pricePerMagnitude.usdPrice?.gt(b.pricePerMagnitude.usdPrice!)) {
    return -1;
  } else {
    return 1;
  }
}

function getAdditionalDecentralandData(id: string, isLand: boolean): Promise<AdditionalDecantralandData> {
  const decentralandRegistryAddress = isLand
    ? '0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d'
    : '0x959e104e1a4db6317fa58f8295f586e1a978c297';
  const apiUrl = `https://api.decentraland.org/v2/contracts/${decentralandRegistryAddress}/tokens/`;
  return fetch(`${apiUrl}${id}`)
    .then((result) => result.json())
    .then((data) => {
      const { id, external_url, description, attributes } = data;

      return { tokenId: id, externalUrl: external_url, description, attributes, size: 1 };
    });
}
