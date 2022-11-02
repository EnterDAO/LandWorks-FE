import React, { FC } from 'react';

import listingAdImgSrc from 'assets/img/listing-ad.jpg';
import Image from 'components/custom/image';
import { Box, Button, Modal, Stack, Typography } from 'design-system';

import { THEME_COLORS } from 'themes/theme-constants';

interface EnableAdsModalProps {
  open?: boolean;
  onClose: () => void;
  onConfirm?: () => void;
}

const EnableAdsModal: FC<EnableAdsModalProps> = ({ open = false, onClose, onConfirm }) => {
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
          <Typography component="p" color={THEME_COLORS.grey03} variant="caption" textAlign="left">
            We have partnered up with {'{placeholder}'} to allow for ads to be shown on your property until someone
            rents it. By allowing your plot to be used for ads, you will be rewarded additionally for each unique view
            that the ad gets. Rewards can be claimed every month.
            <br />
            <br />
            Think of it like providing your plot to the ads company until someone actually rents it!
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center" mt={16}>
          <Button variant="gradient" btnSize="medium" onClick={onConfirm}>
            sign
          </Button>
        </Box>
      </Stack>
    </Modal>
  );
};

export default EnableAdsModal;
