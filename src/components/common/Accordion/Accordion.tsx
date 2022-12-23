import { ReactNode } from 'react';
import { AccordionProps as MuiAccordionProps } from '@mui/material/Accordion';

import Typography from '../Typography';
import AccordionContent from './AccordionContent';
import AccordionDetails from './AccordionDetails';
import AccordionSummary from './AccordionSummary';
import BaseAccordion from './BaseAccordion';

interface AccordionProps extends Pick<MuiAccordionProps, 'expanded' | 'onChange' | 'defaultExpanded' | 'id'> {
  title: ReactNode;
  content: ReactNode;
}

const Accordion = ({ title, content, ...otherProps }: AccordionProps) => {
  return (
    <BaseAccordion {...otherProps}>
      <AccordionSummary>
        <Typography variant="h4" component="p">
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <AccordionContent>{content}</AccordionContent>
      </AccordionDetails>
    </BaseAccordion>
  );
};

export default Accordion;
