import React, { Ref, forwardRef } from 'react';
import { Box, BoxProps } from '@mui/material';

import Icon from '../icons/Icon';
import iconButtonStyles from './icon-button-styles';

interface IconButtonProps extends BoxProps<'button'> {
  variant: 'rectangular' | 'circular';
  btnSize: 'small' | 'medium' | 'large';
  icon: JSX.Element;
  colorVariant: 'grey' | 'darkblue' | 'light' | 'lightOpacity' | 'accentblue' | 'transparent';
  outlineFocusColorVariant?: 'accentblue' | 'grey' | 'darkblue';
  outlineFocusVariant?: 'rectangular' | 'circular';
}

const iconSizeMap = {
  rectangular: {
    large: 'm',
    medium: 's',
    small: 'xs',
  },
  circular: {
    large: 's',
    medium: 18,
    small: 's',
  },
} as const;

const IconButton = (props: IconButtonProps, ref: Ref<HTMLButtonElement>) => {
  const { variant, btnSize, icon, colorVariant, outlineFocusColorVariant, outlineFocusVariant, sx, className } = props;

  const btnClassNames: string[] = [variant, btnSize, `color-${colorVariant}`];

  if (className) btnClassNames.push(className);

  if (variant === 'circular') {
    btnClassNames.push(outlineFocusColorVariant ? `outline-${outlineFocusColorVariant}` : 'outline-accentblue');
    btnClassNames.push(outlineFocusVariant ? `outline-${outlineFocusVariant}` : 'outline-circular');
  }

  const iconSize = iconSizeMap[variant][btnSize];

  return (
    <Box
      component="button"
      {...props}
      ref={ref}
      sx={{
        ...iconButtonStyles,
        ...sx,
      }}
      className={btnClassNames.join(' ')}
    >
      <Icon iconElement={icon} iconSize={iconSize} position="relative" />
    </Box>
  );
};

export default forwardRef(IconButton);
