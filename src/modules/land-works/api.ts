import { gql } from '@apollo/client';
import BigNumber from 'bignumber.js';
import { GraphClient } from '../../web3/graph/client';
import { getHumanValue } from '../../web3/utils';

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
}

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
    console.log(result);
    return {
      ...result.data.overview,
    };
  })
  .catch(e => {
    console.log(e);
    return { data: {} };
  });
}

export type DecentralandData = {
  metadata: string;
}

export type PaymentToken = {
  address: string;
  feePercentage: BigNumber;
  name: string;
  symbol: string;
  decimals: number;
}

export type AssetEntity = {
  id: string;
  name: string;
  minPeriod: BigNumber;
  maxPeriod: BigNumber;
  pricePerSecond: BigNumber;
  unclaimedRentFee: BigNumber;
  paymentToken: PaymentToken;
  isHot: boolean;
}

export type RentEntity = {
  id: string;
  rentAddress: string;
  operator: string;
  start: BigNumber;
  end: BigNumber;
  txHash: string;
  fee: any
  paymentToken: PaymentToken;
}

export type UserEntity = {
  id: string;
  hasUnclaimedRent: boolean;
  assets: any;
  consumerTo: any;
  rents: any;
  unclaimedRentAssets: any[]
}

export type ClaimHistory = {
  asset: any;
  amount: BigNumber;
  paymentToken: PaymentToken;
  txHash: string;
  timestamp: number;
}

/**
 * Gets all Decentraland assets, that have coordinates from the provided.
 * @param coordinates An array of coordinates, each coordinate in the following format: `{x}-{y}`.
 */
export function fetchAdjacentDecentralandAssets(coordinates: string[]) {
  return GraphClient.get({
    query: gql`
        query getAdjacentAssets($ids: [String]) {
            coordinatesLANDs(where:{id_in: $ids}) {
                id
                data {
                    id
                    asset {
                        id
                        minPeriod
                        maxPeriod
                        pricePerSecond
                        lastRentEnd
                        paymentToken {
                            name
                            symbol
                            decimals
                        }
                    }
                }
            }
        }
    `,
    variables: {
      ids: coordinates,
    },
  }).then((async response => {
    console.log(response);
    // TODO: convert to proper model if necessary
    // TODO: might be possible to have duplicate assets, those should be filtered out

    return { ...response.data };
  }))
  .catch(e => {
    console.log(e);
    return { data: {} };
  });
}

/**
 * Gets all token payments, which includes address, symbol, name, decimals and fee percentage.
 */
export function fetchTokenPayments() {
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
        }`,
  }).then((async response => {
    console.log(response);

    return { ...response.data.paymentTokens };
  }))
  .catch(e => {
    console.log(e);
    return { data: {} };
  });
}

/**
 * Gets all the information for a given asset, including its first five rents
 * @param id The address of the rent
 * @param rentsSize How many rents to be queried
 */
export function fetchAsset(
  id: string,
  page: number = 1,
  rentsSize: number = 5) {
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
                owner{
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
                }
                totalRents
                unclaimedRentFee
                pricePerSecond
                lastRentEnd
                status
                decentralandData {
                    metadata
                    coordinates {
                        id
                    }
                }
                rents(first: $first, skip: $offset, orderBy: end, orderDirection: desc) {
                    id
                    renter {
                        id
                    }
                    start
                    operator
                    end
                    txHash
                    fee
                    paymentToken {
                        id
                        name
                        symbol
                    }
                }
                operator
            }
        }
    `,
    variables: {
      id: id,
      first: rentsSize,
      skip: rentsSize * (page - 1),
    },
  })
  .then((async response => {
    console.log(response);
    // TODO: convert to proper model

    return { ...response.data.asset };
  }))
  .catch(e => {
    console.log(e);
    return { data: {} };
  });
}

/**
 * Gets the rents by chunks for a given asset, ordered by `end` in descending order.
 * @param id The id of the asset
 * @param page Which page to load. Default 1
 * @param limit How many items per page. Default 5
 */
export function fetchAssetRents(
  id: string,
  page = 1,
  limit = 5,
): Promise<PaginatedResult<RentEntity>> {
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
  .then((async response => {
    console.log(response);

    const result: PaginatedResult<RentEntity> = {
      data: (response.data.asset.rents ?? []).map((item: any) => ({
        ...item,
        rentAddress: item.renter.id,
      })),
      meta: { count: response.data.assets.totalRents },
    };

    return result;
  }))
  .catch(e => {
    console.log(e);
    return { data: [], meta: { count: 0 } };
  });
}

/**
 * Gets all the assets, rents and consumerTo assets for a given user.
 * @param address The address of the user
 */
