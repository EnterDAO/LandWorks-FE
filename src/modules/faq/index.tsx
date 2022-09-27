import React from 'react';

import { Connect } from 'layout/components/connect';
import Footer from 'layout/components/footer';
import QuestionAccordion from 'layout/components/quastion-accordion/QuestionAccordion';

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
      <Footer />
    </div>
  );
};

export default FAQView;
