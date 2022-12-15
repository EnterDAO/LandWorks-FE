/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import splitbee from '@splitbee/web';
import cn from 'classnames';
import { getEtherscanAddressUrl, getEtherscanTxUrl, shortenAddr } from 'web3/utils';

import ExternalLink from 'components/custom/external-link';
import Grid from 'components/custom/grid';
import Icon from 'components/custom/icon';
import Identicon from 'components/custom/identicon';
import { Text } from 'components/custom/typography';
import { StyledPopover } from 'design-system/Popover/Popover';
import { getENSName } from 'helpers/helpers';
import HeaderActionButton from 'layout/components/layout-header/HeaderActionButton';
import { useContractRegistry } from 'modules/land-works/providers/contract-provider';
import { useLandworks } from 'modules/land-works/providers/landworks-provider';
import { ReactComponent as ExternalLinkIcon } from 'resources/svg/external-link.svg';
import { useWallet } from 'wallets/wallet';

import { useErc20 } from '../../../modules/land-works/providers/erc20-provider';
import { NotificationSection } from '../notifications';
import UserInfo from './UserInfo/UserInfo';

import s from './s.module.scss';

// TODO: refactor
const ConnectedWallet: React.FC = () => {
  const wallet = useWallet();

  const { landworksTxInProgress, landworksTxHash } = useLandworks();
  const { txInProgress, txHash } = useContractRegistry();
  const { erc20TxInProgress, erc20TxHash } = useErc20();
  const containerRef = React.useRef();
  const [isTxInProgress, setIsAnyTxInProgress] = useState(landworksTxInProgress || txInProgress || erc20TxInProgress);

  const [validTxHash, setValidTxHash] = useState(landworksTxHash || txHash || erc20TxHash);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  useEffect(() => {
    if (landworksTxInProgress || txInProgress || erc20TxInProgress) {
      setIsAnyTxInProgress(true);
    } else {
      setIsAnyTxInProgress(false);
    }
  }, [landworksTxInProgress, txInProgress, erc20TxInProgress]);

  useEffect(() => {
    setValidTxHash(landworksTxHash || txHash || erc20TxHash);
  }, [landworksTxHash, txHash, erc20TxHash]);

  const [ens, setEns] = useState<string>();
  useEffect(() => {
    if (wallet.account)
      getENSName(wallet.account).then((ensName) => {
        setEns(ensName);
      });
  }, [wallet]);

  const handleDisconnectButtonClick = () => {
    setAnchorEl(null);
    wallet.disconnect();
  };

  if (wallet.connecting) {
    return (
      <>
        <StyledPopover
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          className={s.popover}
          anchorEl={anchorEl}
          onClose={handleClose}
        >
          <div className="card">
            <Grid flow="row" gap={32} padding={[32, 24]}>
              <Grid flow="col" gap={16} colsTemplate="24px 1fr auto">
                <Icon name="node-status" />
                <Text type="p1" color="secondary">
                  Status
                </Text>
                <Text type="lb2" weight="semibold" color="green" className={s.statusTag}>
                  Connecting
                </Text>
              </Grid>
              <Grid flow="col" gap={16} colsTemplate="24px 1fr auto">
                <Icon name="wallet-outlined" />
                <Text type="p1" color="secondary">
                  Wallet
                </Text>
                <Text type="p1" weight="semibold" color="white">
                  {wallet.connecting?.name}
                </Text>
              </Grid>
            </Grid>
            <Divider className={s.divider} style={{ minHeight: 28 }} />
            <Grid padding={24}>
              <button type="button" className="button button-ghost" onClick={handleDisconnectButtonClick}>
                <span>Disconnect</span>
              </button>
            </Grid>
          </div>
        </StyledPopover>
        <Button className={s.buttonConnecting}>Connecting...</Button>
      </>
    );
  }

  if (!wallet.isActive) {
    return !isMobile ? (
      <HeaderActionButton
        onClick={() => {
          wallet.showWalletsModal();
          splitbee.track('Connect wallet click');
        }}
      >
        Connect Wallet
      </HeaderActionButton>
    ) : null;
  }

  const AccountSection = (
    <Box ref={containerRef}>
      <StyledPopover
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        container={containerRef.current}
        className={s.popover}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        <div className={s.container}>
          <Grid className={s.identicon} flow="col" gap={16} align="center" justify="center">
            <Identicon address={wallet.account} width={40} height={40} />
          </Grid>
          <Grid flow="col" gap={16} align="center" justify="center">
            <ExternalLink className={s.externalLink} href={getEtherscanAddressUrl(wallet.account!)}>
              {ens && ens !== wallet.account ? ens : shortenAddr(wallet.account, 18, 3)}
              <ExternalLinkIcon className={s.link} />
            </ExternalLink>
          </Grid>
          <Grid flow="row" gap={20} padding={[23, 28]} justify="center">
            <Grid flow="col" gap={16} justify="center">
              <Text type="lb2" weight="semibold" className={s.statusTag}>
                Connected
              </Text>
            </Grid>
            <Divider className={s.divider} />
            <Grid flow="col" gap={16} colsTemplate="100px">
              <Text type="p1" color="secondary">
                Wallet
              </Text>
              <Text type="p1" weight="semibold" color="white" align="right">
                {wallet.connector?.name}
              </Text>
            </Grid>
            <Grid flow="col" gap={16} colsTemplate="100px">
              <Text type="p1" color="secondary">
                Network
              </Text>
              <Text type="p1" weight="semibold" color="white" align="right">
                {wallet.networkName}
              </Text>
            </Grid>
          </Grid>
          <Grid padding={[0, 24, 20]}>
            <button type="button" className="button-primary-grey" onClick={handleDisconnectButtonClick}>
              <span>Disconnect</span>
            </button>
          </Grid>
        </div>
      </StyledPopover>
      <Button onClick={handleClick}>
        <UserInfo open={open} address={ens && ens !== wallet.account ? ens : shortenAddr(wallet.account, 10, 3)} />
      </Button>
    </Box>
  );

  const TxSection = (
    <>
      <StyledPopover
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        className={cn(s.popover, s.txSection)}
      >
        <div id={s.txPopoverContainer}>
          <div id={s.txInfoContainer}>
            <div id={s.txStatus}>Transaction in progress</div>
            <div
              onClick={() => {
                window.open(`${getEtherscanTxUrl(validTxHash)}`, '_blank')?.focus();
              }}
              id={s.txEtherscanLink}
            >
              view on etherscan
            </div>
          </div>
          <div id={s.txDisconnectContainer} onClick={() => wallet.disconnect()}>
            Disconnect
          </div>
        </div>
      </StyledPopover>
      <Button className={s.accountLink}>
        <Grid flow="col" align="center">
          <div className={s.loader}></div>
          <Text type="p1" style={{ color: 'white' }} className={cn(s.walletAddress, 'mr-4')}>
            {ens && ens !== wallet.account ? ens : shortenAddr(wallet.account, 4, 3)}
          </Text>
          <Icon name="dropdown" style={{ color: 'white' }} className={s.dropdownArrow} />
        </Grid>
      </Button>
    </>
  );

  return (
    <>
      <NotificationSection />
      <Grid
        flow="col"
        gap={20}
        justify="center"
        align="center"
        className={cn(s.hamburger, isTxInProgress ? s.loadingBackground : '')}
      >
        {/* ToDo: NotificationSection, uncomment if needed */}
        {/* <Divider type="vertical" style={{ minHeight: 28 }} /> */}
        {isTxInProgress ? TxSection : AccountSection}
      </Grid>
    </>
  );
};

export default ConnectedWallet;
