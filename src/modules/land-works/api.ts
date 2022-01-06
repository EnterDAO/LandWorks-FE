import { gql } from '@apollo/client';
import BigNumber from 'bignumber.js';
import { constants } from 'ethers';

import { GraphClient } from '../../web3/graph/client';

import { getFormattedTime, getNowTs } from '../../utils';
import { DAY_IN_SECONDS, ONE_HUNDRED_YEARS_IN_SECONDS, ONE_SECOND } from '../../utils/date';
import { MAX_UINT_256, getHumanValue } from '../../web3/utils';

const BASE_URL = process.env.REACT_APP_MINT_METADATA_URL;

export async function getNftMeta(id: string | number): Promise<any> {
  const URL = `${BASE_URL}?id=${id}`;

  const req = await fetch(URL);

  const result = await req.text().then(data => JSON.parse(data));
  return result;
}

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
    .then(result => {
      return {
        ...result.data.overview,
      };
    })
    .catch(e => {
      console.log(e);
      return { data: {} };
    });
}

export type PricePerMagnitude = {
  price: string;
  magnitude: string;
};

export type DecentralandData = {
  metadata: string;
  isLAND: boolean;
  coordinates: any[];
};

export type CoordinatesLAND = {
  id: string;
  x: string;
  y: string;
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
  id: string;
  name: string;
  minPeriod: BigNumber;
  maxPeriod: BigNumber;
  pricePerSecond: BigNumber;
  humanPricePerSecond: BigNumber;
  pricePerMagnitude: PricePerMagnitude;
  unclaimedRentFee: BigNumber;
  paymentToken: PaymentToken;
  consumer?: IdEntity;
  availability: string;
  isHot: boolean;
  decentralandData?: DecentralandData;
  owner: IdEntity;
  operator: string;
  status: string;
  rents: RentEntity[];
  isAvailable: boolean;
};

export type IdEntity = {
  id: string;
};

