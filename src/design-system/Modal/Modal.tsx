import { FC, ReactNode } from 'react';

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
  title?: ReactNode;
  className?: string;
  handleClose: () => void;
  children?: ReactNode;
  accessibility?: {
    ariaLabelledby: string;
    ariaDescribedby: string;
  };
  width?: number | string;
  height?: number | string;
}

const Modal: FC<ModalProps> = (props: ModalProps) => {
  const { open, title, handleClose, children, accessibility, width, height, className = '' } = props;

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
      <ModalBoxStyled style={{ width: width }}>
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
