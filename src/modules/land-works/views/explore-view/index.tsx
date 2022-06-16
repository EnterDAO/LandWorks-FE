import React, { useEffect, useState } from 'react';
import useDebounce from '@rooks/use-debounce';
import { isNull, union } from 'lodash';
import { getNonHumanValue } from 'web3/utils';

import { Modal } from 'design-system';
import LayoutFooter from 'layout/components/layout-footer';
import { AtlasTile } from 'modules/land-works/components/atlas';
import LandsExploreFilters from 'modules/land-works/components/lands-explore-filters';
import { statusData } from 'modules/land-works/components/lands-explore-filters/filters-data';
import LandsExploreList from 'modules/land-works/components/lands-explore-list';
import LandsExploreMap from 'modules/land-works/components/lands-explore-map';
import LandsExploreMapVoxels from 'modules/land-works/components/lands-explore-map-voxels';
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
  fetchAllListedAssetsByConsumer,
  fetchAllListedAssetsByMetaverseAndGetLastRentEndWithOrder,
  fetchTokenPayments,
} from '../../api';

import {
  filterLandsByAvailability,
  filterLandsByQuery,
  getAllLandsCoordinates,
  landsOrder,
} from 'modules/land-works/utils';
import { getNowTs, sessionStorageHandler } from 'utils';
import { DAY_IN_SECONDS } from 'utils/date';

import {
  DECENTRALAND_METAVERSE,
  DEFAULT_LAST_RENT_END,
  DEFAULT_TOKEN_ADDRESS,
  VOXEL_METAVERSE,
  sortColumns,
  sortDirections,
} from 'modules/land-works/constants';

import './explore-view.scss';

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
  const [mapExpanded, setMapExpanded] = useState(false);
  const [mapIsHidden, setMapIsHidden] = useState(sessionFilters.mapIsHidden || false);
  const [mapSize, setMapSize] = useState('small');

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

  const onChangeFiltersOwnerToggler = (value: boolean) => {
    if (value) {
      getLands(sortColumn, sortDir, lastRentEnd, paymentToken, wallet?.account?.toLowerCase());
    } else {
      if (!isNull(paymentToken)) {
        getLands(sortColumn, sortDir, lastRentEnd, paymentToken);
      }
    }
  };

  const onChangeFiltersAvailable = (value: number) => {
    const newValue = value > 1 ? getNowTs().toString() : DEFAULT_LAST_RENT_END;
    setStatusFilter(statusData[value - 1].filter);
    setLastRentEnd(newValue);
    sessionStorageHandler('set', 'explore-filters', 'lastRentEnd', newValue);
  };

  const onChangeMetaverse = (index: string) => {
    setMetaverse(index);
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
      maxPrice: string,
      owner: string
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
        maxPrice,
        owner
      );

      if (owner?.length) {
        const consumer = await fetchAllListedAssetsByConsumer(
          String(metaverse),
          lastRentEnd,
          sortBySize ? 'totalRents' : orderColumn,
          sortDir,
          paymentToken,
          statusFilter,
          minPrice,
          maxPrice,
          owner
        );
        const unionArrays = union(lands.data, consumer.data);
        const orderedLands = landsOrder(unionArrays, orderColumn, sortDir);

        setLands(orderedLands);
      } else {
        sortByHottest || sortBySize ? setLands(landsOrder(lands.data, orderColumn, sortDir)) : setLands(lands.data);
      }

      setLoading(false);

      const highlights = getAllLandsCoordinates(lands.data);
      setCoordinatesHighlights(highlights);
      setPointMapCentre(highlights);
    },
    500
  );

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
      sessionStorageHandler('get', 'explore-filters', 'owner')
        ? getLands(sortColumn, sortDir, lastRentEnd, paymentToken, minPrice, maxPrice, wallet?.account?.toLowerCase())
        : getLands(sortColumn, sortDir, lastRentEnd, paymentToken, minPrice, maxPrice);
    }
  }, [wallet.account, sortColumn, sortDir, lastRentEnd, paymentToken, metaverse, minPrice, maxPrice]);

  useEffect(() => {
    getPaymentTokens();
  }, []);

  useEffect(() => {
    setLoading(false);
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
          <div className="content-container--explore-view--header">
            <LandsExploreSubheader
              totalLands={lastRentEnd !== '0' ? availableLands.length : filterLandsByQuery(lands, searchQuery).length}
              hasMetamaskConnected={wallet.isActive && wallet.connector?.id === 'metamask'}
              handleListNew={() => setShowListNewModal(true)}
            />
            <LandsExploreFilters
              onChangeSortDirection={onChangeFiltersSortDirection}
              onChangeOwnerToggler={onChangeFiltersOwnerToggler}
              onChangeAvailable={onChangeFiltersAvailable}
              onChangeCurrency={onChangeFiltersCurrency}
              onChangeMetaverse={onChangeMetaverse}
              onChangePrice={onChangeFiltersPrice}
            />
          </div>
          <div className="content-container content-container--explore-view">
            <div className={`list-lands-container ${mapIsHidden ? 'full-width' : ''}`}>
              <LandsExploreList
                setMapSize={setMapSize}
                setIsHiddenMap={hideMapHandler}
                isHiddenMap={mapIsHidden}
                lastRentEnd={lastRentEnd}
                loading={loading}
                lands={lands}
                setPointMapCentre={setPointMapCentre}
              />
              <LayoutFooter isWrapped={false} />
            </div>
            {!mapIsHidden && (
              <div
                className={`map-list-container 
                ${mapExpanded && 'map-list-container--expanded'} 
                ${mapSize === 'large' && 'map-list-container--enlarged'} 
                ${mapSize === 'medium' && 'map-list-container--middleSize'}
                }`}
              >
                {metaverse == VOXEL_METAVERSE && (
                  <LandsExploreMapVoxels
                    positionX={atlasMapX}
                    positionY={atlasMapY}
                    expanded={mapExpanded}
                    onClick={() => setMapExpanded(!mapExpanded)}
                    lands={lands}
                  />
                )}
                {metaverse == DECENTRALAND_METAVERSE && (
                  <LandsExploreMap
                    positionX={atlasMapX}
                    positionY={atlasMapY}
                    expanded={mapExpanded}
                    onClick={() => setMapExpanded(!mapExpanded)}
                    highlights={coordinatesHighlights}
                    lands={lands}
                  />
                )}
              </div>
            )}
            <Modal open={showListNewModal} handleClose={() => setShowListNewModal(false)}>
              <ListNewProperty />
            </Modal>
          </div>
        </LandsMapTileProvider>
      </LandsMapTilesProvider>
    </LandsSearchQueryProvider>
  );
};

export default ExploreView;
