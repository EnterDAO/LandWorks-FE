import { Link } from 'react-router-dom';
import { getEtherscanAddressUrl } from 'web3/utils';

import ExternalLink from 'components/custom/external-link';
import { Button, Icon, Modal } from 'design-system';
import { Spinner, SuccessStarIcon, TwitterIcon } from 'design-system/icons';
import { useWallet } from 'wallets/wallet';

import { ShareLink } from './styled';

import './index.scss';

interface IProps {
  showModal: boolean;
  handleClose: () => void;
}

interface ITxModal extends IProps {
  textMessage: string;
}
interface ISuccessModal extends IProps {
  showShareButton: boolean;
  listedPropertyId: string;
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

export const SuccessModal: React.FC<ISuccessModal> = ({
  showModal,
  handleClose,
  showShareButton,
  listedPropertyId,
}) => {
  const text = `gm. Just listed my property at @landworksxyz.\n`;
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
        {showShareButton && listedPropertyId.length && (
          <ShareLink
            href={`https://twitter.com/intent/tweet?text=${text}&url=${window.location.origin}/property/${listedPropertyId}`}
            target="_blank"
          >
            <Icon iconElement={<TwitterIcon />} iconSize="m" />
            <span>Share on twitter</span>
          </ShareLink>
        )}
      </div>
    </Modal>
  );
};
