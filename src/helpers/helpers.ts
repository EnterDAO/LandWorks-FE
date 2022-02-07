import format from 'date-fns/format';
import fromUnixTime from 'date-fns/fromUnixTime';
import { InfuraProvider } from '@ethersproject/providers';


import { AssetEntity } from 'modules/land-works/api';

import defaultLandImage from '../modules/land-works/components/land-works-card/assets/land.png';

const euDateFormat = 'dd.MM.yyyy HH:mm';

export const isDateBeforeNow = (timestamp: string) => {
  const milisecTimestamp = Number(timestamp + '000');
  const timestampDate = new Date(milisecTimestamp);
  const now = new Date();

  return now < timestampDate;
};

export const timestampSecondsToDate = (timestamp: string, dateFormat: string = euDateFormat) => {
  const endDate = fromUnixTime(Number(timestamp));
  return format(endDate, dateFormat);
};

export const timestampSecondsToUTCDate = (timestamp: string, dateFormat: string = euDateFormat) => {
  const localDate = fromUnixTime(Number(timestamp));
  const utcDate = new Date(localDate.getUTCFullYear(), localDate.getUTCMonth(), localDate.getUTCDate());
  return format(utcDate, dateFormat);
};

export const getLandImageUrl = (land: AssetEntity | undefined) => {
  if (!land?.status && !land?.id) {
    return defaultLandImage;
  }

  const baseImageUrl = 'https://api.decentraland.org/v1';
  if (!land.decentralandData) {
    return defaultLandImage;
  }

  if (land.decentralandData.isLAND) {
    if (!land.decentralandData.coordinates[0]?.x || !land.decentralandData.coordinates[0]?.y) {
      return defaultLandImage;
    }
    const imageUrl = `${baseImageUrl}/parcels/${land.decentralandData.coordinates[0].x}/${land.decentralandData.coordinates[0].y}/map.png`;
    return imageUrl;
  } else {
    if (!land.metaverseAssetId) {
      return defaultLandImage;
    }
    const imageUrl = `${baseImageUrl}/estates/${land.metaverseAssetId}/map.png`;
    return imageUrl;
  }
};

export const getTokenIconName = (tokenSymbol: string) => {
  switch (tokenSymbol.toLowerCase()) {
    case 'eth':
      return 'png/eth';
    case 'usdc':
      return 'token-usdc';
    default:
      return 'png/eth';
  }
};

export const getENSName = async (address: string) => {
  const prov = new InfuraProvider();
  const ensName = await prov.lookupAddress(address);
  return ensName ? ensName : address;
};
