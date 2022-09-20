import React from 'react';

import thumbnailSrc from 'assets/img/promotional-scene-thumbnail.jpg';
import { Box, Button, Loader, Typography } from 'design-system';
import useBoolean from 'hooks/useBoolean';
import { AssetEntity } from 'modules/land-works/api';
import { useLandworks } from 'modules/land-works/providers/landworks-provider';

import PromoSceneRedeploymentConfirmModal from './PromoSceneRedeploymentConfirmModal';
import PromoSceneRedeploymentSuccessModal from './PromoSceneRedeploymentSuccessModal';

interface PromoSceneRedeploymentProps {
  assetId: string;
  metaverseRegistryId: string;
}

const PromoSceneRedeployment = ({ assetId, metaverseRegistryId }: PromoSceneRedeploymentProps) => {
  const landworks = useLandworks();

  const { value: isRedeploying, setTrue: startRedeploying, setSafeFalse: stopRedeploying } = useBoolean();
  const { value: isConfirmModalOpened, setTrue: openConfirmModal, setSafeFalse: closeConfirmModal } = useBoolean();
  const { value: isSuccessModalOpened, setSafeTrue: openSuccessModal, setFalse: closeSuccessModal } = useBoolean();

  const handleConfirm = () => {
    closeConfirmModal();
    startRedeploying();

    landworks.landWorksContract
      ?.updateAdministrativeState(assetId, metaverseRegistryId)
      .then(openSuccessModal)
      .finally(stopRedeploying);
  };

  return (
    <>
      <Box
        bgcolor="rgba(93, 143, 240, 0.2)"
        p={4}
        gap={8}
        borderRadius="20px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box display="flex" gap={3} alignItems="flex-start">
          <Box src={thumbnailSrc} width={170} height="auto" borderRadius="10px" component="img" />

          <Box>
            <Typography variant="h4">Redeploy Promotional Scene?</Typography>
            <Typography mt={2}>
              Promote your land by redeploying LandWorks "For Rent" scene.
              <br />
              Redeployment would cost a network fee.
            </Typography>
          </Box>
        </Box>

        <Button variant="primary" btnSize="medium" onClick={openConfirmModal} disabled={isRedeploying}>
          {isRedeploying ? 'Redeploying...' : 'Redeploy'}
        </Button>
      </Box>

      <PromoSceneRedeploymentConfirmModal
        open={isConfirmModalOpened}
        onClose={closeConfirmModal}
        onConfirm={handleConfirm}
      />

      <PromoSceneRedeploymentSuccessModal open={isSuccessModalOpened} onClose={closeSuccessModal} />
    </>
  );
};

export default PromoSceneRedeployment;
