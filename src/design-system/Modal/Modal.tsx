import { FC } from 'react';
import { Box } from '@mui/system';

import IconButton from '../IconButton/IconButton';
import { CloseIcon } from '../icons';
import { StyledBackdrop, StyledModal, modalStyles } from './modal-styles';

interface ModalProps {
  open: boolean;
  className?: string;
  handleClose: () => void;
  children?: React.ReactNode;
  accessibility?: {
    ariaLabelledby: string;
    ariaDescribedby: string;
  };
}

const Modal: FC<ModalProps> = (props: ModalProps) => {
  const { open, handleClose, children, accessibility, className = '' } = props;

  return (
    <StyledModal
      className={className}
      {...(accessibility?.ariaLabelledby && { 'aria-labelledby': accessibility.ariaLabelledby })}
      {...(accessibility?.ariaDescribedby && { 'aria-labelledby': accessibility.ariaDescribedby })}
      open={open}
      onClose={handleClose}
      BackdropComponent={StyledBackdrop}
    >
      <Box sx={modalStyles.modalBox}>
        <IconButton
          variant="circular"
          btnSize="small"
          icon={<CloseIcon />}
          colorVariant="light"
          sx={modalStyles.closeIcon}
          onClick={handleClose}
        />
        {children}
      </Box>
    </StyledModal>
  );
};
export default Modal;
