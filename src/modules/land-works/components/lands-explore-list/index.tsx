import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import useDebounce from '@rooks/use-debounce';

import { Box, Grid, Icon } from 'design-system';
import { GridBigIcon, GridIcon } from 'design-system/icons';
import { LocationState } from 'modules/interface';
import { AssetEntity, CoordinatesLand } from 'modules/land-works/api';
import LandCardSkeleton from 'modules/land-works/components/land-base-loader-card';
import LandWorkCard from 'modules/land-works/components/land-works-card-explore-view';
import LoadMoreLands from 'modules/land-works/components/lands-explore-load-more';
import LandsSearchBar from 'modules/land-works/components/lands-search';
import { useLandsMapTile } from 'modules/land-works/providers/lands-map-tile';
import { useLandsMapTiles } from 'modules/land-works/providers/lands-map-tiles';
import { useLandsSearchQuery } from 'modules/land-works/providers/lands-search-query';

import { AtlasTile } from '../atlas';
import { LandsSearchBarWrapperStyled, StyledButton, StyledRow, StyledText } from './styled';

import {
  filterLandsByAvailability,
  filterLandsByQuery,
  getAllLandsCoordinates,
  getOwnerOrConsumerId,
} from 'modules/land-works/utils';
import { sessionStorageHandler } from 'utils';

interface Props {
  lastRentEnd: string;
  loading: boolean;
  lands: AssetEntity[];
  setPointMapCentre: (lands: CoordinatesLand[]) => void;
  isMapVisible: boolean;
}

