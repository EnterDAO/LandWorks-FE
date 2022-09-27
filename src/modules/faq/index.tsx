import React from 'react';

import QuestionAccordion from 'layout/components/quastion-accordion/QuestionAccordion';
import { Connect } from 'modules/landing/components/connect';

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
        {faq.map((question) => (
          <QuestionAccordion question={question} key={question.id} />
        ))}
      </QuestionList>
      <Connect />
    </div>
  );
};

export default FAQView;
