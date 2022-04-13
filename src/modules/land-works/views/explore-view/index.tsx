import React, { useEffect, useState } from 'react';
import {
  DECENTRALAND_METAVERSE,
  DEFAULT_LAST_RENT_END,
  DEFAULT_TOKEN_ADDRESS,
  sortColumns,
  sortDirections,
} from 'constants/modules';
import useDebounce from '@rooks/use-debounce';
import { isNull } from 'lodash';

import { AtlasTile } from 'components/custom/Atlas/Atlas';
import { Modal } from 'design-system';
import LayoutFooter from 'layout/components/layout-footer';
import LandsExploreFilters from 'modules/land-works/components/lands-explore-filters';
import LandsExploreList from 'modules/land-works/components/lands-explore-list';
import LandsExploreMap from 'modules/land-works/components/lands-explore-map';
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

import { filterLandsByAvailability, filterLandsByQuery, getAllLandsCoordinates } from 'modules/land-works/utils';
import { getNowTs, sessionStorageHandler } from 'utils';

import './explore-view.scss';

const ExploreView: React.FC = () => {
  const wallet = useWallet();

  const sessionFilters = {
    available: sessionStorageHandler('get', 'explore-filters', 'available'),
    currency: sessionStorageHandler('get', 'explore-filters', 'currency'),
    order: sessionStorageHandler('get', 'explore-filters', 'order'),
    owner: sessionStorageHandler('get', 'explore-filters', 'owner'),
    lastRentEnd: sessionStorageHandler('get', 'explore-filters', 'lastRentEnd'),
    metaverse: sessionStorageHandler('get', 'explore-filters', 'metaverse'),
  };

  const [lands, setLands] = useState<AssetEntity[]>([]);
  const [clickedLandId, setStateClickedLandId] = useState<AssetEntity['id']>('');
  const [mapTiles, setMapTiles] = useState<Record<string, AtlasTile>>({});
  const [selectedTile, setSelectedTile] = useState<SelectedTile>({
    id: '',
    type: '',
    owner: '',
  });

  const [sortDir, setSortDir] = useState(sortDirections[sessionFilters.order - 1 || 0]);
  const [sortColumn, setSortColumn] = useState(sortColumns[sessionFilters.order - 1 || 0]);

  const [metaverse, setMetaverse] = useState(sessionFilters.metaverse || DECENTRALAND_METAVERSE);

  const [coordinatesHighlights, setCoordinatesHighlights] = useState<CoordinatesLand[]>([]);
  const [mapExpanded, setMapExpanded] = useState(false);

  const [atlasMapX, setAtlasMapX] = useState(0);
  const [atlasMapY, setAtlasMapY] = useState(0);

  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [showCardPreview, setShowCardPreview] = useState(false);

  const [lastRentEnd, setLastRentEnd] = useState(sessionFilters.lastRentEnd || DEFAULT_LAST_RENT_END);

  const [paymentTokens, setPaymentTokens] = useState([] as PaymentToken[]);
  const [paymentToken, setPaymentToken] = useState<string | null>(null);

  const [showListNewModal, setShowListNewModal] = useState(false);

  const setClickedLandId = (x: number | string, y: number | string) => {
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

  const onChangeFiltersOwnerToggler = (value: boolean) => {
    if (value) {
      getLands(sortColumn, sortDir, lastRentEnd, paymentToken, wallet?.account?.toLowerCase());
    } else {
      if (!isNull(paymentToken)) {
        getLands(sortColumn, sortDir, lastRentEnd, paymentToken);
      }
    }
  };

  const onChangeFiltersAvailable = (value: boolean) => {
    const newValue = value ? getNowTs().toString() : DEFAULT_LAST_RENT_END;
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
    async (orderColumn: string, sortDir: string, lastRentEnd: string, paymentToken: string, owner: string) => {
      setLoading(true);

      const lands = await fetchAllListedAssetsByMetaverseAndGetLastRentEndWithOrder(
        String(metaverse),
        lastRentEnd,
        orderColumn,
        sortDir,
        paymentToken,
        owner
      );

      setLands(lands.data);
      setLoading(false);
      const highlights = getAllLandsCoordinates(lands.data);
      setCoordinatesHighlights(highlights);
      setPointMapCentre(highlights);
    },
    500
  );

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
        ? getLands(sortColumn, sortDir, lastRentEnd, paymentToken, wallet?.account?.toLowerCase())
        : getLands(sortColumn, sortDir, lastRentEnd, paymentToken);
    }
  }, [wallet.account, sortColumn, sortDir, lastRentEnd, paymentToken, metaverse]);

  useEffect(() => {
    getPaymentTokens();
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [lands]);

  const availableLands = filterLandsByAvailability(filterLandsByQuery(lands, searchQuery));
  return (
    <LandsSearchQueryProvider value={{ searchQuery, setSearchQuery }}>
      <LandsMapTilesProvider value={{ mapTiles, setMapTiles }}>
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
            />
          </div>

          <div className="content-container content-container--explore-view">
            <div className="list-lands-container">
              <LandsExploreList
                lastRentEnd={lastRentEnd}
                loading={loading}
                lands={lands}
                setPointMapCentre={setPointMapCentre}
              />
              <LayoutFooter isWrapped={false} />
            </div>

            <div className={`map-list-container ${mapExpanded ? 'map-list-container--expanded' : ''}`}>
              <LandsExploreMap
                positionX={atlasMapX}
                positionY={atlasMapY}
                expanded={mapExpanded}
                onClick={() => setMapExpanded(!mapExpanded)}
                highlights={coordinatesHighlights}
                lands={lands}
              />
            </div>
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
