import { BreakpointOverrides } from '@mui/material/styles';
import { PickersComponentNameToClassKey } from '@mui/x-date-pickers/themeAugmentation';
declare module 'react-eth-address';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xxl: true;
    '2xl': true;
    '3xl': true;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface ComponentNameToClassKey extends PickersComponentNameToClassKey {}
}

declare global {
  interface Window {
    ethereum?: any;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    link: true;
  }
}
