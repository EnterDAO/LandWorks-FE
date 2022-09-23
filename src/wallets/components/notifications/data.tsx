import { Button } from 'design-system';
import { EndTimerIcon, HourglassIcon, MessageIcon, RentingNotificationIcon } from 'design-system/icons';
import { APP_ROUTES } from 'router/routes';

import { NotificationDataType } from './notificationTypes';

import { TWITTER_PROMOTE_TEXT } from 'modules/land-works/constants';

export const NotificationData: NotificationDataType = {
  newRenting: {
    icon: <RentingNotificationIcon />,
    title: 'New Renting',
    subtitle: (id, name) => {
      return (
        <>
          <a href={`/property/${id}`}> {name}</a> was rented.
        </>
      );
    },
    button: ({ history, hasUnclaimentRent }) => (
      <Button
        disabled={!hasUnclaimentRent}
        onClick={() =>
          history.push({
            pathname: APP_ROUTES.myProperties,
            state: {
              openClaimModal: true,
            },
          })
        }
        variant="accentblue"
        sx={{ marginLeft: 'auto', width: '105px !important' }}
        btnSize="xsmall"
      >
        CLAIM
      </Button>
    ),
  },
  message: {
    icon: <MessageIcon />,
    title: 'New Message in Blockscan',
    subtitle: () => 'Someone send you a message',
    button: () => (
      <Button
        variant="accentblue"
        onClick={() => {
          window.open('https://chat.blockscan.com/', '_blank');
        }}
        sx={{ marginLeft: 'auto', width: '105px !important' }}
        btnSize="xsmall"
      >
        CHAT
      </Button>
    ),
  },
  rentEnded: {
    icon: <EndTimerIcon />,
    title: 'Rent on Your Land Ended',
    subtitle: (id, name) => {
      return (
        <>
          Rent on <a href={`/property/${id}`}> {name}</a> has ended.
        </>
      );
    },
    button: ({ id }) => (
      <Button
        onClick={() => {
          window.open(
            `https://twitter.com/intent/tweet?text=${TWITTER_PROMOTE_TEXT}&url=${window.location.origin}/property/${id}`
          );
        }}
        variant="accentblue"
        sx={{ marginLeft: 'auto', width: '105px !important' }}
        btnSize="xsmall"
      >
        PROMOTE
      </Button>
    ),
  },
  yourRentEnded: {
    icon: <EndTimerIcon />,
    title: 'Your Rent on Land Ended',
    subtitle: (id, name) => {
      return (
        <>
          Rent on <a href={`/property/${id}`}> {name}</a> has ended.
        </>
      );
    },
    button: ({ history, id, isAvailable }) => (
      <Button
        disabled={!isAvailable}
        onClick={() => history.push(`/property/${id}`)}
        variant="accentblue"
        sx={{ marginLeft: 'auto', width: '105px !important' }}
        btnSize="xsmall"
      >
        RENT AGAIN
      </Button>
    ),
  },
  endSoon: {
    icon: <HourglassIcon />,
    title: 'Your Rent on Land is halfway',
    subtitle: (id, name) => {
      return (
        <>
          Extend rent on <a href={`/property/${id}`}> {name}</a> .
        </>
      );
    },
    button: ({ history, id, isAvailable }) => (
      <Button
        disabled={!isAvailable}
        onClick={() => history.push(`/property/${id}`)}
        variant="accentblue"
        sx={{ marginLeft: 'auto', width: '105px !important' }}
        btnSize="xsmall"
      >
        RENT AGAIN
      </Button>
    ),
  },
};
