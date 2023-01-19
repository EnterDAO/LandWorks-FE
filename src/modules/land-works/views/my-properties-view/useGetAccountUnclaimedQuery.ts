import { useLayoutEffect, useMemo, useState } from 'react';
import { useSubscription } from '@apollo/client';

import { AssetEntity, USER_CLAIM_SUBSCRIPTION, UserEntity, parseUser } from 'modules/land-works/api';

const initialUser: UserEntity = {
  id: '',
  hasUnclaimedRent: false,
  assets: [],
  consumerTo: [],
  rents: [],
  unclaimedRentAssets: [],
  ownerAndConsumerAssets: [],
};

const useGetAccountUnclaimedAssetsQuery = (
  account: string
): {
  isLoading: boolean;
  data: {
    unclaimed: AssetEntity[];
  };
} => {
  const [user, setUser] = useState<UserEntity | null>(null);

  const { data: rawUserData, loading } = useSubscription<{ user: UserEntity }>(USER_CLAIM_SUBSCRIPTION, {
    skip: !account,
    variables: {
      id: account.toLowerCase(),
    },
  });

  const isLoading = (loading && !rawUserData) || !user;

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
    unclaimed: AssetEntity[];
  } = useMemo(() => {
    if (!user) {
      return {
        unclaimed: [],
      };
    }

    const { unclaimedRentAssets: unclaimed = [] } = user;

    return {
      unclaimed,
    };
  }, [user]);

  return {
    data: assets,
    isLoading,
  };
};

export default useGetAccountUnclaimedAssetsQuery;
