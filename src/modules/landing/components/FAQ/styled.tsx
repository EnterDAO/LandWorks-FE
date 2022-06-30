import { Link } from 'react-router-dom';
import { Grid, Typography, styled } from '@mui/material';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';

export const StyledRoot = styled(Grid)(() => ({
  marginTop: 150,
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',

  '& a': {
    fontSize: 20,
  },
}));

export const StyledTypography = styled(Typography)(() => ({
  fontWeight: 'bold',
  color: 'var(--theme-grey900-color)',
  margin: '15px 0',
  fontSize: 40,
  lineHeight: '60px',
  maxWidth: 360,
  textAlign: 'center',
  marginBottom: 80,

  '& span': {
    fontWeight: 'bold',
    fontSize: 'inherit',
    background: 'linear-gradient(83.81deg, #AC2CCB -19.8%, #DD3DCB 22%, #EF9C92 100%)',
    webkitBackgroundClip: 'text',
    '-webkit-text-fill-color': 'transparent',
    backgroundClip: 'text',
    textShadow: '0 0 30px #dd3dcb78',
  },
}));

export const QuestionList = styled(Grid)(() => ({
  width: 680,
  flexDirection: 'row',
}));

export const StyledGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
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
}));

export const AccordionDetails = styled(MuiAccordionDetails)(() => ({
  backgroundColor: 'var(--theme-body-color)',
}));

export const StyledLink = styled(Link)(() => ({
  marginTop: 56,
  padding: '7px 30px',
  background: 'var(--theme-light-color)',
  color: 'var(--theme-body-color)',
  borderRadius: 10,
  fontWeight: 'bold',
}));

export const IconWrapper = styled('div')(() => ({
  position: 'relative',
  zIndex: 10,
}));
