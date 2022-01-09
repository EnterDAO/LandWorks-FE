/* eslint-disable @typescript-eslint/no-empty-function */
import React, { FC, createContext, useContext, useEffect, useMemo, useState } from 'react';
import ContractListener from 'web3/components/contract-listener';
import Web3Contract from 'web3/web3Contract';

import config from 'config';
import { useReload } from 'hooks/useReload';
import { useWallet } from 'wallets/wallet';

import LANDRegistryContract from '../../../contracts/decentraland/land/LANDRegistryContract';

export type LandRegistryType = {
  landRegistryContract?: LANDRegistryContract;
  setLandTxInProgress: React.Dispatch<React.SetStateAction<boolean>>;
  landTxInProgress: boolean;
  landTxHash: string;
  setLandTxHash: React.Dispatch<React.SetStateAction<string>>;
};

const LandRegistryContext = createContext<LandRegistryType>({
  landRegistryContract: undefined,
  landTxInProgress: false,
  setLandTxInProgress: () => {},
  landTxHash: '',
  setLandTxHash: () => {},
});

export function useLandRegistry(): LandRegistryType {
  return useContext(LandRegistryContext);
}

const LandRegistryProvider: FC = (props) => {
  const { children } = props;
  const [landTxInProgress, setLandTxInProgress] = useState(false);
  const [landTxHash, setLandTxHash] = useState('');
  const walletCtx = useWallet();
  const [reload] = useReload();

  const landRegistryContract = useMemo(() => {
    const landRegistry = new LANDRegistryContract([], config.contracts.decentraland.landRegistry);
    landRegistry.on(Web3Contract.UPDATE_DATA, reload);
    return landRegistry;
  }, []);

  useEffect(() => {
    landRegistryContract.setProvider(walletCtx.provider);
    console.log(landRegistryContract);
  }, [walletCtx.provider]);

  useEffect(() => {
    landRegistryContract.setAccount(walletCtx.account);
  }, [walletCtx.account]);

  const value: LandRegistryType = {
    landRegistryContract,
    landTxInProgress,
    setLandTxInProgress,
    landTxHash,
    setLandTxHash,
  };

  return (
    <LandRegistryContext.Provider value={value}>
      {children}
      <ContractListener
        contract={landRegistryContract}
        setLandworksTxInProgress={setLandTxInProgress}
        setTxHash={setLandTxHash}
      />
    </LandRegistryContext.Provider>
  );
};

export default LandRegistryProvider;
