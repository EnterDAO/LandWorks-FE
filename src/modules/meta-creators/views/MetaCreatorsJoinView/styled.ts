import { styled } from '@mui/material/styles';

export const BreadCrumbs = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 25,
  '& span': {
    fontSize: '14px',
  },
  '& .button-icon': {
    backgroundColor: 'var(--theme-card-color)',
    height: '48px',
    width: '48px',
    borderRadius: '50%',
    marginRight: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
