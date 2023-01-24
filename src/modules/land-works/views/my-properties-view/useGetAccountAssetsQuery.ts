import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
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
  metaverse: string | number
): {
  isLoading: boolean;
  data: UserAssets;
} => {
  const { data: rawUserData } = useSubscription<{ user: UserEntity }>(USER_SUBSCRIPTION, {
    skip: !account,
    variables: {
      id: account.toLowerCase(),
      metaverse: metaverse.toString(),
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

  useLayoutEffect(() => {
    setData(undefined);
  }, [account, metaverse]);

  useEffect(() => {
    if (!rawUserData) {
      return;
    }

    if (rawUserData.user) {
      let isCancelled = false;

      getUserAssets(rawUserData.user)
        .then((assets) => {
          if (!isCancelled) {
            setData(assets || initialUserAssets);
            setError(undefined);
          }
        })
        .catch((e) => {
          if (!isCancelled) {
            setError(e);
          }
        });

      return () => {
        isCancelled = true;
      };
    } else {
      setData(initialUserAssets);
    }
  }, [rawUserData]);

  const isLoading = !data && !error;

  return {
    data: data || initialUserAssets,
    isLoading,
  };
};

export default useGetAccountAssetsQuery;
