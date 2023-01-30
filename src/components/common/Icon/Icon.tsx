import React, { ComponentPropsWithoutRef, ReactElement, Ref } from 'react';
import { forwardRef } from 'react';
import { Box, styled } from '@mui/material';

export interface IconProps extends ComponentPropsWithoutRef<typeof IconRoot> {
  icon: ReactElement;
  size?: number;
}

const IconRoot = styled(Box)(() => {
  return {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    '> *': {
      display: 'block',
      width: '100%',
      height: '100%',
    },
    '> img': {
      objectFit: 'cover',
    },
  };
});

const Icon = ({ icon, size = 24, component = 'span', ...otherProps }: IconProps, ref: Ref<HTMLDivElement>) => {
  return (
    <IconRoot ref={ref} width={size} height={size} component={component} {...otherProps}>
      {icon}
    </IconRoot>
  );
};

export default forwardRef(Icon);
