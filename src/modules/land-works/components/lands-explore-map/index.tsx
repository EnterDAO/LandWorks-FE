import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { TILES_URL_DECENTRALEND } from 'constants/modules';

import { ReactComponent as ArrowLeftIcon } from 'assets/icons/arrow-left.svg';
import { ReactComponent as ArrowRightIcon } from 'assets/icons/arrow-right.svg';
import Atlas, { AtlasTile, Coord, Layer } from 'components/custom/Atlas/Atlas';
import { Button } from 'design-system';
import { MinusIcon, PlusIcon } from 'design-system/icons';
import { AssetEntity, CoordinatesLand, CoordinatesLandWithLandId } from 'modules/land-works/api';

import LandsExploreNavigatorInfo, { SelectedTile } from '../lands-explore-navigator-info';

import styles from './lands-explore-map.module.scss';

interface Props {
  positionX: number;
  positionY: number;
  expanded: boolean;
  onClick?: () => void;
  onSelectTile?: Dispatch<SetStateAction<AssetEntity['id'] | undefined>>;
  highlights?: CoordinatesLand[];
}

const LandsExploreMap: FC<Props> = ({ positionX, positionY, expanded, onClick, onSelectTile, highlights = [] }) => {
  const [tiles, setTiles] = useState<Record<string, AtlasTile>>();
  const [clickZoom, setClickZoom] = useState(0.5);
  const [scrollZoom, setScrollZoom] = useState(0.5);
  const [selectedTile, setSelectedTile] = useState<Partial<SelectedTile>>({});
  const [highlightedTiles, setHighlightedTiles] = useState<Coord[]>([]);

  const fetchTiles = async (url: string = TILES_URL_DECENTRALEND) => {
    if (!window.fetch) return {};
    const resp = await window.fetch(url);
    const json = await resp.json();

    setTiles(json.data as Record<string, AtlasTile>);
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
      setClickZoom(zoom + 1);
      setScrollZoom(zoom + 1);
    }
  };

  const onClickMinusHandler = () => {
    let zoom = clickZoom;

    if (scrollZoom !== clickZoom) {
      zoom = scrollZoom;
    }

    if (zoom < 3 && zoom > 0.5) {
      setClickZoom(zoom - 1);
      setScrollZoom(zoom - 1);
    }
  };

  const onChangeAtlasHandler = (data: { zoom: number }) => {
    setClickZoom(data.zoom);
    setScrollZoom(data.zoom);
  };

  const onPopupAtlasHandler = (data: { x: number; y: number }) => {
    if (!tiles) return;

    const id = `${data.x},${data.y}`;

    setSelectedTile({
      id,
      type: tiles[id].type || '',
      owner: tiles[id].owner || '',
    });
  };

  const onClickAtlasHandler = (x: number, y: number) => {
    if (!tiles) return;

    const land = highlights.find((coord) => {
      return coord.id === `${x}-${y}`;
    });

    if (land) {
      onSelectTile && onSelectTile((land as CoordinatesLandWithLandId).landId);
    }
  };

  const isSelected = (x: number, y: number) => {
    return highlightedTiles.some((coord) => coord.x === x && coord.y === y);
  };

  const highlightedStrokeLayer: Layer = (x, y) => {
    return isSelected(x, y) ? { color: '#ff0044', scale: 1.4 } : null;
  };

  const highlightedFillLayer: Layer = (x, y) => {
    return isSelected(x, y) ? { color: '#ff9990', scale: 1.2 } : null;
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
    if (!tiles) {
      fetchTiles();
    }
  }, []);

  return (
    <div className={styles.root}>
      <Atlas
        tiles={tiles}
        x={positionX}
        y={positionY}
        zoom={clickZoom}
        layers={[highlightedStrokeLayer, highlightedFillLayer]}
        onChange={onChangeAtlasHandler}
        onPopup={onPopupAtlasHandler}
        onClick={onClickAtlasHandler}
      />

      <LandsExploreNavigatorInfo selected={selectedTile as SelectedTile} />

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
