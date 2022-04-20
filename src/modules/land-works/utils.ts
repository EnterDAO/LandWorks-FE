import { find } from 'lodash';

import config from 'config';
import { CryptoVoxelXYcoords } from 'modules/interface';

import { AssetEntity, CoordinatesLand, CoordinatesLandWithLandId } from './api';
import { currencyData } from './components/lands-explore-filters/filters-data';

import { getNowTs, isDecentralandMetaverseRegistry } from 'utils';

import { NotionResult, NotionResultForCard, NotionResultForProfile } from './components/scene-builder-card/types';

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

export const getCoordsFromCryptoVoxelImageUrl = (url: string) => {
  const coordsFromUrl = url.split('?')[1];
  const x = coordsFromUrl.split('&')[0].replace('x=', '');
  const y = coordsFromUrl.split('&')[1].replace('y=', '');
  return { x, y };
};

export const formatCryptoVoxelsCoords = ({ x, y }: CryptoVoxelXYcoords) => {
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
    return land.name.toLowerCase().search(query.toLowerCase()) !== -1;
  });
};

export const filterLandsByAvailability = (lands: AssetEntity[]): AssetEntity[] => {
  return lands.filter((land) => {
    return land.isAvailable === true;
  });
};

export const isNewLandTxInProgress = (lands: AssetEntity[], loadingLands: boolean, method: string): boolean => {
  const idOfLandInProgress = localStorage.getItem(method);
  const landInProgressExists = idOfLandInProgress && idOfLandInProgress.length > 0;
  const landExistsInLands = lands.find((l) => l.metaverseAssetId === idOfLandInProgress);
  const shouldDisplayLandCard = !!(landInProgressExists && !landExistsInLands);
  // should lands still be loading, we don't want to assume the land in progress was loaded into
  // lands, since lands could be a empty array until everything is loaded
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

export const transformSceneProviderForCard = (notionEntity: NotionResult): NotionResultForCard => {
  return {
    coverPhotoLink: notionEntity.properties['Cover Photo'].files[0].file.url,
    avatarPhotoLink: notionEntity.properties['Profile Picture'].files[0].file.url,
    builderName: notionEntity.properties['Scene Builder Name'].title[0].plain_text,
    definition: notionEntity.properties.Definition.rich_text[0].plain_text,
    builderType: notionEntity.properties.Type.select.name,
    shortDescription: notionEntity.properties['Short Description'].rich_text[0].plain_text,
    location: notionEntity.properties.Location.rich_text[0].plain_text,
  };
};

export const transformSceneProviderForProfile = (notionEntity: NotionResult): NotionResultForProfile => {
  const portfolio = [
    notionEntity.properties['Portfolio 1'].files[0]?.file?.url,
    notionEntity.properties['Portfolio 2'].files[0]?.file?.url,
    notionEntity.properties['Portfolio 3'].files[0]?.file?.url,
    notionEntity.properties['Portfolio 4'].files[0]?.file?.url,
  ];
  return {
    coverPhotoLink: notionEntity.properties['Cover Photo'].files[0].file.url,
    avatarPhotoLink: notionEntity.properties['Profile Picture'].files[0].file.url,
    builderName: notionEntity.properties['Scene Builder Name'].title[0].plain_text,
    definition: notionEntity.properties.Definition.rich_text[0].plain_text,
    builderType: notionEntity.properties.Type.select.name,
    longDescription: notionEntity.properties['Long Description'].rich_text[0].plain_text,
    website: notionEntity.properties.Website.url,
    twitter: notionEntity.properties.Twitter.rich_text[0].plain_text,
    discord: notionEntity.properties.Discord.rich_text[0].plain_text,
    email: notionEntity.properties.Email.email,
    location: notionEntity.properties.Location.rich_text[0].plain_text,
    tags: notionEntity.properties.Tags.multi_select.map((t) => t.name).join(', '),
    languages: notionEntity.properties.Languages.multi_select.map((t) => t.name).join(', '),
    portfolio,
  };
};

export const getOwnerOrConsumerId = (asset?: AssetEntity): string | undefined => {
  if (!asset) {
    return '';
  }

  return asset?.owner?.id == config.contracts.yf.staking ? asset?.consumer?.id : asset?.owner?.id;
};
