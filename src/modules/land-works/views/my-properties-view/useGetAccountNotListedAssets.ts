import { useCallback } from 'react';
import useSWR from 'swr';

import { BaseNFT, DecentralandNFT } from 'modules/interface';
import { METAVERSES } from 'modules/land-works/data/metaverses';
import { useContractRegistry } from 'modules/land-works/providers/contract-provider';

const initialData: BaseNFT[] = [];

const useGetAccountNonListedAssetsQuery = (account: string, metaverse: string) => {
  const { landRegistryContract, estateRegistryContract, cryptoVoxelsContract } = useContractRegistry();

  const fetchAssets = useCallback(
    async (account: string, metaverse: string): Promise<BaseNFT[]> => {
      if (!account || !metaverse) {
        return [];
      }

      if (metaverse === METAVERSES.Decentraland) {
        const lands = await landRegistryContract?.getUserData(account);
        const estates = (await estateRegistryContract?.getUserData(account)).filter((e: DecentralandNFT) => e.size > 0);

        return [...(lands || []), ...(estates || [])];
      } else if (metaverse === METAVERSES.Voxels) {
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
