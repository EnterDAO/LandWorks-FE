import { styled } from '@mui/material/styles';

export const BreadCrumbs = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
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

export const Separator = styled('p')(() => ({
  margin: '0 20px',
  width: '20px',
  height: '0px',
  borderRadius: '2px',

  border: '1px solid var(--theme-separator-color)',
  transform: 'rotate(90deg)',
}));
