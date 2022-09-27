import React, { FC } from 'react';

import QuestionAccordion from 'layout/components/quastion-accordion/QuestionAccordion';
import { QuestionList } from 'modules/faq/styled';
import { Section, SectionTitle, SpecificSectionProps } from 'modules/grants-program/styled';

import { faq } from './data';

export const FaqSection: FC<SpecificSectionProps> = ({ id }) => {
  return (
    <Section id={id}>
      <SectionTitle>Frequently Asked Questions</SectionTitle>
      <QuestionList sx={{ m: '0 !important', width: '100% !important' }}>
        {faq.map((question) => (
          <QuestionAccordion question={question} key={question.id} />
        ))}
      </QuestionList>
    </Section>
  );
};
