import useSWR from 'swr';

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

const contracts = [config.contracts.decentraland.estateRegistry, config.contracts.decentraland.landRegistry];

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

const url = `${config.reservoir.apiUrl}/orders/asks/v4?${contracts
  .map((contract) => `contracts=${contract}`)
  .join('&')}&source=opensea.io&sortBy=price`;

const useGetAssetsForBuyingQuery = () => {
  return useSWR(url, fetchAssetsForBuying);
};

export default useGetAssetsForBuyingQuery;
