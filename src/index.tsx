import 'styles/index.scss';

import { FC } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { CssBaseline, ThemeProvider } from '@mui/material';

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
        </ThemeProvider>
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
