import { styled } from '@mui/material/styles';

export const StyledRoot = styled('div')(() => ({
  width: '100%',
  height: '600px',
  '*': {
    pointerEvents: 'all',
    borderRadius: '0px !important',
    overflow: 'hidden',
  },
}));
