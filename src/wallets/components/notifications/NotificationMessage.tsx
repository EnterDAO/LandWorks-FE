import { useLocalStorage } from 'react-use-storage';
import { Typography } from '@mui/material';
import moment from 'moment';

import { NotificationData } from './data';
import { NotificationList } from './notificationTypes';
import { IconWrapper, MessageRoot, StyledGrid, StyledTypography } from './styled';

const NotificationMessage: React.FC<{ item: NotificationList }> = ({ item }) => {
  const [value] = useLocalStorage<number>('user_profile', 0);

  const isNewNotification = value ? Date.now() <= value : true;
  const styleHandler = {
    background: isNewNotification ? 'rgba(93, 143, 240, 0.1)' : '',
    borderBottom: `1px solid ${isNewNotification ? 'var(--theme-card-color)' : '#27273A'}`,
    color: isNewNotification ? 'var(--theme-light-color)' : 'var(--theme-grey700-color)',
  };

  const notification = NotificationData[item.type];
  return (
    <MessageRoot
      container
      sx={{
        background: styleHandler.background,
        borderBottom: styleHandler.borderBottom,
      }}
    >
      <IconWrapper>{notification.icon}</IconWrapper>
      <StyledGrid>
        <StyledTypography fontSize={14}>{notification.title}</StyledTypography>
        <Typography fontSize={14}>{notification.subtitle(item.landId, item.name)}</Typography>
      </StyledGrid>
      {notification.button}
      <StyledTypography sx={{ width: 60, textAlign: 'end', color: styleHandler.color }}>
        {moment(item.time).fromNow()}
      </StyledTypography>
    </MessageRoot>
  );
};

export default NotificationMessage;
