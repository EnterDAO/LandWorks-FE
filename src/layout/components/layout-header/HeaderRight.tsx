import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

import { Box } from 'design-system';
import { APP_ROUTES, useIsAppRoute } from 'router/routes';
import ConnectedWallet from 'wallets/components/connected-wallet';

import HeaderActionButton from './HeaderActionButton';

const HeaderRight: FC = () => {
  const history = useHistory();
  const isAppRoute = useIsAppRoute();

  return (
    <Box display="flex">
      {isAppRoute ? (
        <ConnectedWallet />
      ) : (
        <HeaderActionButton onClick={() => history.push(APP_ROUTES.explore)}>EXPLORE</HeaderActionButton>
      )}
    </Box>
  );
};

export default HeaderRight;
