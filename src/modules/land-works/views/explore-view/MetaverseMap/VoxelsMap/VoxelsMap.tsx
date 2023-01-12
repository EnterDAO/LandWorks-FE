import { useEffect, useMemo, useRef, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import useSWRImmutable from 'swr/immutable';

import { VoxelsTileType } from 'modules/interface';

import { MetaverseMapCommonProps } from '../MetaverseMap';
import MetaverseMapProvider from '../MetaverseMapProvider';
import VoxelsMapHighlightedAssets from './VoxelsMapHighlightedAssets';
import VoxelsMapZooming from './VoxelsMapZooming';

import { TILES_URL_VOXEL } from 'modules/land-works/constants';

const MIN_ZOOM = 2;
const MAX_ZOOM = 10;
const INITIAL_ZOOM = 7;
const ZOOM_STEP = 1;

const center: [number, number] = [-0.0054, 0.0132];

type LeafletMap = ReturnType<typeof useMap>;

const useGetVoxelParcelsQuery = () => {
  const { data, error } = useSWRImmutable<{ success: boolean; parcels: VoxelsTileType[] }>(TILES_URL_VOXEL);

  return {
    data: data?.parcels,
    loading: !data && !error,
    error,
  };
};

const VoxelsMap = ({ assets, children, onSelect, isFullScreen, selectedId }: MetaverseMapCommonProps) => {
  const mapRef = useRef<LeafletMap | null>(null);
  const [zoom, setZoom] = useState(INITIAL_ZOOM);
  const { data: parcels } = useGetVoxelParcelsQuery();

  useEffect(() => {
    if (parcels && mapRef.current) {
      mapRef.current.invalidateSize();
    }
  }, [parcels, isFullScreen]);

  const zoomControls = useMemo(() => {
    return {
      zoomIn: () => {
        if (mapRef.current) {
          mapRef.current.zoomIn();
        }
      },
      zoomOut: () => {
        if (mapRef.current) {
          mapRef.current.zoomOut();
        }
      },
    };
  }, []);

  return (
    <MetaverseMapProvider zoom={zoom} minZoom={MIN_ZOOM} maxZoom={MAX_ZOOM} {...zoomControls}>
      <MapContainer
        ref={mapRef}
        center={center}
        minZoom={MIN_ZOOM}
        maxZoom={MAX_ZOOM}
        zoomControl={false}
        zoom={INITIAL_ZOOM}
        zoomSnap={ZOOM_STEP}
        style={{
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.cryptovoxels.com/">Voxel</a>'
          url="https://map.cryptovoxels.com/tile/?z={z}&x={x}&y={y}"
        />

        <VoxelsMapZooming onZoom={setZoom} />
        <VoxelsMapHighlightedAssets selectedId={selectedId} assets={assets} parcels={parcels} onSelect={onSelect} />
      </MapContainer>
      {children}
    </MetaverseMapProvider>
  );
};

export default VoxelsMap;
