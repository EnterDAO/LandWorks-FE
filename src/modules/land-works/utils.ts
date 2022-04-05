import { find } from 'lodash';

import { AssetEntity, CoordinatesLand, CoordinatesLandWithLandId } from './api';
import { currencyData } from './components/lands-explore-filters/filters-data';

import {
  NotionResult,
  NotionResultForCard,
  NotionResultForPortfolio,
  NotionResultForProfile,
} from './components/scene-expert-card/types';

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

export const transformSceneProviderForCard = (notionEntity: NotionResult): NotionResultForCard => {
  return {
    coverPhotoLink: notionEntity.properties['Cover Photo'].files[0].file.url,
    avatarPhotoLink: notionEntity.properties['Profile Picture'].files[0].file.url,
    builderName: notionEntity.properties['Scene Builder Name'].title[0].plain_text,
    definition: notionEntity.properties.Definition.rich_text[0].plain_text,
    builderType: notionEntity.properties.Type.select.name,
    shortDescription: notionEntity.properties['Short Description'].rich_text[0].plain_text,
    location: notionEntity.properties.Location.rich_text[0].plain_text,
    price: notionEntity.properties.Price.select.name,
  };
};

export const transformSceneProviderForProfile = (notionEntity: NotionResult): NotionResultForProfile => {
  return {
    coverPhotoLink: notionEntity.properties['Cover Photo'].files[0].file.url,
    avatarPhotoLink: notionEntity.properties['Profile Picture'].files[0].file.url,
    builderName: notionEntity.properties['Scene Builder Name'].title[0].plain_text,
    definition: notionEntity.properties.Definition.rich_text[0].plain_text,
    builderType: notionEntity.properties.Type.select.name,
    longDescription: notionEntity.properties['Long Description'].rich_text[0].plain_text,
    website: notionEntity.properties.Website.url,
    twitter: notionEntity.properties.Twitter.url,
    discord: notionEntity.properties.Discord.rich_text[0].plain_text,
    location: notionEntity.properties.Location.rich_text[0].plain_text,
    price: notionEntity.properties.Price.select.name,
    tags: notionEntity.properties.Tags.multi_select.map((t) => t.name).join(', '),
    languages: notionEntity.properties.Languages.multi_select.map((t) => t.name).join(', '),
  };
};

export const transformSceneProviderForPortfolio = (notionEntity: NotionResult): NotionResultForPortfolio => {
  return {
    portfolio1: notionEntity.properties['Portfolio 1'].files[0].file.url,
    portfolio2: notionEntity.properties['Portfolio 2'].files[0].file.url,
    portfolio3: notionEntity.properties['Portfolio 3'].files[0].file.url,
    portfolio4: notionEntity.properties['Portfolio 4'].files[0].file.url,
  };
};
