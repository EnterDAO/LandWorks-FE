import React from 'react';
import { useHistory } from 'react-router-dom';
import { Box, PopperProps, Tooltip, TooltipProps, styled, tooltipClasses } from '@mui/material';

import { AssetEntity } from 'modules/land-works/api';
import { getPropertyPath } from 'router/routes';

import LandTooltipContent from './LandTooltipContent';

const DarkTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  maxWidth: 190,
  width: '100%',
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 'none',
    backgroundColor: 'var(--theme-card-color)',
    padding: '20px 10px 13px 10px',
    borderRadius: '10px',
    cursor: 'pointer',
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: 'var(--theme-card-color)',
  },
});

interface LandTooltipProps extends Pick<PopperProps, 'container'> {
  land: AssetEntity;
  x: number;
  y: number;
  open?: boolean;
}

const LandTooltip = ({ land, open, x, y, container }: LandTooltipProps) => {
  const history = useHistory();

  const handlePopperClick = () => {
    history.push({
      pathname: getPropertyPath(land.id),
      state: { from: window.location.pathname, title: 'Explore' },
    });
  };

  return (
    <DarkTooltip
      open={open}
      arrow
      placement="top"
      title={<LandTooltipContent land={land} />}
      PopperProps={{
        container,
        onClick: handlePopperClick,
        disablePortal: true,
      }}
    >
      <Box
        position="absolute"
        width={0}
        height={0}
        top={y}
        left={x}
        sx={{
          pointerEvents: 'none',
        }}
      />
    </DarkTooltip>
  );
};

export default LandTooltip;
