import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { StepIconProps } from '@mui/material/StepIcon';

import { Icon } from 'design-system';
import { CheckIcon } from 'design-system/icons';

const StepIcon = ({ active, completed, icon, className }: StepIconProps) => {
  return (
    <Box
      width={34}
      height={34}
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderRadius="100%"
      className={className}
      sx={
        active
          ? {
              bgcolor: 'var(--theme-accent-color)',
              boxShadow: '0 0 10px var(--theme-accent-color)',
            }
          : {
              bgcolor: 'var(--theme-grey200-color)',
            }
      }
    >
      {completed ? (
        <Icon
          iconSize={20}
          iconElement={<CheckIcon />}
          color="var(--theme-accent-color)"
          sx={{
            filter: 'drop-shadow(0px 0px 6px var(--theme-accent-color))',
          }}
        />
      ) : (
        <Typography
          variant="button"
          component="span"
          color={active ? 'var(--theme-light-color)' : 'var(--theme-grey700-color)'}
        >
          {icon}
        </Typography>
      )}
    </Box>
  );
};
export default StepIcon;
