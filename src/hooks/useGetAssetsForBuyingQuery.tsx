import { useCallback, useEffect, useMemo } from 'react';
import useSWRInfinite from 'swr/infinite';

import config from 'config';
import { getDecentralandEstateImgUrlById, getDecentralandLandImgUrlByCoords } from 'helpers/helpers';
import { getAdditionalDecentralandData } from 'modules/land-works/api';

interface TokensForBuying {
  token: TokenForBuying;
  market: MarketForBuying;
}

interface TokenForBuying {
  contract: string;
  tokenId: string;
  name: string;
  collection: {
    id: string;
    name: string;
    image: string;
    slug: string;
  };
}

interface MarketForBuying {
  floorAsk: {
    id: string;
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
  };
}

export interface MarketplaceAsset extends TokensForBuying {
  id: string;
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
    tokens: TokensForBuying[];
    continuation: null | string;
  } = await fetch(url).then((res) => res.json());

  data.tokens = data.tokens.filter((v) => v.market.floorAsk.source.domain === 'opensea.io');

  const ordersWithMetadata = await Promise.all(
    data.tokens.map((order) => {
      return getAdditionalDecentralandData(
        order.token.tokenId,
        order.token.contract.toLowerCase() === config.contracts.decentraland.landRegistry
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
        id: order.market.floorAsk.id,
        image,
        isLand,
        name: coords ? `Land (${coords.x}, ${coords.y})` : `Estate (${metadata.size} Lands)`,
        metadata: {
          size: metadata.size,
          coords,
        },
        token: order.token,
        market: order.market,
      } as MarketplaceAsset;
    });

  return {
    assets,
    continuation: data.continuation,
  };
};

const url = `${config.reservoir.apiUrl}/tokens/v5?sortBy=floorAskPrice&sortDirection=asc&normalizeRoyalties=true`;

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

    let contract = config.contracts.decentraland.landRegistry;

    if (type === AssetType.Land) {
      contract = config.contracts.decentraland.landRegistry;
    } else if (type === AssetType.Estate) {
      contract = config.contracts.decentraland.estateRegistry;
    }

    const key = `${url}&collection=${contract}`;

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
