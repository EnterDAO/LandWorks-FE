import * as React from 'react';
import { ThemeContext } from '@emotion/react';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { styled } from '@mui/material/styles';

import { THEME_COLORS } from 'themes/theme-constants';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
    left: '0%',
    right: '0%',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      //   backgroundImage: 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      //   backgroundImage: 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    width: 64,
    border: 0,
    backgroundColor: THEME_COLORS.grey04,
    borderRadius: 1,
    left: '0%',
    right: '0%',
  },
}));

const StyledStepLabel = styled(StepLabel)({
  '& .MuiStepLabel-label': {
    fontWeight: 600,
    '&.Mui-active': {
      color: THEME_COLORS.light,
    },
    '&.Mui-completed': { color: THEME_COLORS.grey02 },
  },
  '& .Mui-active': {
    color: THEME_COLORS.accentBlue,
  },
});

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ ownerState }) => ({
  backgroundColor: THEME_COLORS.grey04,
  zIndex: 1,
  width: 34,
  height: 34,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundColor: THEME_COLORS.accentBlue,
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    color: THEME_COLORS.light,
    '&.Mui-active': {
      color: THEME_COLORS.light,
    },
  }),
  ...(ownerState.completed && {
    backgroundColor: THEME_COLORS.grey02,
    color: THEME_COLORS.accentBlue,
    '& .MuiStepLabel-active': {
      color: THEME_COLORS.accentBlue,
    },
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {props.icon}
    </ColorlibStepIconRoot>
  );
}

interface StepperProps {
  activeStep: number;
  steps: string[];
}

export default function CustomizedSteppers({ activeStep, steps }: StepperProps) {
  return (
    <Stack sx={{ width: '100%', display: 'flex', justifyContent: 'space-evenly' }} spacing={4}>
      <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StyledStepLabel StepIconComponent={ColorlibStepIcon} className="">
              {label}
            </StyledStepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}
