import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

import { Box } from 'design-system';
import useHasUserEnteredApp from 'hooks/useHasUserEnteredApp';
import { routes } from 'router/routes';
import ConnectedWallet from 'wallets/components/connected-wallet';

import HeaderActionButton from './HeaderActionButton';

const HeaderRight: FC = () => {
  const history = useHistory();
  const hasUserEnteredApp = useHasUserEnteredApp();

  return (
    <Box display="flex">
      {hasUserEnteredApp ? (
        <ConnectedWallet />
      ) : (
        <HeaderActionButton onClick={() => history.push(routes.explore)}>EXPLORE</HeaderActionButton>
      )}
    </Box>
  );
};

export default HeaderRight;
