import { BreakpointOverrides } from '@mui/material/styles';
declare module 'react-eth-address';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    '2xl': true;
    '3xl': true;
  }
}

declare global {
  interface Window {
    ethereum?: any;
  }
}
