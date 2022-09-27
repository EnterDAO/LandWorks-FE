import { Grid, styled } from '@mui/material';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';

export const StyledGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'row',
  borderTop: `1px solid #27273A`,
  '&:last-child': {
    borderBottom: `1px solid #27273A`,
  },
  '& svg': {
    cursor: 'pointer',
    height: 24,
    width: 24,
    margin: 10,
    color: 'var(--theme-accent-color)',
  },
  '& path': {
    fill: 'var(--theme-accent-color)',
  },
  '& span': {
    color: 'var(--theme-subtle-color)',
  },
  '& li': {
    color: 'var(--theme-subtle-color)',
    margin: '5px 0',
    '&::marker': {
      color: 'var(--theme-subtle-color)',
    },
  },
  '& ul': {
    margin: '15px 0',
  },
}));

export const Accordion = styled(MuiAccordion)(() => ({
  boxShadow: 'none',
  backgroundColor: 'var(--theme-body-color)',

  '&:before': {
    display: 'none',
  },
}));

export const AccordionSummary = styled(MuiAccordionSummary)(() => ({
  backgroundColor: 'var(--theme-body-color)',
  '& span': {
    color: 'var(--theme-grey900-color)',
  },
}));

export const AccordionDetails = styled(MuiAccordionDetails)(() => ({
  backgroundColor: 'var(--theme-body-color)',
}));

export const IconWrapper = styled('div')(() => ({
  position: 'relative',
  zIndex: 10,
}));
