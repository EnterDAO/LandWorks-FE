import { styled } from '@mui/material';

export const StyledLabel = styled('div')(() => ({
  paddingLeft: '0px',
  '& span': {
    marginLeft: '5px',
    color: 'var(--theme-subtle-color)',
    padding: '0 5px',
    borderRadius: '5px',
    backgroundColor: '#272739',
    fontWeight: '500',
  },
}));
