import { FC, useEffect, useState } from 'react';

import { LandsExploreMapBaseProps } from 'modules/interface';
import { useLandsMapTile } from 'modules/land-works/providers/lands-map-tile';
import { useLandsMapTiles } from 'modules/land-works/providers/lands-map-tiles';

import Atlas, { AtlasTile, Coord, Layer } from '../atlas';
import LandsExploreLandPreview from '../lands-explore-land-preview';
import LandsExploreNavigatorInfo from '../lands-explore-navigator-info';

import { getOwnerOrConsumerId } from 'modules/land-works/utils';
import { inverseLerp, lerp } from 'utils';

import { TILES_URL_DECENTRALEND } from 'modules/land-works/constants';

import styles from './lands-explore-map.module.scss';

type LandExploreMap = LandsExploreMapBaseProps;

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 3;

const LandsExploreMap: FC<LandExploreMap> = ({ positionX, positionY, onZoom, zoom = 0, highlights = [], lands }) => {
  const { clickedLandId, setClickedLandId, setSelectedTile, showCardPreview } = useLandsMapTile();
  const { mapTiles, setMapTiles, selectedId, setSelectedId } = useLandsMapTiles();
  const [highlightedTiles, setHighlightedTiles] = useState<Coord[]>([]);

  const fetchTiles = async (url: string = TILES_URL_DECENTRALEND) => {
    if (!window.fetch) return {};
    const resp = await window.fetch(url);
    const json = await resp.json();

    setMapTiles && setMapTiles(json.data as Record<string, AtlasTile>);
  };

  const onChangeAtlasHandler = (data: { zoom: number }) => {
    if (onZoom) {
      onZoom(inverseLerp(MIN_ZOOM, MAX_ZOOM, data.zoom));
    }
  };

  const onPopupAtlasHandler = (data: { x: number; y: number }) => {
    const id = `${data.x},${data.y}`;
    if (!mapTiles || !mapTiles[id]) return;

    const land = lands.find((land) => {
      const idCoordinates = land.decentralandData?.coordinates[0].id;
      return idCoordinates === mapTiles[id].id.replace(',', '-');
    });

    setSelectedTile &&
      setSelectedTile({
        id,
        type: mapTiles[id].type || '',
        owner: getOwnerOrConsumerId(land?.decentralandData?.asset)?.toLowerCase() || mapTiles[id].owner || '',
      });
  };

  const onClickAtlasHandler = (x: number, y: number) => {
    if (!mapTiles) return;

    const land = getLandById(x, y);

    if (land) {
      land?.landId && setSelectedId && setSelectedId(land.landId);
      setClickedLandId && setClickedLandId(x, y);
    }
  };

  const getLandById = (x: number, y: number) => {
    const id = `${x},${y}`;

    return highlights.find((coord) => {
      return coord.id === id;
    });
  };

  const estateOnTop = (x: number, y: number) => {
    const land = getLandById(x, y);
    const topLand = getLandById(x, y + 1);
    return land?.landId === topLand?.landId;
  };

  const estateOnLeft = (x: number, y: number) => {
    const land = getLandById(x, y);
    const topLand = getLandById(x - 1, y);
    return land?.landId === topLand?.landId;
  };

  const isInList = (x: number, y: number) => {
    return highlightedTiles.some((coord) => coord.x === x && coord.y === y);
  };

  const isClicked = (x: number, y: number) => {
    if (!clickedLandId) {
      return false;
    }
    const [clickX, clickY] = clickedLandId.split(',');

    return x === Number(clickX) && y === Number(clickY);
  };

  const strokeLayer: Layer = (x, y) => {
    const top = estateOnTop(x, y);
    const left = estateOnLeft(x, y);
    return isInList(x, y) ? { color: '#ff9990', top, left } : null;
  };

  const fillLayer: Layer = (x, y) => {
    return isInList(x, y) ? { color: '#ff9990' } : null;
  };

  const clickedTileStrokeLayer: Layer = (x, y) => {
    const clickedLand = getLandById(x, y);
    return clickedLand?.landId == selectedId || isClicked(x, y) ? { color: '#26ff00', scale: 1.9 } : null;
  };

  const clickedTileFillLayer: Layer = (x, y) => {
    const clickedLand = getLandById(x, y);
    return clickedLand?.landId == selectedId || isClicked(x, y) ? { color: '#ff9990', scale: 1.5 } : null;
  };

  useEffect(() => {
    highlights.forEach(({ x, y }) => {
      setHighlightedTiles((state) => {
        state.push({ x: Number(x), y: Number(y) });
        return [...state];
      });
    });
  }, [highlights]);

  useEffect(() => {
    fetchTiles();
  }, []);

  return (
    <div className={styles.root}>
      <Atlas
        tiles={mapTiles}
        x={positionX}
        y={positionY}
        zoom={lerp(MIN_ZOOM, MAX_ZOOM, zoom)}
        layers={[strokeLayer, fillLayer, clickedTileStrokeLayer, clickedTileFillLayer]}
        onChange={onChangeAtlasHandler}
        onPopup={onPopupAtlasHandler}
        onClick={onClickAtlasHandler}
      />

      <LandsExploreNavigatorInfo />

      {showCardPreview && <LandsExploreLandPreview lands={lands} />}
    </div>
  );
};

export default LandsExploreMap;
