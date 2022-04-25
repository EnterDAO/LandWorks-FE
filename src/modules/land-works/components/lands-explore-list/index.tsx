import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import useDebounce from '@rooks/use-debounce';

import { AtlasTile } from 'components/custom/Atlas/Atlas';
import { Grid } from 'design-system';
import { GridIcon, MapIcon } from 'design-system/icons';
import { LocationState } from 'modules/interface';
import { AssetEntity, CoordinatesLand } from 'modules/land-works/api';
import LandCardSkeleton from 'modules/land-works/components/land-base-loader-card';
import LandWorkCard from 'modules/land-works/components/land-works-card-explore-view';
import LoadMoreLands from 'modules/land-works/components/lands-explore-load-more';
import LandsSearchBar from 'modules/land-works/components/lands-search';
import { useLandsMapTile } from 'modules/land-works/providers/lands-map-tile';
import { useLandsMapTiles } from 'modules/land-works/providers/lands-map-tiles';
import { useLandsSearchQuery } from 'modules/land-works/providers/lands-search-query';

import {
  LandsSearchBarWrapperStyled,
  StyledButton,
  StyledGrid,
  StyledGridContainer,
  StyledRow,
  StyledText,
} from './styled';

import {
  filterLandsByAvailability,
  filterLandsByQuery,
  getAllLandsCoordinates,
  getOwnerOrConsumerId,
} from 'modules/land-works/utils';
import { sessionStorageHandler } from 'utils';

import { DEFAULT_SLICED_PAGE } from 'modules/land-works/constants';

interface Props {
  lastRentEnd: string;
  loading: boolean;
  lands: AssetEntity[];
  setPointMapCentre: (lands: CoordinatesLand[]) => void;
  setIsHiddenMap: (value: boolean) => void;
  isHiddenMap: boolean;
  metaverse: string;
}

const LandsExploreList: FC<Props> = ({
  loading,
  lands,
  setPointMapCentre,
  lastRentEnd,
  setIsHiddenMap,
  isHiddenMap,
  metaverse,
}) => {
  const history = useHistory();
  const location = useLocation<LocationState>();
  const isGridPerTwo = useMediaQuery('(max-width: 1599px)');
  const { clickedLandId, setClickedLandId, setSelectedTile, setShowCardPreview } = useLandsMapTile();
  const { searchQuery, setSearchQuery } = useLandsSearchQuery();
  const { mapTiles } = useLandsMapTiles();

  const [loadPercentageValue, setLoadPercentageValue] = useState(0);
  const [blockAutoScroll, setBlockAutoScroll] = useState(false);

  const [slicedLands, setSlicedLands] = useState(isGridPerTwo ? DEFAULT_SLICED_PAGE : 6);

  const handleLoadMore = () => {
    const newSlicedLands = slicedLands + (isGridPerTwo ? DEFAULT_SLICED_PAGE : 6);
    sessionStorageHandler('set', 'explore-filters', 'slicedLands', newSlicedLands);
    setSlicedLands(newSlicedLands);
    const highlights = getAllLandsCoordinates(lands.slice(0, newSlicedLands));
    setPointMapCentre(highlights);
  };

  const onMouseOverCardHandler = (e: SyntheticEvent, land: AssetEntity) => {
    const allCoords = getAllLandsCoordinates([land]);

    if (allCoords.length && allCoords[0]) {
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
    }
  };

  const getLoadPercentageValue = () => {
    return (lands.slice(0, slicedLands).length * 100) / lands.length;
  };

  const getLandArrayIndexByIdCoordinate = (decentralandId: AtlasTile['id']) => {
    let index = -1;

    lands.forEach((land, landIndex) => {
      land.decentralandData?.coordinates.forEach((coord) => {
        if (coord.id === decentralandId.replace(',', '-')) {
          index = landIndex;
        }
      });
    });

    return index;
  };

  const getDomLandCardByIdAndScroll = (mapLandId: string) => {
    const landExploreCard = window.document.getElementById(`land-explore-card--${mapLandId}`);

    if (landExploreCard) {
      landExploreCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    return landExploreCard;
  };

  useEffect(() => {
    setLoadPercentageValue(getLoadPercentageValue());
  }, [lands, slicedLands]);

  useEffect(() => {
    setShowCardPreview && setShowCardPreview(false);
    if (!window || !clickedLandId || blockAutoScroll) return;

    const isFound = getDomLandCardByIdAndScroll(clickedLandId);

    if (!isFound) {
      if (searchQuery) {
        return setShowCardPreview && setShowCardPreview(true);
      }

      const index = getLandArrayIndexByIdCoordinate(clickedLandId);

      if (index !== -1) {
        setSlicedLands(index > slicedLands ? index + 1 : slicedLands);
        setTimeout(() => getDomLandCardByIdAndScroll(clickedLandId), 300);
      }
    }
  }, [clickedLandId]);

  useEffect(() => {
    setSlicedLands(
      sessionStorageHandler('get', 'explore-filters', 'slicedLands')
        ? sessionStorageHandler('get', 'explore-filters', 'slicedLands')
        : isGridPerTwo
        ? DEFAULT_SLICED_PAGE
        : 6
    );
  }, []);

  let filteredLands = filterLandsByQuery(lands, searchQuery);

  if (lastRentEnd !== '0') {
    filteredLands = filterLandsByAvailability(filteredLands);
  }

  const slicedLandsInTotal = filteredLands.slice(0, slicedLands).length;

  const saveScrollPosition = useDebounce(() => {
    if (filteredLands) sessionStorage.setItem('scroll-position', String(window.scrollY));
  }, 500);

  useEffect(() => {
    const scroll = () => saveScrollPosition();

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
          <StyledButton
            disabled={metaverse != '1'}
            sx={{
              border: !isHiddenMap ? '1px solid white' : '1px solid transparent',
              boxShadow: !isHiddenMap ? '0 0 3px white' : 'none',
            }}
            onClick={() => setIsHiddenMap(false)}
          >
            <MapIcon />
          </StyledButton>
          <StyledButton
            disabled={metaverse != '1'}
            sx={{
              border: isHiddenMap ? '1px solid white' : '1px solid transparent',
              boxShadow: isHiddenMap ? '0 0 3px white' : 'none',
            }}
            onClick={() => setIsHiddenMap(true)}
          >
            <GridIcon />
          </StyledButton>
        </Grid>
      </StyledRow>
      <StyledGridContainer container spacing={4} rowSpacing={4} columnSpacing={4}>
        {loading ? (
          [1, 2, 3, 4, 5, 6].map((i) => (
            <StyledGrid item xs={12} sm={6} md={6} lg={6} xl={isHiddenMap ? 3 : 4} key={i}>
              <LandCardSkeleton key={i} />
            </StyledGrid>
          ))
        ) : filteredLands.length ? (
          filteredLands.slice(0, slicedLands).map((land) => (
            <StyledGrid item xs={12} sm={6} md={6} lg={6} xl={isHiddenMap ? 3 : 4} key={land.id}>
              <LandWorkCard
                onMouseOver={onMouseOverCardHandler}
                onClick={() =>
                  history.push({
                    pathname: `/property/${land.id}`,
                    state: { from: window.location.pathname, title: 'Explore', tab: location.state?.tab },
                  })
                }
                land={land}
              />
            </StyledGrid>
          ))
        ) : (
          <Grid item xs={12}>
            <p>No properties are currently listed</p>
          </Grid>
        )}
      </StyledGridContainer>
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
