import { getCryptoVoxelsAsset } from 'helpers/helpers';
import { AssetEntity, RentEntity, getAvailability } from 'modules/land-works/api';

import { NotificationList } from './notificationTypes';

import { getDecentralandAssetName, isDecentralandMetaverseRegistry, secondsToDuration } from 'utils';

export const parseRents = async (asset: any): Promise<AssetEntity[]> => {
  const parsedAssets: AssetEntity[] = asset.rents.map((item: RentEntity) => item?.asset);
  const uniqueAsset = [...new Map(parsedAssets.map((item: AssetEntity) => [item['id'], item])).values()];

  for (const asset of uniqueAsset) {
    asset.name = await getAssetName(asset);
    asset.availability = getAvailability(asset);
  }

  return uniqueAsset;
};

export const parseNotifications = async (
  rented: Array<AssetEntity>,
  listed: Array<AssetEntity>,
  account: string
): Promise<NotificationList[]> => {
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
            isAvailable: item.isAvailable || item.availability.isCurrentlyAvailable,
          });
        }
        if (rentEnd <= Date.now()) {
          result.push({
            id: result.length,
            name: item.name,
            time: rentEnd,
            type: 'rentEnded',
            landId: item.id,
            isAvailable: item.isAvailable || item.availability.isCurrentlyAvailable,
          });
        }
      } else {
        const halfTime = +rent.start + (+rent.end - +rent.start) / 2;

        if (toTimestamp(halfTime) <= Date.now() && isYourRent) {
          result.push({
            id: result.length,
            name: item.name,
            time: toTimestamp(halfTime),
            type: 'endSoon',
            landId: item.id,
            isAvailable: item.isAvailable || item.availability.isCurrentlyAvailable,
          });
        }
        if (rentEnd <= Date.now() && isYourRent) {
          result.push({
            id: result.length,
            name: item.name,
            time: rentEnd,
            type: 'yourRentEnded',
            landId: item.id,
            isAvailable: item.isAvailable || item.availability.isCurrentlyAvailable,
          });
        }
      }
    });
  });
  const blockscanMessage = await fetchBlockscanMessages(account);
  result.concat(blockscanMessage);
  return result.concat(blockscanMessage).sort((a, b) => b.time - a.time);
};

const toTimestamp = (unix: number): number => unix * 1000;

const getAssetName = async (asset: AssetEntity) => {
  if (asset?.metaverseRegistry?.id && isDecentralandMetaverseRegistry(asset?.metaverseRegistry?.id)) {
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

export const fetchBlockscanMessages = async (wallet: string): Promise<Array<any>> => {
  const userList = JSON.parse(localStorage.getItem('user_profile') || '');
  const userProfile = userList[wallet];
  const blockscanUrl = 'https://scenes.landworks.xyz/messages/';
  const blockscanResponse = await fetch(blockscanUrl + wallet)
    .then((res) => res.json())
    .catch(() => console.error('Fetch Blockscan message error'));
  const messageCountInStorage = +userProfile?.totalMesages || 0;
  const newMessage = {
    id: Date.now(),
    time: Date.now(),
    type: 'message',
  };

  if (!messageCountInStorage && +blockscanResponse?.result) {
    userProfile.messages = [newMessage];
    updateProfile();
  } else if (messageCountInStorage < blockscanResponse?.result) {
    userProfile.messages.push(newMessage);
    updateProfile();
  }
  function updateProfile() {
    userProfile.totalMesages = blockscanResponse?.result;
    localStorage.setItem('user_profile', JSON.stringify({ ...userList, [wallet]: userProfile }));
  }

  return userProfile?.messages || [];
};
