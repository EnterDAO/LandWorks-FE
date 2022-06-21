import { Grid, Popover, ToggleButtonGroup } from '@mui/material';
import { styled } from '@mui/system';

import { Typography } from 'design-system';

export const PopoverButton = styled('button')(
  () => `
  width: 12rem;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  background: var(--theme-grey200-color);
  border: 1px solid var(--theme-grey200-color);
  border-radius: 10px;
  padding: 10px 12px;
  text-align: left;
  line-height: 1.5;
  color: var(--theme-grey900-color);

  &:hover {
    background: var(--theme-grey700-color);
    border-color: var(--theme-grey700-color);
  }

  &::after {
    content: '▾';
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
