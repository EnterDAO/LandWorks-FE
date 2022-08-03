import React, { FC, useState } from 'react';
import { Collapse } from '@mui/material';

import { Box, Typography } from 'design-system';
import { ReactComponent as DropdownIcon } from 'resources/svg/dropdown-icon.svg';

import { SidebarProps } from './Sidebar';
import { SidebarNav } from './SidebarNav';

import { THEME_COLORS } from 'themes/theme-constants';

interface ExpandButtonProps {
  onClick: () => void;
  isActive?: boolean;
}

const ExpandButton: FC<ExpandButtonProps> = ({ isActive, onClick }) => {
  return (
    <Box
      component="button"
      display="flex"
      justifyContent="center"
      alignItems="center"
      border="none"
      borderRadius="8px"
      width={32}
      height={32}
      bgcolor={THEME_COLORS.grey04}
      onClick={onClick}
    >
      <Box
        sx={{
          transformOrigin: 'center',
          transform: `rotate(${isActive ? -180 : 0}deg)`,
          transition: 'all 0.2s',
        }}
      >
        <DropdownIcon />
      </Box>
    </Box>
  );
};

export const MobileSidebar: FC<SidebarProps> = ({ nav }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <Box
      zIndex={500}
      width={1}
      left={0}
      borderRadius="20px 20px 0 0"
      bgcolor={THEME_COLORS.grey01}
      display={{ md: 'none' }}
      px={5}
      position="fixed"
      bottom={0}
    >
      <Box pt={5} pb={4} display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h4">Content</Typography>
        <ExpandButton isActive={isOpen} onClick={toggleIsOpen} />
      </Box>
      <Collapse in={isOpen}>
        <Box pb={5}>
          <SidebarNav items={nav} />
        </Box>
      </Collapse>
    </Box>
  );
};
