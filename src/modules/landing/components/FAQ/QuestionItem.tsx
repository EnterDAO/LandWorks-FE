import React, { useState } from 'react';
import Typography from '@mui/material/Typography';

import { MinusIcon, PlusIcon } from 'design-system/icons';

import { IQuestion } from './data';
import { Accordion, AccordionDetails, AccordionSummary, StyledGrid } from './styled';

interface IProps {
  item: IQuestion;
}

export const QuestionItem: React.FC<IProps> = ({ item }) => {
  const [open, setOpen] = useState(false);
  return (
    <StyledGrid item>
      <div onClick={() => setOpen(!open)}>{open ? <MinusIcon /> : <PlusIcon />}</div>
      <Accordion disableGutters elevation={0} square expanded={open} onChange={() => setOpen(!open)}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>{item.question}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{item.answer}</Typography>
        </AccordionDetails>
      </Accordion>
    </StyledGrid>
  );
};
