import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AntdSpin from 'antd/lib/spin';

import ErrorBoundary from 'components/custom/error-boundary';
import WarningProvider from 'components/providers/warning-provider';
import LayoutFooter from 'layout/components/layout-footer';
import LayoutHeader from 'layout/components/layout-header';
import EstateRegistryProvider from 'modules/land-works/providers/decentraland/estate-registry-provider';
import LandRegistryProvider from 'modules/land-works/providers/decentraland/land-registry-provider';
import LandWorksProvider from 'modules/land-works/providers/landworks-provider';

import s from './s.module.scss';

const LandworksView = lazy(() => import('modules/land-works'));

const LayoutView: React.FC = () => {
  return (
    <div className={s.layout}>
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <WarningProvider>
          <LandWorksProvider>
            <LandRegistryProvider>
              <EstateRegistryProvider>
                <LayoutHeader />
                <main className={s.main}>
                  <ErrorBoundary>
                    <Suspense fallback={<AntdSpin className="pv-24 ph-64" style={{ width: '100%' }} />}>
                      <Switch>
                        <Route path="/" component={LandworksView} />
                      </Switch>
                    </Suspense>
                  </ErrorBoundary>
                </main>
                <LayoutFooter />
              </EstateRegistryProvider>
            </LandRegistryProvider>
          </LandWorksProvider>
        </WarningProvider>
      </div>
    </div>
  );
};

export default LayoutView;
