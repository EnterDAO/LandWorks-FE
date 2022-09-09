import React, { useEffect, useState } from 'react';
import useDebounce from '@rooks/use-debounce';
import { isNull } from 'lodash';
import { getNonHumanValue } from 'web3/utils';

import { Box, Modal } from 'design-system';
import LayoutFooter from 'layout/components/layout-footer';
import { AtlasTile } from 'modules/land-works/components/atlas';
import LandsExploreFilters from 'modules/land-works/components/lands-explore-filters';
import { statusData } from 'modules/land-works/components/lands-explore-filters/filters-data';
import LandsExploreList from 'modules/land-works/components/lands-explore-list';
import LandsExploreSubheader from 'modules/land-works/components/lands-explore-subheader';
import ListNewProperty from 'modules/land-works/components/list-new-property';
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
import ExploreMap from './ExploreMap';

import {
  filterByMoreFilters,
  filterLandsByAvailability,
  filterLandsByQuery,
  getAllLandsCoordinates,
  getMaxArea,
  getMaxHeight,
  getMaxLandSize,
  landsOrder,
} from 'modules/land-works/utils';
import { getNowTs, sessionStorageHandler } from 'utils';
import { DAY_IN_SECONDS } from 'utils/date';

import {
  DECENTRALAND_METAVERSE,
  DEFAULT_LAST_RENT_END,
  DEFAULT_TOKEN_ADDRESS,
  sortColumns,
  sortDirections,
} from 'modules/land-works/constants';

import './explore-view.scss';

import { MoreFiltersType } from 'modules/land-works/components/lands-explore-filters-modal/types';

