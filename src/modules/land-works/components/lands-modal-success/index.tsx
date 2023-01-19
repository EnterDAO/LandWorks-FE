import React from 'react';
import { Box, Stack } from '@mui/material';

import Typography from 'components/common/Typography';
import { Button } from 'design-system';
import { SuccessStarIcon } from 'design-system/icons';

import { THEME_COLORS } from 'themes/theme-constants';

import './index.scss';

interface ModalProps {
  title: string;
  description: string;
  buttonText: string;
  buttonEvent: () => void;
}

export const ModalSuccess: React.FC<ModalProps> = ({ title, description, buttonEvent, buttonText }) => {
  return (
    <Stack width={420}>
      <Box mb={4} display="flex" justifyContent="center">
        <SuccessStarIcon />
      </Box>

      <Typography fontSize={25} variant="h2" mb={2}>
        {title}
      </Typography>

      <Typography component="p" color={THEME_COLORS.grey03} variant="caption" mb={8}>
        {description}
      </Typography>

      <Stack display="flex" alignItems="center" gap={6}>
        <Button variant="gradient" btnSize="medium" onClick={buttonEvent}>
          {buttonText}
        </Button>
      </Stack>
    </Stack>
  );
};
