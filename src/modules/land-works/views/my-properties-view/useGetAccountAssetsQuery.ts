import { useCallback } from 'react';
import { useSubscription } from '@apollo/client';
import useSWR from 'swr';

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
  const { data: rawUserData, loading } = useSubscription<{ user: UserEntity }>(USER_SUBSCRIPTION, {
    skip: !account,
    variables: {
      id: account.toLowerCase(),
      metaverse: metaverse.toString(),
    },
  });

  const getUserAssets = useCallback(async (user?: any): Promise<UserAssets> => {
    if (!user) {
      return initialUserAssets;
    }

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

  const { data: userAssets = initialUserAssets } = useSWR<UserAssets>(
    rawUserData?.user ? [rawUserData.user, 'user'] : null,
    getUserAssets
  );

  const isLoading = (loading && !rawUserData) || userAssets === undefined;

  return {
    data: userAssets,
    isLoading,
  };
};

export default useGetAccountAssetsQuery;
