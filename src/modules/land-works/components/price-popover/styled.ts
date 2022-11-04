import { Grid, Popover, ToggleButtonGroup } from '@mui/material';
import { styled } from '@mui/system';

import { Typography } from 'design-system';

export const PopoverButton = styled('button', { shouldForwardProp: (propName) => propName !== 'isActive' })<{
  isActive?: boolean;
}>(
  ({ isActive }) => `
  width: 100%;
  min-width: 200px;
  font-size: 0.875rem;
  box-sizing: border-box;
  height: 52px;
  background: var(--theme-grey200-color);
  border: 1px solid var(--theme-grey200-color);
  border-radius: 10px;
  padding: 10px 20px;
  text-align: left;
  line-height: 1.5;
  color: var(--theme-grey900-color);
  border-color: ${isActive ? 'var(--theme-light-color)' : 'transparent'};
  box-shadow: ${isActive ? '0 0 4px var(--theme-light-color)' : ''};

  &:hover {
    background: var(--theme-grey700-color);
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
  `
);

export const StyledPopover = styled(Popover)({
  '& .MuiPaper-root': {
    borderRadius: 10,
    backgroundColor: 'var(--theme-modal-color)',
    border: 'none',
    width: '350px',
    marginTop: 10,
    padding: 20,
    color: 'var(--theme-grey900-color)',
    boxShadow: '0px 4px 20px 10px rgba(0, 0, 0, 0.6)',
  },
});

export const ButtonGroup = styled(ToggleButtonGroup)(() => ({
  width: '100%',
  justifyContent: 'space-between',
  '& .MuiToggleButtonGroup-grouped': {
    width: 105,
    display: 'flex',
    background: 'var(--theme-card-color)',
    borderColor: 'var(--theme-card-color)',
    justifyContent: 'space-around',
    color: 'var(--theme-grey900-color)',
  },
  '& .Mui-selected': {
    background: 'var(--theme-grey700-color) !important',
    borderRadius: '4px !important',
    border: '1px solid var(--theme-grey900-color) !important',
    color: 'var(--theme-grey900-color) !important',
    zIndex: '1',
  },
}));

export const StyledTypography = styled(Typography)(() => ({
  color: 'var(--theme-grey900-color)',
  fontSize: 14,
  margin: '10px 0',
}));

export const Subtitle = styled(Typography)(() => ({
  color: '--theme-subtle-color',
  fontSize: 14,
  margin: '10px 0',
}));

export const InputRow = styled('div')(() => ({
  width: '100%',
  background: 'var(--theme-card-color)',
  borderRadius: 5,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  '& input': {
    padding: '10px',
    width: '50%',
    border: 'none',
    outline: 'none',
    background: 'transparent',
    color: 'var(--theme-grey900-color)',
    '&:disabled': {
      cursor: 'not-allowed',
    },
  },
  '& span': {
    width: '50%',
    textAlign: 'end',
    paddingRight: 5,
  },
}));

export const StyledGrid = styled(Grid)(() => ({
  justifyContent: 'space-between',
  marginTop: 20,
}));

export const ErrorText = styled('span')(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  color: 'var(--theme-red-color)',
}));
