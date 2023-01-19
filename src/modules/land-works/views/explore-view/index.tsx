import React, { useCallback, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import BigNumber from 'bignumber.js';
import { getUnixTime } from 'date-fns';
import useSWR from 'swr';
import { BooleanParam, useQueryParam, withDefault } from 'use-query-params';
import { getNonHumanValue } from 'web3/utils';

import { Box } from 'design-system';
import LayoutFooter from 'layout/components/layout-footer';
import { AtlasTile } from 'modules/land-works/components/atlas';
import LandsExploreFilters from 'modules/land-works/components/lands-explore-filters';
import { useRentStatusQueryParam } from 'modules/land-works/components/lands-explore-filters/rent-status-select';
import LandsExploreList from 'modules/land-works/components/lands-explore-list';
import usePriceQueryParams from 'modules/land-works/components/price-popover/usePriceQueryParams';
import LandsMapTileProvider, { SelectedTile } from 'modules/land-works/providers/lands-map-tile';
import LandsMapTilesProvider from 'modules/land-works/providers/lands-map-tiles';
import LandsSearchQueryProvider from 'modules/land-works/providers/lands-search-query';

import { AssetEntity, GET_TOKEN_PAYMENTS, PaymentToken, fetchAssets } from '../../api';
import { useMetaverseQueryParam } from '../my-properties-view/MetaverseSelect';
import ExploreMap from './ExploreMap';

import { filterByMoreFilters, getAllLandsCoordinates } from 'modules/land-works/utils';
import { getNowTs, sessionStorageHandler } from 'utils';
import { DAY_IN_SECONDS } from 'utils/date';

import { DEFAULT_LAST_RENT_END, RentStatus, sortColumns, sortDirections } from 'modules/land-works/constants';

import './explore-view.scss';

import { MoreFiltersType } from 'modules/land-works/components/lands-explore-filters-modal/types';

const IsMapVisibleParam = withDefault(BooleanParam, true);

const parsePriceToNonHuman = (price: number, decimals = 0) => {
  return getNonHumanValue(price, decimals).dividedBy(DAY_IN_SECONDS).toFixed(0);
};

const useGetPaymentTokensQuery = () => {
  const { data, ...other } = useQuery<{ paymentTokens: PaymentToken[] }>(GET_TOKEN_PAYMENTS);

  return {
    data: data?.paymentTokens,
    ...other,
  };
};

const useGetAllAssetsQuery = (metaverseId?: string) => {
  const { data, error } = useSWR(metaverseId ? [metaverseId, 'metaverse-assets'] : null, fetchAssets);

  return {
    data,
    loading: !data && !error,
    error,
  };
};

// TODO: refactor
const ExploreView: React.FC = () => {
  const sessionFilters = {
    order: sessionStorageHandler('get', 'explore-filters', 'order'),
    owner: sessionStorageHandler('get', 'explore-filters', 'owner'),
  };

  const [clickedLandId, setStateClickedLandId] = useState<AssetEntity['id']>('');
  const [mapTiles, setMapTiles] = useState<Record<string, AtlasTile>>({});
  const [selectedId, setSelectedId] = useState<string>();
  const [selectedTile, setSelectedTile] = useState<SelectedTile>({
    id: '',
    type: '',
    owner: '',
  });

  const [metaverse, setMetaverse] = useMetaverseQueryParam();
  const [sortType, setSortType] = useState(
    sessionFilters.order && sessionFilters.order[`${metaverse}`] ? sessionFilters.order[`${metaverse}`] - 1 : 0
  );

  const [rentStatus] = useRentStatusQueryParam();
  const [isMapVisible, setIsMapVisible] = useQueryParam('map', IsMapVisibleParam);
  const [priceParams] = usePriceQueryParams();

  const lastRentEnd = useMemo(() => {
    return rentStatus !== RentStatus.All ? getNowTs().toString() : DEFAULT_LAST_RENT_END;
  }, [rentStatus]);

  const [searchQuery, setSearchQuery] = useState('');
  const [showCardPreview, setShowCardPreview] = useState(false);

  const { data: paymentTokens, loading: arePaymentTokensLoading } = useGetPaymentTokensQuery();
  const { data: assets, loading: areAssetsLoading } = useGetAllAssetsQuery(metaverse.toString());
  const isLoading = arePaymentTokensLoading || areAssetsLoading;

  const paymentToken = useMemo(() => {
    return priceParams.currency !== 0 && paymentTokens && paymentTokens.length > 0
      ? paymentTokens[priceParams.currency - 1]
      : undefined;
  }, [paymentTokens, priceParams.currency]);

  const filteredAssets = useMemo(() => {
    if (!assets) {
      return [];
    }

    const isFilteredByStatus = (asset: AssetEntity) => {
      const lastRentEnd = +asset.lastRentEnd;
      const nowUnixTime = getUnixTime(new Date());

      if (rentStatus === RentStatus.Available) {
        return nowUnixTime >= lastRentEnd;
      } else if (rentStatus === RentStatus.Rented) {
        return nowUnixTime < lastRentEnd;
      }

      return true;
    };

    const isFilteredByPaymentToken = (asset: AssetEntity) => {
      return !paymentToken || asset.paymentToken.id === paymentToken.id;
    };

    const isFilteredByMinPrice = (asset: AssetEntity) => {
      if (!priceParams.minPrice || !paymentToken) {
        return true;
      }

      const normalizedMinPrice = parsePriceToNonHuman(priceParams.minPrice, paymentToken.decimals);

      return new BigNumber(asset.pricePerSecond).gte(normalizedMinPrice);
    };

    const isFilteredByMaxPrice = (asset: AssetEntity) => {
      if (!priceParams.maxPrice || !paymentToken) {
        return true;
      }

      const normalizedMaxPrice = parsePriceToNonHuman(priceParams.maxPrice, paymentToken.decimals);

      return new BigNumber(asset.pricePerSecond).lte(normalizedMaxPrice);
    };

    return assets.filter((asset) => {
      return (
        isFilteredByPaymentToken(asset) &&
        isFilteredByStatus(asset) &&
        isFilteredByMinPrice(asset) &&
        isFilteredByMaxPrice(asset)
      );
    });
  }, [assets, paymentToken, rentStatus, priceParams.minPrice, priceParams.maxPrice]);

  const sortedAssets = useMemo(() => {
    const dir = sortDirections[sortType] === 'desc' ? -1 : 1;
    const field = sortColumns[sortType] as keyof AssetEntity;
    return [...filteredAssets].sort((a, b) => {
      return new BigNumber(a[field] as string).comparedTo(b[field] as string) * dir;
    });
  }, [filteredAssets, sortType]);

  const [moreFilters, setMoreFilters] = useState<Partial<MoreFiltersType> | null>(null);

  const { lands, maxArea, maxHeight, maxLandSize } = useMemo(() => {
    const coordinatesHighlights = getAllLandsCoordinates(sortedAssets);

    const maxValues = sortedAssets.reduce(
      (acc, land) => {
        acc.maxLandSize += land.additionalData?.size || 0;
        acc.maxArea += (land.additionalData as any)?.area || 0;
        acc.maxHeight += (land.additionalData as any)?.height || 0;

        return acc;
      },
      { maxLandSize: 0, maxArea: 0, maxHeight: 0 }
    );

    return {
      lands: sortedAssets,
      coordinatesHighlights,
      ...maxValues,
    };
  }, [sortedAssets]);

  const filteredLands = useMemo(() => {
    return moreFilters ? filterByMoreFilters(lands, moreFilters, metaverse) : lands;
  }, [lands, moreFilters, metaverse]);

  const setClickedLandId = useCallback(
    (x: number | string, y?: number | string | undefined) => {
      if (x && y) {
        let landId = `${x},${y}`;

        // Look for the first coordinate for land estate.
        lands.forEach((land) => {
          land.decentralandData?.coordinates.forEach((coord, coordIndex) => {
            if (coordIndex > 0 && coord.id === landId.replace(',', '-')) {
              landId = `${land.decentralandData?.coordinates[0].x},${land.decentralandData?.coordinates[0].y}`;
            }
          });
        });

        return setStateClickedLandId(landId);
      } else {
        setStateClickedLandId(`${x}`);
      }
    },
    [lands]
  );

  const onChangeFiltersSortDirection = (value: number) => {
    setSortType(Number(value) - 1);
  };

  const onChangeMetaverse = (index: string) => {
    setMetaverse(+index);
    setMoreFilters(null);
  };

  const landsMapTilesValue = useMemo(() => {
    return {
      mapTiles,
      setMapTiles,
      selectedId,
      setSelectedId,
    };
  }, [mapTiles, setMapTiles, selectedId, setSelectedId]);

  const landsMapTileValue = useMemo(() => {
    return {
      clickedLandId,
      setClickedLandId,
      selectedTile,
      setSelectedTile,
      showCardPreview,
      setShowCardPreview,
    };
  }, [clickedLandId, setClickedLandId, selectedTile, setSelectedTile, showCardPreview, setShowCardPreview]);

  return (
    <LandsSearchQueryProvider value={{ searchQuery, setSearchQuery }}>
      <LandsMapTilesProvider value={landsMapTilesValue}>
        <LandsMapTileProvider value={landsMapTileValue}>
          <LandsExploreFilters
            handleMoreFilter={setMoreFilters}
            onChangeSortDirection={onChangeFiltersSortDirection}
            onChangeMetaverse={onChangeMetaverse}
            maxLandSize={maxLandSize}
            maxHeight={maxHeight}
            maxArea={maxArea}
          />
          <Box position="relative">
            <Box className="content-container content-container--explore-view" maxWidth="none !important">
              <Box width={{ lg: isMapVisible ? 0.5 : 1 }} pr={{ lg: isMapVisible ? 2 : 0 }}>
                <LandsExploreList
                  selectedAssetId={selectedId}
                  onSelectAsset={setSelectedId}
                  isMapVisible={isMapVisible}
                  lastRentEnd={lastRentEnd}
                  loading={isLoading}
                  lands={filteredLands || lands}
                />
                <LayoutFooter isWrapped={false} />
              </Box>
            </Box>

            <ExploreMap
              type={metaverse}
              assets={lands}
              isMapVisible={isMapVisible}
              selectedId={selectedId}
              onSelect={setSelectedId}
              onHideMap={() => setIsMapVisible(false)}
              onShowMap={() => setIsMapVisible(true)}
            />
          </Box>
        </LandsMapTileProvider>
      </LandsMapTilesProvider>
    </LandsSearchQueryProvider>
  );
};

export default ExploreView;
