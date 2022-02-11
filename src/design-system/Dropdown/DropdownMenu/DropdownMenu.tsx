import React, { ReactChild, ReactNode, forwardRef, useImperativeHandle } from 'react';
import { Box } from '@mui/material';

import { StyledMenu } from './dropdownMenu-styles';

interface DropdownMenuProps {
  toggleElement: ReactChild;
  children: ReactNode;
  id: string;
}

const DropdownMenu = forwardRef((props: DropdownMenuProps, dropdownRef) => {
  const { toggleElement, children, id } = props;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useImperativeHandle(dropdownRef, () => ({
    close: () => {
      handleClose();
    },
  }));

  return (
    <>
      <Box
        id={`${id}-dropdown-element`}
        aria-controls={id}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick || dropdownRef}
      >
        {toggleElement}
      </Box>
      <StyledMenu
        id={id}
        aria-labelledby={`${id}-dropdown-element`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {children}
      </StyledMenu>
    </>
  );
});
export default DropdownMenu;
