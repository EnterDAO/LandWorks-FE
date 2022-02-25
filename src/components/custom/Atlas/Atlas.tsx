import 'react-tile-map/lib/styles.css';

import { FC, useEffect, useState } from 'react';
import { Coord, Layer, TileMap, TileMapProps } from 'react-tile-map';
import { TILES_URL_DECENTRALEND } from 'constants/modules';

import './Atlas.css';

export type AtlasTile = {
  x: number;
  y: number;
  type: number;
  left?: number;
  top?: number;
  topLeft?: number;
  owner: string;
  name?: string;
  estate_id?: string;
};

export type { Layer, Coord };

export type AtlasProps = Partial<TileMapProps> & {
  layers?: Layer[];
  tiles?: Record<string, AtlasTile>;
  onChange?: (data: { zoom: number }) => void;
};

export type AtlasState = {
  tiles?: Record<string, AtlasTile>;
};

const COLOR_BY_TYPE: Record<number, string> = {
  0: '#ff9990', // my parcels
  1: '#ff4053', // my parcels on sale
  2: '#ff9990', // my estates
  3: '#ff4053', // my estates on sale
  4: '#ffbd33', // parcels/estates where I have permissions
  5: '#5054D4', // districts
  6: '#563db8', // contributions
  7: '#716C7A', // roads
  8: '#70AC76', // plazas
  9: '#3D3A46', // owned parcel/estate
  10: '#3D3A46', // parcels on sale (we show them as owned parcels)
  11: '#09080A', // unowned pacel/estate
  12: '#18141a', // background
  13: '#110e13', // loading odd
  14: '#0d0b0e', // loading even
};

const Atlas: FC<AtlasProps> = (props) => {
  const { tiles: propTiles, layers = [], onChange, ...rest } = props;
  const [zoom, setZoom] = useState(props.zoom);
  const [tiles, setTiles] = useState(propTiles);

  const layer: Layer = (x, y) => {
    const id = x + ',' + y;
    if (tiles && id in tiles) {
      const tile = tiles[id];
      return {
        color: COLOR_BY_TYPE[tile.type],
        top: !!tile.top,
        left: !!tile.left,
        topLeft: !!tile.topLeft,
      };
    } else {
      return {
        color: (x + y) % 2 === 0 ? COLOR_BY_TYPE[13] : COLOR_BY_TYPE[14],
      };
    }
  };

  const fetchTiles = async (url: string = TILES_URL_DECENTRALEND): Promise<Record<string, AtlasTile>> => {
    if (!window.fetch) return {};
    const resp = await window.fetch(url);
    const json = await resp.json();
    return json.data as Record<string, AtlasTile>;
  };

  const handleUpdateTiles = (tiles: Record<string, AtlasTile>): void => {
    setTiles(tiles);
  };

  useEffect(() => {
    if (props.tiles && props.tiles !== tiles) {
      setTiles(tiles);
    }
  }, [props.tiles]);

  useEffect(() => {
    if (props.zoom && props.zoom !== zoom) {
      setZoom(props.zoom);
    }
  }, [props.zoom]);

  useEffect(() => {
    if (!tiles) {
      fetchTiles().then(handleUpdateTiles);
    }
  }, []);

  return (
    <TileMap
      // onPopup={(args) => console.log('onPopup', args)}
      onChange={onChange}
      zoom={zoom}
      {...rest}
      className="dcl atlas"
      layers={[layer, ...(layers as Layer[])]}
    />
  );
};

export default Atlas;
