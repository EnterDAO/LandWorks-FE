import { FC, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { renderMap } from 'react-tile-map';
import { MapRenderer } from 'react-tile-map/lib/src/components/TileMap/TileMap.types';
import { Box } from '@mui/system';
import useSWR from 'swr';

import { LandsExploreMapBaseProps } from 'modules/interface';
import { CoordinatesLand } from 'modules/land-works/api';
import { useLandsMapTile } from 'modules/land-works/providers/lands-map-tile';
import { useLandsMapTiles } from 'modules/land-works/providers/lands-map-tiles';

import Atlas, { AtlasTile, Layer } from '../atlas';
import LandsExploreLandPreview from '../lands-explore-land-preview';
import LandsExploreNavigatorInfo from '../lands-explore-navigator-info';
import LandTooltip from './LandTooltip';

import { getOwnerOrConsumerId } from 'modules/land-works/utils';
import { inverseLerp, lerp, swrFetcher } from 'utils';

import { TILES_URL_DECENTRALEND } from 'modules/land-works/constants';

import styles from './lands-explore-map.module.scss';

type LandExploreMap = LandsExploreMapBaseProps;

const MIN_SIZE = 11;
const MAX_SIZE = 40;

// TODO: refactor (move rendering logic in Atlas component)
const LandsExploreMap: FC<LandExploreMap> = ({
  positionX,
  positionY,
  onZoom,
  zoom = 0,
  enableTooltips,
  highlights = [],
  lands,
}) => {
  const { clickedLandId, setClickedLandId, setSelectedTile, showCardPreview } = useLandsMapTile();
  const { mapTiles, setMapTiles, selectedId, setSelectedId } = useLandsMapTiles();
  const { data } = useSWR<{ ok: boolean; data: Record<string, AtlasTile> }>(TILES_URL_DECENTRALEND, swrFetcher);
  const [tooltip, setTooltip] = useState<
    { x: number; y: number; landTile: CoordinatesLand; size: number } | undefined | null
  >(null);
  const [isTooltipOpened, setIsTooltipOpened] = useState(false);
  const lastHoveredTileIdRef = useRef<string | null>(null);
  const timeoutRef = useRef<number>();

  useLayoutEffect(() => {
    if (setMapTiles && data?.ok) {
      setMapTiles(data.data);
    }
  }, [setMapTiles, data]);

  const onChangeAtlasHandler = (data: { zoom: number }) => {
    if (onZoom) {
      onZoom(inverseLerp(MIN_SIZE, MAX_SIZE, data.zoom));
    }
  };

  const onPopupAtlasHandler = ({ x, y }: { x: number; y: number }) => {
    const id = `${x},${y}`;

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
    return highlights.some((coord) => +coord.x === x && +coord.y === y);
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
    if (setSelectedId) {
      setSelectedId('');
    }

    if (setClickedLandId) {
      setClickedLandId('');
    }
  }, [enableTooltips, setSelectedId, setClickedLandId]);

  const handleAtlasHover = useCallback(
    (x: number, y: number) => {
      if (!enableTooltips) {
        return;
      }

      const key = `${x},${y}`;
      const landTile = highlights.find(({ id }) => id === key);

      if (landTile) {
        lastHoveredTileIdRef.current = landTile.id;

        window.clearTimeout(timeoutRef.current);

        if (setSelectedId && landTile.landId) {
          setSelectedId(landTile.landId);
        }

        setIsTooltipOpened(true);
      } else {
        timeoutRef.current = window.setTimeout(() => {
          if (setSelectedId) {
            setSelectedId('');
          }
          setIsTooltipOpened(false);
        }, 500);
      }
    },
    [setClickedLandId, highlights, enableTooltips]
  );

  const updateHoveredTileTooltip: MapRenderer = useCallback(
    ({ se, nw, center, width, height, size, pan }) => {
      const landsTilesInView = highlights.filter((highlight) => {
        const x = +highlight.x;
        const y = +highlight.y;

        return x >= nw.x && x <= se.x && y >= se.y && y <= nw.y;
      });

      const hoveredLandTile = landsTilesInView.find((landTile) => landTile.id === lastHoveredTileIdRef.current);

      if (hoveredLandTile && hoveredLandTile.landId) {
        const hoveredLandTiles = landsTilesInView.filter((landTile) => landTile.landId === hoveredLandTile.landId);
        const hoveredLandTileTarget = hoveredLandTiles.sort((a, b) => +b.x - +a.x || +b.y - +a.y)[0];

        const hw = width / 2;
        const hh = height / 2;
        const hs = size / 2;
        const x = hw - ((center.x - +hoveredLandTileTarget.x) * size + (pan?.x || 0)) - hs;
        const y = hh - ((+hoveredLandTileTarget.y - center.y) * size + (pan?.y || 0)) - hs;

        const updatedTooltip = {
          landTile: hoveredLandTileTarget,
          x,
          y,
          size,
        };

        setTooltip((prevTooltip) => {
          return prevTooltip &&
            Object.entries(prevTooltip).every(
              ([key, val]) => updatedTooltip[key as keyof typeof updatedTooltip] === val
            )
            ? prevTooltip
            : updatedTooltip;
        });
      }
    },
    [highlights]
  );

  const tileMapRenderMap: MapRenderer = useCallback(
    (args) => {
      updateHoveredTileTooltip(args);
      renderMap(args);
    },
    [updateHoveredTileTooltip]
  );

  const containerRef = useRef<HTMLDivElement | null>(null);

  const getPopperContainer = useCallback(() => {
    return containerRef.current;
  }, []);

  const landTooltip = useMemo(() => {
    return tooltip && lands.find((land) => land.id === tooltip.landTile.landId);
  }, [tooltip, lands]);

  const atlasZoom = lerp(MIN_SIZE, MAX_SIZE, zoom);

  return (
    <Box ref={containerRef} bgcolor="#662363" className={styles.root}>
      <Atlas
        tiles={mapTiles}
        x={positionX}
        y={positionY}
        zoom={atlasZoom}
        size={1}
        maxSize={MAX_SIZE}
        minSize={MIN_SIZE}
        layers={[strokeLayer, fillLayer, clickedTileStrokeLayer, clickedTileFillLayer]}
        onChange={onChangeAtlasHandler}
        onHover={handleAtlasHover}
        onPopup={onPopupAtlasHandler}
        onClick={onClickAtlasHandler}
        renderMap={enableTooltips ? tileMapRenderMap : undefined}
      />

      {enableTooltips && tooltip && landTooltip && (
        <LandTooltip
          open={isTooltipOpened}
          land={landTooltip}
          x={tooltip.x + tooltip.size / 2}
          y={tooltip.y + tooltip.size / 2}
          container={getPopperContainer}
        />
      )}

      <LandsExploreNavigatorInfo />

      {showCardPreview && <LandsExploreLandPreview lands={lands} />}
    </Box>
  );
};

export default LandsExploreMap;
