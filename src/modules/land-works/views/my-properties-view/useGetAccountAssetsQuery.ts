import { useLayoutEffect, useMemo, useState } from 'react';
import { useSubscription } from '@apollo/client';

import { AssetEntity, USER_SUBSCRIPTION, UserEntity, parseUser } from 'modules/land-works/api';

const initialUser: UserEntity = {
  id: '',
  hasUnclaimedRent: false,
  assets: [],
  consumerTo: [],
  rents: [],
  unclaimedRentAssets: [],
  ownerAndConsumerAssets: [],
};
const useGetAccountAssetsQuery = (
  account: string,
  metaverse: string | number
): {
  isLoading: boolean;
  data: {
    listed: AssetEntity[];
    rented: AssetEntity[];
  };
} => {
  const [user, setUser] = useState<UserEntity | null>(null);

  const { data: rawUserData, loading } = useSubscription<{ user: UserEntity }>(USER_SUBSCRIPTION, {
    skip: !account,
    variables: {
      id: account.toLowerCase(),
      metaverse: `${metaverse}`,
    },
  });

  const isLoading = (loading && !rawUserData) || !user;

  console.log({
    loading,
    rawUserData,
    user,
  });

  useLayoutEffect(() => {
    if (!account) {
      setUser(initialUser);
    }
  }, [account]);

  useLayoutEffect(() => {
    if (!rawUserData) {
      return;
    }

    let isCancelled = false;

    const { user } = rawUserData;

    if (user) {
      parseUser(user)
        .then((parsedUserData) => {
          if (!isCancelled) {
            setUser(parsedUserData);
          }
        })
        .catch((e) => {
          console.error(e);
          if (!isCancelled) {
            setUser(initialUser);
          }
        });
    } else {
      setUser(initialUser);
    }

    return () => {
      isCancelled = true;
    };
  }, [rawUserData]);

  const assets: {
    rented: AssetEntity[];
    listed: AssetEntity[];
  } = useMemo(() => {
    if (!user) {
      return {
        rented: [],
        listed: [],
        notListed: [],
      };
    }

    const { rents: rented = [], ownerAndConsumerAssets: listed = [] } = user;

    return {
      rented,
      listed,
      notListed: [] as AssetEntity[],
    };
  }, [user]);

  console.log(assets);

  return {
    data: assets,
    isLoading,
  };
};

export default useGetAccountAssetsQuery;