const ExploreView: React.FC = () => {
  const wallet = useWallet();

  const sessionFilters = {
    available: sessionStorageHandler('get', 'explore-filters', 'available'),
    currency: sessionStorageHandler('get', 'explore-filters', 'currency'),
    order: sessionStorageHandler('get', 'explore-filters', 'order'),
    owner: sessionStorageHandler('get', 'explore-filters', 'owner'),
    lastRentEnd: sessionStorageHandler('get', 'explore-filters', 'lastRentEnd'),
    metaverse: sessionStorageHandler('get', 'general', 'metaverse'),
    mapIsHidden: sessionStorageHandler('get', 'general', 'isHiddenMap'),
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
  const [metaverse, setMetaverse] = useState(sessionFilters.metaverse || DECENTRALAND_METAVERSE);
  const orderFilter =
    sessionFilters.order && sessionFilters.order[`${metaverse}`] ? sessionFilters.order[`${metaverse}`] - 1 : 0;
  const [sortDir, setSortDir] = useState(sortDirections[orderFilter]);
  const [sortColumn, setSortColumn] = useState(sortColumns[orderFilter]);

  const [coordinatesHighlights, setCoordinatesHighlights] = useState<CoordinatesLand[]>([]);
  const [mapIsHidden, setMapIsHidden] = useState(sessionFilters.mapIsHidden || false);

  const [atlasMapX, setAtlasMapX] = useState(0);
  const [atlasMapY, setAtlasMapY] = useState(0);

  const [minPrice, setMinPrice] = useState<string | undefined>();
  const [maxPrice, setMaxPrice] = useState<string | undefined>();

  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [showCardPreview, setShowCardPreview] = useState(false);

  const [lastRentEnd, setLastRentEnd] = useState(sessionFilters.lastRentEnd || DEFAULT_LAST_RENT_END);
  const [paymentTokens, setPaymentTokens] = useState([] as PaymentToken[]);
  const [paymentToken, setPaymentToken] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [maxLandSize, setMaxLandSize] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);
  const [maxArea, setMaxArea] = useState(0);
  const [filteredLands, setFilteredLands] = useState<AssetEntity[]>([]);
  const [moreFilters, setMoreFilters] = useState<Partial<MoreFiltersType> | null>(null);

  const [showListNewModal, setShowListNewModal] = useState(false);

  const setClickedLandId = (x: number | string, y?: number | string | undefined) => {
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
    }
    if (x) setStateClickedLandId(`${x}`);
  };

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

  const onChangeFiltersPrice = (currencyIndex: number, minPrice: number | null, maxPrice: number | null) => {
    minPrice ? setMinPrice(parsePriceToNonHuman(currencyIndex, minPrice)) : setMinPrice(undefined);
    maxPrice ? setMaxPrice(parsePriceToNonHuman(currencyIndex, maxPrice)) : setMaxPrice(undefined);
  };

  const parsePriceToNonHuman = (index: number, price: number) => {
    return getNonHumanValue(price, paymentTokens[index - 1].decimals)
      .dividedBy(DAY_IN_SECONDS)
      .toFixed(0);
  };

  const onChangeFiltersAvailable = (value: number) => {
    const newValue = value > 1 ? getNowTs().toString() : DEFAULT_LAST_RENT_END;
    setStatusFilter(statusData[value - 1].filter);
    setLastRentEnd(newValue);
    sessionStorageHandler('set', 'explore-filters', 'lastRentEnd', newValue);
  };

  const onChangeMetaverse = (index: string) => {
    setMetaverse(index);
    setMoreFilters(null);
  };

  const onChangeFiltersCurrency = async (index: number) => {
    let tokens: PaymentToken[] = paymentTokens;

    if (index === 0) {
      return setPaymentToken(DEFAULT_TOKEN_ADDRESS);
    }

    if (!paymentTokens.length) {
      tokens = await fetchTokenPayments();
      setPaymentTokens(tokens);
    }

    setPaymentToken(tokens[index - 1].id);
  };

  const getPaymentTokens = async () => {
    const tokens = await fetchTokenPayments();
    setPaymentTokens(tokens);
    sessionFilters.currency && setPaymentToken(tokens[sessionFilters.currency - 1].id);
    return sessionFilters.currency ? tokens[sessionFilters.currency - 1].id : paymentToken;
  };

  const getLands = useDebounce(
    async (
      orderColumn: string,
      sortDir: 'asc' | 'desc',
      lastRentEnd: string,
      paymentToken: string,
      minPrice: string,
      maxPrice: string
    ) => {
      setLoading(true);
      const sortBySize = orderColumn == 'size';
      const sortByHottest = orderColumn == 'totalRents';

      const lands = await fetchAllListedAssetsByMetaverseAndGetLastRentEndWithOrder(
        String(metaverse),
        lastRentEnd,
        sortBySize ? 'totalRents' : orderColumn,
        sortDir,
        paymentToken,
        statusFilter,
        minPrice,
        maxPrice
      );

      sortByHottest || sortBySize ? setLands(landsOrder(lands.data, orderColumn, sortDir)) : setLands(lands.data);

      setLoading(false);

      const highlights = getAllLandsCoordinates(lands.data);
      setCoordinatesHighlights(highlights);
      setPointMapCentre(highlights);

      if (metaverse == 1) {
        setMaxLandSize(getMaxLandSize(lands.data));
      } else {
        setMaxHeight(getMaxHeight(lands.data));
        setMaxArea(getMaxArea(lands.data));
      }
    },
    500
  );

  const handleMoreFilter = (filters: Partial<MoreFiltersType>) => {
    setMoreFilters(filters);
    setFilteredLands(filterByMoreFilters(lands, filters, metaverse));
  };

  const hideMapHandler = (value: boolean) => {
    setMapIsHidden(value);
    sessionStorageHandler('set', 'general', 'isHiddenMap', value);
  };

  useEffect(() => {
    if (wallet.account) {
      setLoading(true);
    } else {
      setLands([]);
    }
  }, [wallet.account]);

  useEffect(() => {
    if (!isNull(paymentToken)) {
      getLands(sortColumn, sortDir, lastRentEnd, paymentToken, minPrice, maxPrice);
    }
  }, [wallet.account, sortColumn, sortDir, lastRentEnd, paymentToken, metaverse, minPrice, maxPrice]);

  useEffect(() => {
    getPaymentTokens();
  }, []);

  useEffect(() => {
    setLoading(false);
    setFilteredLands(lands);
    moreFilters && handleMoreFilter(moreFilters);
  }, [lands]);

  const availableLands = filterLandsByAvailability(filterLandsByQuery(lands, searchQuery));

  return (
    <LandsSearchQueryProvider value={{ searchQuery, setSearchQuery }}>
      <LandsMapTilesProvider value={{ mapTiles, setMapTiles, selectedId, setSelectedId }}>
        <LandsMapTileProvider
          value={{
            clickedLandId,
            setClickedLandId,
            selectedTile,
            setSelectedTile,
            showCardPreview,
            setShowCardPreview,
          }}
        >
          <LandsExploreSubheader
            totalLands={lastRentEnd !== '0' ? availableLands.length : filterLandsByQuery(lands, searchQuery).length}
            hasMetamaskConnected={wallet.isActive && wallet.connector?.id === 'metamask'}
            handleListNew={() => setShowListNewModal(true)}
          />
          <LandsExploreFilters
            handleMoreFilter={handleMoreFilter}
            onChangeSortDirection={onChangeFiltersSortDirection}
            onChangeAvailable={onChangeFiltersAvailable}
            onChangeCurrency={onChangeFiltersCurrency}
            onChangeMetaverse={onChangeMetaverse}
            onChangePrice={onChangeFiltersPrice}
            maxLandSize={maxLandSize}
            maxHeight={maxHeight}
            maxArea={maxArea}
          />
          <Box position="relative">
            <Box className="content-container content-container--explore-view" maxWidth="none !important">
              <Box width={{ lg: mapIsHidden ? 1 : 0.5 }} pr={{ lg: mapIsHidden ? 0 : 2 }}>
                <LandsExploreList
                  isMapVisible={!mapIsHidden}
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
              isMapVisible={!mapIsHidden}
              onHideMap={() => hideMapHandler(true)}
              onShowMap={() => hideMapHandler(false)}
            />

            <Modal open={showListNewModal} handleClose={() => setShowListNewModal(false)}>
              <ListNewProperty />
            </Modal>
          </Box>
        </LandsMapTileProvider>
      </LandsMapTilesProvider>
    </LandsSearchQueryProvider>
  );
};

export default ExploreView;
