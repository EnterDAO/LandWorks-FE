import { useCallback, useEffect, useState } from 'react';
import { useSubscription } from '@apollo/client';

import { AssetEntity, USER_SUBSCRIPTION, UserEntity, parseUser } from 'modules/land-works/api';

interface UserAssets {
  rented: AssetEntity[];
  listed: AssetEntity[];
  unclaimed: AssetEntity[];
}

const initialUserAssets: UserAssets = {
  rented: [],
  listed: [],
  unclaimed: [],
};

const useGetAccountAssetsQuery = (
  account: string,
  metaverse: string
): {
  isLoading: boolean;
  data: UserAssets;
} => {
  const { data: rawUserData } = useSubscription<{ user: UserEntity }>(USER_SUBSCRIPTION, {
    skip: !account,
    variables: {
      id: account.toLowerCase(),
      metaverse: metaverse,
    },
  });

  const [data, setData] = useState<UserAssets>();
  const [error, setError] = useState();

  const getUserAssets = useCallback(async (user: any): Promise<UserAssets> => {
    const {
      rents: rented = [],
      ownerAndConsumerAssets: listed = [],
      unclaimedRentAssets: unclaimed = [],
    } = await parseUser(user);

    return {
      rented,
      listed,
      unclaimed,
    };
  }, []);

  useEffect(() => {
    if (!rawUserData?.user) {
      return;
    }

    getUserAssets(rawUserData.user)
      .then((assets) => {
        setData(assets);
        setError(undefined);
      })
      .catch(setError);
  }, [rawUserData]);

  const isLoading = !data && !error;

  return {
    data: data || initialUserAssets,
    isLoading,
  };
};

export default useGetAccountAssetsQuery;
