import { FC } from 'react';

import { ReactComponent as AlertIcon } from 'assets/icons/alert.svg';
import { Box, Button, Divider, Icon, Modal, Typography } from 'design-system';

export interface BuyAndListConfirmModalProps {
  metaverse: string;
  price: string;
  open: boolean;
  onConfirm?: () => void;
  onClose?: () => void;
}

const BuyAndListConfirmModal: FC<BuyAndListConfirmModalProps> = ({ onClose, onConfirm, metaverse, price, open }) => {
  return (
    <Modal width={680} open={open} handleClose={onClose}>
      <Icon iconSize={160} iconElement={<AlertIcon />} color="var(--theme-accent-color)" sx={{ mt: 12, mb: 5 }} />
      <Typography variant="h3" mb={2}>
        Confirm Buy and List Property?
      </Typography>
      <Typography mx="auto" maxWidth={600}>
        By confirming this transaction you will purchase a{' '}
        <Typography component="span" variant="inherit" fontWeight={600} color="var(--theme-light-color)">
          {metaverse}
        </Typography>{' '}
        land NFT for{' '}
        <Typography component="span" variant="inherit" fontWeight={600} color="var(--theme-light-color)">
          {price}
        </Typography>{' '}
        and list the property on LandWorks. By Listing the property on LandWorks, the purchased NFT will be transferred
        to the LandWorks protocol and a new LandWorks NFT will be minted to your wallet. The LandWorks NFT is a
        representation of your newly purchased land. The LandWorks NFT is needed to edit the rent conditions or withdraw
        the land from the LandWorks protocol.
      </Typography>

      <Divider sx={{ borderColor: 'var(--theme-separator-color)', mt: 11, mb: 4 }} />

      <Box display="flex" justifyContent="flex-end">
        <Button variant="gradient" btnSize="medium" onClick={onConfirm}>
          Confirm
        </Button>
      </Box>
    </Modal>
  );
};

export default BuyAndListConfirmModal;
