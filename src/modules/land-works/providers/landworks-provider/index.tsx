import React, { FC, createContext, useContext, useEffect, useMemo } from 'react';
import ContractListener from 'web3/components/contract-listener';
import Web3Contract from 'web3/web3Contract';

import config from 'config';
import { useReload } from 'hooks/useReload';
import { useWallet } from 'wallets/wallet';

import { getNftMeta, getNftMetaType } from '../../api';
import MetapassErc721Contract from '../../contracts/MetapassErc721Contract';
import LandWorksContract from '../../contracts/core/LandWorksContract';

export type LandworksType = {
  landWorksContract?: LandWorksContract;
};

const LandWorksContext = createContext<LandworksType>({
  landWorksContract: undefined,
});

export function useLandworks(): LandworksType {
  return useContext(LandWorksContext);
}

const LandWorksProvider: FC = props => {
  const { children } = props;

  const walletCtx = useWallet();
  const [reload] = useReload();

  const landWorksContract = useMemo(() => {
    const landworks = new LandWorksContract([], config.contracts.landworksContract);
    landworks.on(Web3Contract.UPDATE_DATA, reload);
    return landworks;
  }, []);

  useEffect(() => {
    landWorksContract.setProvider(walletCtx.provider);
    console.log(landWorksContract);
  }, [walletCtx.provider]);

  useEffect(() => {
    landWorksContract.setAccount(walletCtx.account);
  }, [walletCtx.account]);

  const value: LandworksType = {
    landWorksContract
  };

  return (
    <LandWorksContext.Provider value={value}>
      {children}
      <ContractListener contract={landWorksContract} />
    </LandWorksContext.Provider>
  );
};

export default LandWorksProvider;
