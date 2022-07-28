import React, { useEffect, useState } from 'react';

import { About } from './components/About';
import { FAQ } from './components/FAQ';
import { Hero } from './components/hero';
import { JuryAndScoring } from './components/JuryAndScoring';
import { Process } from './components/Process';
import { Sidebar } from './components/sidebar';
import { TermsAndConditions } from './components/TermsAndConditions';
import { ContentWrapper, StyledContent } from './styled';

const GrandProgram: React.FC = () => {
  const [tab, setTab] = useState(0);

  useEffect(() => {
    document.getElementById(`gp-id-${tab}`)?.scrollIntoView({ behavior: 'smooth' });
  }, [tab]);

  return (
    <div className="content-container">
      <Hero />
      <StyledContent>
        <Sidebar tab={tab} setTab={setTab} />
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
