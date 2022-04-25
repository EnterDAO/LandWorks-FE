import { FC, useEffect, useState } from 'react';

import { ReactComponent as ArrowLeftIcon } from 'assets/icons/arrow-left.svg';
import { ReactComponent as ArrowRightIcon } from 'assets/icons/arrow-right.svg';
import Atlas, { AtlasTile, Coord, Layer } from 'components/custom/Atlas/Atlas';
import { Button } from 'design-system';
import { MinusIcon, PlusIcon } from 'design-system/icons';
import { AssetEntity, CoordinatesLand } from 'modules/land-works/api';
import { useLandsMapTile } from 'modules/land-works/providers/lands-map-tile';
import { useLandsMapTiles } from 'modules/land-works/providers/lands-map-tiles';

import LandsExploreLandPreview from '../lands-explore-land-preview';
import LandsExploreNavigatorInfo from '../lands-explore-navigator-info';

import { getOwnerOrConsumerId } from 'modules/land-works/utils';

import { TILES_URL_DECENTRALEND } from 'modules/land-works/constants';

import styles from './lands-explore-map.module.scss';

interface Props {
  positionX: number;
  positionY: number;
  expanded: boolean;
  onClick?: () => void;
  highlights?: CoordinatesLand[];
  lands: AssetEntity[];
}

const LandsExploreMap: FC<Props> = ({ positionX, positionY, expanded, onClick, highlights = [], lands }) => {
  const { clickedLandId, setClickedLandId, setSelectedTile, showCardPreview } = useLandsMapTile();
  const { mapTiles, setMapTiles } = useLandsMapTiles();
  const [clickZoom, setClickZoom] = useState(0.5);
  const [highlightedTiles, setHighlightedTiles] = useState<Coord[]>([]);
  const [scrollZoom, setScrollZoom] = useState(0.5);

  const fetchTiles = async (url: string = TILES_URL_DECENTRALEND) => {
    if (!window.fetch) return {};
    const resp = await window.fetch(url);
    const json = await resp.json();

    setMapTiles && setMapTiles(json.data as Record<string, AtlasTile>);
  };

  const onClickToggleSizeHandler = () => {
    onClick && onClick();
  };

  const onClickPlusHandler = () => {
    let zoom = clickZoom;

    if (scrollZoom !== clickZoom) {
      zoom = scrollZoom;
    }

    if (zoom < 3) {
      setClickZoom(zoom + 0.5);
      setScrollZoom(zoom + 0.5);
    }
  };

  const onClickMinusHandler = () => {
    let zoom = clickZoom;

    if (scrollZoom !== clickZoom) {
      zoom = scrollZoom;
    }

    if (zoom < 3 && zoom > 0.5) {
      setClickZoom(zoom - 0.5);
      setScrollZoom(zoom - 0.5);
    }
  };

  const onChangeAtlasHandler = (data: { zoom: number }) => {
    setClickZoom(data.zoom);
    setScrollZoom(data.zoom);
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

    const id = `${x},${y}`;

    const land = highlights.find((coord) => {
      return coord.id === id;
    });

    if (land) {
      setClickedLandId && setClickedLandId(x, y);
    }
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
    return isInList(x, y) ? { color: '#ff0044', scale: 1.4 } : null;
  };

  const fillLayer: Layer = (x, y) => {
    return isInList(x, y) ? { color: '#ff9990', scale: 1.2 } : null;
  };

  const clickedTileStrokeLayer: Layer = (x, y) => {
    return isClicked(x, y) ? { color: '#26ff00', scale: 1.9 } : null;
  };

  const clickedTileFillLayer: Layer = (x, y) => {
    return isClicked(x, y) ? { color: '#ff9990', scale: 1.5 } : null;
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
        zoom={clickZoom}
        layers={[strokeLayer, fillLayer, clickedTileStrokeLayer, clickedTileFillLayer]}
        onChange={onChangeAtlasHandler}
        onPopup={onPopupAtlasHandler}
        onClick={onClickAtlasHandler}
      />

      <LandsExploreNavigatorInfo />

      {showCardPreview && <LandsExploreLandPreview lands={lands} />}

      <div className={styles['expand-control']}>
        <Button variant="secondary" type="button" onClick={onClickToggleSizeHandler}>
          {expanded ? <ArrowRightIcon /> : <ArrowLeftIcon />}
        </Button>
      </div>

      <div className={styles['zoom-control']}>
        <Button variant="secondary" type="button" onClick={onClickPlusHandler} disabled={clickZoom > 2.8}>
          <PlusIcon />
        </Button>
        <Button variant="secondary" type="button" onClick={onClickMinusHandler} disabled={clickZoom <= 0.5}>
          <MinusIcon />
        </Button>
      </div>
    </div>
  );
};

export default LandsExploreMap;
