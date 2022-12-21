import { useCallback } from 'react';
import useSWR from 'swr';

import { BaseNFT, DecentralandNFT } from 'modules/interface';
import { useContractRegistry } from 'modules/land-works/providers/contract-provider';

const initialData: BaseNFT[] = [];

const useGetAccountNonListedAssetsQuery = (
  account: string,
  metaverse: string | number
): { data: BaseNFT[]; isLoading: boolean } => {
  const registry = useContractRegistry();

  const fetchAssets = useCallback(
    async (account: string, metaverse: number): Promise<BaseNFT[]> => {
      if (!account || !metaverse) {
        return [];
      }

      const { landRegistryContract, estateRegistryContract, cryptoVoxelsContract } = registry;

      if (metaverse == 1) {
        const lands = await landRegistryContract?.getUserData(account);
        const estates = (await estateRegistryContract?.getUserData(account)).filter((e: DecentralandNFT) => e.size > 0);

        return [...(lands || []), ...(estates || [])];
      } else if (metaverse == 2) {
        const cryptoVoxels = await cryptoVoxelsContract?.getUserData(account);

        return cryptoVoxels || [];
      }

      return [];
    },
    [registry, account, metaverse]
  );

  const { data } = useSWR(account ? [account, metaverse] : null, fetchAssets);

  return {
    data: data || initialData,
    isLoading: data === undefined,
  };
};

export default useGetAccountNonListedAssetsQuery;