export type RentEntity = {
  id: string;
  operator: string;
  start: string;
  end: string;
  txHash: string;
  fee: any;
  paymentToken: PaymentToken;
  renter: IdEntity;
  renterAddress: string;
  price: string;
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
  asset: any;
  amount: BigNumber;
  paymentToken: PaymentToken;
  txHash: string;
  timestamp: number;
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
              metaverseAssetId
              minPeriod
              maxPeriod
              pricePerSecond
              lastRentEnd
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
    .then(async response => {
      const mappedAssets = response.data.coordinatesLANDs?.map((coords: any) => coords.data.asset);
      const uniqueAssets = parseAssets([...new Map(mappedAssets.map((v: any) => [v.id, v])).values()]);

      return uniqueAssets;
    })
    .catch(e => {
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
    .then(async response => {
      return [...response.data.paymentTokens];
    })
    .catch(e => {
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
    .then(async response => {
      return parseAsset(response.data.asset);
    })
    .catch(e => {
      console.log(e);
      return {} as AssetEntity;
    });
}

/**
 * Gets the rents by chunks for a given asset, ordered by `end` in descending order.
 * @param id The id of the asset
 * @param page Which page to load. Default 1
 * @param limit How many items per page. Default 5
 */
export function fetchAssetRents(id: string, page = 1, limit = 5): Promise<PaginatedResult<RentEntity>> {
  return GraphClient.get({
    query: gql`
      query GetAssetRents($id: String, $limit: Int, $offset: Int) {
        asset(id: $id) {
          totalRents
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
    `,
    variables: {
      id: id,
      offset: limit * (page - 1),
      limit: limit,
    },
  })
    .then(async response => {
      const result: PaginatedResult<RentEntity> = {
        data: (response.data.asset.rents ?? []).map((item: any) => ({
          ...item,
          key: item.id,
          renterAddress: item.renter.id,
          price: item.fee,
        })),
        meta: { count: response.data.asset.totalRents },
      };

      return result;
    })
    .catch(e => {
      console.log(e);
      return { data: [], meta: { count: 0 } };
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
  limit = 5,
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
    .then(async response => {
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
    .catch(e => {
      console.log(e);
      return { data: [], meta: { count: 0 } };
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
            minPeriod
            maxPeriod
            maxFutureTime
            unclaimedRentFee
            pricePerSecond
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
            metaverseAssetId
            minPeriod
            maxPeriod
            maxFutureTime
            unclaimedRentFee
            pricePerSecond
            lastRentEnd
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
              decentralandData {
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
    .then(async response => {
      const result = { ...response.data.user };
      const ownerAndConsumerAssets = [...result.assets, ...result.consumerTo];
      const uniqueAssets = [...new Map(ownerAndConsumerAssets.map(v => [v.id, v])).values()].sort(
        (a: AssetEntity, b: AssetEntity) => Number(b.id) - Number(a.id),
      );

      result.ownerAndConsumerAssets = parseAssets(uniqueAssets);
      result.unclaimedRentAssets = parseAssets(
        uniqueAssets.filter((a: any) => BigNumber.from(a.unclaimedRentFee)?.gt(0)),
      );
      result.hasUnclaimedRent = result.unclaimedRentAssets.length > 0;
      return result;
    })
    .catch(e => {
      console.log(e);
      return {} as UserEntity;
    });
}

/**
 * Gets user's rents from GraphQL. Filters out only the last rent for an asset.
 * TODO: Can be optimised, query should be done in the reverse order.
 * @param address The address of the user
 * @param page Which page to load. Default 1
 * @param limit How many items per page. Default 6
 */
export function fetchUserLastRentPerAsset(address: string, page = 1, limit = 6): Promise<any> {
  return GraphClient.get({
    query: gql`
      query GetUserRents($id: String) {
        user(id: $id) {
          rents(orderBy: end, orderDirection: desc) {
            id
            operator
            end
            timestamp
            asset {
              id
              metaverseAssetId
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
      }
    `,
    variables: {
      id: address.toLowerCase(),
    },
  })
    .then(async response => {
      // Filter out rents for the same asset
      if (!response?.data?.user?.rents) {
        return {
          data: [],
          meta: { count: 0 },
        };
      }
      const filteredRents = response.data.user.rents.filter(
        (element: any, index: number, array: any) =>
          array.findIndex((t: any) => t.asset.id === element.asset.id) === index,
      );

      const paginatedRents = filteredRents.slice(limit * (page - 1), limit * page);
      return {
        data: paginatedRents.map((element: any) => ({
          ...element,
          name: getDecentralandAssetName(element.asset.decentralandData),
        })),
        meta: { count: filteredRents.length },
      };
    })
    .catch(e => {
      console.log(e);
      return {} as UserEntity;
    });
}

/**
 * Gets all the claim history of a user, ordered by timestamp in descending order
 * @param address The address of the user
 */
export function fetchUserClaimHistory(address: string): Promise<ClaimHistory[]> {
  return GraphClient.get({
    query: gql`
      query GetUserClaimHistory($id: String) {
        user(id: $id) {
          id
          claimHistory(orderBy: timestamp, orderDirection: desc) {
            asset {
              metaverseAssetId
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
    `,
    variables: {
      id: address.toLowerCase(),
    },
  })
    .then(async response => {
      // TODO: convert to proper model if necessary

      return response.data.user?.claimHistory;
    })
    .catch(e => {
      console.log(e);
      return { data: [], meta: { count: 0 } };
    });
}

/**
 * Gets Assets by metaverse id, and gte (greater or equal) than the last rent end,
 * ordered by a given column in ascending/descending order
 * @param page Which page to load. Default 1
 * @param limit How many items per page. Default 6
 * @param metaverse The target metaverse id. Default '1', which is considered Decentraland
 * @param lastRentEnd A timestamp (in seconds), which will be used to query assets with lastRentEnd greater than the given.
 * @param orderColumn The name of the order column
 * @param orderDirection asc or desc
 * Default '0'. Used to determined Availability of assets
 */
export function fetchAssetsByMetaverseAndGteLastRentEndWithOrder(
  page = 1,
  limit = 6,
  metaverse: string = '1',
  lastRentEnd: string = '0',
  orderColumn: string = 'totalRents',
  orderDirection: string,
): Promise<PaginatedResult<AssetEntity>> {
  return GraphClient.get({
    query: gql`
      query GetAssets($metaverse: String, $lastRentEnd: String, $orderColumn: String, $orderDirection: String) {
        assets(
          where: { metaverse: $metaverse, lastRentEnd_lte: $lastRentEnd }
          orderBy: $orderColumn
          orderDirection: $orderDirection
        ) {
          id
          metaverseAssetId
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
        }
      }
    `,
    variables: {
      lastRentEnd: lastRentEnd,
      metaverse: metaverse,
      orderColumn: orderColumn,
      orderDirection: orderDirection,
    },
  })
    .then(async response => {
      // Paginate the result
      const paginatedAssets = response.data.assets.slice(limit * (page - 1), limit * page);

      return {
        data: parseAssets(paginatedAssets),
        meta: { count: response.data.assets.length },
      };
    })
    .catch(e => {
      console.log(e);
      return { data: [], meta: { count: 0, block: 0 } };
    });
}

function parseAssets(assets: any[]): AssetEntity[] {
  let result = [] as AssetEntity[];

  for (const asset of assets) {
    result.push(parseAsset(asset));
  }
  return result;
}

function parseAsset(asset: any): AssetEntity {
  const liteAsset: AssetEntity = { ...asset };
  liteAsset.humanPricePerSecond = getHumanValue(new BigNumber(asset.pricePerSecond), asset.paymentToken.decimals)!;
  liteAsset.name = getDecentralandAssetName(asset.decentralandData);
  liteAsset.paymentToken = { ...asset.paymentToken };
  liteAsset.isHot = asset.totalRents > 0;
  liteAsset.unclaimedRentFee = getHumanValue(new BigNumber(asset.unclaimedRentFee), asset.paymentToken.decimals)!;
  liteAsset.operator = asset.operator ?? constants.AddressZero;

  // Calculates the intervals for availability
  const now = getNowTs();
  const startRent = Math.max(now, Number(asset.lastRentEnd));

  liteAsset.isAvailable = new BigNumber(startRent)
    .plus(asset.minPeriod)
    .lt(new BigNumber(now).plus(asset.maxFutureTime));
  liteAsset.availability = getAvailability(liteAsset);
  liteAsset.pricePerMagnitude = {
    price: liteAsset.humanPricePerSecond.multipliedBy(DAY_IN_SECONDS).toString(10),
    magnitude: 'day',
  };

  return liteAsset;
}

function getDecentralandAssetName(decentralandData: any): string {
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

function getAvailability(asset: any): string {
  let minAvailability = '';
  let hasMinAvailability = false;
  let maxAvailability = '';
  let hasMaxAvailablity = false;

  if (!new BigNumber(asset.minPeriod).eq(ONE_SECOND) && !new BigNumber(asset.minPeriod).eq(MAX_UINT_256)) {
    minAvailability = getFormattedTime(asset.minPeriod);
    hasMinAvailability = true;
  }

  const now = getNowTs();
  const startRent = new BigNumber(Math.max(now, Number(asset.lastRentEnd)));
  const maxRent = startRent.plus(asset.maxPeriod);
  const maxFutureTime = new BigNumber(now).plus(asset.maxFutureTime);

  const maxRentPeriod = maxRent.lt(maxFutureTime) ? new BigNumber(asset.maxPeriod) : maxFutureTime.minus(startRent);

  if (maxRentPeriod.lt(ONE_HUNDRED_YEARS_IN_SECONDS)) {
    maxAvailability = getFormattedTime(maxRentPeriod.toNumber());
    hasMaxAvailablity = true;
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

  return result;
}
