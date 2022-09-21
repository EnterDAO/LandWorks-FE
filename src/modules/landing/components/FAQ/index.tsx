import React from 'react';

import { LANDING_ROUTES } from 'router/routes';

import { questionData } from './data';
import { QuestionItem } from './QuestionItem';
import { QuestionList, StyledLink, StyledRoot, StyledTypography } from './styled';

export const FAQ: React.FC = () => {
  return (
    <div className="content-container">
      <StyledRoot>
        <StyledTypography>
          Frequently Asked <span>Questions</span>
        </StyledTypography>
        <QuestionList>
          {questionData.map((item) => (
            <QuestionItem item={item} key={item.id} />
          ))}
        </QuestionList>
        <StyledLink to={LANDING_ROUTES.faq}>See all FAQ</StyledLink>
      </StyledRoot>
    </div>
  );
};
