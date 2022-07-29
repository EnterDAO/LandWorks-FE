import React from 'react';

import { QuestionList } from 'modules/faq/styled';
import { SectionTitle } from 'modules/grants-program/styled';
import { QuestionItem } from 'modules/landing/components/FAQ/QuestionItem';

import { faq } from './data';

export const FAQ: React.FC = () => {
  return (
    <div id={'gp-id-3'}>
      <SectionTitle>Frequently Asked Questions</SectionTitle>
      <QuestionList style={{ margin: ' 90px 0', width: '100%' }}>
        {faq.map((item) => (
          <QuestionItem item={item} key={item.id} />
        ))}
      </QuestionList>
    </div>
  );
};
