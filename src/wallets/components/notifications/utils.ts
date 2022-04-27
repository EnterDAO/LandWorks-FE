import { AssetEntity, RentEntity, parseAsset } from 'modules/land-works/api';

import { NotificationList } from './notificationTypes';

export const parseRents = async (asset: any): Promise<RentEntity[]> => {
  const parsedAssets: RentEntity[] = asset.rents.map((item: any) => item?.asset);
  const uniqueAsset = [...new Map(parsedAssets.map((item: RentEntity) => [item['id'], item])).values()];

  // const result = [] as AssetEntity[];

  // for (const asset of uniqueAsset) {
  //   result.push(await parseAsset(asset));
  // }

  return uniqueAsset;
};

export const parseNotifications = (
  rented: Array<RentEntity> | unknown[],
  listed: AssetEntity[],
  account: string
): NotificationList[] => {
  const lastLogin = localStorage.getItem('user_profile');
  const loginDate = lastLogin ? +lastLogin : 0;
  const result: NotificationList[] = [];

  listed.forEach((item) => {
    item.rents?.forEach((rent) => {
      if (+rent.start <= Date.now()) {
        result.push({
          id: result.length,
          name: item.name,
          time: +rent.start * 1000,
          type: 'newRenting',
          landId: item.id,
        });
      }
      if (+rent.end <= Date.now()) {
        result.push({
          id: result.length,
          name: item.name,
          time: +rent.end * 1000,
          type: 'rentEnded',
          landId: item.id,
        });
      }
    });
  });

  return result.sort((a: any, b: any) => b.time - a.time);
};
