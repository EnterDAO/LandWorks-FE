/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import MenuItem from '@mui/material/MenuItem';

import Grid from 'components/custom/grid';
import { Button, Dropdown, Modal } from 'design-system';
import LedgerWalletConfig from 'wallets/connectors/ledger';
import { useWallet } from 'wallets/wallet';

const WEB3_LEDGER_DERIVATION_PATHS = [
  {
    value: `m/44'/60'/0'`,
    label: `Ethereum - m/44'/60'/0'`,
  },
  {
    value: `m/44'/60'/0'/0`,
    label: `Ethereum - Ledger Live - m/44'/60'/0'/0`,
  },
];

type Props = {
  open: boolean;
  onSubmit?: () => void;
  handleClose: () => void;
};

const LedgerDerivationPathModal: React.FC<Props> = (props) => {
  const { ...modalProps } = props;

  const wallet = useWallet();

  const [derivationPath, setDerivationPath] = React.useState<string>(String(WEB3_LEDGER_DERIVATION_PATHS[0].value));

  function handleSelect(value: any) {
    setDerivationPath(value as string);
  }

  function handleConnect() {
    modalProps.handleClose?.();

    setTimeout(() => {
      wallet
        .connect(LedgerWalletConfig, {
          baseDerivationPath: derivationPath,
        })
        .catch(Error);
    });
  }

  return (
    <Modal {...modalProps}>
      <Grid flow="row" gap={32} align="center">
        <Dropdown value={derivationPath} onSelect={handleSelect} style={{ width: '352px' }}>
          {WEB3_LEDGER_DERIVATION_PATHS.map((item, key) => {
            return (
              <MenuItem key={key} value={item.value}>
                {item.label}
              </MenuItem>
            );
          })}
        </Dropdown>
        <Button variant="primary" onClick={handleConnect}>
          Connect
        </Button>
      </Grid>
    </Modal>
  );
};

export default LedgerDerivationPathModal;
