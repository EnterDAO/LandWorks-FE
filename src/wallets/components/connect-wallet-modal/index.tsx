import { IconWallet } from 'components/custom/icon-wallet';
import { Text } from 'components/custom/typography';
import { Grid, Modal } from 'design-system';
import useMergeState from 'hooks/useMergeState';
import { useGeneral } from 'providers/general-provider';
import LedgerDerivationPathModal from 'wallets/components/ledger-deriviation-path-modal';
import { CoinbaseWalletArgs } from 'wallets/connectors/coinbase';
import { WalletConnectors, useWallet } from 'wallets/wallet';

import s from './s.module.scss';

import { WalletConnector } from 'wallets/types';

export type ConnectWalletModalProps = {
  open: boolean;
  onSubmit?: () => void;
  handleClose: () => void;
};

type ConnectWalletModalState = {
  showLedgerModal: boolean;
};

const InitialState: ConnectWalletModalState = {
  showLedgerModal: false,
};

const ConnectWalletModal: React.FC<ConnectWalletModalProps> = (props) => {
  const { ...modalProps } = props;

  const { isDarkTheme } = useGeneral();
  const wallet = useWallet();
  const [state, setState] = useMergeState<ConnectWalletModalState>(InitialState);

  function handleConnectorSelect(connector: WalletConnector) {
    if (wallet.isActive) {
      return;
    }

    if (connector.id === 'ledger') {
      setState({
        showLedgerModal: true,
      });
      return;
    }

    let args = {};

    if (connector.id === 'coinbase') {
      args = {
        darkMode: isDarkTheme,
      } as CoinbaseWalletArgs;
    }

    wallet.connect(connector, args).catch(Error);
  }

  return (
    <Modal
      {...modalProps}
      width={376}
      title={
        <Text type="h3" weight="bold" color="primary">
          Sign in with
        </Text>
      }
    >
      <Grid className={s.connectWalletModal} container flexDirection="row">
        {WalletConnectors.map((connector) => (
          <Grid xs={12} item key={connector.id} sx={{ marginBottom: '0.7rem' }}>
            <button key={connector.id} className={s.button} onClick={() => handleConnectorSelect(connector)}>
              <IconWallet wallet={connector.id} style={{ maxHeight: 28 }} className={s.walletIcon} />
            </button>
          </Grid>
        ))}

        <Grid xs={12} item>
          <Text type="p1" color="secondary" align="center">
            We do not own your private keys and cannot access your funds without your confirmation.
          </Text>
        </Grid>
      </Grid>

      <LedgerDerivationPathModal
        open={state.showLedgerModal}
        handleClose={() => setState({ showLedgerModal: false })}
      />
    </Modal>
  );
};

export default ConnectWalletModal;
