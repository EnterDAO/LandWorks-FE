import { find, orderBy } from 'lodash';

import config from 'config';
import { CryptoVoxelXYcoords, VoxelsMapCollection, VoxelsTileType } from 'modules/interface';

import { AssetEntity, CoordinatesLand, CoordinatesLandWithLandId } from './api';

import { getNowTs } from 'utils';

import { orderEnum } from './constants';

import { MoreFiltersType } from './components/lands-explore-filters-modal/types';

export const calculateNeighbours = (coordinatesList: CoordinatesLand[]): string[] => {
  let neighbours = [] as string[];

  for (const coordinates of coordinatesList) {
    neighbours = [...neighbours, ...getNeighbours(coordinates)];
  }

  return [...new Set(neighbours)].filter((item) => !coordinatesList.some((l) => l.id === item));
};

export const getNeighbours = (coordinates: CoordinatesLand): string[] => {
  const numX = +coordinates.x;
  const numY = +coordinates.y;

  return [`${numX - 1}-${numY}`, `${numX}-${numY - 1}`, `${numX}-${numY + 1}`, `${numX + 1}-${numY}`];
};

export const getAllLandsCoordinates = (data: AssetEntity[]): CoordinatesLand[] => {
  let coords: CoordinatesLandWithLandId[] = [];

  data.forEach((land) => {
    if (land.decentralandData?.coordinates) {
      const coordinatesWithId: CoordinatesLandWithLandId[] = [];

      land.decentralandData?.coordinates.forEach((coord: CoordinatesLand) => {
        coordinatesWithId.push({
          x: coord.x,
          y: coord.y,
          id: `${coord.x},${coord.y}`,
          landId: land.id,
        });
      });

      coords = coords.concat(coordinatesWithId);
    }
  });

  return coords;
};

export const getCoordsFromCryptoVoxelImageUrl = (url: string): CryptoVoxelXYcoords => {
  const coordsFromUrl = url.split('?')[1];
  const x = coordsFromUrl.split('&')[0].replace('x=', '');
  const y = coordsFromUrl.split('&')[1].replace('y=', '');
  return { x, y };
};

export const formatCryptoVoxelsCoords = ({ x, y }: CryptoVoxelXYcoords): string => {
  return `X: ${x} Y: ${y}`;
};

export const shortenString = (str: string): string => {
  return str.substring(0, 6) + '...' + str.substring(str.length - 4);
};

export const filterLandsByQuery = (lands: AssetEntity[], query: string): AssetEntity[] => {
  if (!query || !query.length) {
    return lands;
  }

  return lands.filter((land) => {
    return land.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
  });
};

export const filterLandsByAvailability = (lands: AssetEntity[]): AssetEntity[] => {
  return lands.filter((land) => {
    return land.isAvailable;
  });
};

export const isNewLandTxInProgress = (lands: AssetEntity[], loadingLands: boolean, method: string): boolean => {
  const idOfLandInProgress = localStorage.getItem(method);
  const landInProgressExists = idOfLandInProgress && idOfLandInProgress.length > 0;
  const landExistsInLands = lands.find((l) => l.metaverseAssetId === idOfLandInProgress);
  const shouldDisplayLandCard = !!(landInProgressExists && !landExistsInLands);
  // should lands still be loading, we don't want to assume the land in progress was loaded into
  // lands, since lands could be an empty array until everything is loaded
  if (loadingLands) {
    return false;
  }
  // display the land card since we know lands did load and the land progress was not found in lands
  if (shouldDisplayLandCard) {
    return true;
  } else {
    // remove the item from local storage since it does exist in lands now
    // and return false since we know the item exists in lands now
    localStorage.removeItem(method);
    return false;
  }
};

export const isExistingLandInProgress = (
  lands: AssetEntity[],
  loadingLands: boolean,
  method: string
): string | boolean => {
  const idOfLandInProgress = localStorage.getItem(method);
  const landInProgressExists = idOfLandInProgress && idOfLandInProgress.length > 0;
  const landExistsInLands = lands.find((l) => l.metaverseAssetId === idOfLandInProgress);
  const shouldDisplayLoadingCard = !!(landInProgressExists && landExistsInLands);
  if (loadingLands || !lands.length) {
    return false;
  }
  if (landExistsInLands && getNowTs() <= +landExistsInLands?.lastRentEnd) {
    localStorage.removeItem(method);
  }
  if (shouldDisplayLoadingCard) {
    return idOfLandInProgress;
  } else {
    localStorage.removeItem(method);
  }
  return false;
};

