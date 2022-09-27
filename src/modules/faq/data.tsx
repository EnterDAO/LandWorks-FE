import { IQuestion } from 'modules/landing/components/faq/data';

import { CanIContact } from './components/CanIContact';
import { CanIHave } from './components/CanIHave';
import { CanIHire } from './components/CanIHire';
import { HowDo } from './components/HowDo';
import { HowItWorks } from './components/HowItWorks';
import { HowList } from './components/HowList';
import { HowRemove } from './components/HowRemove';
import { HowRent } from './components/HowRent';
import { IsItSafe } from './components/IsItSafe';
import { Support } from './components/Support';
import { WhatDo } from './components/WhatDo';
import { WhatIs } from './components/WhatIs';
import { WhyError } from './components/WhyError';
import { WhyHaveToPay } from './components/WhyHaveToPay';
import { StyledQuestion } from './styled';

export const faq: IQuestion[] = [
  {
    id: 0,
    question: <StyledQuestion>What is Landworks?</StyledQuestion>,
    answer: <WhatIs />,
  },
  {
    id: 1,
    question: <StyledQuestion>How does it work?</StyledQuestion>,
    answer: <HowItWorks />,
  },
  {
    id: 2,
    question: <StyledQuestion>How do I list my land?</StyledQuestion>,
    answer: <HowList />,
  },
  {
    id: 3,
    question: <StyledQuestion>How do I rent land?</StyledQuestion>,
    answer: <HowRent />,
  },
  {
    id: 4,
    question: <StyledQuestion>Is it safe?</StyledQuestion>,
    answer: <IsItSafe />,
  },
  {
    id: 5,
    question: <StyledQuestion>What do I do with the land?</StyledQuestion>,
    answer: <WhatDo />,
  },
  {
    id: 6,
    question: <StyledQuestion>How do I build?</StyledQuestion>,
    answer: <HowDo />,
  },
  {
    id: 7,
    question: <StyledQuestion>Can I have someone else build my project for me?</StyledQuestion>,
    answer: <CanIHave />,
  },
  {
    id: 8,
    question: <StyledQuestion>Can I hire someone to build my project for me?</StyledQuestion>,
    answer: <CanIHire />,
  },
  {
    id: 9,
    question: <StyledQuestion>Can I contact the owner?</StyledQuestion>,
    answer: <CanIContact />,
  },
  {
    id: 10,
    question: <StyledQuestion>How do I remove my land from LandWorks?</StyledQuestion>,
    answer: <HowRemove />,
  },
  {
    id: 11,
    question: <StyledQuestion>Why do I get an error when I try to rent?</StyledQuestion>,
    answer: <WhyError />,
  },
  {
    id: 12,
    question: <StyledQuestion>Why do I have to pay a network fee?</StyledQuestion>,
    answer: <WhyHaveToPay />,
  },
  {
    id: 13,
    question: <StyledQuestion>Is there support available?</StyledQuestion>,
    answer: <Support />,
  },
];
