/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { BASE_URL_DECENTRALEND } from 'constants/modules';
import { InfuraProvider } from '@ethersproject/providers';
import format from 'date-fns/format';
import fromUnixTime from 'date-fns/fromUnixTime';

import { DecentralandNFT } from 'modules/interface';
import { AssetEntity } from 'modules/land-works/api';

import defaultLandImage from '../modules/land-works/components/land-works-card/assets/land.png';

const euDateFormat = 'dd.MM.yyyy HH:mm';

export const isDateBeforeNow = (timestamp: string): boolean => {
  const milisecTimestamp = Number(timestamp + '000');
  const timestampDate = new Date(milisecTimestamp);
  const now = new Date();

  return now < timestampDate;
};

export const timestampSecondsToDate = (timestamp: string, dateFormat: string = euDateFormat) => {
  const endDate = fromUnixTime(Number(timestamp));
  return `${format(endDate, dateFormat)} UTC +${new Date().getTimezoneOffset() / -60}`;
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

  if (!land.decentralandData) {
    return defaultLandImage;
  }

  if (land.decentralandData.isLAND) {
    if (!land.decentralandData.coordinates[0]?.x || !land.decentralandData.coordinates[0]?.y) {
      return defaultLandImage;
    }
    const imageUrl = `${BASE_URL_DECENTRALEND}/parcels/${land.decentralandData.coordinates[0].x}/${land.decentralandData.coordinates[0].y}/map.png`;
    return imageUrl;
  } else {
    if (!land.metaverseAssetId) {
      return defaultLandImage;
    }

    const imageUrl = `${BASE_URL_DECENTRALEND}/estates/${land.metaverseAssetId}/map.png`;
    return imageUrl;
  }
};

export const getDecentralandNftImageUrl = (land: DecentralandNFT) => {
  const imageUrl = `${BASE_URL_DECENTRALEND}/parcels/${land.coords[0]}/${land.coords[1]}/map.png`;
  return imageUrl;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getEstateImageUrl = (land: any) => {
  const imageUrl = `${BASE_URL_DECENTRALEND}/estates/${land.metaverseAssetId}/map.png`;
  return imageUrl;
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
  const provider = new InfuraProvider();
  const ensName = await provider.lookupAddress(address);
  return ensName ? ensName : address;
};

export const getAddressFromENS = async (ens: string) => {
  const provider = new InfuraProvider();
  const address = await provider.resolveName(ens);
  return address;
};
