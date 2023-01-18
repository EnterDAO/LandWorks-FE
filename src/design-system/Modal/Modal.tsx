import { FC, ReactNode } from 'react';
import { SxProps } from '@mui/system';

import { CloseIcon } from '../icons';
import {
  CloseIconButtonStyled,
  ModalBoxStyled,
  ModalTitleBoxStyled,
  StyledBackdrop,
  StyledModal,
} from './modal-styles';

export interface ModalProps {
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
  maxHeight?: number | string;
  height?: number | string;
  sx?: SxProps;
}

const Modal: FC<ModalProps> = (props: ModalProps) => {
  const { open, title, handleClose, maxHeight, children, accessibility, width, height, className = '', sx } = props;

  // NOTE: workaround to pass BackdropComponent prop
  const componentsProps = {
    BackdropComponent: StyledBackdrop,
  } as any;

  return (
    <StyledModal
      className={className}
      {...(accessibility?.ariaLabelledby && { 'aria-labelledby': accessibility.ariaLabelledby })}
      {...(accessibility?.ariaDescribedby && { 'aria-labelledby': accessibility.ariaDescribedby })}
      open={open}
      sx={{
        maxHeight,
        height,
      }}
      onClose={handleClose}
      {...componentsProps}
    >
      <ModalBoxStyled sx={sx} style={{ width: width }}>
        {!!title && <ModalTitleBoxStyled as="div">{title}</ModalTitleBoxStyled>}

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
