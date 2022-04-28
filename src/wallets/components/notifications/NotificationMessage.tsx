import { useHistory } from 'react-router-dom';
import { useLocalStorage } from 'react-use-storage';

import { NotificationData } from './data';
import { NotificationList } from './notificationTypes';
import { IconWrapper, MessageRoot, StyledGrid, StyledSubtitle, StyledTypography } from './styled';

import { countdown } from './utils';

const NotificationMessage: React.FC<{ item: NotificationList }> = ({ item }) => {
  const [lastLogin] = useLocalStorage<number>('user_profile', 0);
  const history = useHistory();
  const isNewNotification = lastLogin ? item.time >= lastLogin : true;

  const styleHandler = {
    background: isNewNotification ? 'rgba(93, 143, 240, 0.1)' : '',
    borderBottom: `1px solid ${isNewNotification ? 'var(--theme-card-color)' : '#27273A'}`,
    color: isNewNotification ? 'var(--theme-light-color)' : 'var(--theme-grey700-color)',
  };
  const secondsFromNow = (Date.now() - item.time) / 1000;
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
        <StyledSubtitle>{notification.subtitle(item.landId, item.name, item?.countdown)}</StyledSubtitle>
      </StyledGrid>
      {notification.button(history, item.landId)}
      <StyledTypography sx={{ width: 40, textAlign: 'end', color: styleHandler.color }}>
        {countdown(secondsFromNow, true)}
      </StyledTypography>
    </MessageRoot>
  );
};

export default NotificationMessage;
