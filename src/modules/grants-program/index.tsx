import React, { Component, ReactElement } from 'react';

import { Box, Button, Stack } from 'design-system';
import { FAQIcon, FilledStar, FilledSuccess, HeartFilledIcon } from 'design-system/icons';

import { AboutSection } from './components/about-section';
import { FaqSection } from './components/faq-section';
import { Hero } from './components/hero';
import { JuryAndScoringSection } from './components/jury-and-scoring-section';
import { ProcessSection } from './components/process-section';
import { Sidebar } from './components/sidebar';
import { SidebarNavItem } from './components/sidebar/SidebarNav';
// import { SidebarNavItem } from './components/Sidebar/SidebarNav';
import { TermsAndConditionsSection } from './components/terms-and-conditions';
import { sectionsConfigs, sidebarNav } from './config';
import { SpecificSectionProps, StyledContent } from './styled';

const GrantsProgram: React.FC = () => {
  return (
    <div className="content-container">
      <Hero />
      <Box display="flex">
        <Sidebar nav={sidebarNav} />
        <Stack pl={{ md: 10 }} spacing={{ xs: 10, lg: 26 }}>
          {sectionsConfigs.map(({ Component, id }) => {
            return <Component key={id} id={id} />;
          })}

          <Box>
            <Button
              variant="gradient"
              btnSize="medium"
              onClick={() => window.open('https://d1zs47v7suw.typeform.com/to/hs05sYCZ')}
            >
              Apply now
            </Button>
          </Box>
        </Stack>
      </Box>
    </div>
  );
};

export default GrantsProgram;
