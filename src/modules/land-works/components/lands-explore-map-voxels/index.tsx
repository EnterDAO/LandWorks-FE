import { FC, useEffect, useState } from 'react';
import { GeoJSON, MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import { Icon, LatLngExpression, Layer } from 'leaflet';
import { find } from 'lodash';

import { ReactComponent as ArrowLeftIcon } from 'assets/icons/arrow-left.svg';
import { ReactComponent as ArrowRightIcon } from 'assets/icons/arrow-right.svg';
import MapMarker from 'assets/img/mapMarker.png';
import { Button } from 'design-system';
import { VoxelsMapCollection, VoxelsTileType } from 'modules/interface';
import { AssetEntity } from 'modules/land-works/api';
import { useLandsMapTile } from 'modules/land-works/providers/lands-map-tile';
import { useLandsMapTiles } from 'modules/land-works/providers/lands-map-tiles';

import { parceVoxelsMapAsset } from 'modules/land-works/utils';

import { TILES_URL_VOXEL } from 'modules/land-works/constants';

import './leafleft.scss';
import styles from './lands-explore-map-voxels.module.scss';

const iconPerson = new Icon({
  iconUrl: `${MapMarker}`,
});

interface Props {
  positionX: number;
  positionY: number;
  expanded: boolean;
  onClick?: () => void;
  lands: AssetEntity[];
}

const LandsExploreMapVoxels: FC<Props> = ({ expanded, onClick, lands }) => {
  const { setClickedLandId } = useLandsMapTile();
  const { selectedId } = useLandsMapTiles();

  const [mapTiles, setMapTiles] = useState<VoxelsTileType[]>();
  const [mapCollection, setMapCollection] = useState<VoxelsMapCollection>();

  const [markerPosition, setMarkerPosition] = useState<LatLngExpression>();

  const fetchTiles = async (url: string = TILES_URL_VOXEL) => {
    if (!window.fetch) return {};
    const resp = await window.fetch(url);
    const json = await resp.json();

    setMapTiles && setMapTiles(json.parcels);
  };

  const onClickToggleSizeHandler = () => {
    onClick && onClick();
  };

  const getLandData = () => {
    parceVoxelsMapAsset(lands, mapTiles).then(setMapCollection);
  };

  const geoEachFeature = (feature: GeoJSON.Feature<GeoJSON.GeometryObject>, layer: Layer) => {
    layer.on({
      mouseover: function (e) {
        const auxLayer = e.target;
        auxLayer.setStyle({
          weight: 2,
          color: '#800080',
          fillColor: '#7dcae3',
        });
      },
      mouseout: function (e) {
        const auxLayer = e.target;
        auxLayer.setStyle({
          weight: 1,
          color: '#9370DB',
          fillColor: 'lightblue',
          dashArray: '',
          fillOpacity: 0.7,
          opacity: 1,
        });
      },
      click: function (e) {
        setMarkerPosition(getCentre(e.target.feature.geometry.coordinates[0]));
        setClickedLandId && setClickedLandId(e.target.feature.id);
      },
    });
  };

  useEffect(() => {
    fetchTiles();
  }, []);

  useEffect(() => {
    const found = find(mapTiles, { id: Number(selectedId) });
    if (found) setMarkerPosition(getCentre(found.geometry.coordinates[0]));
  }, [selectedId]);

  useEffect(() => {
    if (lands.length && mapTiles?.length) {
      getLandData();
    }
  }, [lands, mapTiles]);

  return (
    <div className={styles.root}>
      <MapContainer center={[-0.0054, 0.0132]} zoom={8} className={styles['leaflet-container']}>
        <MapOptions id={selectedId} mapTiles={mapTiles} />
        <TileLayer
          attribution='&copy; <a href="https://www.cryptovoxels.com/">Voxel</a>'
          url="https://map.cryptovoxels.com/tile/?z={z}&x={x}&y={y}"
        />
        {markerPosition && <Marker position={markerPosition} icon={iconPerson} />}
        {mapCollection && (
          <GeoJSON
            //eslint-disable-next-line
            //@ts-ignore
            data={mapCollection}
            pathOptions={{
              color: '#9370DB',
              fillColor: 'lightblue',
              fillOpacity: 0.7,
              opacity: 1,
              weight: 1,
            }}
            onEachFeature={geoEachFeature}
          />
        )}
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

interface MapOptionsProps {
  id: string | undefined;
  mapTiles: VoxelsTileType[] | undefined;
}
const MapOptions: React.FC<MapOptionsProps> = ({ id, mapTiles }) => {
  const map = useMap();
  const FLY_ZOOM = 9;
  map.setMaxZoom(12);
  map.setMinZoom(1);

  useEffect(() => {
    if (id) {
      const found = find(mapTiles, { id: Number(id) });
      const coords = found?.geometry.coordinates[0];
      const landCentre = coords ? getCentre(coords) : map.getCenter();
      coords && map.setView(landCentre, FLY_ZOOM);
    }
  }, [id]);

  return null;
};

function getCentre(coords: Array<number[]>) {
  const LNG_CALC_MISTAKE = 0.065;
  const LAT_CALC_MISTAKE = 0.15;
  const summary = coords.reduce(
    (acc, current) => {
      acc[0] = acc[0] + current[0];
      acc[1] = acc[1] + current[1];
      return acc;
    },
    [0, 0]
  );
  return { lng: summary[0] / coords.length - LNG_CALC_MISTAKE, lat: summary[1] / coords.length + LAT_CALC_MISTAKE };
}
