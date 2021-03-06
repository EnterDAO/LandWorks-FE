import { FC } from 'react';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { styled } from '@mui/material/styles';

import { BlueCheckIcon } from 'design-system/icons';

import { THEME_COLORS } from 'themes/theme-constants';

const ColorlibConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 15,
    left: '-15%',
    right: '0%',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: THEME_COLORS.accentBlue,
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
  backgroundColor: THEME_COLORS.grey01,
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
    backgroundColor: THEME_COLORS.grey01,
    color: THEME_COLORS.grey01,
    '& .MuiStepLabel-active': {
      color: THEME_COLORS.accentBlue,
    },
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {completed ? <BlueCheckIcon /> : props.icon}
    </ColorlibStepIconRoot>
  );
}

interface StepperProps {
  activeStep: number;
  steps: string[];
}
const CustomizedSteppers: FC<StepperProps> = ({ activeStep, steps }: StepperProps) => {
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
};

export default CustomizedSteppers;
