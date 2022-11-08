import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSubscription } from '@apollo/client';

import { AssetEntity, USER_SUBSCRIPTION, UserEntity, parseUser } from 'modules/land-works/api';
import { useContractRegistry } from 'modules/land-works/providers/contract-provider';

const initialUser: UserEntity = {
  id: '',
  hasUnclaimedRent: false,
  assets: [],
  consumerTo: [],
  rents: [],
  unclaimedRentAssets: [],
  ownerAndConsumerAssets: [],
};

const useGetAccountNonListedAssetsQuery = (account: string, metaverse: string | number) => {
  const registry = useContractRegistry();

  const fetchAssets = useCallback(async () => {
    if (!account) {
      return;
    }

    const { landRegistryContract, estateRegistryContract, cryptoVoxelsContract } = registry;

    const lands = await registry.landRegistryContract?.getUserData(account);
    const estates = (await registry.estateRegistryContract?.getUserData(account)).filter((e: any) => e.size > 0);
    const cryptoVoxels = await cryptoVoxelsContract?.getUserData(account);

    console.log('account non listed', lands, estates, cryptoVoxels);
  }, [registry, account]);

  useEffect(() => {
    fetchAssets().then(console.log).catch(console.log);
  }, [fetchAssets]);
};

const useGetAccountAssetsQuery = (account: string, metaverse: string | number) => {
  const [user, setUser] = useState<UserEntity | null>(null);

  const { data: rawUserData, loading } = useSubscription<{ user: UserEntity }>(USER_SUBSCRIPTION, {
    skip: !account,
    variables: {
      id: account.toLowerCase(),
      metaverse: `${metaverse}`,
    },
  });

  const isParseUserLoadingRef = useRef(loading);
  const isLoading = !!account && (loading || isParseUserLoadingRef.current);

  useGetAccountNonListedAssetsQuery(account, metaverse);

  useEffect(() => {
    if (loading) {
      isParseUserLoadingRef.current = true;
    }
  }, [loading]);

  useEffect(() => {
    if (!account) {
      setUser(initialUser);
    }
  }, [account]);

  useEffect(() => {
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

            isParseUserLoadingRef.current = false;
          }
        })
        .catch((e) => {
          console.error(e);
          if (!isCancelled) {
            setUser(initialUser);

            isParseUserLoadingRef.current = false;
          }
        });
    } else {
      setUser(initialUser);
      isParseUserLoadingRef.current = false;
    }

    return () => {
      isCancelled = true;
    };
  }, [rawUserData]);

  const assets: {
    rented: AssetEntity[];
    listed: AssetEntity[];
    notListed: AssetEntity[];
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
