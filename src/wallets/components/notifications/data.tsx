import { TWITTER_TEXT } from 'constants/modules';

import { Button } from 'design-system';
import { EndTimerIcon, HourglassIcon, MessageIcon, RentingNotificationIcon } from 'design-system/icons';

import { NotificationDataType } from './notificationTypes';

export const NotificationData: NotificationDataType = {
  newRenting: {
    icon: <RentingNotificationIcon />,
    title: 'New Renting',
    subtitle: (id, name) => {
      return (
        <>
          Claim rent for <a href={`/property/${id}`}> {name}</a>
        </>
      );
    },
    button: (history) => (
      <Button
        onClick={() =>
          history.push({
            pathname: '/explore',
            state: {
              openNewListing: true,
            },
          })
        }
        variant="accentblue"
        sx={{ marginLeft: 'auto', width: '105px !important' }}
        btnSize="xsmall"
      >
        LIST MORE
      </Button>
    ),
  },
  message: {
    icon: <MessageIcon />,
    title: 'New Message in Blockscan',
    subtitle: () => 'Someone send you a message',
    button: (history) => (
      <Button variant="accentblue" sx={{ marginLeft: 'auto', width: '105px !important' }} btnSize="xsmall">
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
    button: (history, id) => (
      <Button
        onClick={() => {
          window.open(
            `https://twitter.com/intent/tweet?text=${TWITTER_TEXT}&url=${window.location.origin}/property/${id}`
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
    icon: <RentingNotificationIcon />,
    title: 'Your Rent on Land Ended',
    subtitle: (id, name) => {
      return (
        <>
          Rent on <a href={`/property/${id}`}> {name}</a> has ended.
        </>
      );
    },
    button: (history, id) => (
      <Button
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
    title: 'Your Rent on Land Ends Soon',
    subtitle: (id, name, countdown) => {
      return (
        <>
          Only {countdown} left on <a href={`/property/${id}`}> {name}</a> .
        </>
      );
    },
    button: (history, id) => (
      <Button
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
