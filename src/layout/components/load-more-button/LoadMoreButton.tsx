import React, { FC } from 'react';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { SxProps, styled } from '@mui/material/styles';

import { Button, Stack, Typography } from 'design-system';

import { THEME_COLORS } from 'themes/theme-constants';

const ProgressBar = styled(LinearProgress)(() => ({
  height: 5,
  borderRadius: 3,
  width: 160,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: THEME_COLORS.grey02,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: THEME_COLORS.light,
  },
}));

export interface LoadMoreButtonProps {
  listed?: number;
  total?: number;
  disabled?: boolean;
  loading?: boolean;
  sx?: SxProps;
  onLoadMore?: () => void;
}

const LoadMoreButton: FC<LoadMoreButtonProps> = ({ listed = 0, total = 0, disabled, loading, sx, onLoadMore }) => {
  return (
    <Stack sx={sx} alignItems="center">
      <Typography mb={2} variant="button">
        Listed {listed} of {total}
      </Typography>

      <ProgressBar sx={{ mb: 4 }} variant="determinate" value={(listed * 100) / total} />

      <Button onClick={onLoadMore} variant="gradient" btnSize="medium" disabled={disabled}>
        {loading ? 'Loading...' : 'Load More'}
      </Button>
    </Stack>
  );
};

export default LoadMoreButton;
