import { CircularProgress, circularProgressClasses, styled } from '@mui/material';

export const CircularProgressBackground = styled(CircularProgress, { skipSx: true })(() => {
  return {
    color: 'rgba(248, 248, 255, 0.2)',
  };
});

export const CircularProgressForeground = styled(CircularProgress, { skipSx: true })(() => {
  return {
    position: 'absolute',
    left: 0,
    color: 'var(--theme-light-color)',
    [`& .${circularProgressClasses.circle}`]: {
      strokeLinecap: 'round',
    },
  };
});
