import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLocalStorage } from 'react-use-storage';
import { useSubscription } from '@apollo/client';
import { Box, Typography } from '@mui/material';
import useDebounce from '@rooks/use-debounce';

import IconNotification from 'components/custom/icon-notification';
import { Button, Grid } from 'design-system';
import { NotificationIcon, PostBoxIcon } from 'design-system/icons';
import { StyledPopover } from 'design-system/Popover/Popover';
import useIntersectionObserver from 'hooks/useElementOnScreen';
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
  notifications: Array<NotificationList>;
  hasUnclaimentRent: boolean;
}

export const NotificationSection: React.FC = () => {
  const location = useLocation();
  const { account } = useWallet();
  const [notifications, setNotifications] = useState<NotificationList[] | []>([]);
  const [userProfile, setUserProfile] = useLocalStorage('user_profile', { [`${account}`]: { lastLogin: 0 } });
  const [hasUnread, setHasUnread] = useState<boolean>(false);
  const [hasUnclaimentRent, setHasUnclaimentRent] = useState<boolean>(false);

  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
  const containerRef = React.useRef();
  const open = Boolean(anchorEl);

  const { data: userData } = useSubscription(USER_NOTIFICATION_SUBSCRIPTION, {
    skip: account === undefined,
    variables: { id: account?.toLowerCase() },
  });

  const updateUser = useDebounce(async () => {
    if (userData && userData.user) {
      const parsedUser = await parseUser(userData.user);
      const rented = await parseRents(userData.user);

      const listed = parsedUser?.ownerAndConsumerAssets;
      setHasUnclaimentRent(parsedUser.hasUnclaimedRent);
      const notificationsList = await parseNotifications(rented, listed, account ?? '');
      setNotifications(notificationsList);
    } else {
      setNotifications([]);
    }
  }, 500);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const markAllAsRead = () => {
    updateStorageUser();
  };

  const handleClose = () => {
    updateStorageUser();
    setAnchorEl(null);
  };

  const updateStorageUser = () => {
    const user = JSON.parse(localStorage.getItem('user_profile') || '');
    setUserProfile({ ...user, [`${account}`]: { ...user[`${account}`], lastLogin: Date.now() } });
  };

  useEffect(() => {
    updateUser();
  }, [userData]);

  useEffect(() => {
    setAnchorEl(null);
  }, [window.location.pathname, location.state]);

  useEffect(() => {
    if (notifications.length)
      setHasUnread(!!notifications.filter((item) => +item?.time >= userProfile[`${account}`]?.lastLogin).length);
  }, [notifications, userProfile]);

  return (
    <Box ref={containerRef}>
      <StyledPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        container={containerRef.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Notifications
          hasUnread={hasUnread}
          markAllAsRead={markAllAsRead}
          notifications={notifications}
          hasUnclaimentRent={hasUnclaimentRent}
        />
      </StyledPopover>
      <NotificationButton onClick={handleClick}>
        <IconNotification width={24} height={24} notificationSize={9} bubble={hasUnread}>
          <NotificationIcon />
        </IconNotification>
      </NotificationButton>
    </Box>
  );
};

const Notifications: React.FC<Props> = ({ hasUnread, markAllAsRead, notifications, hasUnclaimentRent }) => {
  const PAGE_SIZE = 6;
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [slicedNotifications, setSlicedNotification] = useState<NotificationList[] | []>(
    notifications.slice(0, PAGE_SIZE)
  );
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, { freezeOnceInvisible: true });
  const isVisible = !!entry?.isIntersecting;

  useEffect(() => {
    if (slicedNotifications.length && notifications.length > slicedNotifications.length && isVisible) {
      setSlicedNotification(notifications.slice(0, pageSize + PAGE_SIZE));
      setPageSize((prev) => prev + PAGE_SIZE);
    }
  }, [entry]);

  useEffect(() => {
    setSlicedNotification(notifications.slice(0, PAGE_SIZE));
  }, [notifications]);

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
      {slicedNotifications.length ? (
        <NotificationContainer>
          {slicedNotifications.map((item) => (
            <NotificationMessage key={item.id} item={item} hasUnclaimentRent={hasUnclaimentRent} />
          ))}
          <div ref={ref} />
        </NotificationContainer>
      ) : (
        empty
      )}
    </StyledRoot>
  );
};

export default Notifications;
