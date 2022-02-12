import { Box } from '@mui/system';

import { BEFORE_ELEMENT_BASE } from 'themes/utility-styles';

import { THEME_COLORS } from 'themes/theme-constants';

const styles = {
  defaultStyle: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    padding: '25px',
    paddingRight: '54px',
    width: '365px',
    minHeight: '135px',
    background: THEME_COLORS.primaryGradient,
    color: THEME_COLORS.light,
    borderRadius: '10px',
    '&::before': {
      ...BEFORE_ELEMENT_BASE,
      background: THEME_COLORS.primaryGradient,
      opacity: 0.7,
      filter: 'blur(20px)',
      zIndex: -1,
    },
  },
} as const;

type NotificationMessageProps = {
  children: React.ReactNode;
};

const NotificationMessage = (props: NotificationMessageProps) => {
  const { children } = props;

  return <Box sx={styles.defaultStyle}>{children}</Box>;
};

export default NotificationMessage;
