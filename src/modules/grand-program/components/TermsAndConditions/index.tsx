import React from 'react';

import { Button } from 'design-system';
import { SectionTitle } from 'modules/grand-program/styled';

import { StyledList } from './styled';

export const TermsAndConditions: React.FC = () => {
  return (
    <div>
      <SectionTitle>Terms and consitions</SectionTitle>
      <StyledList>
        <li>Winners will be decided by a panel of judges on the basis of the scoring factors.</li>
        <li>All builds (including zip files) submitted by the entries will be open-sourced to the public.</li>
        <li>EnterDAO reserves the right to modify, suspend or terminate the competition without notice.</li>
        <li>EnterDAO reserves the right to promote and modify the scenes created as a result of this program.</li>
      </StyledList>
      <Button
        variant="gradient"
        btnSize="medium"
        onClick={() => window.open('https://d1zs47v7suw.typeform.com/to/hs05sYCZ')}
      >
        Apply now
      </Button>
    </div>
  );
};
