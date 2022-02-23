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
  onClick: () => void;
  highlights?: CoordinatesLAND[];
}

const LandsExploreMap: FC<Props> = ({ positionX, positionY, expanded, onClick, highlights = [] }) => {
  const [zoom, setZoom] = useState(1);
  const [highlightedTiles, setHighlightedTiles] = useState<Coord[]>([]);

  const onClickToggleSizeHandler = () => {
    onClick();
  };

  const onClickPlusHandler = () => {
    if (zoom < 3) {
      setZoom(zoom + 1);
    }
  };

  const onClickMinusHandler = () => {
    if (zoom > 0) {
      setZoom(zoom - 1);
    }
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

  return (
    <div className={styles.root}>
      <Atlas x={positionX} y={positionY} zoom={zoom} layers={[highlightedStrokeLayer, highlightedFillLayer]} />
      <div className={styles['expand-control']}>
        <Button variant="secondary" type="button" onClick={onClickToggleSizeHandler}>
          {expanded ? <ArrowRightIcon /> : <ArrowLeftIcon />}
        </Button>
      </div>
      <div className={styles['zoom-control']}>
        <Button variant="secondary" type="button" onClick={onClickPlusHandler} disabled={zoom > 2}>
          <PlusIcon />
        </Button>
        <Button variant="secondary" type="button" onClick={onClickMinusHandler} disabled={zoom === 0}>
          <MinusIcon />
        </Button>
      </div>
    </div>
  );
};

export default LandsExploreMap;
