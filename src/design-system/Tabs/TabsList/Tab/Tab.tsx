import { FC } from 'react';
import { TabUnstyledProps } from '@mui/base/TabUnstyled';
import { Typography } from '@mui/material';

import { StyledTab, notificationsCountStyles } from './tab-styles';

import { THEME_COLORS } from '../../../../themes/theme-constants';

interface TabProps extends TabUnstyledProps {
  notificationsCount?: number;
}

const Tab: FC<TabProps> = ({ notificationsCount, children, ...otherProps }) => {
  return (
    <StyledTab {...otherProps}>
      <Typography
        variant="button"
        component="span"
        display="flex"
        alignItems="center"
        sx={{ color: THEME_COLORS.grey02 }}
      >
        {children}
        {notificationsCount !== undefined && notificationsCount > 0 && (
          <Typography ml={1} component="span" variant="body2" sx={notificationsCountStyles}>
            {notificationsCount}
          </Typography>
        )}
      </Typography>
    </StyledTab>
  );
};
export default Tab;
