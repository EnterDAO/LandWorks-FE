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
    button: (
      <Button variant="accentblue" sx={{ marginLeft: 'auto', width: '105px !important' }} btnSize="xsmall">
        CLAIM
      </Button>
    ),
  },
  message: {
    icon: <MessageIcon />,
    title: 'New Message in Blockscan',
    subtitle: (id, name) => 'Someone send you a message',
    button: (
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
    button: <div style={{ marginLeft: 'auto', width: '105px' }} />,
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
    button: (
      <Button variant="accentblue" sx={{ marginLeft: 'auto', width: '105px !important' }} btnSize="xsmall">
        RENT AGAIN
      </Button>
    ),
  },
  endSoon: {
    icon: <HourglassIcon />,
    title: 'Your Rent on Land Ends Soon',
    subtitle: (id, name) => {
      return (
        <>
          Only 3 days left on <a href={`/property/${id}`}> {name}</a> .
        </>
      );
    },
    button: (
      <Button variant="accentblue" sx={{ marginLeft: 'auto', width: '105px !important' }} btnSize="xsmall">
        RENT AGAIN
      </Button>
    ),
  },
};
