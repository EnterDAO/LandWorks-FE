import React, { MouseEvent, ReactElement, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Collapse, useMediaQuery } from '@mui/material';

import { Box, Icon, Stack, Typography } from 'design-system';
import { ReactComponent as DropdownIcon } from 'resources/svg/dropdown-icon.svg';

import { THEME_COLORS } from 'themes/theme-constants';

export interface SidebarNavItem {
  id: string;
  label: string;
  icon: ReactElement;
}

interface SidebarNavProps {
  items: SidebarNavItem[];
}

export const SidebarNav = ({ items }: SidebarNavProps) => {
  const location = useLocation();

  return (
    <Stack spacing={2}>
      {items.map((item) => {
        const href = `#${item.id}`;
        const isActive = href === location.hash;

        return (
          <Box key={item.id} component="a" href={href} display="inline-flex" alignItems="center">
            <Icon iconSize="s" iconElement={item.icon} />
            <Typography color={isActive ? THEME_COLORS.light : THEME_COLORS.grey03} ml={2} variant="caption">
              {item.label}
            </Typography>
          </Box>
        );
      })}
    </Stack>
  );
};
