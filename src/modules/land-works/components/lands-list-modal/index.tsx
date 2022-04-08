import { Link } from 'react-router-dom';
import { getEtherscanAddressUrl } from 'web3/utils';

import ExternalLink from 'components/custom/external-link';
import { Button, Icon, Modal } from 'design-system';
import { Spinner, SuccessStarIcon } from 'design-system/icons';
import { useWallet } from 'wallets/wallet';

import './index.scss';

interface IProps {
  showModal: boolean;
  handleClose: () => void;
}

interface ITxModal extends IProps {
  textMessage: string;
}

export const TxModal: React.FC<ITxModal> = ({ showModal, handleClose, textMessage }) => {
  const wallet = useWallet();

  return (
    <Modal height={600} open={showModal} handleClose={handleClose}>
      <div className="wrapper">
        <Icon className="spinner" iconElement={<Spinner />} iconSize="s" />
        <div className="heading" style={{ fontSize: 30 }}>
          {textMessage}
        </div>
        <ExternalLink className="subheading" href={getEtherscanAddressUrl(wallet.account)}>
          Check your wallet for details
        </ExternalLink>
      </div>
    </Modal>
  );
};

export const SuccessModal: React.FC<IProps> = ({ showModal, handleClose }) => {
  return (
    <Modal height={600} open={showModal} handleClose={handleClose}>
      <div className="success-wrapper">
        <Icon className="star-icon" iconElement={<SuccessStarIcon />} iconSize="s" />
        <div className="heading" style={{ fontSize: 25 }}>
          Successfully Listed!
        </div>
        <div>Nice! You’ve successfully listed property.</div>
        <Button variant="gradient" btnSize="medium">
          <Link className="link-to-properties" to="/my-properties">
            Go to my properties
          </Link>
        </Button>
      </div>
    </Modal>
  );
};
