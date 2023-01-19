import * as React from 'react';
import MuiStepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import MuiStepper, { StepperProps } from '@mui/material/Stepper';
import { styled } from '@mui/material/styles';

const StepConnector = styled(MuiStepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 14,
    left: 'calc(-50% + 45px)',
    right: 'calc(50% + 45px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: 'var(--theme-separator-color)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: 'var(--theme-separator-color)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: 'var(--theme-separator-color)',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const Stepper = (props: StepperProps) => {
  return <MuiStepper connector={<StepConnector />} alternativeLabel {...props} />;
};

export default Stepper;