export function fetchUser(address: string): Promise<UserEntity> {
  return GraphClient.get({
    query: gql`
        query GetUser($id: String) {
            user(id: $id) {
                id
                consumerTo {
                    id
                    unclaimedRentFee
                    paymentToken {
                        id
                        name
                        symbol
                        decimals
                    }
                    decentralandData {
                        metadata
                        coordinates {
                            id
                        }
                    }
                }
                assets {
                    id
                    unclaimedRentFee
                    paymentToken {
                        id
                        name
                        symbol
                        decimals
                    }
                    decentralandData {
                        metadata
                        coordinates {
                            id
                        }
                    }
                }
                rents {
                    asset {
                        decentralandData {
                            coordinates {
                                id
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
  .then((async response => {
    console.log(response);

    const result = { ...response.data.user };
    const unclaimedRentFeeAssets = result.assets?.filter((a: any) => BigNumber.from(a.unclaimedRentFee)?.gt(0));
    const unclaimedRentFeeConsumerAssets = result.consumerTo?.filter((a: any) => BigNumber.from(a.unclaimedRentFee)?.gt(0));
    const mergedUnclaimed = [...unclaimedRentFeeAssets, ...unclaimedRentFeeConsumerAssets];
    result.unclaimedRentAssets = parseAssets([...new Map(mergedUnclaimed.map(v => [v.id, v])).values()]);
    result.hasUnclaimedRent = result.unclaimedRentAssets.length > 0;
    return result;
  }))
  .catch(e => {
    console.log(e);
    return {} as UserEntity;
  });
}

/**
 * Gets all the claim history of a user, ordered by timestamp in descending order
 * @param address The address of the user
 */
export function fetchUserClaimHistory(
  address: string): Promise<ClaimHistory[]> {
  return GraphClient.get({
    query: gql`
        query GetUserClaimHistory($id: String) {
            user(id: $id) {
                id,
                claimHistory(orderBy: timestamp, orderDirection: desc) {
                    asset {
                        decentralandData {
                            id
                            metadata
                            coordinates {
                                id
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
  .then((async response => {
    console.log(response);
    // TODO: convert to proper model if necessary

    return response.data.user?.claimHistory;
  }))
  .catch(e => {
    console.log(e);
    return { data: [], meta: { count: 0 } };
  });
}

/**
 * Gets Assets by metaverse id, and gte (greater or equal) than the last rent end,
 * ordered by a given column in ascending/descending order
 * @param page Which page to load. Default 1
 * @param limit how many items per page. Default 6
 * @param metaverse The target metaverse id. Default '1', which is considered Decentraland
 * @param lastRentEnd A timestamp (in seconds), which will be used to query assets with lastRentEnd greater than the given.
 * @param orderColumn The name of the order column
 * @param isAscending Whether the order is ascending
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
            assets (where: {metaverse: $metaverse, lastRentEnd_gte: $lastRentEnd}, orderBy: $orderColumn, orderDirection: $orderDirection) {
                id
                minPeriod
                maxPeriod
                pricePerSecond
                paymentToken {
                    name
                    symbol
                    decimals
                }
                decentralandData {
                    metadata
                    coordinates {
                        id
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
  .then((async response => {
    // Paginate the result
    const paginatedAssets = response.data.assets.slice(limit * (page - 1), limit * page);

    return {
      data: parseAssets(paginatedAssets),
      meta: { count: response.data.assets.length },
    };
  }))
  .catch(e => {
    console.log(e);
    return { data: [], meta: { count: 0, block: 0 } };
  });
}

function parseAssets(assets: any[]): AssetEntity[] {
  let result = [] as AssetEntity[];

  for (let i = 0; i < assets.length; i++) {
    const graphAsset = assets[i];
    const liteAsset: AssetEntity = { ...graphAsset };
    liteAsset.pricePerSecond = getHumanValue(new BigNumber(graphAsset.pricePerSecond), graphAsset.paymentToken.decimals)!;
    liteAsset.name = getDecentralandAssetName(graphAsset.decentralandData);
    liteAsset.paymentToken = { ...graphAsset.paymentToken };
    liteAsset.isHot = graphAsset.totalRents > 0;
    liteAsset.unclaimedRentFee = getHumanValue(new BigNumber(graphAsset.unclaimedRentFee), graphAsset.paymentToken.decimals)!;
    result.push(liteAsset);
  }

  return result;
}

function getDecentralandAssetName(decentralandData: any): string {
  if (decentralandData === null) {
    return '';
  }
  if (decentralandData.metadata !== '') {
    return decentralandData.metadata;
  }
  if (decentralandData.coordinates.length > 1) {
    return 'Estate';
  }
  const coordinates = decentralandData.coordinates[0].id.split('-');
  return `LAND (${coordinates[0]}, ${coordinates[1]})`;
}
