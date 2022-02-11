import React, { ComponentPropsWithoutRef, FC } from 'react';
import { Typography } from '@mui/material';

import { LabelActiveIndicator, LabelRoot } from './label-styles';

import { THEME_COLORS } from 'themes/theme-constants';

interface LabelProps extends ComponentPropsWithoutRef<typeof LabelRoot> {
  active?: boolean;
}

const Label: FC<LabelProps> = ({ children, active, ...otherProps }) => {
  return (
    <LabelRoot rounded={active} {...otherProps}>
      <Typography component="span" variant="body2" color={THEME_COLORS.darkBlue01}>
        {children}
      </Typography>
      {active && <LabelActiveIndicator />}
    </LabelRoot>
  );
};

export default Label;
