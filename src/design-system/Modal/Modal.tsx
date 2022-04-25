import { FC } from 'react';

import { CloseIcon } from '../icons';
import {
  CloseIconButtonStyled,
  ModalBoxStyled,
  ModalTitleBoxStyled,
  StyledBackdrop,
  StyledModal,
} from './modal-styles';

interface ModalProps {
  open: boolean;
  title?: string;
  className?: string;
  handleClose: () => void;
  children?: React.ReactNode;
  accessibility?: {
    ariaLabelledby: string;
    ariaDescribedby: string;
  };
  height?: number | string;
}

const Modal: FC<ModalProps> = (props: ModalProps) => {
  const { open, title, handleClose, children, accessibility, height, className = '' } = props;

  return (
    <StyledModal
      className={className}
      {...(accessibility?.ariaLabelledby && { 'aria-labelledby': accessibility.ariaLabelledby })}
      {...(accessibility?.ariaDescribedby && { 'aria-labelledby': accessibility.ariaDescribedby })}
      open={open}
      onClose={handleClose}
      BackdropComponent={StyledBackdrop}
      style={{ height: height }}
    >
      <ModalBoxStyled>
        {!!title && <ModalTitleBoxStyled>{title}</ModalTitleBoxStyled>}

        <CloseIconButtonStyled
          variant="circular"
          btnSize="small"
          icon={<CloseIcon />}
          colorVariant="light"
          onClick={handleClose}
        />

        {children}
      </ModalBoxStyled>
    </StyledModal>
  );
};
export default Modal;
