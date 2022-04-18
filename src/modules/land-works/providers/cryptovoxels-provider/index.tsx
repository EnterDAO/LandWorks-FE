/* eslint-disable @typescript-eslint/no-empty-function */
import React, { FC, createContext, useContext, useEffect, useMemo, useState } from 'react';
import ContractListener from 'web3/components/contract-listener';
import Web3Contract from 'web3/web3Contract';

import config from 'config';
import { useReload } from 'hooks/useReload';
import { useWallet } from 'wallets/wallet';

import CryptoVoxelsContract from '../../contracts/cryptovoxels/CryptoVoxelsContract';

export type CryptoVoxelsType = {
  cryptoVoxelsContract?: CryptoVoxelsContract;
  setCryptoVoxelsTxInProgress: React.Dispatch<React.SetStateAction<boolean>>;
  cryptoVoxelsTxInProgress: boolean;
  cryptoVoxelsTxHash: string;
  setCryptoVoxelsTxHash: React.Dispatch<React.SetStateAction<string>>;
};

const CryptoVoxelsContext = createContext<CryptoVoxelsType>({
  cryptoVoxelsContract: undefined,
  cryptoVoxelsTxInProgress: false,
  setCryptoVoxelsTxInProgress: () => {},
  cryptoVoxelsTxHash: '',
  setCryptoVoxelsTxHash: () => {},
});

export function useCryptoVoxels(): CryptoVoxelsType {
  return useContext(CryptoVoxelsContext);
}

const CryptoVoxelsProvider: FC = (props) => {
  const { children } = props;
  const [cryptoVoxelsTxInProgress, setCryptoVoxelsTxInProgress] = useState(false);
  const [cryptoVoxelsTxHash, setCryptoVoxelsTxHash] = useState('');
  const walletCtx = useWallet();
  const [reload] = useReload();

  const cryptoVoxelsContract = useMemo(() => {
    const cryptoVoxels = new CryptoVoxelsContract([], config.contracts.cryptoVoxelsContract);
    cryptoVoxels.on(Web3Contract.UPDATE_DATA, reload);
    return cryptoVoxels;
  }, []);

  useEffect(() => {
    cryptoVoxelsContract.setProvider(walletCtx.provider);
    console.log(cryptoVoxelsContract);
  }, [walletCtx.provider]);

  useEffect(() => {
    cryptoVoxelsContract.setAccount(walletCtx.account);
  }, [walletCtx.account]);

  const value: CryptoVoxelsType = {
    cryptoVoxelsContract,
    cryptoVoxelsTxInProgress,
    setCryptoVoxelsTxInProgress,
    cryptoVoxelsTxHash,
    setCryptoVoxelsTxHash,
  };

  return (
    <CryptoVoxelsContext.Provider value={value}>
      {children}
      <ContractListener
        contract={cryptoVoxelsContract}
        setLandworksTxInProgress={setCryptoVoxelsTxInProgress}
        setTxHash={setCryptoVoxelsTxHash}
      />
    </CryptoVoxelsContext.Provider>
  );
};

export default CryptoVoxelsProvider;
