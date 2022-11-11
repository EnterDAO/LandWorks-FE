/* eslint-disable @typescript-eslint/no-empty-function */
import React, { FC, createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import ContractListener from 'web3/components/contract-listener';
import Web3Contract from 'web3/web3Contract';

import config from 'config';
import { useReload } from 'hooks/useReload';
import { useWallet } from 'wallets/wallet';

import CryptoVoxelsContract from '../../contracts/cryptovoxels/CryptoVoxelsContract';
import EstateRegistryContract from '../../contracts/decentraland/estate/EstateRegistryContract';
import LANDRegistryContract from '../../contracts/decentraland/land/LANDRegistryContract';

export type ContextType = {
  cryptoVoxelsContract?: CryptoVoxelsContract;
  estateRegistryContract?: EstateRegistryContract;
  landRegistryContract?: LANDRegistryContract;
  setTxInProgress: React.Dispatch<React.SetStateAction<boolean>>;
  txInProgress: boolean;
  txHash: string;
  setTxHash: React.Dispatch<React.SetStateAction<string>>;
};

const ProviderContext = createContext<ContextType>({
  cryptoVoxelsContract: undefined,
  estateRegistryContract: undefined,
  landRegistryContract: undefined,
  txInProgress: false,
  setTxInProgress: () => {},
  txHash: '',
  setTxHash: () => {},
});

export function useContractRegistry(): ContextType {
  return useContext(ProviderContext);
}

const ContractProvider: FC = (props) => {
  const { children } = props;
  const [txInProgress, setTxInProgress] = useState(false);
  const [txHash, setTxHash] = useState('');
  const walletCtx = useWallet();
  const [reload] = useReload();

  const landRegistryContract = useMemo(() => {
    const landRegistry = new LANDRegistryContract([], config.contracts.decentraland.landRegistry);
    landRegistry.on(Web3Contract.UPDATE_DATA, reload);
    return landRegistry;
  }, []);

  const estateRegistryContract = useMemo(() => {
    const estateRegistry = new EstateRegistryContract([], config.contracts.decentraland.estateRegistry);
    estateRegistry.on(Web3Contract.UPDATE_DATA, reload);
    return estateRegistry;
  }, []);

  const cryptoVoxelsContract = useMemo(() => {
    const cryptoVoxels = new CryptoVoxelsContract([], config.contracts.cryptoVoxelsContract);
    cryptoVoxels.on(Web3Contract.UPDATE_DATA, reload);
    return cryptoVoxels;
  }, []);

  useEffect(() => {
    // set providers
    landRegistryContract.setProvider(walletCtx.provider);
    estateRegistryContract.setProvider(walletCtx.provider);
    cryptoVoxelsContract.setProvider(walletCtx.provider);
  }, [walletCtx.provider]);

  useEffect(() => {
    // set accounts
    landRegistryContract.setAccount(walletCtx.account);
    estateRegistryContract.setAccount(walletCtx.account);
    cryptoVoxelsContract.setAccount(walletCtx.account);
  }, [walletCtx.account]);

  const value: ContextType = useMemo(() => {
    return {
      landRegistryContract,
      estateRegistryContract,
      cryptoVoxelsContract,
      txInProgress,
      setTxInProgress,
      txHash,
      setTxHash,
    };
  }, [landRegistryContract, estateRegistryContract, cryptoVoxelsContract, txInProgress, txHash]);

  return (
    <ProviderContext.Provider value={value}>
      {children}
      <ContractListener
        contract={cryptoVoxelsContract}
        setLandworksTxInProgress={setTxInProgress}
        setTxHash={setTxHash}
      />
      <ContractListener
        contract={landRegistryContract}
        setLandworksTxInProgress={setTxInProgress}
        setTxHash={setTxHash}
      />
      <ContractListener
        contract={estateRegistryContract}
        setLandworksTxInProgress={setTxInProgress}
        setTxHash={setTxHash}
      />
    </ProviderContext.Provider>
  );
};

export default ContractProvider;
