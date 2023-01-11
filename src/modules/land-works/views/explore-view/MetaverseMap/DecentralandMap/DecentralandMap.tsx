import React, { useCallback, useMemo, useRef, useState } from 'react';
import { MapRenderer } from 'react-tile-map/lib/src/components/TileMap/TileMap.types';
import { Box } from '@mui/material';

import { AssetEntity } from 'modules/land-works/api';

import { MetaverseMapCommonProps } from '../MetaverseMap';
import DecentralandMapTileInfo from './DecentralandMapTileInfo';
import DecentralandMapTileTooltip from './DecentralandMapTileTooltip';
import DecentralandTileMap, { DecentralandMapTiles } from './DecentralandTileMap';

const getAssetTileIds = (asset: AssetEntity) => {
  if (!asset?.decentralandData?.coordinates) {
    return [];
  }

  return asset.decentralandData.coordinates.map(({ x, y }: { x: string; y: string }) => `${x},${y}`);
};

// interface DecentralandMapProps extends MetaverseMapCommonProps {

// }

const DecentralandMap = ({ assets, selectedId, isFullScreen = true, children, onSelect }: MetaverseMapCommonProps) => {
  const tilesRef = useRef<DecentralandMapTiles>({});
  const containerElRef = useRef<HTMLDivElement>(null);
  const lastPositionRef = useRef<{ x: number; y: number } | null>(null);
  const lastTooltipRef = useRef<{
    asset: AssetEntity;
    tileId: string;
    boundaries: { top: number; left: number };
  } | null>(null);
  const [hoveredTileId, setHoveredTileId] = useState<string>();
  const [renderedAssetBoundaryRects, setRenderedAssetBoundaryRects] = useState<
    Record<string, { top: number; left: number }>
  >({});

  const handleLoad = (tiles: DecentralandMapTiles) => {
    tilesRef.current = tiles;
  };

  const highlightedTileIds: Record<string, AssetEntity> = useMemo(() => {
    if (!assets?.length) {
      return {};
    }

    return assets.reduce((acc, asset) => {
      if (!asset.decentralandData) {
        return acc;
      }

      const tileIds = getAssetTileIds(asset);

      tileIds.forEach((tileId) => (acc[tileId] = asset));

      return acc;
    }, {} as Record<string, AssetEntity>);
  }, [assets]);

  const selectedTileIds = useMemo(() => {
    if (!assets?.length || !selectedId) {
      return;
    }

    const selectedAsset = assets.find((asset) => asset.id === selectedId);

    if (!selectedAsset?.decentralandData) {
      return;
    }

    return getAssetTileIds(selectedAsset).reduce((acc, tileId) => {
      acc[tileId] = true;

      return acc;
    }, {} as Record<string, boolean>);
  }, [assets, selectedId]);

  const position = useMemo(() => {
    if (!selectedTileIds || isFullScreen) {
      return;
    }

    const { minX, maxX, minY, maxY } = Object.keys(selectedTileIds).reduce(
      (acc, tileId) => {
        const [xStr, yStr] = tileId.split(',');
        const x = +xStr;
        const y = +yStr;

        acc.minX = Math.min(acc.minX, x);
        acc.maxX = Math.max(acc.maxX, x);
        acc.minY = Math.min(acc.minY, y);
        acc.maxY = Math.max(acc.maxY, y);

        return acc;
      },
      {
        minX: Infinity,
        maxX: -Infinity,
        minY: Infinity,
        maxY: -Infinity,
      }
    );

    return {
      x: minX + Math.round((maxX - minX) / 2),
      y: minY + Math.round((maxY - minY) / 2),
    };
  }, [selectedTileIds, isFullScreen]);

  const handleHover = useCallback(
    (x: number, y: number) => {
      const tileId = `${x},${y}`;

      setHoveredTileId(tileId);

      if (isFullScreen && onSelect) {
        onSelect(tileId in highlightedTileIds ? highlightedTileIds[tileId].id : undefined);
      }
    },
    [onSelect, highlightedTileIds, isFullScreen]
  );

  const handleClick = useCallback(
    (x: number, y: number) => {
      if (isFullScreen) {
        return;
      }

      const tileId = `${x},${y}`;

      if (tileId in highlightedTileIds && onSelect) {
        onSelect(highlightedTileIds[tileId].id);
      }
    },
    [onSelect, highlightedTileIds, isFullScreen]
  );

  const handleRender: MapRenderer = useCallback(
    ({ se, nw, center, width, height, size, pan }) => {
      const newRenderedAssetBoundaryRects = Object.keys(highlightedTileIds).reduce((acc, highlightedTileId) => {
        const rawCoords = highlightedTileId.split(',');
        const x = +rawCoords[0];
        const y = +rawCoords[1];
        const asset = highlightedTileIds[highlightedTileId];

        if (x >= nw.x && x <= se.x && y >= se.y && y <= nw.y) {
          const hw = width / 2;
          const hh = height / 2;
          let left = hw - ((center.x - x) * size + (pan?.x || 0));
          let top = hh - ((y - center.y) * size + (pan?.y || 0));

          if (asset.id in acc && acc[asset.id].left <= left && acc[asset.id].top < top) {
            left = acc[asset.id].left;
            top = acc[asset.id].top;
          }

          acc[asset.id] = {
            left,
            top,
          };
        }

        return acc;
      }, {} as Record<string, { left: number; top: number }>);

      setRenderedAssetBoundaryRects(newRenderedAssetBoundaryRects);
    },
    [highlightedTileIds]
  );

  const getPopperContainer = useCallback(() => {
    return containerElRef.current;
  }, []);

  const hoveredTile = hoveredTileId && tilesRef.current[hoveredTileId];

  const tooltip =
    hoveredTileId &&
    highlightedTileIds[hoveredTileId] &&
    highlightedTileIds[hoveredTileId].id in renderedAssetBoundaryRects
      ? {
          tileId: hoveredTileId,
          asset: highlightedTileIds[hoveredTileId],
          boundaries: renderedAssetBoundaryRects[highlightedTileIds[hoveredTileId].id],
        }
      : null;

  const currentTooltip = tooltip ? (lastTooltipRef.current = tooltip) : lastTooltipRef.current;
  const currentPosition = position ? (lastPositionRef.current = position) : lastPositionRef.current;
  const tooltipOpened = !!tooltip && tooltip.tileId === hoveredTileId;

  return (
    <Box ref={containerElRef} width={1} height={1} position="relative">
      <DecentralandTileMap
        highlightedTileIds={highlightedTileIds}
        selectedTileIds={selectedTileIds}
        onClick={handleClick}
        onHover={handleHover}
        onLoad={handleLoad}
        onRender={handleRender}
        {...currentPosition}
      >
        {children}
      </DecentralandTileMap>

      {hoveredTile && <DecentralandMapTileInfo tile={hoveredTile} />}
      {isFullScreen && currentTooltip && (
        <DecentralandMapTileTooltip
          asset={currentTooltip.asset}
          container={getPopperContainer}
          open={tooltipOpened}
          {...currentTooltip.boundaries}
        />
      )}
    </Box>
  );
};

export default DecentralandMap;
