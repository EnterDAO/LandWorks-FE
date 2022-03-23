import { find } from 'lodash';

import { AssetEntity, CoordinatesLand, CoordinatesLandWithLandId } from './api';
import { currencyData } from './components/lands-explore-filters/filters-data';

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

export const shortenString = (str: string): string => {
  return str.substring(0, 6) + '...' + str.substring(str.length - 4);
};

export const filterLandsByQuery = (lands: AssetEntity[], query: string): AssetEntity[] => {
  if (!query || !query.length) {
    return lands;
  }

  return lands.filter((land) => {
    return land.name.toLowerCase().search(query.toLowerCase()) !== -1;
  });
};

export const filterLandsByAvailability = (lands: AssetEntity[]): AssetEntity[] => {
  return lands.filter((land) => {
    return land.isAvailable === true;
  });
};

export const filterLandsByCurrencyId = (lands: AssetEntity[], currencyId: number): AssetEntity[] => {
  return lands.filter((land) => {
    const symbolFromCurrencyValue = find(currencyData, { value: currencyId })?.label;

    return land.paymentToken.symbol === symbolFromCurrencyValue;
  });
};

export const isListingInProgress = (lands: AssetEntity[], loadingLands: boolean): boolean => {
  const idOfListingInProgress = localStorage.getItem('LISTING_IN_PROGRESS');
  const listingInProgressExists = idOfListingInProgress && idOfListingInProgress.length > 0;
  const listingExistsInLands = lands.find((l) => l.metaverseAssetId === idOfListingInProgress);
  const shouldDisplayListingCard = !!(listingInProgressExists && !listingExistsInLands);
  // should lands still be loading, we don't want to assume the listing in progress was loaded into
  // lands, since lands could be a empty array until everything is loaded
  if (loadingLands) {
    return false;
  }
  // display the listing card since we know lands did load and the listing progress was not found in lands
  if (shouldDisplayListingCard) {
    return true;
  } else {
    // remove the item from local storage since it does exist in lands now
    // and return false since we know the item exists in lands now
    localStorage.removeItem('LISTING_IN_PROGRESS');
    return false;
  }
};
