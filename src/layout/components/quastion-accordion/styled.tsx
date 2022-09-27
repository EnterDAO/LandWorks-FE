import { Grid, styled } from '@mui/material';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary, { accordionSummaryClasses } from '@mui/material/AccordionSummary';

export const StyledGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'row',
  borderTop: `1px solid #27273A`,
  '&:last-child': {
    borderBottom: `1px solid #27273A`,
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

export const AccordionSummary = styled(MuiAccordionSummary)(({ theme }) => ({
  backgroundColor: 'var(--theme-body-color)',
  padding: 0,
  height: 70,
  [`.${accordionSummaryClasses.content}`]: {
    alignItems: 'center',
    gap: 19,
  },
  '& span': {
    color: 'var(--theme-grey900-color)',
  },

  [theme.breakpoints.up('md')]: {
    padding: '0 27px',
  },
}));

export const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  backgroundColor: 'var(--theme-body-color)',
  paddingLeft: 43,
  paddingBottom: 25,

  [theme.breakpoints.up('md')]: {
    paddingLeft: 70,
  },
}));

export const IconWrapper = styled('div')(() => ({
  position: 'relative',
  zIndex: 10,
  display: 'flex',
  '& svg': {
    cursor: 'pointer',
    height: 24,
    width: 24,
    color: 'var(--theme-accent-color)',
  },
  '& path': {
    fill: 'var(--theme-accent-color)',
  },
}));
