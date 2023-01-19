import React, { FC } from 'react';
import { styled } from '@mui/system';

import { Button, Icon } from 'design-system';
import { ArrowLeft2Icon, ArrowRight2Icon, MapIcon } from 'design-system/icons';

const ToggleMapVisibilityButtonRoot = styled(Button)({
  position: 'absolute',
  width: '65px !important',
  padding: 0,
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1,
  marginTop: 132,
  transition: 'none',
  boxShadow: '0 0 10px rgba(22, 22, 34, 0.2)',
  '& > span': {
    display: 'inline-flex',
    gap: 5,
  },
});

interface ToggleMapVisibilityButtonProps {
  onClick?: () => void;
  active?: boolean;
}

const ToggleMapVisibilityButton: FC<ToggleMapVisibilityButtonProps> = ({ onClick, active }) => {
  return (
    <ToggleMapVisibilityButtonRoot
      sx={[
        {
          '&:before': { borderRadius: '0 !important' },
          overflow: 'hidden',
        },
        active
          ? {
              left: 0,
              borderRadius: '0 10px 10px 0',
            }
          : {
              right: 0,
              borderRadius: '10px 0 0 10px',
            },
      ]}
      variant="primary"
      onClick={onClick}
    >
      <Icon iconSize="s" iconElement={active ? <ArrowRight2Icon /> : <ArrowLeft2Icon />} />
      <Icon iconSize="s" iconElement={<MapIcon />} />
    </ToggleMapVisibilityButtonRoot>
  );
};

export default ToggleMapVisibilityButton;
