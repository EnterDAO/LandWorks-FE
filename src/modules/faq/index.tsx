import React from 'react';

import { Connect } from 'modules/landing/components/connect';
import { QuestionItem } from 'modules/landing/components/faq/QuestionItem';

import { faq } from './data';
import { QuestionList, StyledSubtitle, StyledTitle } from './styled';

const FAQView: React.FC = () => {
  return (
    <div className="content-container">
      <StyledTitle>
        Frequently Asked <span>Questions</span>
      </StyledTitle>
      <StyledSubtitle>You can see here the most frequently asked question about LandWorks.</StyledSubtitle>
      <QuestionList>
        {faq.map((item) => (
          <QuestionItem item={item} key={item.id} />
        ))}
      </QuestionList>
      <Connect />
    </div>
  );
};

export default FAQView;
