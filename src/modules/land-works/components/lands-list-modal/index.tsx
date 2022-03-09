import { Button, Icon, Modal } from 'design-system';
import { Spinner, SuccessStarIcon } from 'design-system/icons';

import './index.scss';

interface IProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  variant?: 'approve' | 'sign';
}

export const TxModal: React.FC<IProps> = ({ showModal, setShowModal, variant }) => {
  const text = variant === 'approve' ? 'Approving...' : 'Signing Transaction...';
  return (
    <Modal height={600} open={showModal} handleClose={() => setShowModal(false)}>
      <div className="wrapper">
        <Icon className="spinner" iconElement={<Spinner />} iconSize="s" />
        <div className="heading" style={{ fontSize: 30 }}>
          {text}
        </div>
        <div className="subheading">Check your wallet for details</div>
        {/* TODO: FIND OUT WHERE THIS LINK GOES */}
      </div>
    </Modal>
  );
};

export const SuccessModal: React.FC<IProps> = ({ showModal, setShowModal }) => {
  return (
    <Modal height={600} open={showModal} handleClose={() => setShowModal(false)}>
      <div className="success-wrapper">
        <Icon className="star-icon" iconElement={<SuccessStarIcon />} iconSize="s" />
        <div className="heading" style={{ fontSize: 25 }}>
          Successfully Listed!
        </div>
        <div>Nice! You’ve successfully listed property.</div>
        <Button variant="gradient" btnSize="medium">
          Go to my properties
        </Button>
      </div>
    </Modal>
  );
};
