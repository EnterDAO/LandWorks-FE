import React, { MouseEventHandler } from 'react';

import { CheckIcon } from '../icons';
import {
  filterTagCheckedIconStyles,
  filterTagCheckedLabelStyles,
  filterTagIconStyles,
  filterTagLabelStyles,
  filterTagRootStyles,
} from './filter-tag-styles';
import { Box, Icon, Typography } from '..';

import { THEME_COLORS } from 'themes/theme-constants';

interface FilterTagProps {
  checked?: boolean;
  label: string;
  onClick?: MouseEventHandler<HTMLSpanElement>;
}

const FilterTag = ({ label, checked = false, onClick }: FilterTagProps) => {
  return (
    <Box
      onClick={onClick}
      component="span"
      sx={[
        filterTagRootStyles,
        checked && {
          bgcolor: THEME_COLORS.accentBlue,
        },
        !!onClick && {
          cursor: 'pointer',
        },
      ]}
    >
      <Icon
        sx={[filterTagIconStyles, checked && filterTagCheckedIconStyles]}
        iconSize="xs"
        iconElement={<CheckIcon />}
      />
      <Typography sx={[filterTagLabelStyles, checked && filterTagCheckedLabelStyles]} component="span" variant="body2">
        {label}
      </Typography>
    </Box>
  );
};

export default FilterTag;
