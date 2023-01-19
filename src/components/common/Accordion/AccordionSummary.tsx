import { styled } from '@mui/material';
import MuiAccordionSummary, { AccordionSummaryProps, accordionSummaryClasses } from '@mui/material/AccordionSummary';

const ExpandIcon = styled('div')({
  width: 16,
  height: 16,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  ':before, :after': {
    content: '""',
    position: 'absolute',
    borderRadius: 2,
    margin: 'auto',
    backgroundColor: 'var(--theme-accent-color)',
  },
  ':before': {
    height: '100%',
    width: 2,
  },
  ':after': {
    height: 2,
    width: '100%',
  },
});

const AccordionSummary = styled((props: AccordionSummaryProps) => {
  return <MuiAccordionSummary expandIcon={<ExpandIcon />} {...props} />;
})(({ theme }) => ({
  padding: 0,
  minHeight: 70,
  background: 'transparent',
  flexDirection: 'row-reverse',
  gap: 23,
  [`&.${accordionSummaryClasses.focusVisible}`]: {
    background: 'transparent',
  },
  [`.${accordionSummaryClasses.expandIconWrapper}`]: {
    position: 'relative',
    top: '-2px',
    willChange: 'transform',
    transition: 'all 0.2s',
  },
  [`.${accordionSummaryClasses.expandIconWrapper} > *:after`]: {
    transition: 'all 0.2s',
  },
  [`.${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]: {
    transform: 'rotate(90deg)',
  },
  [`.${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded} > *:after`]: {
    transform: 'rotate(90deg)',
  },
  [theme.breakpoints.up('md')]: {
    padding: '0 27px',
  },
}));

export default AccordionSummary;
