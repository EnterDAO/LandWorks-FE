import { FC, useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { TILES_URL_VOXEL } from 'constants/modules';

import { ReactComponent as ArrowLeftIcon } from 'assets/icons/arrow-left.svg';
import { ReactComponent as ArrowRightIcon } from 'assets/icons/arrow-right.svg';
import Atlas, { AtlasTile, Coord, Layer } from 'components/custom/Atlas/Atlas';
import { Button } from 'design-system';
import { MinusIcon, PlusIcon } from 'design-system/icons';
import { AssetEntity, CoordinatesLand } from 'modules/land-works/api';
// import { useLandsMapTile } from 'modules/land-works/providers/lands-map-tile';
import { useLandsMapTiles } from 'modules/land-works/providers/lands-map-tiles';

import LandsExploreNavigatorInfo from '../lands-explore-navigator-info';

import './leafleft.scss';
import styles from './lands-explore-map-voxels.module.scss';

interface Props {
  positionX: number;
  positionY: number;
  expanded: boolean;
  onClick?: () => void;
  highlights?: CoordinatesLand[];
  lands: AssetEntity[];
}

const LandsExploreMapVoxels: FC<Props> = ({ positionX, positionY, expanded, onClick, highlights = [], lands }) => {
  // const { clickedLandId, setClickedLandId, setSelectedTile, showCardPreview } = useLandsMapTile();
  const { mapTiles, setMapTiles } = useLandsMapTiles();
  const [clickZoom, setClickZoom] = useState(0.5);
  const [scrollZoom, setScrollZoom] = useState(0.5);

  const fetchTiles = async (url: string = TILES_URL_VOXEL) => {
    if (!window.fetch) return {};
    const resp = await window.fetch(url);
    const json = await resp.json();

    setMapTiles && setMapTiles(json.parcels as Record<string, AtlasTile>);
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

  useEffect(() => {
    fetchTiles();
  }, []);

  return (
    <div className={styles.root}>
      {/* <Atlas
        tiles={mapTiles}
        x={positionX}
        y={positionY}
        zoom={clickZoom}
        layers={[strokeLayer, fillLayer, clickedTileStrokeLayer, clickedTileFillLayer]}
        onChange={onChangeAtlasHandler}
        onPopup={onPopupAtlasHandler}
        onClick={onClickAtlasHandler}
      /> */}

      <MapContainer center={[51.505, -0.09]} zoom={7} className={styles['leaflet-container']}>
        <TileLayer
          attribution='&copy; <a href="https://www.cryptovoxels.com/">Voxel</a>'
          url="https://map.cryptovoxels.com/tile/?z={z}&x={x}&y={y}"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>A pretty CSS3 popup.</Popup>
        </Marker>
      </MapContainer>

      <LandsExploreNavigatorInfo />

      <div className={styles['expand-control']}>
        <Button variant="secondary" type="button" onClick={onClickToggleSizeHandler}>
          {expanded ? <ArrowRightIcon /> : <ArrowLeftIcon />}
        </Button>
      </div>
    </div>
  );
};

export default LandsExploreMapVoxels;
