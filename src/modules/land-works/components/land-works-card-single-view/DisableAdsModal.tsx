import React, { FC } from 'react';

import listingAdImgSrc from 'assets/img/listing-ad.jpg';
import Image from 'components/custom/image';
import { Box, Button, Modal, Stack, Typography } from 'design-system';

import { THEME_COLORS } from 'themes/theme-constants';

interface DisableAdsModalProps {
  open?: boolean;
  onClose: () => void;
  onConfirm?: () => void;
}

const DisableAdsModal: FC<DisableAdsModalProps> = ({ open = false, onClose, onConfirm }) => {
  return (
    <Modal height="100%" handleClose={onClose} open={open}>
      <Stack width={625}>
        <Typography fontSize={25} variant="h2" mb={8}>
          Allow Advertise?
        </Typography>
        <Box display="flex" gap={5}>
          <Image
            width={640}
            height={480}
            src={listingAdImgSrc}
            sx={{
              width: 255,
              flex: '0 0 auto',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />
          <Box>
            <Typography component="p" color={THEME_COLORS.grey03} textAlign="left">
              You can Turn off Advertising and Redeploy LandWorks' Promotional Scene.
            </Typography>

            <Typography component="p" color={THEME_COLORS.grey02} variant="caption" textAlign="left" mt="8px">
              If you'd like to stop providing your land for advertising purposes, please click the turn off button below
              and sign the Metamask message that will popup. You will have the option to promote your land by
              redeploying LandWorks' "For Rent" scene. Redeployment would cost a network fee and it’s optional.
            </Typography>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" mt={16}>
          <Button variant="secondary" btnSize="medium" onClick={onClose}>
            Back
          </Button>

          <Button variant="gradient" btnSize="medium" onClick={onConfirm}>
            Turn off
          </Button>
        </Box>
      </Stack>
    </Modal>
  );
};

export default DisableAdsModal;
