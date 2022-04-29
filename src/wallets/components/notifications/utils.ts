import { getCryptoVoxelsAsset } from 'helpers/helpers';
import { AssetEntity } from 'modules/land-works/api';

import { NotificationList } from './notificationTypes';

import { getDecentralandAssetName, isDecentralandMetaverseRegistry, secondsToDuration } from 'utils';

export const parseRents = async (asset: any): Promise<AssetEntity[]> => {
  const parsedAssets: AssetEntity[] = asset.rents.map((item: any) => item?.asset);
  const uniqueAsset = [...new Map(parsedAssets.map((item: AssetEntity) => [item['id'], item])).values()];

  for (const asset of uniqueAsset) {
    asset.name = await getAssetName(asset);
  }

  return uniqueAsset;
};

export const parseNotifications = (
  rented: Array<AssetEntity>,
  listed: Array<AssetEntity>,
  account: string
): NotificationList[] => {
  const result: NotificationList[] = [];
  const allAssets = [...rented, ...listed];

  allAssets.forEach(async (item) => {
    const isLitedProperty = item.owner.id.toLowerCase() == account.toLowerCase();
    item.rents?.forEach((rent) => {
      const isYourRent = rent.renter.id.toLowerCase() == account.toLowerCase();
      const rentStart = toTimestamp(+rent.start);
      const rentEnd = toTimestamp(+rent.end);

      //TODO: need to be optimised
      if (isLitedProperty) {
        if (rentStart <= Date.now()) {
          result.push({
            id: result.length,
            name: item.name,
            time: rentStart,
            type: 'newRenting',
            landId: item.id,
          });
        }
        if (rentEnd <= Date.now()) {
          result.push({
            id: result.length,
            name: item.name,
            time: rentEnd,
            type: 'rentEnded',
            landId: item.id,
          });
        }
      } else {
        const halfTime = +rent.start + (+rent.end - +rent.start) / 2;

        if (toTimestamp(halfTime) <= Date.now() && isYourRent) {
          result.push({
            id: result.length,
            name: item.name,
            time: toTimestamp(halfTime),
            countdown: countdown(+rent.end - halfTime),
            type: 'endSoon',
            landId: item.id,
          });
        }
        if (rentEnd <= Date.now() && isYourRent) {
          result.push({
            id: result.length,
            name: item.name,
            time: rentEnd,
            type: 'yourRentEnded',
            landId: item.id,
          });
        }
      }
    });
  });
  return result.sort((a: any, b: any) => b.time - a.time);
};

const toTimestamp = (unix: number): number => unix * 1000;

const getAssetName = async (asset: any) => {
  if (isDecentralandMetaverseRegistry(asset?.metaverseRegistry?.id)) {
    return getDecentralandAssetName(asset.decentralandData);
  } else {
    const data = await getCryptoVoxelsAsset(asset.metaverseAssetId);
    return data?.name;
  }
};

export const countdown = (date: number, isShorted = false) => {
  const time = secondsToDuration(date);
  const sec = Math.floor(+date.toFixed(2));

  const isPositive = (t: number) => Math.sign(Math.floor(t));

  const days = isPositive(time.days) ? `${Math.floor(time.days)} ${isShorted ? 'd' : 'days'}` : '';
  const hours = isPositive(time.hours) ? `${Math.floor(time.hours)} ${isShorted ? 'h' : 'hours'}` : '';
  const minutes = isPositive(time.minutes) ? `${Math.floor(time.minutes)} min` : '';
  const seconds = sec >= 0 ? `${sec} ${isShorted ? 's' : 'seconds'}` : '';
  const expired = days || hours || minutes || seconds;
  return expired;
};
