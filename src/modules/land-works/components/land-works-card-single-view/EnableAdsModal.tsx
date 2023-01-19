import React, { FC } from 'react';

import listingAdImgSrc from 'assets/img/listing-ad.jpg';
import ExternalLink from 'components/custom/external-link';
import Image from 'components/custom/image';
import { Box, Button, Modal, Stack, Typography } from 'design-system';
import InfoAlert from 'layout/components/info-alert';

import { THEME_COLORS } from 'themes/theme-constants';

interface EnableAdsModalProps {
  open?: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  actionDisabled?: boolean;
}

const EnableAdsModal: FC<EnableAdsModalProps> = ({ open = false, actionDisabled, onClose, onConfirm }) => {
  return (
    <Modal height="100%" handleClose={onClose} open={open}>
      <Stack width={625}>
        <Typography fontSize={25} variant="h2" mb={8}>
          Allow Advertisement?
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
          <Typography component="p" fontWeight={400} color={THEME_COLORS.grey03} variant="caption" textAlign="left">
            We have partnered up with{' '}
            <ExternalLink fontSize="inherit" variant="link2" href="https://precisionx.com/en/">
              PrecisionX
            </ExternalLink>{' '}
            to allow for ads to be displayed on your land until it gets rented. By allowing your plot to be used for
            ads, you will be rewarded 0.025 USDC (0.05 USDC if you own a{' '}
            <ExternalLink fontSize="inherit" variant="link2" href="https://opensea.io/collection/sharded-minds">
              Sharded Mind
            </ExternalLink>{' '}
            NFT) for each unique view on the ad. Full info on how the ads work can be found{' '}
            <ExternalLink
              fontSize="inherit"
              variant="link2"
              href="https://medium.com/enterdao/new-passive-income-stream-for-metaverse-landlords-8c72c68c7bb5"
            >
              here
            </ExternalLink>
            .
            <br />
            <br />
            Think of it as providing your land to the an advertiser until it gets rented!
          </Typography>
        </Box>
        <InfoAlert
          sx={{ mt: 6 }}
          description={
            <Typography variant="body2" fontWeight={400} color={THEME_COLORS.grey03}>
              Please note that a wallet signature will popup in order to confirm your choice.
            </Typography>
          }
        />
        <Box display="flex" justifyContent="center" mt={6}>
          <Button disabled={actionDisabled} variant="gradient" btnSize="medium" onClick={onConfirm}>
            Sign
          </Button>
        </Box>
      </Stack>
    </Modal>
  );
};

export default EnableAdsModal;
