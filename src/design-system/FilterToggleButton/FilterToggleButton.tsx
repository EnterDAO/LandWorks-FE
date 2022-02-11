import React, { ComponentPropsWithoutRef } from 'react';

import { FiltersIcon } from '../icons';
import { Badge, ButtonInner, badgeStyles, iconStyles } from './filter-toggle-button-styles';
import { Button, Icon } from '..';

interface FilterToggleButtonProps
  extends Omit<ComponentPropsWithoutRef<typeof Button>, 'variant' | 'iconLeft' | 'children'> {
  label: string;
  filterCount?: number;
}

const FilterToggleButton = ({ label, filterCount = 0, ...buttonProps }: FilterToggleButtonProps) => {
  const innerOffsetX = filterCount ? 0 : 17.5;
  const iconOpacity = filterCount ? 1 : 0;

  return (
    <Button iconLeft={<FiltersIcon />} variant="secondary" btnSize="medium" {...buttonProps}>
      <ButtonInner
        sx={{
          transform: `translateX(${innerOffsetX}px)`,
        }}
      >
        <Icon sx={iconStyles} iconElement={<FiltersIcon />} />
        {label}
      </ButtonInner>
      <Badge
        sx={[
          badgeStyles,
          {
            opacity: iconOpacity,
          },
        ]}
      >
        {filterCount}
      </Badge>
    </Button>
  );
};

export default FilterToggleButton;
