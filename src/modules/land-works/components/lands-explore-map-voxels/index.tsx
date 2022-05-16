import { FC, useEffect, useState } from 'react';
import { GeoJSON, MapContainer, TileLayer } from 'react-leaflet';
import { find } from 'lodash';

import { ReactComponent as ArrowLeftIcon } from 'assets/icons/arrow-left.svg';
import { ReactComponent as ArrowRightIcon } from 'assets/icons/arrow-right.svg';
import { Button } from 'design-system';
import { AssetEntity } from 'modules/land-works/api';

import { TILES_URL_VOXEL, VoxelsTileType } from 'modules/land-works/constants';

import './leafleft.scss';
import styles from './lands-explore-map-voxels.module.scss';

interface Props {
  positionX: number;
  positionY: number;
  expanded: boolean;
  onClick?: () => void;
  lands: AssetEntity[];
}

const LandsExploreMapVoxels: FC<Props> = ({ positionX, positionY, expanded, onClick, lands }) => {
  const [mapTiles, setMapTiles] = useState<VoxelsTileType[]>();

  const fetchTiles = async (url: string = TILES_URL_VOXEL) => {
    if (!window.fetch) return {};
    const resp = await window.fetch(url);
    const json = await resp.json();

    setMapTiles && setMapTiles(json.parcels);
  };

  const onClickToggleSizeHandler = () => {
    onClick && onClick();
  };

  const getLandData = (land: AssetEntity) => {
    const found = find(mapTiles, { id: Number(land.metaverseAssetId) });

    if (!found) {
      return null;
    }

    return found?.geometry;
  };

  useEffect(() => {
    fetchTiles();
  }, []);

  return (
    <div className={styles.root}>
      <MapContainer center={[51.505, -0.09]} zoom={7} className={styles['leaflet-container']}>
        <TileLayer
          attribution='&copy; <a href="https://www.cryptovoxels.com/">Voxel</a>'
          url="https://map.cryptovoxels.com/tile/?z={z}&x={x}&y={y}"
        />
        {/* <Marker position={[51.505, -0.09]}>
          <Popup>A pretty CSS3 popup.</Popup>
        </Marker> */}
        {mapTiles &&
          lands.map((land) => {
            if (getLandData(land)) {
              <GeoJSON key={land.id} data={getLandData(land)} />;
            }

            return null;
          })}
      </MapContainer>

      <div className={styles['expand-control']}>
        <Button variant="secondary" type="button" onClick={onClickToggleSizeHandler}>
          {expanded ? <ArrowRightIcon /> : <ArrowLeftIcon />}
        </Button>
      </div>
    </div>
  );
};

export default LandsExploreMapVoxels;
