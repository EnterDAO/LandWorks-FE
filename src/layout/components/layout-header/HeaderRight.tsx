/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

import { Box, Button } from 'design-system';
import { routes } from 'router/routes';
import ConnectedWallet from 'wallets/components/connected-wallet';

import { useIsLandingMode } from './HeaderNav';

const HeaderRight: FC = () => {
  const history = useHistory();
  const isUserEnteredApp = useIsLandingMode();

  return (
    <Box display="flex">
      {isUserEnteredApp ? (
        <ConnectedWallet />
      ) : (
        <Button
          sx={{
            width: { xs: '100% !important', lg: 'auto' },
            minWidth: { lg: '150px !important', xl: 'auto' },
            height: { lg: '42px !important', xl: 'auto' },
          }}
          onClick={() => history.push(routes.explore)}
          btnSize="medium"
          variant="gradient"
        >
          EXPLORE
        </Button>
      )}
    </Box>
  );
};

export default HeaderRight;
