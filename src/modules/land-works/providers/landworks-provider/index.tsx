/* eslint-disable @typescript-eslint/no-empty-function */
import React, { FC, createContext, useContext, useEffect, useMemo, useState } from 'react';
import ContractListener from 'web3/components/contract-listener';
import Web3Contract from 'web3/web3Contract';

import config from 'config';
import { useReload } from 'hooks/useReload';
import { useWallet } from 'wallets/wallet';

import LandWorksContract from '../../contracts/core/LandWorksContract';

export type LandworksType = {
  landWorksContract?: LandWorksContract;
  landworksTxInProgress: boolean;
  setLandworksTxInProgress: React.Dispatch<React.SetStateAction<boolean>>;
  landworksTxHash: string;
  setLandworksTxHash: React.Dispatch<React.SetStateAction<string>>;
};

export const LandWorksContext = createContext<LandworksType>({
  landWorksContract: undefined,
  landworksTxInProgress: false,
  setLandworksTxInProgress: () => {},
  landworksTxHash: '',
  setLandworksTxHash: () => {},
});

export function useLandworks(): LandworksType {
  return useContext(LandWorksContext);
}

const LandWorksProvider: FC = (props) => {
  const { children } = props;

  const walletCtx = useWallet();
  const [reload] = useReload();
  const [landworksTxInProgress, setLandworksTxInProgress] = useState(false);
  const [landworksTxHash, setLandworksTxHash] = useState('');

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
    landWorksContract,
    landworksTxInProgress,
    setLandworksTxInProgress,
    landworksTxHash,
    setLandworksTxHash,
  };

  return (
    <LandWorksContext.Provider value={value}>
      {children}
      <ContractListener
        contract={landWorksContract}
        setLandworksTxInProgress={setLandworksTxInProgress}
        setTxHash={setLandworksTxHash}
      />
    </LandWorksContext.Provider>
  );
};

export default LandWorksProvider;
