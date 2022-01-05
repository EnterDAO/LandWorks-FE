import React, { FC, createContext, useContext, useEffect, useMemo } from 'react';
import ContractListener from 'web3/components/contract-listener';
import Web3Contract from 'web3/web3Contract';

import config from 'config';
import { useReload } from 'hooks/useReload';
import { useWallet } from 'wallets/wallet';

import EstateRegistryContract from '../../../contracts/decentraland/estate/EstateRegistryContract';

export type EstateRegistryType = {
  estateRegistryContract?: EstateRegistryContract;
};

const EstateRegistryContext = createContext<EstateRegistryType>({
  estateRegistryContract: undefined,
});

export function useEstateRegistry(): EstateRegistryType {
  return useContext(EstateRegistryContext);
}

const EstateRegistryProvider: FC = props => {
  const { children } = props;

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
  };

  return (
    <EstateRegistryContext.Provider value={value}>
      {children}
      <ContractListener contract={estateRegistryContract} />
    </EstateRegistryContext.Provider>
  );
};

export default EstateRegistryProvider;
