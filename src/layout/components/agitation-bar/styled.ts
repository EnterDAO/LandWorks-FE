import { styled } from '@mui/material';

import { IconButton } from 'design-system';

export const StyledRoot = styled('div')({
  padding: '12px var(--horizontal-padding)',
  height: 50,
  backgroundColor: 'var(--theme-accent-color)',
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  zIndex: 999,
  width: '100%',

  '@media (max-width: 400px)': {
    padding: '12px 15px',
  },
});

export const CloseIconButtonStyled = styled(IconButton)({
  marginLeft: 'auto !important',
  color: 'var(--theme-accent-color) !important',
});

export const StyledTitle = styled('span')({
  fontSize: 14,
  color: 'var(--theme-grey900-color)',
  marginRight: 20,

  '@media (max-width: 400px)': {
    width: 175,
  },
});
