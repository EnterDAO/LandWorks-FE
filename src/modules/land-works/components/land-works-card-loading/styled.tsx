import { Typography, TypographyProps, keyframes, styled } from '@mui/material';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const RootStyled = styled('div')(() => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 362,
}));

export const ContainerStyled = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  zIndex: '10',
}));

export const Spinner = styled('div')(() => ({
  width: '60px',
  height: '60px',
  animation: `${spin} 3s infinite linear`,
}));

export const TypographyStyled = styled(Typography)<TypographyProps>(() => ({
  fontWeight: '600',
  fontSize: '14px',
  lineHeight: '28px',
  color: '#fff',
  marginTop: '20px',
}));
