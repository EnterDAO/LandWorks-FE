/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import cn from 'classnames';
import { getEtherscanAddressUrl, getEtherscanTxUrl, shortenAddr } from 'web3/utils';

import Button from 'components/antd/button';
import Divider from 'components/antd/divider';
import Popover from 'components/antd/popover';
import ExternalLink from 'components/custom/externalLink';
import Grid from 'components/custom/grid';
import Icon from 'components/custom/icon';
// import IconNotification from 'components/custom/icon-notification';
import Identicon from 'components/custom/identicon';
import { Text } from 'components/custom/typography';
// import { useNotifications } from 'providers/notifications-provider';
import { useEstateRegistry } from 'modules/land-works/providers/decentraland/estate-registry-provider';
import { useLandRegistry } from 'modules/land-works/providers/decentraland/land-registry-provider';
import { useLandworks } from 'modules/land-works/providers/landworks-provider';
// import Notifications from 'wallets/components/notifications';
import { useWallet } from 'wallets/wallet';

import { useErc20 } from '../../../modules/land-works/providers/erc20-provider';

import s from './s.module.scss';

// const NotificationSection: React.FC = () => {
//   const { setNotificationsReadUntil, notifications, notificationsReadUntil } = useNotifications();

//   const markAllAsRead = () => {
//     if (notifications.length) {
//       setNotificationsReadUntil(Math.max(...notifications.map((n) => n.startsOn)));
//     }
//   };
//   const hasUnread = notificationsReadUntil ? notifications.some((n) => n.startsOn > notificationsReadUntil) : false;
//   return (
//     <Popover
//       placement="bottomRight"
//       trigger="click"
//       noPadding
//       content={
//         <div className={cn('card', s.notifications)}>
//           <div className="card-header flex">
//             <Text type="p1" weight="semibold" color="primary">
//               Notifications
//             </Text>
//             {hasUnread && (
//               <button className="link-blue ml-auto" onClick={markAllAsRead}>
//                 Mark all as read
//               </button>
//             )}
//           </div>
//           <Notifications />
//         </div>
//       }
//     >
//       <IconNotification width={24} height={24} notificationSize={8} bubble={hasUnread} className={s.notificationIcon}>
//         <Icon name="notification" width={24} height={24} color="inherit" />
//       </IconNotification>
//     </Popover>
//   );
// };

