import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { BooleanParam, useQueryParam, withDefault } from 'use-query-params';
import { getNonHumanValue } from 'web3/utils';

import { Box } from 'design-system';
import LayoutFooter from 'layout/components/layout-footer';
import { AtlasTile } from 'modules/land-works/components/atlas';
import LandsExploreFilters from 'modules/land-works/components/lands-explore-filters';
import { statusData } from 'modules/land-works/components/lands-explore-filters/filters-data';
import { useRentStatusQueryParam } from 'modules/land-works/components/lands-explore-filters/rent-status-select';
import LandsExploreList from 'modules/land-works/components/lands-explore-list';
import usePriceQueryParams from 'modules/land-works/components/price-popover/usePriceQueryParams';
import LandsMapTileProvider, { SelectedTile } from 'modules/land-works/providers/lands-map-tile';
import LandsMapTilesProvider from 'modules/land-works/providers/lands-map-tiles';
import LandsSearchQueryProvider from 'modules/land-works/providers/lands-search-query';
import { useWallet } from 'wallets/wallet';

import {
  AssetEntity,
  CoordinatesLand,
  PaymentToken,
  fetchAllListedAssetsByMetaverseAndGetLastRentEndWithOrder,
  fetchTokenPayments,
} from '../../api';
import { useMetaverseQueryParam } from '../my-properties-view/MetaverseSelect';
import ExploreMap from './ExploreMap';

import {
  filterByMoreFilters,
  getAllLandsCoordinates,
  getMaxArea,
  getMaxHeight,
  getMaxLandSize,
  landsOrder,
} from 'modules/land-works/utils';
import { getNowTs, sessionStorageHandler } from 'utils';
import { DAY_IN_SECONDS } from 'utils/date';

import {
  DEFAULT_LAST_RENT_END,
  DEFAULT_TOKEN_ADDRESS,
  RentStatus,
  sortColumns,
  sortDirections,
} from 'modules/land-works/constants';

import './explore-view.scss';

import { MoreFiltersType } from 'modules/land-works/components/lands-explore-filters-modal/types';

const IsMapVisibleParam = withDefault(BooleanParam, true);

const parsePriceToNonHuman = (price: number, decimals = 0) => {
  return getNonHumanValue(price, decimals).dividedBy(DAY_IN_SECONDS).toFixed(0);
};

