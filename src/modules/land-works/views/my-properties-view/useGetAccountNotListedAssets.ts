import { useCallback, useLayoutEffect, useState } from 'react';

import { BaseNFT, DecentralandNFT } from 'modules/interface';
import { METAVERSES } from 'modules/land-works/data/metaverses';
import { useContractRegistry } from 'modules/land-works/providers/contract-provider';

const useGetAccountNonListedAssetsQuery = (
  account: string,
  metaverse: string
): { data: BaseNFT[]; isLoading: boolean } => {
  const registry = useContractRegistry();
  const [data, setData] = useState<BaseNFT[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // TODO: move logic in hook
  const fetchAssets = useCallback(async (): Promise<BaseNFT[]> => {
    if (!account || !metaverse) {
      return [];
    }

    const { landRegistryContract, estateRegistryContract, cryptoVoxelsContract } = registry;

    if (metaverse === METAVERSES.Decentraland) {
      const lands = (await landRegistryContract?.getUserData(account)) || [];
      const estates =
        (await estateRegistryContract?.getUserData(account)).filter((e: DecentralandNFT) => e.size > 0) || [];

      return [...lands, ...estates];
    } else if (metaverse === METAVERSES.Voxels) {
      const cryptoVoxels = await cryptoVoxelsContract?.getUserData(account);

      return cryptoVoxels || [];
    }

    return [];
  }, [registry, account, metaverse]);

  useLayoutEffect(() => {
    let isCancelled = false;

    setIsLoading(true);

    fetchAssets()
      .then((data) => {
        if (!isCancelled) {
          setData(data);
        }
      })
      .catch(console.error)
      .finally(() => {
        if (!isCancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [fetchAssets]);

  return {
    data,
    isLoading,
  };
};

export default useGetAccountNonListedAssetsQuery;
