import { FC, useEffect, useState } from 'react';

import { ReactComponent as ArrowLeftIcon } from 'assets/icons/arrow-left.svg';
import { ReactComponent as ArrowRightIcon } from 'assets/icons/arrow-right.svg';
import Atlas, { Coord, Layer } from 'components/custom/Atlas/Atlas';
import { Button } from 'design-system';
import { MinusIcon, PlusIcon } from 'design-system/icons';
import { CoordinatesLAND } from 'modules/land-works/api';

import styles from './lands-explore-map.module.scss';

interface Props {
  positionX: number;
  positionY: number;
  expanded: boolean;
  onClick?: () => void;
  highlights?: CoordinatesLAND[];
}

const LandsExploreMap: FC<Props> = ({ positionX, positionY, expanded, onClick, highlights = [] }) => {
  const [clickZoom, setClickZoom] = useState(0.5);
  const [scrollZoom, setScrollZoom] = useState(0.5);
  const [highlightedTiles, setHighlightedTiles] = useState<Coord[]>([]);

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

  function isSelected(x: number, y: number) {
    return highlightedTiles.some((coord) => coord.x === x && coord.y === y);
  }

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

  console.log('clickZoom', clickZoom, 'scrollZoom', scrollZoom);

  return (
    <div className={styles.root}>
      <Atlas
        x={positionX}
        y={positionY}
        zoom={clickZoom}
        layers={[highlightedStrokeLayer, highlightedFillLayer]}
        onChange={onChangeAtlasHandler}
      />
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
