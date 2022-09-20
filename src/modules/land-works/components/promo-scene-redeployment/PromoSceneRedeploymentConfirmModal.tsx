import { FC } from 'react';

import thumbnailSrc from 'assets/img/promotional-scene-thumbnail.jpg';
import { Box, Button, Modal, Typography } from 'design-system';

export interface RedeploySceneConfirmModalProps {
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const RedeploySceneConfirmModal: FC<RedeploySceneConfirmModalProps> = ({ onClose, onConfirm, open }) => {
  return (
    <Modal width={870} open={open} handleClose={onClose}>
      <Typography variant="h3" mb={1}>
        Redeploy Promotional Scene
      </Typography>
      <Typography mb={7} mx="auto" maxWidth={600}>
        LandWork's promotional scene can be seen all over Decentraland on the plots which are available for rent on the
        platform. The scene has an embedded link which allows interested users to easily rent the property. By
        redeploying the scene, LandWorks will remove the scene of the last tenant and redeploy the promotional one
        boosting the visibility of your property.
      </Typography>

      <Box src={thumbnailSrc} width={385} height="auto" borderRadius="10px" component="img" />

      <hr className="divider" />

      <Box display="flex" justifyContent="flex-end">
        <Button variant="gradient" btnSize="medium" onClick={onConfirm}>
          Redeploy
        </Button>
      </Box>
    </Modal>
  );
};

export default RedeploySceneConfirmModal;
