import ModalUnstyled from '@mui/base/ModalUnstyled';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';

import { Box, IconButton } from 'design-system';

import { THEME_COLORS } from 'themes/theme-constants';

const StyledModal = styled(ModalUnstyled)({
  position: 'fixed',
  // TODO: We need to extract z-indexes in constants
  zIndex: '1000',
  right: '0',
  top: '0',
  bottom: '0',
  left: '0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 20,
  background: `rgba(${THEME_COLORS.darkBlue02}, 0.4)`,
});

const StyledBackdrop = styled('div')({
  zIndex: '-1',
  position: 'fixed',
  right: '0',
  bottom: '0',
  top: '0',
  left: '0',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
});

export const ModalBoxStyled = styled(Box)({
  width: 'auto',
  maxHeight: 858,
  position: 'relative',
  background: THEME_COLORS.darkBlue03,
  borderRadius: '40px',
  boxShadow: '0px 0px 20px 10px rgba(0, 0, 0, 0.3)',
  padding: '2rem 40px 40px 40px',
  textAlign: 'center',
});

export const ModalTitleBoxStyled = styled(Typography)({
  position: 'absolute',
  left: '0px',
  top: '30px',
  padding: '0 30px',
  fontWeight: '900',
  width: '100%',
  textAlign: 'left',
});

export const CloseIconButtonStyled = styled(IconButton)({
  position: 'absolute',
  right: '30px',
  top: '30px',
});

export { StyledModal, StyledBackdrop };
