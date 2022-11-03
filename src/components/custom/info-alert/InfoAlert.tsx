import React, { ComponentPropsWithoutRef, FC, ReactElement, ReactNode } from 'react';
import { Typography, styled } from '@mui/material';
import { Box } from '@mui/system';

import { THEME_COLORS } from 'themes/theme-constants';

const AlertTriangleIcon = () => {
  return (
    <svg width="20" height="20" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M47.2918 36.4583L30.4168 7.29167C28.7502 4.375 24.7918 3.33334 21.8752 5C20.8335 5.625 20.0002 6.45834 19.5835 7.29167L2.7085 36.4583C1.04183 39.375 2.0835 43.3333 5.00017 45C6.04183 45.625 7.0835 45.8333 8.12517 45.8333H41.6668C45.2085 45.8333 47.9168 42.9167 47.9168 39.5833C48.1252 38.3333 47.7085 37.2917 47.2918 36.4583ZM25.0002 37.5C23.7502 37.5 22.9168 36.6667 22.9168 35.4167C22.9168 34.1667 23.7502 33.3333 25.0002 33.3333C26.2502 33.3333 27.0835 34.1667 27.0835 35.4167C27.0835 36.6667 26.2502 37.5 25.0002 37.5ZM27.0835 27.0833C27.0835 28.3333 26.2502 29.1667 25.0002 29.1667C23.7502 29.1667 22.9168 28.3333 22.9168 27.0833V18.75C22.9168 17.5 23.7502 16.6667 25.0002 16.6667C26.2502 16.6667 27.0835 17.5 27.0835 18.75V27.0833Z"
        fill="currentColor"
      />
    </svg>
  );
};

const InfoAlertRoot = styled('div')({
  display: 'flex',
  alignItems: 'center',
  padding: '10px 15px',
  gap: 10,
  borderRadius: 10,
  backgroundColor: 'rgba(93, 143, 240, 0.2)',
});

interface InfoAlertProps extends Omit<ComponentPropsWithoutRef<typeof InfoAlertRoot>, 'title'> {
  title: ReactNode;
  description: ReactNode;
  icon?: ReactElement;
  action?: ReactElement;
}

const InfoAlert: FC<InfoAlertProps> = ({ icon, title, description, action, ...otherProps }) => {
  return (
    <InfoAlertRoot {...otherProps}>
      <Box flexShrink={0} display="flex" color="var(--theme-blue-color)">
        {icon || <AlertTriangleIcon />}
      </Box>

      <Box>
        <Typography variant="h4" mb={1}>
          {title}
        </Typography>
        <Typography fontWeight={400} color={THEME_COLORS.grey03}>
          {description}
        </Typography>
      </Box>

      <Box ml="auto" flexShrink={0}>
        {action}
      </Box>
    </InfoAlertRoot>
  );
};

export default InfoAlert;
