import { useHistory } from 'react-router-dom';
import { useLocalStorage } from 'react-use-storage';

import { useWallet } from 'wallets/wallet';

import { NotificationData } from './data';
import { NotificationList } from './notificationTypes';
import { IconWrapper, MessageRoot, StyledGrid, StyledSubtitle, StyledTypography } from './styled';

import { countdown } from './utils';

interface INotification {
  item: NotificationList;
  hasUnclaimentRent: boolean;
}

const NotificationMessage: React.FC<INotification> = ({ item, hasUnclaimentRent }) => {
  const { account } = useWallet();
  const [userProfile] = useLocalStorage('user_profile', { [`${account}`]: { lastLogin: 0 } });
  const history = useHistory();
  const isNewNotification = userProfile ? item.time >= userProfile[`${account}`]?.lastLogin : true;

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
        <StyledSubtitle>{notification.subtitle(item.landId, item.name)}</StyledSubtitle>
      </StyledGrid>
      {notification.button({
        history,
        id: item.landId,
        isAvailable: item.isAvailable,
        hasUnclaimentRent,
      })}
      <StyledTypography sx={{ width: 55, textAlign: 'end', color: styleHandler.color }}>
        {countdown(secondsFromNow, true)}
      </StyledTypography>
    </MessageRoot>
  );
};

export default NotificationMessage;
