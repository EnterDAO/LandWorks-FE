import React, { FC, ReactElement } from 'react';

import { FAQIcon, FilledStar, FilledSuccess, HeartFilledIcon } from 'design-system/icons';

import { AboutSection } from './components/about-section';
import { FaqSection } from './components/faq-section';
import { JuryAndScoringSection } from './components/jury-and-scoring-section';
import { ProcessSection } from './components/process-section';
import { SidebarNavItem } from './components/sidebar/SidebarNav';
// import { SidebarNavItem } from './components/Sidebar/SidebarNav';
import { TermsAndConditionsSection } from './components/terms-and-conditions';
import { SpecificSectionProps } from './styled';

interface SectionConfig {
  id: string;
  nav?: {
    label: string;
    icon: ReactElement;
  };
  Component: FC<SpecificSectionProps>;
}

export const sectionsConfigs: SectionConfig[] = [
  {
    id: 'gp-about',
    nav: {
      label: 'About',
      icon: <FilledStar />,
    },
    Component: AboutSection,
  },
  {
    id: 'gp-process',
    nav: {
      label: 'Process',
      icon: <FilledSuccess />,
    },
    Component: ProcessSection,
  },
  {
    id: 'gp-jury-and-scoring',
    nav: {
      label: 'Jury and Scoring',
      icon: <HeartFilledIcon width={20} height={20} style={{ color: '#5D8FF0' }} />,
    },
    Component: JuryAndScoringSection,
  },
  {
    id: 'gp-faq',
    nav: {
      label: 'FAQ',
      icon: <FAQIcon />,
    },
    Component: FaqSection,
  },
  {
    id: 'gp-terms-and-conditions',
    Component: TermsAndConditionsSection,
  },
];

export const sidebarNav: SidebarNavItem[] = sectionsConfigs
  .filter(({ nav }) => !!nav)
  .map(({ id, nav }) => {
    return {
      id,
      ...nav,
    } as SidebarNavItem;
  });
