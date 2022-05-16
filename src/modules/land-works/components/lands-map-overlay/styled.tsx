import { Chip, ChipProps, Typography, TypographyProps, styled } from '@mui/material';

export const RootStyled = styled('div')(() => ({
  position: 'absolute',
  bottom: '4%',
  right: '4%',
  display: 'block',
  backgroundColor: 'var(--theme-body-color)',
  padding: '16px',
  borderRadius: '20px',
}));

export const TypographyStyled = styled(Typography)<TypographyProps>(() => ({
  fontSize: '14px',
  lineHeight: '28px',
  color: '#fff',
}));

export const ChipStyled = styled(Chip)<ChipProps>(() => ({
  minWidth: '115px',
  display: 'inline-block',
  margin: '0 0.25rem 0.3rem 0',
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

export const PlotContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  '& p': {
    color: '#fff',
    marginRight: 10,
    cursor: 'default',
  },
}));
