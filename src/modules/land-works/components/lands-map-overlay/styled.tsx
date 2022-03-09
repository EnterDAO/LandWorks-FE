import { Chip, ChipProps, Typography, TypographyProps, styled } from '@mui/material';

export const RootStyled = styled('div')(() => ({
  position: 'absolute',
  bottom: '4%',
  right: '4%',
  display: 'block',
  backgroundColor: 'var(--theme-body-color)',
  padding: '16px',
  borderRadius: '20px',
  maxWidth: '17rem',
}));

export const TypographyStyled = styled(Typography)<TypographyProps>(() => ({
  fontSize: '14px',
  lineHeight: '28px',
  color: '#fff',
}));

export const StackStyled = styled('div')(() => ({
  display: 'block',
}));

export const ChipStyled = styled(Chip)<ChipProps>(() => ({
  display: 'inline-block',
  // width: 'calc(50% - 0.3rem)',
  margin: '0 0.25rem 0.3rem 0',
  float: 'left',
  backgroundColor: 'var(--theme-modal-color)',
  color: 'var(--theme-subtle-color)',
  fontSize: '14px',
  fontWeight: 700,
  lineHeight: '28px',
  height: '28px',
  borderRadius: '5px',
  border: 0,
  whiteSpace: 'normal',
  textAlign: 'center',
}));
