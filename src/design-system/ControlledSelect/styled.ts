import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { styled } from '@mui/system';

import { THEME_COLORS, THEME_FONT_FAMILY } from '../../themes/theme-constants';

export const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

export const grey = {
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
};

export const StyledButton = styled('button')(
  () => `
  font-family: ${THEME_FONT_FAMILY};
  font-size: 0.875rem;
  box-sizing: border-box;
  height: 52px;
  background: ${THEME_COLORS.grey01};
  border: 1px solid ${THEME_COLORS.grey01};
  border-radius: 10px;
  padding: 10px 20px;
  text-align: left;
  line-height: 1.5;
  width: 100%;
  min-width: 200px;
  color: ${THEME_COLORS.light};

  &:hover {
    background: ${THEME_COLORS.grey02};
  }

  &::after {
    content: '';
    display: inline-block;
    width: 24px;
    height: 24px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M6.80019 9.8999C6.80019 9.2999 7.20019 8.8999 7.80019 8.8999C8.10019 8.8999 8.3002 8.9999 8.5002 9.1999L12.0002 12.6999L15.5002 9.1999C15.9002 8.7999 16.5002 8.7999 16.9002 9.1999C17.3002 9.5999 17.3002 10.1999 16.9002 10.5999L12.7002 14.7999C12.3002 15.1999 11.7002 15.1999 11.3002 14.7999L7.1002 10.5999C6.9002 10.3999 6.80019 10.0999 6.80019 9.8999Z' fill='%23F8F8FF'/%3E%3C/svg%3E");
    float: right;
  }

  & .Mui-disabled {
    cursor: not-allowed;
  }

  & .MuiRadio-root {
    display: none !important;
  }
  `
);

export const StyledListbox = styled('ul')(
  () => `
  font-family: ${THEME_FONT_FAMILY};
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 5px;
  margin: 10px 0;
  width: 100%;
  min-width: 200px;
  background: ${THEME_COLORS.grey01};
  border: 1px solid ${THEME_COLORS.grey01};
  border-radius: 0.75em;
  color: ${THEME_COLORS.light};
  overflow: auto;
  outline: 0px;
  box-shadow: 0px 4px 12px -3px rgba(0,0,0,0.75);
  `
);

export const StyledOption = styled(OptionUnstyled)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 0.45em;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.selected} {
    background-color: ${THEME_COLORS.grey01};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    background-color: ${THEME_COLORS.grey01};
    color: ${THEME_COLORS.light};
  }

  &.${optionUnstyledClasses.disabled} {
    color: ${THEME_COLORS.grey01};
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background: ${THEME_COLORS.grey02};
    color: ${THEME_COLORS.light};
  }
  `
);

export const StyledPopper = styled(PopperUnstyled)`
  position: relative;
  z-index: 2;
`;
