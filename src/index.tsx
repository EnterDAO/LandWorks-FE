import 'styles/index.scss';

import { FC } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { CssBaseline, ThemeProvider } from '@mui/material';
import splitbee from '@splitbee/web';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter5Adapter } from 'use-query-params/adapters/react-router-5';

import ErrorBoundary from 'components/custom/error-boundary';
import LayoutView from 'layout';
import EthWeb3Provider from 'providers/eth-web3-provider';
import GeneralContextProvider from 'providers/general-provider';
import KnownTokensProvider from 'providers/known-tokens-provider';
import NotificationsProvider from 'providers/notifications-provider';
import WindowStateProvider from 'providers/window-state';
import { ReactComponent as StaticSprite } from 'resources/svg/static-sprite.svg';
import Web3WalletProvider from 'wallets/wallet';

import * as sw from './serviceWorker';
import appTheme from './themes/theme';
import ScrollToTop from './top-scroll';

splitbee.init();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
window.process = {} as any;

const App: FC = () => {
  return (
    <ErrorBoundary>
      <StaticSprite />
      <WindowStateProvider>
        <ThemeProvider theme={appTheme}>
          <CssBaseline />
          <GeneralContextProvider>
            <EthWeb3Provider>
              <Web3WalletProvider>
                <KnownTokensProvider>
                  <Router>
                    <QueryParamProvider adapter={ReactRouter5Adapter}>
                      <ScrollToTop />
                      <ToastContainer theme="dark" />
                      <NotificationsProvider>
                        <LayoutView />
                      </NotificationsProvider>
                    </QueryParamProvider>
                  </Router>
                </KnownTokensProvider>
              </Web3WalletProvider>
            </EthWeb3Provider>
          </GeneralContextProvider>
        </ThemeProvider>
      </WindowStateProvider>
    </ErrorBoundary>
  );
};

const container = document.getElementById('root');

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

root.render(<App />);

sw.unregister();

document.body.addEventListener('mousedown', () => {
  document.body.classList.add('using-mouse');
});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'Tab') {
    document.body.classList.remove('using-mouse');
  }
});