const LandsExploreList: FC<Props> = ({ loading, lands, setPointMapCentre, lastRentEnd, isMapVisible }) => {
  const history = useHistory();
  const location = useLocation<LocationState>();
  const { clickedLandId, setClickedLandId, setSelectedTile, setShowCardPreview } = useLandsMapTile();
  const { searchQuery, setSearchQuery } = useLandsSearchQuery();
  const { mapTiles, setSelectedId } = useLandsMapTiles();

  const [cardsSize, setCardsSize] = useState<'compact' | 'normal'>('normal');
  const [loadPercentageValue, setLoadPercentageValue] = useState(0);
  const [blockAutoScroll, setBlockAutoScroll] = useState(false);

  const numberOfCardsPerLoad = isMapVisible ? (cardsSize === 'compact' ? 10 : 6) : 18;
  const [slicedLands, setSlicedLands] = useState(numberOfCardsPerLoad);

  const handleLoadMore = () => {
    const newSlicedLands = slicedLands + numberOfCardsPerLoad;
    sessionStorageHandler('set', 'explore-filters', 'slicedLands', newSlicedLands);
    setSlicedLands(newSlicedLands);
    const highlights = getAllLandsCoordinates(lands.slice(0, newSlicedLands));
    setPointMapCentre(highlights);
  };

  const onMouseOverCardHandler = (e: SyntheticEvent, land: AssetEntity) => {
    const allCoords = getAllLandsCoordinates([land]);

    if (allCoords.length && allCoords[0]) {
      setSelectedId && setSelectedId(land.id);
      setPointMapCentre([{ id: land.id, x: allCoords[0].x, y: allCoords[0].y }]);
      setClickedLandId && setClickedLandId(allCoords[0].x, allCoords[0].y);

      const id = `${allCoords[0].x},${allCoords[0].y}`;

      if (!mapTiles || !mapTiles[id]) return;

      setSelectedTile &&
        setSelectedTile({
          id,
          type: mapTiles[id].type || '',
          owner: getOwnerOrConsumerId(land?.decentralandData?.asset)?.toLowerCase() || '',
        });
    } else if (setSelectedId && setClickedLandId) {
      setSelectedId(land.metaverseAssetId);
      setClickedLandId(land.metaverseAssetId);
    }
  };

  const getLoadPercentageValue = () => {
    const percentage = (filteredLands.slice(0, slicedLands).length * 100) / filteredLands.length;
    return percentage || 0;
  };

  const getLandArrayIndexByIdCoordinate = (decentralandId: AtlasTile['id']) => {
    let index = -1;

    lands.forEach((land, landIndex) => {
      land.decentralandData
        ? land.decentralandData?.coordinates.forEach((coord) => {
            if (coord.id === decentralandId.replace(',', '-')) {
              index = landIndex;
            }
          })
        : (index = landIndex);
    });

    return index;
  };

  useEffect(() => {
    setLoadPercentageValue(getLoadPercentageValue());
  }, [lands, slicedLands, searchQuery]);

  useEffect(() => {
    setShowCardPreview && setShowCardPreview(false);
    if (!window || !clickedLandId || blockAutoScroll) return;

    if (searchQuery) {
      return setShowCardPreview && setShowCardPreview(true);
    }

    const index = getLandArrayIndexByIdCoordinate(clickedLandId);

    if (index !== -1) {
      setSlicedLands(index > slicedLands ? index + 1 : slicedLands);
    }
  }, [clickedLandId]);

  useEffect(() => {
    const storedNumberOfLoadedCards = sessionStorageHandler('get', 'explore-filters', 'slicedLands');

    setSlicedLands(storedNumberOfLoadedCards ? storedNumberOfLoadedCards : numberOfCardsPerLoad);
  }, [numberOfCardsPerLoad]);

  let filteredLands = filterLandsByQuery(lands, searchQuery);

  if (lastRentEnd !== '0') {
    filteredLands = filterLandsByAvailability(filteredLands);
  }

  const slicedLandsInTotal = filteredLands.slice(0, slicedLands).length;

  const saveScrollPosition = useDebounce(() => {
    if (filteredLands) sessionStorage.setItem('scroll-position', String(window.scrollY));
  }, 500);

  useEffect(() => {
    const scroll = () => {
      saveScrollPosition();
    };

    const scrollPosition = sessionStorage.getItem('scroll-position');

    if (!loading && scrollPosition && filteredLands.length) {
      window.scrollTo({ top: +scrollPosition, behavior: 'smooth' });
    }
    document.addEventListener('scroll', scroll);

    return () => {
      document.removeEventListener('scroll', scroll);
    };
  }, [loading]);

  return (
    <div
      onMouseMove={() => setBlockAutoScroll(true)}
      onMouseOut={() => setTimeout(() => setBlockAutoScroll(false), 350)}
    >
      <LandsSearchBarWrapperStyled>
        <LandsSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder="Search by name" />
      </LandsSearchBarWrapperStyled>
      <StyledRow>
        <Grid>
          Listed <StyledText>{filteredLands.length} properties</StyledText>
        </Grid>
        <Grid container direction={'row'} display="flex" width={'auto'}>
          <StyledButton isActive={cardsSize === 'normal'} onClick={() => setCardsSize('normal')}>
            <Icon iconElement={<GridIcon />} iconSize="s" />
          </StyledButton>

          <StyledButton isActive={cardsSize === 'compact'} onClick={() => setCardsSize('compact')}>
            <Icon iconElement={<GridBigIcon />} iconSize="s" />
          </StyledButton>
        </Grid>
      </StyledRow>
      <Box
        display="grid"
        gap={4}
        gridTemplateColumns={`repeat(auto-fill, minmax(${cardsSize === 'compact' ? 190 : 300}px, 1fr))`}
      >
        {loading &&
          Array.from({ length: numberOfCardsPerLoad }, (_, i) => {
            return <LandCardSkeleton key={i} />;
          })}

        {!loading &&
          filteredLands.length > 0 &&
          filteredLands.slice(0, slicedLands).map((land) => (
            <LandWorkCard
              key={land.id}
              layout={cardsSize}
              onMouseOver={onMouseOverCardHandler}
              onClick={() =>
                history.push({
                  pathname: `/property/${land.id}`,
                  state: { from: window.location.pathname, title: 'Explore', tab: location.state?.tab },
                })
              }
              land={land}
            />
          ))}
      </Box>
      {!loading && filteredLands.length === 0 && <p>No properties are currently listed</p>}
      <LoadMoreLands
        textToDisplay={`List ${slicedLandsInTotal} of ${filteredLands.length}`}
        handleLoadMore={handleLoadMore}
        percentageValue={loadPercentageValue}
        disabled={slicedLandsInTotal === filteredLands.length}
      />
    </div>
  );
};

export default LandsExploreList;
