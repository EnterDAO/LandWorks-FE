/* eslint-disable @typescript-eslint/no-empty-function */
import React, { FC, createContext, useContext, useEffect, useMemo, useState } from 'react';
import ContractListener from 'web3/components/contract-listener';
import Web3Contract from 'web3/web3Contract';

import config from 'config';
import { useReload } from 'hooks/useReload';
import { useWallet } from 'wallets/wallet';

import EstateRegistryContract from '../../../contracts/decentraland/estate/EstateRegistryContract';

export type EstateRegistryType = {
  estateRegistryContract?: EstateRegistryContract;
  setEstateTxInProgress: React.Dispatch<React.SetStateAction<boolean>>;
  estateTxInProgress: boolean;
  estateTxHash: string;
  setEstateTxHash: React.Dispatch<React.SetStateAction<string>>;
};

const EstateRegistryContext = createContext<EstateRegistryType>({
  estateRegistryContract: undefined,
  setEstateTxInProgress: () => {},
  estateTxInProgress: false,
  estateTxHash: '',
  setEstateTxHash: () => {},
});

export function useEstateRegistry(): EstateRegistryType {
  return useContext(EstateRegistryContext);
}

const EstateRegistryProvider: FC = (props) => {
  const { children } = props;
  const [estateTxInProgress, setEstateTxInProgress] = useState(false);
  const [estateTxHash, setEstateTxHash] = useState('');
  const walletCtx = useWallet();
  const [reload] = useReload();

  const estateRegistryContract = useMemo(() => {
    const estateRegistry = new EstateRegistryContract([], config.contracts.decentraland.estateRegistry);
    estateRegistry.on(Web3Contract.UPDATE_DATA, reload);
    return estateRegistry;
  }, []);

  useEffect(() => {
    estateRegistryContract.setProvider(walletCtx.provider);
    console.log(estateRegistryContract);
  }, [walletCtx.provider]);

  useEffect(() => {
    estateRegistryContract.setAccount(walletCtx.account);
  }, [walletCtx.account]);

  const value: EstateRegistryType = {
    estateRegistryContract,
    estateTxInProgress,
    setEstateTxInProgress,
    estateTxHash,
    setEstateTxHash,
  };

  return (
    <EstateRegistryContext.Provider value={value}>
      {children}
      <ContractListener
        contract={estateRegistryContract}
        setLandworksTxInProgress={setEstateTxInProgress}
        setTxHash={setEstateTxHash}
      />
    </EstateRegistryContext.Provider>
  );
};

export default EstateRegistryProvider;
