import { FC } from 'react';

import { Button, Modal, Typography } from 'design-system';

export interface PromoSceneRedeploymentSuccessModalProps {
  open: boolean;
  onClose: () => void;
}

const PromoSceneRedeploymentSuccessModal: FC<PromoSceneRedeploymentSuccessModalProps> = ({ onClose, open }) => {
  return (
    <Modal width={500} open={open} handleClose={onClose}>
      <Typography variant="h3" mb={1}>
        Success
      </Typography>
      <Typography mb={8} mx="auto" maxWidth={600}>
        The promotional scene will be visible throughout the whole property in a couple of minutes.
      </Typography>

      <Button variant="gradient" btnSize="medium" onClick={onClose}>
        Close
      </Button>
    </Modal>
  );
};

export default PromoSceneRedeploymentSuccessModal;