const usePaymentTokens = () => {
  const [paymentTokens, setPaymentTokens] = useState<PaymentToken[]>([]);

  useEffect(() => {
    let isMounted = true;

    fetchTokenPayments().then((tokens) => {
      if (isMounted) {
        setPaymentTokens(tokens);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return paymentTokens;
};

const ExploreView: React.FC = () => {
  const sessionFilters = {
    order: sessionStorageHandler('get', 'explore-filters', 'order'),
    owner: sessionStorageHandler('get', 'explore-filters', 'owner'),
  };

  const [lands, setLands] = useState<AssetEntity[]>([]);
  const [clickedLandId, setStateClickedLandId] = useState<AssetEntity['id']>('');
  const [mapTiles, setMapTiles] = useState<Record<string, AtlasTile>>({});
  const [selectedId, setSelectedId] = useState<string>('');
  const [selectedTile, setSelectedTile] = useState<SelectedTile>({
    id: '',
    type: '',
    owner: '',
  });

  const [metaverse, setMetaverse] = useMetaverseQueryParam();
  const orderFilter =
    sessionFilters.order && sessionFilters.order[`${metaverse}`] ? sessionFilters.order[`${metaverse}`] - 1 : 0;
  const [sortDir, setSortDir] = useState(sortDirections[orderFilter]);
  const [sortColumn, setSortColumn] = useState(sortColumns[orderFilter]);

  const [coordinatesHighlights, setCoordinatesHighlights] = useState<CoordinatesLand[]>([]);
  const [rentStatus] = useRentStatusQueryParam();
  const [isMapVisible, setIsMapVisible] = useQueryParam('map', IsMapVisibleParam);
  const [priceParams] = usePriceQueryParams();

  const lastRentEnd = useMemo(() => {
    return rentStatus !== RentStatus.All ? getNowTs().toString() : DEFAULT_LAST_RENT_END;
  }, [rentStatus]);

  const [atlasMapX, setAtlasMapX] = useState(0);
  const [atlasMapY, setAtlasMapY] = useState(0);

  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [showCardPreview, setShowCardPreview] = useState(false);

  const wallet = useWallet();

  const paymentTokens = usePaymentTokens();

  const paymentToken = useMemo(() => {
    return priceParams.currency !== 0 && paymentTokens.length > 0 ? paymentTokens[priceParams.currency - 1] : undefined;
  }, [paymentTokens, priceParams.currency]);

  const [maxLandSize, setMaxLandSize] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);
  const [maxArea, setMaxArea] = useState(0);

  const [moreFilters, setMoreFilters] = useState<Partial<MoreFiltersType> | null>(null);

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

  const setPointMapCentre = (lands: CoordinatesLand[]) => {
    if (lands[0]) {
      const { x, y } = lands[0];

      setAtlasMapX(Number(x));
      setAtlasMapY(Number(y));
    }
  };

  const onChangeFiltersSortDirection = (value: number) => {
    const sortIndex = Number(value) - 1;
    setSortDir(sortDirections[sortIndex]);
    setSortColumn(sortColumns[sortIndex]);
  };

  const onChangeMetaverse = (index: string) => {
    setMetaverse(+index);
    setMoreFilters(null);
  };

  const getLands = useCallback(
    async (
      metaverse: number,
      orderColumn: string,
      sortDir: 'asc' | 'desc',
      lastRentEnd: string,
      rentStatus: RentStatus,
      paymentToken?: PaymentToken,
      minPrice?: number | null,
      maxPrice?: number | null
    ) => {
      setLoading(true);
      setLands([]);

      const sortBySize = orderColumn == 'size';
      const sortByHottest = orderColumn == 'totalRents';

      const statusFilter = statusData.find(({ value }) => value === rentStatus)?.filter;
      const paymentTokenId = paymentToken ? paymentToken.id : DEFAULT_TOKEN_ADDRESS;

      const normalizedMinPrice = minPrice ? parsePriceToNonHuman(minPrice, paymentToken?.decimals) : undefined;
      const normalizedMaxPrice = maxPrice ? parsePriceToNonHuman(maxPrice, paymentToken?.decimals) : undefined;

      const lands = await fetchAllListedAssetsByMetaverseAndGetLastRentEndWithOrder(
        String(metaverse),
        lastRentEnd,
        sortBySize ? 'totalRents' : orderColumn,
        sortDir,
        paymentTokenId,
        statusFilter,
        normalizedMinPrice,
        normalizedMaxPrice
      );

      setLands(sortByHottest || sortBySize ? landsOrder(lands.data, orderColumn, sortDir) : lands.data);

      const highlights = getAllLandsCoordinates(lands.data);
      setCoordinatesHighlights(highlights);
      setPointMapCentre(highlights);

      if (metaverse === 1) {
        setMaxLandSize(getMaxLandSize(lands.data));
      } else {
        setMaxHeight(getMaxHeight(lands.data));
        setMaxArea(getMaxArea(lands.data));
      }

      setLoading(false);
    },
    []
  );

  useEffect(() => {
    if (wallet.account) {
      return;
    }
    const timeoutId = window.setTimeout(() => {
      wallet.showWalletsModal();
    }, 500);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [wallet.account, wallet.showWalletsModal]);

  useEffect(() => {
    getLands(
      Number(metaverse),
      sortColumn,
      sortDir,
      lastRentEnd,
      rentStatus,
      paymentToken,
      priceParams.minPrice,
      priceParams.maxPrice
    );
  }, [
    getLands,
    sortColumn,
    sortDir,
    rentStatus,
    lastRentEnd,
    paymentToken,
    metaverse,
    priceParams.minPrice,
    priceParams.maxPrice,
  ]);

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
                  isMapVisible={isMapVisible}
                  lastRentEnd={lastRentEnd}
                  loading={loading}
                  lands={filteredLands || lands}
                  setPointMapCentre={setPointMapCentre}
                />
                <LayoutFooter isWrapped={false} />
              </Box>
            </Box>

            <ExploreMap
              type={metaverse}
              positionX={atlasMapX}
              positionY={atlasMapY}
              highlights={coordinatesHighlights}
              lands={lands}
              isMapVisible={isMapVisible}
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
