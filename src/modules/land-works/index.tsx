import React, { lazy, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Loader } from 'design-system';
import useGetAllMetaversesQuery from 'hooks/useGetAllMetaversesQuery';
import useGetAllPaymentTokensQuery from 'hooks/useGetAllPaymentTokensQuery';
import ActiveAssetTransactionsProvider from 'providers/ActiveAssetTransactionsProvider';
import ListingModalProvider from 'providers/listing-modal-provider';
import { useWarning } from 'providers/warning-provider';
import { APP_ROUTES, LANDING_ROUTES } from 'router/routes';

import { PaymentToken } from './api';
import NotFoundView from './views/not-found-view';

import { createDataProvider } from 'utils/context';

const ExploreView = lazy(() => import('./views/explore-view'));
const MyPropertiesView = lazy(() => import('./views/my-properties-view'));
const SingleLand = lazy(() => import('./views/single-land-view'));

export const { DataProvider: MetaversesProvider, useData: useMetaverses } =
  createDataProvider<{ id: string; name: string }[]>();

export const { DataProvider: PaymentTokensProvider, useData: usePaymentTokens } = createDataProvider<PaymentToken[]>();

const LandworksView = () => {
  const { data: metaverses, loading: areMetaversesLoading, error: metaversesQueryError } = useGetAllMetaversesQuery();
  const {
    data: paymentTokens,
    loading: arePaymentTokensLoading,
    error: paymentTokensQueryError,
  } = useGetAllPaymentTokensQuery();

  const warning = useWarning();

  const error = metaversesQueryError || paymentTokensQueryError;
  const isLoading = areMetaversesLoading || arePaymentTokensLoading;

  useEffect(() => {
    if (!isMobile) {
      return;
    }

    return warning.addWarn({
      text: 'Transactions can only be made from the desktop version using a wallet',
      closable: true,
      storageIdentity: 'bb_desktop_metamask_tx_warn',
    });
  }, [isMobile]);

  if (isLoading) {
    return (
      <Loader
        sx={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          zoom: '0.5',
          transform: 'translate(-50%, -50%)',
        }}
      />
    );
  }

  if (error || !metaverses || !paymentTokens) {
    // TODO: notify user about error or show error page?
    return <Redirect to={LANDING_ROUTES.home} />;
  }

  return (
    <ActiveAssetTransactionsProvider>
      <MetaversesProvider value={metaverses}>
        <PaymentTokensProvider value={paymentTokens}>
          <ListingModalProvider>
            <Switch>
              <Route path={APP_ROUTES.explore} exact component={ExploreView} />
              <Route path={APP_ROUTES.property} component={SingleLand} />
              <Route path={APP_ROUTES.myProperties} component={MyPropertiesView} />
              <Route path={[APP_ROUTES.notFound, '*']} component={NotFoundView} />
            </Switch>
          </ListingModalProvider>
        </PaymentTokensProvider>
      </MetaversesProvider>
    </ActiveAssetTransactionsProvider>
  );
};

export default LandworksView;
