import React, { FC } from 'react';

import { QuestionList } from 'modules/faq/styled';
import { Section, SectionTitle, SpecificSectionProps } from 'modules/grants-program/styled';
import { QuestionItem } from 'modules/landing/components/FAQ/QuestionItem';

import { faq } from './data';

export const FaqSection: FC<SpecificSectionProps> = ({ id }) => {
  return (
    <Section id={id}>
      <SectionTitle>Frequently Asked Questions</SectionTitle>
      <QuestionList sx={{ m: '0 !important', width: '100% !important' }}>
        {faq.map((item) => (
          <QuestionItem item={item} key={item.id} />
        ))}
      </QuestionList>
    </Section>
  );
};
