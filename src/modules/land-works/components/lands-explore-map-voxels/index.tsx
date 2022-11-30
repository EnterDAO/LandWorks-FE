import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { GeoJSON, GeoJSONProps, MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { Icon, LatLngExpression, Layer } from 'leaflet';
import { find } from 'lodash';

import MapMarker from 'assets/img/mapMarker.png';
import { LandsExploreMapBaseProps, VoxelsTileType } from 'modules/interface';
import { useLandsMapTile } from 'modules/land-works/providers/lands-map-tile';
import { useLandsMapTiles } from 'modules/land-works/providers/lands-map-tiles';

import { voxelsTilesToVoxelsMapCollection } from 'modules/land-works/utils';
import { inverseLerp, lerp } from 'utils';

import { TILES_URL_VOXEL } from 'modules/land-works/constants';

import './leafleft.scss';
import styles from './lands-explore-map-voxels.module.scss';

const iconPerson = new Icon({
  iconUrl: `${MapMarker}`,
});

type LandsExploreMapVoxelsProps = LandsExploreMapBaseProps;

const MIN_ZOOM = 1;
const MAX_ZOOM = 12;

const center: [number, number] = [-0.0054, 0.0132];

type LeafletMap = ReturnType<typeof useMap>;

const pathOptions = {
  color: '#9370DB',
  fillColor: 'lightblue',
  fillOpacity: 0.7,
  opacity: 1,
  weight: 1,
};

const LandsExploreMapVoxels: FC<LandsExploreMapVoxelsProps> = ({ zoom = 0.5, onZoom, lands }) => {
  const mapRef = useRef<LeafletMap | null>(null);
  const { setClickedLandId } = useLandsMapTile();
  const { selectedId } = useLandsMapTiles();
  const [mapTiles, setMapTiles] = useState<VoxelsTileType[]>();
  const [markerPosition, setMarkerPosition] = useState<LatLngExpression>();

  const fetchTiles = async (url: string = TILES_URL_VOXEL) => {
    if (!window.fetch) return {};
    const resp = await window.fetch(url);
    const json = await resp.json();

    setMapTiles && setMapTiles(json.parcels);
  };

  useEffect(() => {
    if (!!mapTiles && mapRef.current) {
      mapRef.current.invalidateSize();
    }
  }, [mapTiles]);

  const geoEachFeature = useCallback(
    (feature: GeoJSON.Feature<GeoJSON.GeometryObject>, layer: Layer) => {
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
    },
    [setMarkerPosition, setClickedLandId]
  );

  useEffect(() => {
    fetchTiles();
  }, []);

  useEffect(() => {
    const found = find(mapTiles, { id: Number(selectedId) });

    if (found) {
      setMarkerPosition(getCentre(found.geometry.coordinates[0]));
    }
  }, [selectedId, mapTiles, setMarkerPosition]);

  const geoJsonObject = useMemo(() => {
    if (!lands.length || !mapTiles) {
      return;
    }

    const landsTiles = lands
      .map((land) => {
        return mapTiles.find((tile) => tile.id === +land.metaverseAssetId);
      })
      .filter((tile): tile is VoxelsTileType => !!tile);

    if (!landsTiles.length) {
      return;
    }

    return voxelsTilesToVoxelsMapCollection(landsTiles) as any as GeoJSONProps['data'];
  }, [lands, mapTiles]);

  // prop data of the geojson is immutable so
  // component will not rerender if we change data prop
  // to address this issue we need key as a workaround
  const geoJsonKey = useMemo(() => lands.map((land) => land.id).join(','), [lands]);

  return (
    <div className={styles.root}>
      <MapContainer
        ref={mapRef}
        center={center}
        minZoom={MIN_ZOOM}
        maxZoom={MAX_ZOOM}
        zoomControl={false}
        zoom={lerp(MIN_ZOOM, MAX_ZOOM, zoom)}
        className={styles['leaflet-container']}
      >
        <MapOptions id={selectedId} zoom={zoom} onZoom={onZoom} mapTiles={mapTiles} />
        <TileLayer
          attribution='&copy; <a href="https://www.cryptovoxels.com/">Voxel</a>'
          url="https://map.cryptovoxels.com/tile/?z={z}&x={x}&y={y}"
        />
        {markerPosition && <Marker position={markerPosition} icon={iconPerson} />}
        {geoJsonObject && (
          <GeoJSON key={geoJsonKey} data={geoJsonObject} pathOptions={pathOptions} onEachFeature={geoEachFeature} />
        )}
      </MapContainer>
    </div>
  );
};

export default LandsExploreMapVoxels;

interface MapOptionsProps {
  id: string | undefined;
  mapTiles: VoxelsTileType[] | undefined;
  onZoom?: (zoom: number) => void;
  zoom?: number;
}

const FLY_ZOOM = 9;

const MapOptions: React.FC<MapOptionsProps> = ({ id, mapTiles, zoom = 0.5, onZoom }) => {
  const map = useMapEvents({
    zoom: () => {
      if (onZoom) {
        console.log('zoom', map.getZoom());
        onZoom(inverseLerp(MIN_ZOOM, MAX_ZOOM, map.getZoom()));
      }
    },
  });

  useEffect(() => {
    map.setZoom(lerp(MIN_ZOOM, MAX_ZOOM, zoom));
  }, [map, zoom]);

  useEffect(() => {
    if (!id) {
      return;
    }

    const foundTile = find(mapTiles, { id: Number(id) });
    const coords = foundTile?.geometry.coordinates[0];
    const landCentre = coords ? getCentre(coords) : map.getCenter();

    if (coords) {
      map.setView(landCentre, FLY_ZOOM);
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
