import * as React from 'react';
import { styled } from '@mui/material';
import MuiStepLabel, { StepLabelProps, stepLabelClasses } from '@mui/material/StepLabel';

import StepIcon from './StepIcon';

const StepLabel = styled((props: StepLabelProps) => {
  return <MuiStepLabel StepIconComponent={StepIcon} {...props} />;
})(({ theme }) => {
  return {
    [`& .${stepLabelClasses.label}`]: {
      ...theme.typography.body2,
      fontWeight: 600,
      color: 'var(--theme-grey700-color)',
      marginTop: 10,
      [`&.${stepLabelClasses.active}`]: {
        color: 'var(--theme-light-color)',
        fontWeight: 600,
      },
      [`&.${stepLabelClasses.completed}`]: {
        color: 'var(--theme-grey700-color)',
        fontWeight: 600,
      },
    },
  };
});

export default StepLabel;
