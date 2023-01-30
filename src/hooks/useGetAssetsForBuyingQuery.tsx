import { useCallback, useEffect, useMemo } from 'react';
import useSWRInfinite from 'swr/infinite';

import config from 'config';
import { getDecentralandEstateImgUrlById, getDecentralandLandImgUrlByCoords } from 'helpers/helpers';
import { getAdditionalDecentralandData } from 'modules/land-works/api';

interface AssetForBuying {
  id: string;
  contract: string;
  criteria: {
    kind: string;
    data: {
      token: {
        tokenId: string;
      };
    };
  };
  price: {
    currency: {
      contract: string;
      name: string;
      symbol: string;
      decimals: number;
    };
    amount: {
      raw: string;
      decimal: number;
      native: number;
    };
  };
  source: {
    id: string;
    domain: string;
    name: string;
    icon: string;
  };
}

export interface MarketplaceAsset extends Omit<AssetForBuying, 'criteria'> {
  tokenId: string;
  name: string;
  image: string;
  isLand: boolean;
  metadata: {
    size: number;
    coords: {
      x: number;
      y: number;
    } | null;
  };
}

const fetchAssetsForBuying = async (url: string) => {
  const data: {
    orders: AssetForBuying[];
    continuation: null | string;
  } = await fetch(url).then((res) => res.json());

  const ordersWithMetadata = await Promise.all(
    data.orders.map((order) => {
      return getAdditionalDecentralandData(
        order.criteria.data.token.tokenId,
        order.contract.toLowerCase() === config.contracts.decentraland.landRegistry
      ).then((metadata) => {
        return {
          order,
          metadata,
        };
      });
    })
  );

  const assets = ordersWithMetadata
    .filter(({ metadata }) => {
      return metadata.attributes?.size !== 0;
    })
    .map(({ order, metadata }) => {
      const coords =
        'x' in metadata.attributes && 'y' in metadata.attributes
          ? {
              x: metadata.attributes.x,
              y: metadata.attributes.y,
            }
          : null;

      const isLand = !!coords;
      const image = isLand
        ? getDecentralandLandImgUrlByCoords(coords.x, coords.y)
        : getDecentralandEstateImgUrlById(metadata.tokenId);

      return {
        id: order.id,
        source: order.source,
        price: order.price,
        contract: order.contract,
        tokenId: order.criteria.data.token.tokenId,
        image,
        isLand,
        name: coords ? `Land (${coords.x}, ${coords.y})` : `Estate (${metadata.size} Lands)`,
        metadata: {
          size: metadata.size,
          coords,
        },
      } as MarketplaceAsset;
    });

  return {
    assets,
    continuation: data.continuation,
  };
};

const url = `${config.reservoir.apiUrl}/orders/asks/v4?source=opensea.io&sortBy=price`;

const LIMIT = 16;

export enum AssetType {
  All = 0,
  Land = 1,
  Estate = 2,
}

const useGetAssetsForBuyingQuery = (type?: AssetType) => {
  const { data, error, size, setSize } = useSWRInfinite((pageIndex, prevData) => {
    if (prevData && !prevData.continuation) {
      return null;
    }

    let contracts = [config.contracts.decentraland.landRegistry, config.contracts.decentraland.estateRegistry];

    if (type === AssetType.Land) {
      contracts = [config.contracts.decentraland.landRegistry];
    } else if (type === AssetType.Estate) {
      contracts = [config.contracts.decentraland.estateRegistry];
    }

    const key = `${url}&${contracts.map((contract) => `contracts=${contract}`).join('&')}`;

    if (pageIndex === 0 || !prevData) {
      return `${key}&limit=${LIMIT}`;
    }

    return `${key}&continuation=${prevData.continuation}&limit=${LIMIT}`;
  }, fetchAssetsForBuying);

  const assets = useMemo(() => {
    if (!data) {
      return [] as MarketplaceAsset[];
    }

    return data.reduce((acc, { assets }) => acc.concat(assets), [] as MarketplaceAsset[]);
  }, [data]);

  const loadMore = useCallback(() => setSize((prevSize) => prevSize + 1), [setSize]);

  useEffect(() => {
    setSize(1);
  }, [type]);

  const isLoadingInitialData = !data && !error;
  const isLoadingMore = size > 0 && data && typeof data[size - 1] === 'undefined';
  const isEmpty = data?.[0]?.assets.length === 0;
  const isReachedEnd = isEmpty || (data && !data[data.length - 1]?.continuation);

  return {
    data: assets,
    isLoadingInitialData,
    isLoadingMore,
    isEmpty,
    isReachedEnd,
    loadMore,
    error,
  };
};

export default useGetAssetsForBuyingQuery;
