import { TypographyProps, styled } from '@mui/system';

import { Box, Typography } from 'design-system';
import { ReactComponent as CrossIcon } from 'resources/svg/cross.svg';

export const RootStyled = styled(Box)(() => ({
  display: 'block',
  width: '100%',
  textAlign: 'center',
  paddingTop: '60px',
}));

export const TypographyStyled = styled(Typography)<TypographyProps>(() => ({
  display: 'block',
  width: '100%',
  textAlign: 'center',
  '&.MuiTypography-h3': {
    color: 'var(--theme-grey900-color)',
    marginTop: '60px',
  },
  '&.MuiTypography-h6': {
    color: 'var(--theme-subtle-color)',
    fontSize: '16px',
  },
}));

export const CrossIconStyled = styled(CrossIcon)(() => ({
  width: '14px !important',
  marginRight: '9px',
  verticalAlign: 'middle',
}));
