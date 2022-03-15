import React, { useEffect, useState } from 'react';
import {
  DECENTRALAND_METAVERSE,
  DEFAULT_LAST_RENT_END,
  DEFAULT_TOKEN_ADDRESS,
  sortColumns,
  sortDirections,
} from 'constants/modules';
import { useSubscription } from '@apollo/client';

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
  USER_SUBSCRIPTION,
  UserEntity,
  fetchAllListedAssetsByMetaverseAndGetLastRentEndWithOrder,
  fetchTokenPayments,
  parseUser,
} from '../../api';

import { filterLandsByQuery, getAllLandsCoordinates } from 'modules/land-works/utils';
import { getNowTs } from 'utils';

import './explore-view.scss';

const ExploreView: React.FC = () => {
  const wallet = useWallet();

  const [lands, setLands] = useState<AssetEntity[]>([]);
  const [clickedLandId, setStateClickedLandId] = useState<AssetEntity['id']>('');
  const [mapTiles, setMapTiles] = useState<Record<string, AtlasTile>>({});
  const [selectedTile, setSelectedTile] = useState<SelectedTile>({
    id: '',
    type: '',
    owner: '',
  });
  const [user, setUser] = useState({} as UserEntity);

  const [sortDir, setSortDir] = useState(sortDirections[0]);
  const [sortColumn, setSortColumn] = useState(sortColumns[0]);

  const [coordinatesHighlights, setCoordinatesHighlights] = useState<CoordinatesLand[]>([]);
  const [mapExpanded, setMapExpanded] = useState(false);

  const [atlasMapX, setAtlasMapX] = useState(0);
  const [atlasMapY, setAtlasMapY] = useState(0);

  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [showCardPreview, setShowCardPreview] = useState(false);

  const [lastRentEnd, setLastRentEnd] = useState(DEFAULT_LAST_RENT_END);

  const [paymentTokens, setPaymentTokens] = useState([] as PaymentToken[]);
  const [paymentToken, setPaymentToken] = useState(DEFAULT_TOKEN_ADDRESS);

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
      setLands(user?.ownerAndConsumerAssets || []);
    } else {
      getLands(sortColumn, sortDir, lastRentEnd, paymentToken);
    }
  };

  const onChangeFiltersAvailable = (value: boolean) => {
    setLastRentEnd(value ? getNowTs().toString() : DEFAULT_LAST_RENT_END);
  };

  const onChangeFiltersCurrency = (value: number) => {
    const sortIndex = Number(value) - 1;
    setPaymentToken(paymentTokens[sortIndex].id);
  };

  const getPaymentTokens = async () => {
    const tokens = await fetchTokenPayments();
    setPaymentTokens(tokens);
  };

  const getLands = async (orderColumn: string, sortDir: string, lastRentEnd: string, paymentToken: string) => {
    setLoading(true);

    const lands = await fetchAllListedAssetsByMetaverseAndGetLastRentEndWithOrder(
      DECENTRALAND_METAVERSE,
      lastRentEnd,
      orderColumn,
      sortDir,
      paymentToken
    );

    setLands(lands.data);
    setLoading(false);
    const highlights = getAllLandsCoordinates(lands.data);
    setCoordinatesHighlights(highlights);
    setPointMapCentre(highlights);
  };

  useSubscription(USER_SUBSCRIPTION, {
    skip: wallet.account === undefined,
    variables: { id: wallet.account?.toLowerCase() },
    onSubscriptionData: ({ subscriptionData }) => {
      if (subscriptionData.error) {
        // TODO:
      }

      setLoading(subscriptionData.loading);

      if (subscriptionData.data.user === null) {
        setUser({} as UserEntity);
        return;
      }

      setUser(parseUser(subscriptionData.data.user));
    },
  });

  useEffect(() => {
    getPaymentTokens();
  }, [paymentToken, lastRentEnd, lands]);

  useEffect(() => {
    if (wallet.account) {
      setLoading(true);
    } else {
      setUser({} as UserEntity);
      setLands([]);
    }
  }, [wallet.account]);

  useEffect(() => {
    getLands(sortColumn, sortDir, lastRentEnd, paymentToken);
  }, [wallet.account, sortColumn, sortDir, lastRentEnd, paymentToken]);

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
              totalLands={filterLandsByQuery(lands, searchQuery).length}
              hasMetamaskConnected={wallet.isActive && wallet.connector?.id === 'metamask'}
              handleListNew={() => setShowListNewModal(true)}
            />
            <LandsExploreFilters
              onChangeSortDirection={onChangeFiltersSortDirection}
              onChangeOwnerToggler={onChangeFiltersOwnerToggler}
              onChangeAvailable={onChangeFiltersAvailable}
              onChangeCurrency={onChangeFiltersCurrency}
            />
          </div>

          <div className="content-container content-container--explore-view">
            <div className="list-lands-container">
              <LandsExploreList loading={loading} lands={lands} setPointMapCentre={setPointMapCentre} />
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
            <Modal height={800} open={showListNewModal} handleClose={() => setShowListNewModal(false)}>
              <ListNewProperty />
            </Modal>
          </div>
        </LandsMapTileProvider>
      </LandsMapTilesProvider>
    </LandsSearchQueryProvider>
  );
};

export default ExploreView;
