import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { DEFAULT_SLICED_PAGE } from 'constants/modules';
import { Grid } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

import { AtlasTile } from 'components/custom/Atlas/Atlas';
import { AssetEntity, CoordinatesLand } from 'modules/land-works/api';
import LandCardSkeleton from 'modules/land-works/components/land-base-loader-card';
import LandWorkCard from 'modules/land-works/components/land-works-card-explore-view';
import LoadMoreLands from 'modules/land-works/components/lands-explore-load-more';
import LandsSearchBar from 'modules/land-works/components/lands-search';
import { useLandsMapTile } from 'modules/land-works/providers/lands-map-tile';
import { useLandsMapTiles } from 'modules/land-works/providers/lands-map-tiles';
import { useLandsSearchQuery } from 'modules/land-works/providers/lands-search-query';

import { filterLandsByQuery, getAllLandsCoordinates } from 'modules/land-works/utils';

interface Props {
  loading: boolean;
  lands: AssetEntity[];
  setPointMapCentre: (lands: CoordinatesLand[]) => void;
}

const LandsExploreList: FC<Props> = ({ loading, lands, setPointMapCentre }) => {
  const isGridPerTwo = useMediaQuery('(max-width:1299px)');
  const { clickedLandId, setClickedLandId, setSelectedTile, setShowCardPreview } = useLandsMapTile();
  const { searchQuery, setSearchQuery } = useLandsSearchQuery();
  const { mapTiles } = useLandsMapTiles();

  const [loadPercentageValue, setLoadPercentageValue] = useState(0);
  const [blockAutoScroll, setBlockAutoScroll] = useState(false);

  const [slicedLands, setSlicedLands] = useState(isGridPerTwo ? DEFAULT_SLICED_PAGE : 6);

  const handleLoadMore = () => {
    const newSlicedLands = slicedLands + (isGridPerTwo ? DEFAULT_SLICED_PAGE : 6);
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
          owner: mapTiles[id].owner || '',
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
    setSlicedLands(isGridPerTwo ? DEFAULT_SLICED_PAGE : 6);
  }, []);

  const filteredLands = filterLandsByQuery(lands, searchQuery);
  const slicedLandsInTotal = filteredLands.slice(0, slicedLands).length;

  return (
    <div
      onMouseMove={() => setBlockAutoScroll(true)}
      onMouseOut={() => setTimeout(() => setBlockAutoScroll(false), 350)}
    >
      <LandsSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Grid container spacing={4} rowSpacing={4} columnSpacing={4}>
        {loading ? (
          [1, 2, 3, 4].map((i) => (
            <Grid item xs={12} sm={6} md={6} lg={6} xl={4} key={i}>
              <LandCardSkeleton key={i} />
            </Grid>
          ))
        ) : filteredLands.length ? (
          filteredLands.slice(0, slicedLands).map((land) => (
            <Grid item xs={12} sm={6} md={6} lg={6} xl={4} key={land.id}>
              <LandWorkCard onMouseOver={onMouseOverCardHandler} land={land} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <p>{filteredLands.length} properties are currently listed</p>
          </Grid>
        )}
      </Grid>
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
