import { styled } from '@mui/material';

const AccordionContent = styled('div')(({ theme }) => ({
  color: 'var(--theme-subtle-color)',
  '& > *:first-child': {
    marginTop: 0,
  },
  '& > *:last-child': {
    marginBottom: 0,
  },
  p: {
    margin: '15px 0',
  },
  li: {
    margin: '15px 0',
    '&::marker': {
      color: 'inherit',
    },
  },
  img: {
    display: 'block',
    width: 'calc(100% + 40px)',
    margin: '60px 0 60px -40px',
    height: 'auto',

    [theme.breakpoints.up('md')]: {
      width: 'calc(100% + 67px)',
      margin: '60px 0 60px -67px',
    },
  },
  'ul, ol': {
    margin: '15px 0',
  },
  '.color-light': {
    color: 'var(--theme-light-color)',
  },
}));

export default AccordionContent;
