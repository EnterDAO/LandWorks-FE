import { styled } from '@mui/material';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';

const BaseAccordion = styled((props: AccordionProps) => {
  return <MuiAccordion disableGutters square elevation={0} {...props} />;
})(() => {
  return {
    boxShadow: '0 1px #27273a, inset 0 1px #27273a',
    backgroundColor: 'transparent',
  };
});

export default BaseAccordion;
