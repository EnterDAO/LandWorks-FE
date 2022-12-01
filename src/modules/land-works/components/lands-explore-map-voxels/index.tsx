import { FC, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { GeoJSON, GeoJSONProps, MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { Icon, LatLngLiteral, Layer } from 'leaflet';
import useSWR from 'swr';

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
  iconSize: [35, 51],
  iconAnchor: [17.5, 51],
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

const FLY_ZOOM = 9;

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// TODO: refactor
const LandsExploreMapVoxels: FC<LandsExploreMapVoxelsProps> = ({ zoom = 0.5, onZoom, lands }) => {
  const mapRef = useRef<LeafletMap | null>(null);
  const { setClickedLandId } = useLandsMapTile();
  const { selectedId, setSelectedId } = useLandsMapTiles();
  const [markerPosition, setMarkerPosition] = useState<LatLngLiteral>();
  const { data: { parcels } = {} } = useSWR<{ success: boolean; parcels: VoxelsTileType[] }>(TILES_URL_VOXEL, fetcher);
  const geoJsonRef = useRef<any | null>(null);

  useEffect(() => {
    if (parcels && mapRef.current) {
      mapRef.current.invalidateSize();
    }
  }, [parcels]);

  const geoEachFeature = useCallback(
    (feature: GeoJSON.Feature<GeoJSON.GeometryObject>, layer: Layer) => {
      layer.on({
        mouseover(e) {
          const auxLayer = e.target;
          auxLayer.setStyle({
            weight: 2,
            color: '#800080',
            fillColor: '#7dcae3',
          });
        },
        mouseout(e) {
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
        click(e) {
          setMarkerPosition(e.target.getCenter());

          if (setClickedLandId) {
            setClickedLandId(e.target.feature.id);
          }

          if (setSelectedId) {
            setSelectedId(e.target.feature.id);
          }
        },
      });
    },
    [setMarkerPosition, setClickedLandId]
  );

  useLayoutEffect(() => {
    if (lands.length === 0) {
      setMarkerPosition(undefined);
    }
  }, [lands]);

  useEffect(() => {
    if (!geoJsonRef.current) {
      return;
    }

    const foundLayer = geoJsonRef.current.getLayers().find((layer: any) => layer.feature.id === selectedId);

    if (!foundLayer) {
      return;
    }

    const center = foundLayer.getCenter();

    setMarkerPosition(center);

    if (!mapRef.current) {
      return;
    }

    mapRef.current.setView(center, FLY_ZOOM);
  }, [lands, selectedId, setMarkerPosition]);

  const geoJsonObject = useMemo(() => {
    if (!lands.length || !parcels) {
      return;
    }

    const landsTiles = lands
      .map((land) => {
        return parcels.find((tile) => tile.id === +land.metaverseAssetId);
      })
      .filter((tile): tile is VoxelsTileType => !!tile);

    if (!landsTiles.length) {
      return;
    }

    return voxelsTilesToVoxelsMapCollection(landsTiles) as any as GeoJSONProps['data'];
  }, [lands, parcels]);

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
        <MapOptions id={selectedId} zoom={zoom} onZoom={onZoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.cryptovoxels.com/">Voxel</a>'
          url="https://map.cryptovoxels.com/tile/?z={z}&x={x}&y={y}"
        />
        {markerPosition && <Marker position={markerPosition} icon={iconPerson} />}
        {geoJsonObject && (
          <GeoJSON
            key={geoJsonKey}
            ref={geoJsonRef}
            data={geoJsonObject}
            pathOptions={pathOptions}
            onEachFeature={geoEachFeature}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default LandsExploreMapVoxels;

interface MapOptionsProps {
  id: string | undefined;
  onZoom?: (zoom: number) => void;
  zoom?: number;
}

const MapOptions: React.FC<MapOptionsProps> = ({ zoom = 0.5, onZoom }) => {
  const map = useMapEvents({
    zoom: () => {
      if (onZoom) {
        onZoom(inverseLerp(MIN_ZOOM, MAX_ZOOM, map.getZoom()));
      }
    },
  });

  useEffect(() => {
    map.setZoom(lerp(MIN_ZOOM, MAX_ZOOM, zoom));
  }, [map, zoom]);

  return null;
};
