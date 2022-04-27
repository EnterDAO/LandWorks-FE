import { Typography } from '@mui/material';

import { Notification } from 'components/custom/notification';
import { Button, Grid } from 'design-system';
import { PostBoxIcon } from 'design-system/icons';
import { useGeneral } from 'providers/general-provider';
import { useNotifications } from 'providers/notifications-provider';

import {
  EmptyContainer,
  IconWrapper,
  MessageRoot,
  StyledGrid,
  StyledRoot,
  StyledTitle,
  StyledTitleRow,
  StyledTypography,
} from './styled';

interface Props {
  hasUnread: boolean;
  markAllAsRead: () => void;
}

const Notifications: React.FC<Props> = ({ hasUnread, markAllAsRead }) => {
  const { isDarkTheme } = useGeneral();
  const { notifications } = useNotifications();

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
        <>
          <RentingNotification startedAt={Date.now() + 100000} time={'3 s'} />
          <MessageNotification startedAt={Date.now()} time={'15 min'} />
          <RentEndNotification startedAt={Date.now() - 100} time={'5 d'} />
        </>
      ) : (
        empty
      )}
    </StyledRoot>
  );
};

// type NotificationType = 'newRenting' | 'message' | 'rentEnded' | 'yourRentEnded' | 'endSoon';

// type Foo = {
//   [K in NotificationType]: any;
// };

// const obj: Foo = {
//   newRenting: {
//     icon: 'a',
//     title: 'New Renting',
//     subtitle: (id: string, name: string) => {
//       return (
//         <>
//           Claim rent for <a href={`/property/${id}`}> {name}</a>
//         </>
//       );
//     },
//     button: (
//       <Button variant="accentblue" sx={{ marginLeft: 'auto' }} btnSize="xsmall">
//         CLAIM
//       </Button>
//     ),
//   },
//   message: {},
//   rentEnded: {},
//   yourRentEnded: {},
//   endSoon: {},
// };

const RentingNotification: React.FC<{ startedAt: number; time: string }> = ({ startedAt, time }) => {
  const isNewNotification = Date.now() <= startedAt;

  return (
    <MessageRoot
      container
      sx={{
        background: isNewNotification ? 'rgba(93, 143, 240, 0.1)' : '',
      }}
    >
      <IconWrapper>a</IconWrapper>
      <StyledGrid>
        <StyledTypography fontSize={14}>New Renting</StyledTypography>
        <Typography fontSize={14}>
          Claim rent for <a href="/property/123">Land (-12,123)</a>
        </Typography>
      </StyledGrid>
      <Button variant="accentblue" sx={{ marginLeft: 'auto' }} btnSize="xsmall">
        CLAIM
      </Button>
      <StyledTypography sx={{ width: 60, textAlign: 'end' }}>{time}</StyledTypography>
    </MessageRoot>
  );
};

const MessageNotification: React.FC<{ startedAt: number; time: string }> = ({ startedAt, time }) => {
  const isNewNotification = Date.now() <= startedAt;
  return (
    <MessageRoot
      container
      sx={{
        background: isNewNotification ? 'rgba(93, 143, 240, 0.1)' : '',
      }}
    >
      <IconWrapper>a</IconWrapper>
      <StyledGrid>
        <StyledTypography fontSize={14}>New Message in Blockscan</StyledTypography>
        <Typography fontSize={14}>Someone send you a message</Typography>
      </StyledGrid>
      <Button variant="accentblue" sx={{ marginLeft: 'auto' }} btnSize="xsmall">
        OPEN
      </Button>
      <StyledTypography sx={{ width: 60, textAlign: 'end' }}>{time}</StyledTypography>
    </MessageRoot>
  );
};

const RentEndNotification: React.FC<{ startedAt: number; time: string }> = ({ startedAt, time }) => {
  const isNewNotification = Date.now() <= startedAt;
  return (
    <MessageRoot
      container
      sx={{
        background: isNewNotification ? 'rgba(93, 143, 240, 0.1)' : '',
      }}
    >
      <IconWrapper>a</IconWrapper>
      <StyledGrid>
        <StyledTypography fontSize={14}>Rent on Your Land Ended</StyledTypography>
        <Typography fontSize={14}>
          Rent on <a href="/property/123">Land (-12,123)</a> has ended.
        </Typography>
      </StyledGrid>
      <div style={{ marginLeft: 'auto' }} />
      <StyledTypography sx={{ width: 60, textAlign: 'end' }}>{time}</StyledTypography>
    </MessageRoot>
  );
};

export default Notifications;
