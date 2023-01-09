import { useCallback } from 'react';
import useSWR from 'swr';

import { BaseNFT, DecentralandNFT } from 'modules/interface';
import { useContractRegistry } from 'modules/land-works/providers/contract-provider';

const initialData: BaseNFT[] = [];

const useGetAccountNonListedAssetsQuery = (account: string, metaverse: string | number) => {
  const { landRegistryContract, estateRegistryContract, cryptoVoxelsContract } = useContractRegistry();

  const fetchAssets = useCallback(
    async (account: string, metaverse: number): Promise<BaseNFT[]> => {
      if (!account || !metaverse) {
        return [];
      }

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
    [landRegistryContract, estateRegistryContract, cryptoVoxelsContract]
  );

  const {
    data,
    error,
    mutate: refetch,
  } = useSWR(account ? [account, metaverse] : null, fetchAssets, { refreshInterval: 5000 });

  const isLoading = !data && !error;

  return {
    data: data || initialData,
    isLoading,
    refetch,
  };
};

export default useGetAccountNonListedAssetsQuery;
