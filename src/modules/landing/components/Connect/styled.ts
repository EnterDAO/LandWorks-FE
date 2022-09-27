import { styled } from '@mui/material';

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
