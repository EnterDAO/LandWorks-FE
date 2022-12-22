import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { MinusIcon, PlusIcon } from 'design-system/icons';

import { Accordion, AccordionDetails, AccordionSummary, IconWrapper, StyledGrid } from './styled';

export interface QuestionData {
  id: number;
  question: React.ReactNode;
  answer: React.ReactNode;
}

interface QuestionAccordionProps {
  question: QuestionData;
}

const QuestionAccordion: React.FC<QuestionAccordionProps> = ({ question }) => {
  const [open, setOpen] = useState(false);
  return (
    <StyledGrid item>
      <Accordion disableGutters elevation={0} square expanded={open} onChange={() => setOpen(!open)}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <IconWrapper onClick={() => setOpen(!open)}>{open ? <MinusIcon /> : <PlusIcon />}</IconWrapper>
          <Typography>{question.question}</Typography>
        </AccordionSummary>
        <AccordionDetails>{question.answer}</AccordionDetails>
      </Accordion>
    </StyledGrid>
  );
};

export default QuestionAccordion;
