import React, { useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use-storage';
import { useSubscription } from '@apollo/client';
import { Typography } from '@mui/material';

import IconNotification from 'components/custom/icon-notification';
import { Button, Grid } from 'design-system';
import { NotificationIcon, PostBoxIcon } from 'design-system/icons';
import { StyledPopover } from 'design-system/Popover/Popover';
import { USER_NOTIFICATION_SUBSCRIPTION, parseUser } from 'modules/land-works/api';
import { useWallet } from 'wallets/wallet';

import NotificationMessage from './NotificationMessage';
import { NotificationList } from './notificationTypes';
import {
  EmptyContainer,
  NotificationButton,
  NotificationContainer,
  StyledRoot,
  StyledTitleRow,
  StyledTypography,
} from './styled';

import { parseNotifications, parseRents } from './utils';

interface Props {
  hasUnread: boolean;
  markAllAsRead: () => void;
  notifications: Array<any>;
}

export const NotificationSection: React.FC = () => {
  const [notifications, setNotification] = useState<NotificationList[] | []>([]);
  const [lastLogin, setLastLogin] = useLocalStorage<number>('user_profile', 0);
  const [hasUnread, setHasUnread] = useState<boolean>(false);

  const wallet = useWallet();
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
  const open = Boolean(anchorEl);

  const { data: userData } = useSubscription(USER_NOTIFICATION_SUBSCRIPTION, {
    skip: wallet.account === undefined,
    variables: { id: wallet.account?.toLowerCase() },
  });

  const updateUser = async () => {
    if (userData && userData.user && wallet.account) {
      const rented = await parseRents(userData.user);
      const listed = await (await parseUser(userData.user)).ownerAndConsumerAssets;
      setNotification(parseNotifications(rented, listed, wallet.account));
    } else {
      setNotification([]);
    }
  };
  useEffect(() => {
    updateUser();
  }, [userData]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const markAllAsRead = () => {
    return null;
  };
  const handleClose = () => {
    setLastLogin(Date.now());
    setAnchorEl(null);
  };

  useEffect(() => {
    if (notifications.length) setHasUnread(!!notifications.filter((item) => item.time >= lastLogin).length);
  }, [notifications, lastLogin]);

  return (
    <>
      <StyledPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Notifications hasUnread={hasUnread} markAllAsRead={markAllAsRead} notifications={notifications} />
      </StyledPopover>
      <NotificationButton onClick={handleClick}>
        <IconNotification width={24} height={24} notificationSize={9} bubble={hasUnread}>
          <NotificationIcon />
        </IconNotification>
      </NotificationButton>
    </>
  );
};

const Notifications: React.FC<Props> = ({ hasUnread, markAllAsRead, notifications }) => {
  const empty = (
    <EmptyContainer container>
      <PostBoxIcon />
      <Typography variant="h4" component={'div'}>
        No new notifications
      </Typography>
      <Typography component={'div'}>Looks like you haven't received any notifications.</Typography>
    </EmptyContainer>
  );

  return (
    <StyledRoot>
      <StyledTitleRow container>
        <Grid item>
          <StyledTypography fontSize={25} fontWeight={'bold'}>
            Notifications
          </StyledTypography>
        </Grid>
        <Grid item>
          <Button variant="tertiary" onClick={markAllAsRead} disabled={!hasUnread}>
            Mark all as read
          </Button>
        </Grid>
      </StyledTitleRow>
      {notifications.length ? (
        <NotificationContainer>
          {notifications.map((item) => (
            <NotificationMessage key={item.id} item={item} />
          ))}
        </NotificationContainer>
      ) : (
        empty
      )}
    </StyledRoot>
  );
};

export default Notifications;
