import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocalStorage } from 'react-use-storage';

import { useWallet } from 'wallets/wallet';

import { NotificationData } from './data';
import { NotificationList } from './notificationTypes';
import { AnimatedSubtitle, IconWrapper, MessageRoot, StyledGrid, StyledSubtitle, StyledTypography } from './styled';

import { calculateNotificationAnimation, countdown } from './utils';

interface INotification {
  item: NotificationList;
  hasUnclaimentRent: boolean;
}

const NotificationMessage: React.FC<INotification> = ({ item, hasUnclaimentRent }) => {
  const { account } = useWallet();
  const [userProfile] = useLocalStorage('user_profile', { [`${account}`]: { lastLogin: 0 } });
  const history = useHistory();
  const ref = useRef<HTMLDivElement>(null);
  const isNewNotification = userProfile ? item.time >= userProfile[`${account}`]?.lastLogin : true;

  const styleHandler = {
    background: isNewNotification ? 'rgba(93, 143, 240, 0.1)' : '',
    borderBottom: `1px solid ${isNewNotification ? 'var(--theme-card-color)' : '#27273A'}`,
    color: isNewNotification ? 'var(--theme-light-color)' : 'var(--theme-grey700-color)',
  };
  const secondsFromNow = (Date.now() - item.time) / 1000;
  const notification = NotificationData[item.type];

  const subtitleLength = ref.current ? ref?.current?.innerText?.length : 0;
  const animatedOptions = {
    start: 38,
    duration: subtitleLength / 6,
  };
  const isAnimated = subtitleLength >= animatedOptions.start;

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
        <StyledTypography sx={{ marginBottom: isAnimated ? '18px' : '' }} fontSize={14}>
          {notification.title}
        </StyledTypography>
        {isAnimated ? (
          <>
            <AnimatedSubtitle
              sx={{
                animationDuration: `${animatedOptions.duration}s`,
                animationName: `${calculateNotificationAnimation(subtitleLength)}`,
              }}
              ref={ref}
            >
              {notification.subtitle(item.landId, item.name)}
            </AnimatedSubtitle>
          </>
        ) : (
          <StyledSubtitle ref={ref}>{notification.subtitle(item.landId, item.name)}</StyledSubtitle>
        )}
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