const ConnectedWallet: React.FC = () => {
  const wallet = useWallet();

  const { landworksTxInProgress, landworksTxHash } = useLandworks();
  const { landTxInProgress, landTxHash } = useLandRegistry();
  const { estateTxInProgress, estateTxHash } = useEstateRegistry();
  const { erc20TxInProgress, erc20TxHash } = useErc20();

  const [isTxInProgress, setIsAnyTxInProgress] = useState(
    landworksTxInProgress || landTxInProgress || estateTxInProgress || erc20TxInProgress
  );

  const [txHash, setTxHash] = useState(landworksTxHash || landTxHash || estateTxHash || erc20TxHash);

  useEffect(() => {
    if (landworksTxInProgress || landTxInProgress || estateTxInProgress || erc20TxInProgress) {
      setIsAnyTxInProgress(true);
    } else {
      setIsAnyTxInProgress(false);
    }
  }, [landworksTxInProgress, landTxInProgress, estateTxInProgress, erc20TxInProgress]);

  useEffect(() => {
    setTxHash(landworksTxHash || landTxHash || estateTxHash || erc20TxHash);
  }, [landworksTxHash, landTxHash, estateTxHash, erc20TxHash]);

  if (wallet.connecting) {
    return (
      <Popover
        placement="bottomRight"
        noPadding
        content={
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
            <Divider style={{ minHeight: 28 }} />
            <Grid padding={24}>
              <button type="button" className="button button-ghost" onClick={() => wallet.disconnect()}>
                <span>Disconnect</span>
              </button>
            </Grid>
          </div>
        }
        trigger="click"
      >
        <Button type="primary" className={s.buttonConnecting}>
          Connecting...
        </Button>
      </Popover>
    );
  }

  if (!wallet.isActive) {
    return !isMobile ? (
      <button type="button" className={`button-primary ${s.signBtnDesktop}`} onClick={() => wallet.showWalletsModal()}>
        <span>Sign in</span>
      </button>
    ) : null;
  }

  const AccountSection = (
    <Popover
      placement="bottomRight"
      trigger="click"
      noPadding
      className={s.popover}
      content={
        <div className="card">
          <Grid className="card-header" flow="col" gap={16} align="center" justify="start">
            <Identicon address={wallet.account} width={40} height={40} />
            <ExternalLink href={getEtherscanAddressUrl(wallet.account!)}>
              <Text type="p1" weight="semibold" color="blue">
                {shortenAddr(wallet.account, 8, 8)}
              </Text>
            </ExternalLink>
          </Grid>
          <Grid flow="row" gap={32} padding={[32, 24]}>
            <Grid flow="col" gap={16} colsTemplate="24px 1fr auto">
              <Icon name="node-status" />
              <Text type="p1" color="secondary">
                Status
              </Text>
              <Text type="lb2" weight="semibold" color="green" className={s.statusTag}>
                Connected
              </Text>
            </Grid>
            <Grid flow="col" gap={16} colsTemplate="24px 1fr auto">
              <Icon name="wallet-outlined" />
              <Text type="p1" color="secondary">
                Wallet
              </Text>
              <Text type="p1" weight="semibold" color="white">
                {wallet.connector?.name}
              </Text>
            </Grid>
            <Grid flow="col" gap={16} colsTemplate="24px 1fr auto">
              <Icon name="network" />
              <Text type="p1" color="secondary">
                Network
              </Text>
              <Text type="p1" weight="semibold" color="white">
                {wallet.networkName}
              </Text>
            </Grid>
          </Grid>
          <Divider />
          <Grid padding={24}>
            <button type="button" className="button button-ghost" onClick={() => wallet.disconnect()}>
              <span>Disconnect</span>
            </button>
          </Grid>
        </div>
      }
    >
      <Button type="link" className={s.accountLink}>
        <Grid flow="col" align="center">
          {isTxInProgress ? (
            <div className={s.loader}></div>
          ) : (
            <Identicon address={wallet.account} width={24} height={24} className="mr-8" />
          )}

          <Text type="p1" style={{ color: 'white' }} className={cn(s.walletAddress, 'mr-4')}>
            {shortenAddr(wallet.account, 4, 3)}
          </Text>
          <Icon name="dropdown" style={{ color: 'white' }} className={s.dropdownArrow} />
        </Grid>
      </Button>
    </Popover>
  );

  const TxSection = (
    <Popover
      placement="bottom"
      trigger="click"
      noPadding
      className={cn(s.popover, s.txSection)}
      content={
        <div id={s.txPopoverContainer}>
          <div id={s.txInfoContainer}>
            <div id={s.txStatus}>Transaction in progress</div>
            <div
              onClick={() => {
                window.open(`${getEtherscanTxUrl(txHash)}`, '_blank')?.focus();
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
      }
    >
      <Button type="link" className={s.accountLink}>
        <Grid flow="col" align="center">
          <div className={s.loader}></div>
          <Text type="p1" style={{ color: 'white' }} className={cn(s.walletAddress, 'mr-4')}>
            {shortenAddr(wallet.account, 4, 3)}
          </Text>
          <Icon name="dropdown" style={{ color: 'white' }} className={s.dropdownArrow} />
        </Grid>
      </Button>
    </Popover>
  );

  return (
    <Grid
      flow="col"
      gap={20}
      justify="center"
      align="center"
      className={cn(s.hamburger, isTxInProgress ? s.loadingBackground : '')}
    >
      {/* ToDo: NotificationSection, uncomment if needed */}
      {/* <NotificationSection /> */}
      {/* <Divider type="vertical" style={{ minHeight: 28 }} /> */}
      {isTxInProgress ? TxSection : AccountSection}
    </Grid>
  );
};

export default ConnectedWallet;
