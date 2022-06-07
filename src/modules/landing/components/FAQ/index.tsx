import React from 'react';

import { questionData } from './data';
import { QuestionItem } from './QuestionItem';
import { QuestionList, StyledRoot, StyledTypography } from './styled';

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
      </StyledRoot>
    </div>
  );
};
