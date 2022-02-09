import ModalUnstyled from '@mui/base/ModalUnstyled';
import { styled } from '@mui/system';

import { THEME_COLORS } from '../../themes/theme-constants';

const StyledModal = styled(ModalUnstyled)({
  position: 'fixed',
  // TODO: We need to extract z-indexes in constants
  zIndex: '1300',
  right: '0',
  top: '0',
  left: '0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
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

const modalStyles = {
  modalBox: {
    width: 500,
    position: 'relative',
    backgroundColor: THEME_COLORS.darkBlue02,
    borderRadius: '0px 0px 15px 15px',
    boxShadow: '0px 0px 20px 10px rgba(0, 0, 0, 0.3)',
    padding: '55px 40px 40px 40px',
    textAlign: 'center',
  },
  closeIcon: {
    position: 'absolute',
    right: '20px',
    top: '20px',
  },
} as const;

export { StyledModal, StyledBackdrop, modalStyles };
