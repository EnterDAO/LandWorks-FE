/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { useSessionStorage } from 'react-use-storage';
import { Web3Provider } from '@ethersproject/providers';
import { UnsupportedChainIdError, Web3ReactProvider, useWeb3React } from '@web3-react/core';
import { NoEthereumProviderError } from '@web3-react/injected-connector';
import * as Antd from 'antd';

import config from 'config';
import { Loader } from 'design-system';
import { getNetworkName } from 'providers/eth-web3-provider';
import ConnectWalletModal from 'wallets/components/connect-wallet-modal';
import InstallMetaMaskModal from 'wallets/components/install-metamask-modal';
import UnsupportedChainModal from 'wallets/components/unsupported-chain-modal';
import CoinbaseWalletConfig from 'wallets/connectors/coinbase';
import LedgerWalletConfig from 'wallets/connectors/ledger';
import MetaMaskWalletConfig from 'wallets/connectors/metamask';
import PortisWalletConfig from 'wallets/connectors/portis';
import TrezorWalletConfig from 'wallets/connectors/trezor';
import WalletConnectConfig from 'wallets/connectors/wallet-connect';

import { WalletConnector } from 'wallets/types';

export const WalletConnectors: WalletConnector[] = [
  MetaMaskWalletConfig,
  LedgerWalletConfig,
  PortisWalletConfig,
  TrezorWalletConfig,
  CoinbaseWalletConfig,
  WalletConnectConfig,
];

type WalletData = {
  initialized: boolean;
  connecting?: WalletConnector;
  disconnecting?: boolean;
  isActive: boolean;
  account?: string;
  networkId?: number;
  networkName?: string;
  connector?: WalletConnector;
  provider?: any;
};

export type Wallet = WalletData & {
  showWalletsModal: () => void;
  connect: (connector: WalletConnector, args?: Record<string, any>) => Promise<void>;
  disconnect: () => void;
};

const WalletContext = React.createContext<Wallet>({
  initialized: false,
  connecting: undefined,
  disconnecting: undefined,
  isActive: false,
  account: undefined,
  networkId: undefined,
  networkName: undefined,
  connector: undefined,
  provider: undefined,
  showWalletsModal: () => undefined,
  connect: () => Promise.reject(),
  disconnect: () => undefined,
});

export function useWallet(): Wallet {
  return React.useContext(WalletContext);
}

const WalletProvider: React.FC = (props) => {
  const web3React = useWeb3React();

  const [sessionProvider, setSessionProvider, removeSessionProvider] = useSessionStorage<string | undefined>(
    'wallet_provider'
  );

  const [initialized, setInitialized] = React.useState<boolean>(false);
  const [connecting, setConnecting] = React.useState<WalletConnector | undefined>(undefined);
  const [disconnecting, setDisconnecting] = React.useState<boolean | undefined>(undefined);
  const connectingRef = React.useRef<WalletConnector | undefined>(connecting);
  connectingRef.current = connecting;
  const [activeConnector, setActiveConnector] = React.useState<WalletConnector | undefined>();
  const [activeProvider, setActiveProvider] = React.useState<any | undefined>();

  const [walletsModal, setWalletsModal] = React.useState<boolean>(false);
  const [unsupportedChainModal, setUnsupportedChainModal] = React.useState<boolean>(false);
  const [installMetaMaskModal, setInstallMetaMaskModal] = React.useState<boolean>(false);

  const disconnect = React.useCallback(() => {
    setDisconnecting(true);
    web3React.deactivate();
    activeConnector?.onDisconnect?.(web3React.connector);
    setConnecting(undefined);
    setActiveConnector(undefined);
    setActiveProvider(undefined);
    removeSessionProvider();
    localStorage.removeItem('disclaimerShown');
    setTimeout(() => setDisconnecting(undefined), 0);
  }, [web3React, activeConnector, removeSessionProvider, setConnecting]);

  const connect = React.useCallback(
    async (walletConnector: WalletConnector, args?: Record<string, any>): Promise<void> => {
      if (connectingRef.current) {
        return;
      }

      connectingRef.current = walletConnector;
      setConnecting(walletConnector);
      setWalletsModal(false);

      const connector = walletConnector.factory(config.web3.chainId, args);

      function onError(error: Error) {
        console.error('Wallet::Connect().onError', { error });

        if (error instanceof NoEthereumProviderError) {
          setInstallMetaMaskModal(true);
          disconnect();
        } else if (error instanceof UnsupportedChainIdError) {
          setUnsupportedChainModal(true);
          disconnect();
        } else {
          const err = walletConnector.onError?.(error);

          if (err) {
            Antd.notification.error({
              message: err.message,
            });
          }
        }
      }

      function onSuccess() {
        if (!connectingRef.current) {
          return;
        }

        walletConnector.onConnect?.(connector, args);
        connector.getProvider().then(setActiveProvider);
        setActiveConnector(walletConnector);
        setSessionProvider(walletConnector.id);
      }

      await web3React.activate(connector, undefined, true).then(onSuccess).catch(onError);

      setConnecting(undefined);
    },
    [web3React, connectingRef, setConnecting, setSessionProvider, disconnect]
  );

  React.useEffect(() => {
    (async () => {
      if (sessionProvider) {
        const walletConnector = WalletConnectors.find((c) => c.id === sessionProvider);

        if (walletConnector) {
          connect(walletConnector).catch(Error);
        }
      }

      setInitialized(true);
    })();
  }, []);

  const value = React.useMemo<Wallet>(
    () => ({
      initialized,
      connecting,
      disconnecting,
      isActive: web3React.active,
      account: web3React.account ?? undefined,
      networkId: web3React.chainId,
      networkName: getNetworkName(web3React.chainId),
      connector: activeConnector,
      provider: activeProvider,
      showWalletsModal: () => {
        setWalletsModal(true);
      },
      connect,
      disconnect,
    }),
    [web3React, initialized, connecting, disconnecting, activeConnector, activeProvider, disconnect, connect]
  );

  return (
    <WalletContext.Provider value={value}>
      {walletsModal && <ConnectWalletModal onCancel={() => setWalletsModal(false)} />}
      {installMetaMaskModal && <InstallMetaMaskModal onCancel={() => setInstallMetaMaskModal(false)} />}
      <UnsupportedChainModal open={unsupportedChainModal} handleClose={() => setUnsupportedChainModal(false)} />
      {initialized ? (
        props.children
      ) : (
        <Loader
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            zoom: '0.5',
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}
    </WalletContext.Provider>
  );
};

function getLibrary(provider: any) {
  const library = new Web3Provider(provider);
  library.pollingInterval = config.web3.poolingInterval;
  return library;
}

const Web3WalletProvider: React.FC = (props) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <WalletProvider>{props.children}</WalletProvider>
    </Web3ReactProvider>
  );
};

export default Web3WalletProvider;
