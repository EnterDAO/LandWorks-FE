import { Ref, forwardRef } from 'react';
import ButtonUnstyled, { ButtonUnstyledProps } from '@mui/base/ButtonUnstyled';
import { Box, SxProps } from '@mui/material';

import Icon from '../icons/Icon';
import buttonStyles from './button-styles';

interface ButtonProps extends ButtonUnstyledProps {
  variant: 'gradient' | 'primary' | 'secondary' | 'tertiary' | 'accentblue';
  btnSize?: 'xsmall' | 'small' | 'medium' | 'large' | 'fluid' | 'auto';
  iconLeft?: JSX.Element;
  iconRight?: JSX.Element;
  sx?: SxProps;
}

type ButtonRef = HTMLButtonElement;

const Button = (props: ButtonProps, ref: Ref<ButtonRef>) => {
  const { variant, children, disabled, className, btnSize, iconLeft, iconRight, sx } = props;

  const btnClassNames: string[] = [variant];
  let iconSize: 'm' | 'xs' = 'm';

  if (className) {
    btnClassNames.push(className);
  }

  if (variant === 'tertiary' && btnSize === 'small') {
    btnClassNames.push('tertiary-small');
    iconSize = 'xs';
  }

  if (variant !== 'tertiary') {
    btnClassNames.push(btnSize || 'large');
  }

  const copyProps = { ...props };
  delete copyProps.btnSize;
  delete copyProps.iconLeft;
  delete copyProps.iconRight;

  return (
    <ButtonUnstyled
      {...copyProps}
      component={buttonStyles}
      sx={sx}
      className={btnClassNames.join(' ')}
      disabled={disabled}
      ref={ref}
    >
      {iconLeft && <Icon iconElement={iconLeft} iconSize={iconSize} mr={children ? 2 : 0} />}
      <Box position="relative" zIndex={1} component="span">
        {children}
      </Box>
      {iconRight && variant === 'tertiary' && (
        <Icon iconElement={iconRight} iconSize={iconSize} ml={children ? 2 : 0} />
      )}
    </ButtonUnstyled>
  );
};

export default forwardRef<ButtonRef, ButtonProps>(Button);
