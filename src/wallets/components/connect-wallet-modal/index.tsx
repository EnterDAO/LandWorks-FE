import { Col, Row } from 'antd';

import Modal, { ModalProps } from 'components/antd/modal';
import Grid from 'components/custom/grid';
import { IconWallet } from 'components/custom/icon-wallet';
import { Text } from 'components/custom/typography';
import useMergeState from 'hooks/useMergeState';
import { useGeneral } from 'providers/general-provider';
import LedgerDerivationPathModal from 'wallets/components/ledger-deriviation-path-modal';
import { CoinbaseWalletArgs } from 'wallets/connectors/coinbase';
import { WalletConnectors, useWallet } from 'wallets/wallet';

import s from './s.module.scss';

import { WalletConnector } from 'wallets/types';

export type ConnectWalletModalProps = ModalProps;

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
    <Modal width={376} {...modalProps} className="sign-in-modal">
      <Grid flow="row" gap={12}>
        <Grid flow="row">
          <Text type="h3" weight="bold" color="primary" align="center" style={{ marginBottom: '20px' }}>
            Sign in with
          </Text>
        </Grid>

        {WalletConnectors.map((connector) => (
          <Row key={connector.id}>
            <Col span={24}>
              <button key={connector.id} className={s.button} onClick={() => handleConnectorSelect(connector)}>
                <IconWallet wallet={connector.id} style={{ maxHeight: 28 }} className={s.walletIcon} />
              </button>
            </Col>
          </Row>
        ))}

        <Grid flow="row">
          <Text type="p1" color="secondary" align="center">
            We do not own your private keys and cannot access your funds without your confirmation.
          </Text>
        </Grid>
      </Grid>

      {state.showLedgerModal && (
        <LedgerDerivationPathModal
          onCancel={() => {
            setState({ showLedgerModal: false });
          }}
        />
      )}
    </Modal>
  );
};

export default ConnectWalletModal;
