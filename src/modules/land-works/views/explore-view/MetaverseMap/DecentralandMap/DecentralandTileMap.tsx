import 'react-tile-map/lib/styles.css';

import { ReactNode, RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Coord, Layer, TileMap, TileMapProps, renderMap } from 'react-tile-map';
import { MapRenderer } from 'react-tile-map/lib/src/components/TileMap/TileMap.types';
import useSWRImmutable from 'swr/immutable';

import MetaverseMapProvider from '../MetaverseMapProvider';

import { clamp } from 'utils';

import { TILES_URL_DECENTRALEND } from 'modules/land-works/constants';

export interface DecentralandMapTile {
  id: string;
  x: number;
  y: number;
  type: 'owned' | 'unowned' | 'plaza' | 'road' | 'district';
  top: boolean;
  left: boolean;
  topLeft: boolean;
  updatedAt: number;
  name?: string;
  owner?: string;
  estateId?: string;
  tokenId?: string;
  price?: number;
}

export type DecentralandMapTiles = Record<string, DecentralandMapTile>;

export type { Layer, Coord };

export type AtlasProps = Partial<TileMapProps> & {
  layers?: Layer[];
  tiles?: Record<string, DecentralandMapTile>;
  onChange?: (data: { zoom: number }) => void;
  onPopup?: (data: { x: number; y: number }) => void;
  onClick?: (x: number, y: number) => void;
};

export type AtlasState = {
  tiles?: Record<string, DecentralandMapTile>;
};

const COLOR_BY_TYPE: Record<number | string, string> = {
  0: '#ff9990', // my parcels
  1: '#ff4053', // my parcels on sale
  2: '#ff9990', // my estates
  3: '#ff4053', // my estates on sale
  4: '#ffbd33', // parcels/estates where I have permissions
  district: '#5054D4', // districts
  6: '#563db8', // contributions
  road: '#716C7A', // roads
  plaza: '#70AC76', // plazas
  owned: '#3D3A46', // owned parcel/estate
  10: '#3D3A46', // parcels on sale (we show them as owned parcels)
  unowned: '#09080A', // unowned pacel/estate
  12: '#18141a', // background
  13: '#110e13', // loading odd
  14: '#0d0b0e', // loading even
  highlighted: '#ff9990',
} as const;

const useGetDecentralandMapTilesQuery = () => {
  const { data, error } = useSWRImmutable<{ ok: boolean; data: Record<string, DecentralandMapTile> }>(
    TILES_URL_DECENTRALEND
  );

  return {
    data: data?.data,
    loading: !data && !error,
    error,
  };
};

interface DecentralandTileMapProps {
  x?: number;
  y?: number;
  zoom?: number;
  highlightedTileIds?: Record<string, any>;
  selectedTileIds?: Record<string, any>;
  selectedTileIdsRef?: RefObject<Record<string, any> | undefined>;
  children?: ReactNode;
  onRender?: MapRenderer;
  onChange?: (data: { zoom: number }) => void;
  onHover?: (x: number, y: number) => void;
  onClick?: (x: number, y: number) => void;
  onLoad?: (tiles: Record<string, DecentralandMapTile>) => void;
}

const TILE_MIN_SIZE = 8;
const TILE_MAX_SIZE = 40;
const MIN_ZOOM = TILE_MIN_SIZE / TILE_MAX_SIZE;
const MAX_ZOOM = 1;
const ZOOM_STEP = (MAX_ZOOM - MIN_ZOOM) / 6;

