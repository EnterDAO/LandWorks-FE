import { Link, styled } from '@mui/material';

export const StyledRoot = styled('div')(() => ({
  maxWidth: 545,
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 80,

  '& h2': {
    color: 'var(--theme-grey900-color)',
    fontSize: 20,
    margin: '20px 0 5px 0',
  },
}));

export const IconsRaw = styled('div')(() => ({
  margin: 'auto',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  width: 467,
  paddingBottom: 80,
  borderBottom: '2px solid #27273A',
}));

export const LinksRaw = styled('div')(() => ({
  margin: 'auto',
  marginTop: 50,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: 479,
  '& a': {
    color: 'var(--theme-grey900-color)',
    textDecoration: 'none',
  },
}));

export const Copyright = styled('div')(() => ({
  marginTop: 50,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
}));

export const StyledForm = styled('form')(() => ({
  marginTop: 30,
  background: '#27273A',
  display: 'flex',
  justifyContent: 'space-between',
  padding: 6,
  borderRadius: 10,
}));

export const StyledInput = styled('input')(() => ({
  width: '95%',
  border: 'none',
  outline: 'none',
  background: 'transparent',
  padding: 20,
  fontSize: 14,
  color: '#B9B9D3',
}));

export const StyledLink = styled(Link)(() => ({
  margin: '0 5px',
  height: 60,
  width: 60,
  background: '#1E1E2E',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 10,
  '& a': {
    color: 'var(--theme-grey900-color)',
  },
}));
