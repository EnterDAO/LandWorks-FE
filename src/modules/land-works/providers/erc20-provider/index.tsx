/* eslint-disable @typescript-eslint/no-empty-function */
import React, { FC, createContext, useContext, useEffect, useMemo, useState } from 'react';
import ContractListener from 'web3/components/contract-listener';
import Web3Contract from 'web3/web3Contract';

import config from 'config';
import { useReload } from 'hooks/useReload';
import { useWallet } from 'wallets/wallet';

import Erc20Contract from '../../../../web3/erc20Contract';

export type ERC20Type = {
  erc20Contract?: Erc20Contract;
  erc20TxInProgress: boolean;
  setErc20TxInProgress: React.Dispatch<React.SetStateAction<boolean>>;
  erc20TxHash: string;
  setErc20TxHash: React.Dispatch<React.SetStateAction<string>>;
};

export const Erc20Context = createContext<ERC20Type>({
  erc20Contract: undefined,
  erc20TxInProgress: false,
  setErc20TxInProgress: () => {},
  erc20TxHash: '',
  setErc20TxHash: () => {},
});

export function useErc20(): ERC20Type {
  return useContext(Erc20Context);
}

const ERC20Provider: FC = (props) => {
  const { children } = props;

  const walletCtx = useWallet();
  const [reload] = useReload();
  const [erc20TxInProgress, setErc20TxInProgress] = useState(false);
  const [erc20TxHash, setErc20TxHash] = useState('');

  const erc20Contract = useMemo(() => {
    const erc20 = new Erc20Contract([], config.tokens.usdc);
    erc20.on(Web3Contract.UPDATE_DATA, reload);
    return erc20;
  }, []);

  useEffect(() => {
    erc20Contract.setProvider(walletCtx.provider);
    console.log(erc20Contract);
  }, [walletCtx.provider]);

  useEffect(() => {
    erc20Contract.setAccount(walletCtx.account);
    erc20Contract.loadBalance();
    erc20Contract.loadAllowance(config.contracts.landworksContract);
  }, [walletCtx.account]);

  const value: ERC20Type = {
    erc20Contract,
    erc20TxInProgress,
    setErc20TxInProgress,
    erc20TxHash,
    setErc20TxHash,
  };

  return (
    <Erc20Context.Provider value={value}>
      {children}
      <ContractListener
        contract={erc20Contract}
        setLandworksTxInProgress={setErc20TxInProgress}
        setTxHash={setErc20TxHash}
      />
    </Erc20Context.Provider>
  );
};

export default ERC20Provider;
