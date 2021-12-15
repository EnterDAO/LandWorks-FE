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
  assetId: number;
  name: string;
  minPeriod: BigNumber;
  maxPeriod: BigNumber;
  pricePerSecond: BigNumber;
  paymentToken: PaymentToken;
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
}

export type ClaimHistory = {
  asset: any;
  amount: BigNumber;
  paymentToken: PaymentToken;
  txHash: string;
  timestamp: number;
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
        }`
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
  rentsSize: number = 5) {
  return GraphClient.get({
    query: gql`
        query GetAsset($id: String, $first: Int) {
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
                    id,
                    name,
                    symbol
                }
                totalRents
                unclaimedRentFee
                pricePerSecond
                lastRentEnd
                status
                decentralandData {
                    metadata,
                    coordinates {
                        id
                    }
                }
                rents(first: $first, orderBy: end, orderDirection: desc) {
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
      first: rentsSize
    },
  })
  .then((async response => {
    console.log(response);

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
export function fetchUser(address: string) {
  return GraphClient.get({
    query: gql`
        query GetUser($id: String) {
            user(id: $id) {
                id,
                consumerTo {
                    unclaimedRentFee
                }
                assets {
                    unclaimedRentFee,
                    decentralandData {
                        coordinates {
                            id
                        }
                    }
                },
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
    const hasAssetsWithUnclaimedRentFee = response.data.user.assets.some((a: any) => a.unclaimedRentFee > 0);
    const hasConsumerAssetsWithUnclaimedRentFee = response.data.user.consumerTo?.assets.some((a: any) => a.unclaimedRentFee > 0);
    result.hasUnclaimedRent = hasAssetsWithUnclaimedRentFee || hasConsumerAssetsWithUnclaimedRentFee;
    return result;
  }))
  .catch(e => {
    console.log(e);
    return { data: [], meta: { count: 0, block: 0 } };
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
  isAscending: boolean = true,
): Promise<PaginatedResult<AssetEntity>> {

  return GraphClient.get({
    query: gql`
        query GetAssets($metaverse: String, $lastRentEnd: String, $orderColumn: String, $orderDirection: String) {
            assets (where: {metaverse: $metaverse, lastRentEnd_gte: $lastRentEnd}, orderBy: $orderColumn, orderDirection: $orderDirection) {
                id,
                minPeriod,
                maxPeriod,
                pricePerSecond,
                paymentToken {
                    name,
                    symbol,
                    decimals,
                },
                decentralandData {
                    metadata,
                    coordinates {
                        id
                    }
                },
                lastRentEnd
                totalRents
            }
            overview (id: "OVERVIEW") {
                totalListings
            }
        }
    `,
    variables: {
      lastRentEnd: lastRentEnd,
      metaverse: metaverse,
      orderColumn: orderColumn,
      orderDirection: isAscending ? 'asc' : 'desc',
    },
  })
  .then((async response => {
    console.log(response);

    const result = parseAssets(response);
    // Paginate the result
    result.data = result.data.slice(limit * (page - 1), limit * page);
    return result;
  }))
  .catch(e => {
    console.log(e);
    return { data: [], meta: { count: 0, block: 0 } };
  });
}

function parseAssets(response: any): PaginatedResult<AssetEntity> {
  let result: PaginatedResult<AssetEntity> = {
    data: [],
    meta: { count: response.data.overview.totalListings },
  };

  for (let i = 0; i < response.data.assets.length; i++) {
    const graphAsset = response.data.assets[i];
    const liteAsset: AssetEntity = { ...graphAsset };
    liteAsset.assetId = Number.parseInt(graphAsset.id);
    liteAsset.pricePerSecond = getHumanValue(new BigNumber(graphAsset.pricePerSecond), graphAsset.paymentToken.decimals)!;
    liteAsset.name = getDecentralandAssetName(graphAsset.decentralandData);
    liteAsset.paymentToken = { ...graphAsset.paymentToken };
    result.data.push(liteAsset);
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
  return decentralandData.coordinates[0].id;
}
