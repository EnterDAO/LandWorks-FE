import { ComponentPropsWithoutRef, ReactElement, Ref, forwardRef } from 'react';

import { IconRoot } from './icon-styles';

const sizeMappings = {
  xs: 16,
  s: 20,
  m: 24,
  l: 42,
  xl: 60,
};

type IconSize = keyof typeof sizeMappings;

interface IconProps extends ComponentPropsWithoutRef<typeof IconRoot> {
  iconElement: ReactElement;
  iconSize?: IconSize | number;
}

const Icon = forwardRef(({ iconElement, iconSize = 'm', ...otherProps }: IconProps, ref: Ref<unknown>) => {
  const size = typeof iconSize === 'number' ? iconSize : sizeMappings[iconSize];

  return (
    <IconRoot component="span" {...otherProps} ref={ref} width={size} height={size}>
      {iconElement}
    </IconRoot>
  );
});

export default Icon;