export const getOwnerOrConsumerId = (asset?: AssetEntity): string | undefined => {
  if (!asset) {
    return '';
  }

  return asset?.owner?.id == config.contracts.yf.staking ? asset?.consumer?.id : asset?.owner?.id;
};

export const parceVoxelsMapAsset = async (
  lands: AssetEntity[],
  mapTiles: VoxelsTileType[] | undefined
): Promise<VoxelsMapCollection> => {
  const collection: VoxelsMapCollection = {
    type: 'FeatureCollection',
    features: [],
  };
  await Promise.all(
    lands.map((land) => {
      const found = find(mapTiles, { id: Number(land.metaverseAssetId) });
      found &&
        collection.features.push({
          type: 'Feature',
          id: String(found.id),
          geometry: {
            type: found.geometry.type,
            coordinates: found.geometry.coordinates,
          },
        });
    })
  );

  return collection;
};

export const landsOrder = (lands: AssetEntity[], orderCol: string, orderDir: 'asc' | 'desc'): AssetEntity[] => {
  return orderBy(lands, [orderEnum[orderCol]], [orderDir]);
};

export const getMaxLandSize = (lands: AssetEntity[]): number => {
  return Math.max(...lands.map((land) => land.additionalData.size));
};

export const getMaxArea = (lands: AssetEntity[]): number => {
  return Math.max(...lands.map((land) => Math.ceil(land.attributes.area)));
};

export const getMaxHeight = (lands: AssetEntity[]): number => {
  return Math.max(...lands.map((land) => land.attributes.height));
};

export const filterByMoreFilters = (
  lands: AssetEntity[],
  filters: Partial<MoreFiltersType>,
  metaverse: string
): AssetEntity[] => {
  return lands.filter((item) => {
    return metaverse === '1' ? decentralandFilter(item, filters) : voxelsFilter(item, filters);
  });
};

const decentralandFilter = (item: AssetEntity, filters: Partial<MoreFiltersType>) => {
  const size = filters?.size;
  const distanceToRoad = filters?.distanceToRoad;
  const distanceToPlaza = filters?.distanceToPlaza;
  const distanceToDistrict = filters?.distanceToDistrict;
  const type = filters?.type;
  const itemData = item.additionalData;

  if ((size && itemData.size < size.min) || (size && itemData.size > size.max)) {
    return false;
  }
  if (
    (distanceToRoad && itemData.attributes.road && itemData.attributes.road < distanceToRoad.min) ||
    (distanceToRoad && itemData.attributes.road && itemData.attributes.road > distanceToRoad.max)
  ) {
    return false;
  }
  if (
    (distanceToPlaza && itemData.attributes.plaza && itemData.attributes.plaza < distanceToPlaza.min) ||
    (distanceToPlaza && itemData.attributes.plaza && itemData.attributes.plaza > distanceToPlaza.max)
  ) {
    return false;
  }
  if (
    (distanceToDistrict && itemData.attributes.district && itemData.attributes.district < distanceToDistrict.min) ||
    (distanceToDistrict && itemData.attributes.district && itemData.attributes.district > distanceToDistrict.max)
  ) {
    return false;
  }
  if (type?.toLowerCase() === 'all') return true;
  if (type?.toLowerCase() === item.type.toLowerCase()) return true;
};

const voxelsFilter = (item: AssetEntity, filters: Partial<MoreFiltersType>) => {
  const type = filters.type;
  const area = filters?.area;
  const height = filters?.height;
  const hasBasement = filters?.hasBasement;
  const isWaterfront = filters?.isWaterFront;
  const itemData = item.attributes;

  if ((area && itemData.area < area.min) || (area && itemData.area > area.max)) {
    return false;
  }
  if ((height && itemData.height < height.min) || (height && itemData.height > height.max)) {
    return false;
  }
  if (itemData.has_basement === hasBasement) {
    return true;
  }
  if (itemData.waterfront === isWaterfront) {
    return true;
  }
  if (type?.toLowerCase() === 'all') return true;
  if (type?.toLowerCase() === item.type.toLowerCase()) return true;
};
