import { BaseNFT } from 'modules/interface';
import { AssetEntity } from 'modules/land-works/api';

import useGetAccountAssetsQuery from './useGetAccountAssetsQuery';
import useGetAccountNonListedAssetsQuery from './useGetAccountNotListedAssets';

export interface UserAssets {
  listed: AssetEntity[];
  rented: AssetEntity[];
  notListed: BaseNFT[];
  unclaimed: AssetEntity[];
}

const useGetAllAccountAssetsQuery = (account: string, metaverse: number): { data: UserAssets; isLoading: boolean } => {
  const { data: accountAssets, isLoading: areAssetsLoading } = useGetAccountAssetsQuery(account, metaverse);
  const { data: notListedAssets, isLoading: areNotListedAssetsLoading } = useGetAccountNonListedAssetsQuery(
    account,
    metaverse
  );

  const isLoading = areNotListedAssetsLoading || areAssetsLoading;

  return {
    data: {
      ...accountAssets,
      notListed: notListedAssets,
    },
    isLoading,
  };
};

export default useGetAllAccountAssetsQuery;
