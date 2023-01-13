import React from 'react';
import { useHistory } from 'react-router-dom';
import { getEtherscanAddressUrl } from 'web3/utils';

import Typography from 'components/common/Typography';
import ExternalLink from 'components/custom/external-link';
import { Box, Button, Icon, Modal, Stack } from 'design-system';
import { Spinner, SuccessStarIcon, TwitterIcon } from 'design-system/icons';
import { MY_PROPERTIES_ROUTE_TABS, getMyPropertiesPath, getPropertyPath } from 'router/routes';
import { useWallet } from 'wallets/wallet';

import { ShareLink } from './styled';

import { twitterListText } from '../../utils';

import { THEME_COLORS } from 'themes/theme-constants';

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
  metaverseRegistry: string;
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
  metaverseRegistry,
}) => {
  const history = useHistory();

  return (
    <Modal maxHeight={780} open={showModal} handleClose={handleClose}>
      <Stack width={420}>
        <Box mb={4} display="flex" justifyContent="center">
          <SuccessStarIcon />
        </Box>

        <Typography fontSize={25} variant="h2" mb={2}>
          Successfully Listed!
        </Typography>

        <Typography component="p" color={THEME_COLORS.grey03} variant="caption" mb={8}>
          Nice! You&apos;ve successfully listed property.
        </Typography>

        <Stack display="flex" alignItems="center" gap={6}>
          <Button
            variant="gradient"
            btnSize="medium"
            onClick={() => history.push(getMyPropertiesPath(MY_PROPERTIES_ROUTE_TABS.listed))}
          >
            Go to my properties
          </Button>

          {showShareButton && listedPropertyId.length > 0 && (
            <ShareLink
              href={`https://twitter.com/intent/tweet?text=${twitterListText(metaverseRegistry)}&url=${
                window.location.origin
              }/${getPropertyPath(listedPropertyId)}`}
              target="_blank"
            >
              <Icon iconElement={<TwitterIcon />} iconSize="m" />
              <span>Share on twitter</span>
            </ShareLink>
          )}
        </Stack>
      </Stack>
    </Modal>
  );
};
