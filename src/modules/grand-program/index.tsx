import React from 'react';

import { About } from './components/About';
import { FAQ } from './components/FAQ';
import { Hero } from './components/hero';
import { JuryAndScoring } from './components/JuryAndScoring';
import { Process } from './components/Process';
import { Sidebar } from './components/sidebar';
import { TermsAndConditions } from './components/TermsAndConditions';
import { ContentWrapper, StyledContent } from './styled';

const GrandProgram: React.FC = () => {
  return (
    <div className="content-container">
      <Hero />
      <StyledContent>
        <Sidebar />
        <ContentWrapper>
          <About />
          <Process />
          <JuryAndScoring />
          <FAQ />
          <TermsAndConditions />
        </ContentWrapper>
      </StyledContent>
    </div>
  );
};

export default GrandProgram;
