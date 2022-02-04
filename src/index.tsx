import 'styles/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Buffer from 'buffer';

import ErrorBoundary from 'components/custom/error-boundary';
import LayoutView from 'layout';
import EthWeb3Provider from 'providers/eth-web3-provider';
import GeneralContextProvider from 'providers/general-provider';
import KnownTokensProvider from 'providers/known-tokens-provider';
import NotificationsProvider from 'providers/notifications-provider';
import WindowStateProvider from 'providers/window-state';
import { ReactComponent as StaticSprite } from 'resources/svg/static-sprite.svg';
import Web3WalletProvider from 'wallets/wallet';

import { checkFlexGapSupport } from './checkFlexGap';
import * as sw from './serviceWorker';
import ScrollToTop from './top-scroll';

global.Buffer = global.Buffer || Buffer;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
window.process = {} as any;
const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <StaticSprite />
      <WindowStateProvider>
        <GeneralContextProvider>
          <EthWeb3Provider>
            <Web3WalletProvider>
              <KnownTokensProvider>
                <Router>
                  <ScrollToTop />
                  <ToastContainer theme="dark" />
                  <NotificationsProvider>
                    <LayoutView />
                  </NotificationsProvider>
                </Router>
              </KnownTokensProvider>
            </Web3WalletProvider>
          </EthWeb3Provider>
        </GeneralContextProvider>
      </WindowStateProvider>
    </ErrorBoundary>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

sw.unregister();

document.body.addEventListener('mousedown', () => {
  document.body.classList.add('using-mouse');
});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'Tab') {
    document.body.classList.remove('using-mouse');
  }
});

if (checkFlexGapSupport()) {
  // document.documentElement.classList.add('flexbox-gap');
} else {
  document.documentElement.classList.add('no-flexbox-gap');
}
