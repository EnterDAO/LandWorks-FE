/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

import { Box, Button } from 'design-system';
import useHasUserEnteredApp from 'hooks/useHasUserEnteredApp';
import { routes } from 'router/routes';
import ConnectedWallet from 'wallets/components/connected-wallet';

const HeaderRight: FC = () => {
  const history = useHistory();
  const hasUserEnteredApp = useHasUserEnteredApp();

  return (
    <Box display="flex">
      {hasUserEnteredApp ? (
        <ConnectedWallet />
      ) : (
        <Button
          sx={{
            width: { xs: '100% !important', lg: 'auto' },
            minWidth: { lg: '150px !important', xl: '200px !important' },
            height: { lg: '42px !important', xl: '52px !important' },
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