const DecentralandTileMap = ({
  highlightedTileIds,
  // selectedTileIds,
  selectedTileIdsRef,
  onLoad,
  onChange,
  onRender,
  children,
  ...tileMapProps
}: DecentralandTileMapProps) => {
  const { data: tiles } = useGetDecentralandMapTilesQuery();
  const zoomRef = useRef(MIN_ZOOM);
  const [zoom, setZoom] = useState<number | null>(null);

  useEffect(() => {
    if (tiles && onLoad) {
      onLoad(tiles);
    }
  }, [tiles]);

  const tileMapLayers = useMemo(() => {
    if (!tiles) {
      const mapLoadingLayer = (x: number, y: number) => {
        return {
          color: !((x + y) % 2) ? COLOR_BY_TYPE[13] : COLOR_BY_TYPE[14],
        };
      };

      return [mapLoadingLayer];
    }

    const isTopHighlighted = (x: number, y: number) => {
      const highlightedTile = tiles[`${x},${y}`];
      const topHighlightedTile = tiles[`${x},${y + 1}`];

      return !!highlightedTile?.estateId && highlightedTile.estateId === topHighlightedTile?.estateId;
    };

    const isLeftHighlighted = (x: number, y: number) => {
      const highlightedTile = tiles[`${x},${y}`];
      const leftHighlightTile = tiles[`${x - 1},${y}`];

      return !!highlightedTile && highlightedTile.estateId === leftHighlightTile?.estateId;
    };

    const mapLayer = (x: number, y: number) => {
      const id = `${x},${y}`;
      const tile = tiles[id];

      if (!tile) {
        return {
          color: COLOR_BY_TYPE[12],
        };
      }

      const isHighlighted = !!highlightedTileIds && id in highlightedTileIds;

      if (isHighlighted) {
        const top = isTopHighlighted(x, y);
        const left = isLeftHighlighted(x, y);

        return {
          color: COLOR_BY_TYPE.highlighted,
          top,
          left,
          topLeft: top || left,
        };
      }

      return {
        color: COLOR_BY_TYPE[tile.type],
        top: tile.top,
        left: tile.left,
        topLeft: tile.topLeft,
      };
    };

    // NOTE: if we change some prop for tile map component it will rerender the map with debounce
    // to get around this problem and render selected tiles without a delay we are using `selectedTileIdsRef`
    // instead of `selectedTileIds`to not change reference on `tileMapLayers`.
    //
    // It works when map in full screen when we show selecting hovered tile
    //
    // TODO: make it work when map isn't in full screen
    // TODO: come up with better approach or refactor to make it less confusing
    const isSelectedTile = (tileId: string) => selectedTileIdsRef?.current && tileId in selectedTileIdsRef.current;

    const selectedTileFillLayer: Layer = (x, y) => {
      const tileId = `${x},${y}`;

      if (!isSelectedTile(tileId)) {
        return null;
      }

      return { color: '#ff9990' };
    };

    const selectedTileStrokeLayer: Layer = (x, y) => {
      const tileId = `${x},${y}`;

      if (!isSelectedTile(tileId)) {
        return null;
      }

      return { color: '#26ff00', scale: 1.3 };
    };

    return [mapLayer, selectedTileStrokeLayer, selectedTileFillLayer];
  }, [tiles, highlightedTileIds]);

  const handleChange = useCallback(
    (data: { zoom: number }) => {
      if (onChange) {
        onChange(data);
      }

      setZoom(null);

      zoomRef.current = data.zoom;
    },
    [onChange]
  );

  const handleRender: MapRenderer = useCallback(
    (args) => {
      renderMap(args);

      if (onRender) {
        onRender(args);
      }
    },
    [onRender]
  );

  const zoomControls = useMemo(() => {
    const normalizeZoom = (zoom: number) => Math.round((zoom - MIN_ZOOM) / ZOOM_STEP) * ZOOM_STEP + MIN_ZOOM;

    const zoomIn = () => {
      setZoom((prevZoom) => {
        const zoom = (prevZoom || zoomRef.current) + ZOOM_STEP;

        return normalizeZoom(zoom);
      });
    };
    const zoomOut = () => {
      setZoom((prevZoom) => {
        const zoom = (prevZoom || zoomRef.current) - ZOOM_STEP;

        return normalizeZoom(zoom);
      });
    };

    return {
      zoomIn,
      zoomOut,
    };
  }, []);

  const currentZoom = clamp(zoom || zoomRef.current, MIN_ZOOM, MAX_ZOOM);

  return (
    <MetaverseMapProvider minZoom={MIN_ZOOM} maxZoom={MAX_ZOOM} zoom={currentZoom} {...zoomControls}>
      <TileMap
        zoom={zoom || zoomRef.current}
        size={TILE_MAX_SIZE}
        minSize={TILE_MIN_SIZE}
        maxSize={TILE_MAX_SIZE}
        layers={tileMapLayers}
        onChange={handleChange}
        renderMap={handleRender}
        {...tileMapProps}
      />
      {children}
    </MetaverseMapProvider>
  );
};

export default DecentralandTileMap;
