import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { GeoJSON, GeoJSONProps, Marker, useMap } from 'react-leaflet';
import { GeoJSON as GeoJSONType, Icon, LatLngLiteral, Layer } from 'leaflet';

import MapMarker from 'assets/img/mapMarker.png';
import { VoxelsTileType } from 'modules/interface';
import { AssetEntity } from 'modules/land-works/api';

import { voxelsTilesToVoxelsMapCollection } from 'modules/land-works/utils';

const iconPerson = new Icon({
  iconUrl: `${MapMarker}`,
  iconSize: [35, 51],
  iconAnchor: [17.5, 51],
});

const highlightedParcelStyles = {
  color: '#9370DB',
  fillColor: 'lightblue',
  fillOpacity: 0.7,
  opacity: 1,
  weight: 1,
};

const hoveredHighlightedParcelStyles = {
  weight: 2,
  color: '#800080',
  fillColor: '#7dcae3',
};

const FLY_ZOOM = 9;

interface VoxelsMapHighlightedAssetsProps {
  selectedId?: string;
  onSelect?: (assetId?: string) => void;
  assets?: AssetEntity[];
  parcels?: VoxelsTileType[];
}

const VoxelsMapHighlightedAssets = ({ selectedId, assets, parcels, onSelect }: VoxelsMapHighlightedAssetsProps) => {
  const [markerPosition, setMarkerPosition] = useState<LatLngLiteral>();
  const geoJsonRef = useRef<GeoJSONType | null>(null);
  const map = useMap();

  const geoEachFeature = useCallback(
    (feature: GeoJSON.Feature<GeoJSON.GeometryObject>, layer: Layer) => {
      layer.on({
        mouseover(e) {
          const auxLayer = e.target;

          auxLayer.setStyle(hoveredHighlightedParcelStyles);
        },
        mouseout(e) {
          const auxLayer = e.target;

          auxLayer.setStyle(highlightedParcelStyles);
        },
        click(e) {
          setMarkerPosition(e.target.getCenter());

          if (onSelect && assets) {
            const asset = assets.find((asset) => +asset.metaverseAssetId === +e.target.feature.id);

            if (asset) {
              onSelect(asset.id);
            }
          }
        },
      });
    },
    [setMarkerPosition, onSelect, assets]
  );

  useLayoutEffect(() => {
    if (!assets?.length) {
      setMarkerPosition(undefined);
    }
  }, [assets]);

  useEffect(() => {
    if (!geoJsonRef.current || !assets || !selectedId) {
      return;
    }

    const selectedAsset = assets.find((asset) => asset.id === selectedId);

    if (!selectedAsset) {
      return;
    }

    const selectedLayer = geoJsonRef.current.getLayers().find((layer) => {
      return (layer as any).feature.id === selectedAsset.metaverseAssetId;
    });

    if (!selectedLayer) {
      return;
    }

    const selectedLayerPosition: LatLngLiteral = (selectedLayer as any).getCenter();

    setMarkerPosition(selectedLayerPosition);

    map.setView(selectedLayerPosition, FLY_ZOOM);
  }, [map, assets, selectedId]);

  const highlightedAssetsVoxelsMapCollection = useMemo(() => {
    if (!assets?.length || !parcels) {
      return;
    }

    const highlightedParcels = assets.reduce((acc, asset) => {
      // TODO: fix hardcoded value
      if (asset.metaverse.name === 'Voxels') {
        const parcel = parcels.find((parcel) => parcel.id === +asset.metaverseAssetId);

        if (parcel) {
          acc.push(parcel);
        }
      }

      return acc;
    }, [] as VoxelsTileType[]);

    if (!highlightedParcels.length) {
      return;
    }

    return voxelsTilesToVoxelsMapCollection(highlightedParcels);
  }, [assets, parcels]);

  // prop data of the geojson is immutable so
  // component will not rerender if we change data prop
  // to address this issue we need key as a workaround
  const geoJsonKey = useMemo(() => {
    if (!highlightedAssetsVoxelsMapCollection?.features.length) {
      return '';
    }

    return highlightedAssetsVoxelsMapCollection.features.map((feature) => feature.id).toString();
  }, [highlightedAssetsVoxelsMapCollection]);

  if (!highlightedAssetsVoxelsMapCollection) {
    return null;
  }

  return (
    <>
      {markerPosition && <Marker position={markerPosition} icon={iconPerson} />}

      <GeoJSON
        key={geoJsonKey}
        ref={geoJsonRef}
        data={highlightedAssetsVoxelsMapCollection as any as GeoJSONProps['data']}
        pathOptions={highlightedParcelStyles}
        onEachFeature={geoEachFeature}
      />
    </>
  );
};

export default VoxelsMapHighlightedAssets;
