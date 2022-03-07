import { Icon, Modal } from 'design-system';
import { Spinner } from 'design-system/icons';

import './index.scss';

interface IProps {
  showApproveModal: boolean;
  setShowApproveModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ApproveModal: React.FC<IProps> = ({ showApproveModal, setShowApproveModal }) => {
  return (
    <Modal height={600} open={showApproveModal} handleClose={() => setShowApproveModal(false)}>
      <div className="wrapper">
        <Icon className="spinner" iconElement={<Spinner />} iconSize="s" />
        <div className="heading" style={{ fontSize: 30, fontWeight: 700 }}>
          Approving...
        </div>
        <div className="subheading">Check your wallet for details</div>
        {/* TODO: FIND OUT WHERE THIS LINK GOES */}
      </div>
    </Modal>
  );
};

export default ApproveModal;
