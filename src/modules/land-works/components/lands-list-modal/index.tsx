import { Link, useHistory } from 'react-router-dom';
import { getEtherscanAddressUrl } from 'web3/utils';

import ExternalLink from 'components/custom/externalLink';
import { Button, Icon, Modal } from 'design-system';
import { Spinner, SuccessStarIcon } from 'design-system/icons';
import { useWallet } from 'wallets/wallet';

import './index.scss';

interface IProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  variant?: 'approve' | 'sign';
}

export const TxModal: React.FC<IProps> = ({ showModal, setShowModal, variant }) => {
  const text = variant === 'approve' ? 'Approving...' : 'Signing Transaction...';
  const wallet = useWallet();

  return (
    <Modal height={600} open={showModal} handleClose={() => setShowModal(false)}>
      <div className="wrapper">
        <Icon className="spinner" iconElement={<Spinner />} iconSize="s" />
        <div className="heading" style={{ fontSize: 30 }}>
          {text}
        </div>
        <ExternalLink className="subheading" href={getEtherscanAddressUrl(wallet.account)}>
          Check your wallet for details
        </ExternalLink>
      </div>
    </Modal>
  );
};

export const SuccessModal: React.FC<IProps> = ({ showModal, setShowModal }) => {
  const history = useHistory();
  return (
    <Modal
      height={600}
      open={showModal}
      handleClose={() => {
        history.push('/my-properties');
        setShowModal(false);
      }}
    >
      <div className="success-wrapper">
        <Icon className="star-icon" iconElement={<SuccessStarIcon />} iconSize="s" />
        <div className="heading" style={{ fontSize: 25 }}>
          Successfully Listed!
        </div>
        <div>Nice! You’ve successfully listed property.</div>
        <Button variant="gradient" btnSize="medium">
          <Link className="link-to-properties" to="/lending">
            Go to my properties
          </Link>
        </Button>
      </div>
    </Modal>
  );
};
