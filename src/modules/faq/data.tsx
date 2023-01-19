import { ReactNode } from 'react';

import FaqBuildForMe from './components/FaqBuildForMe';
import FaqCanIContact from './components/FaqCanIContact';
import FaqCanIHire from './components/FaqCanIHire';
import FaqHowDoesLandWorksWork from './components/FaqHowDoesLandWorksWork';
import FaqHowListLand from './components/FaqHowListLand';
import FaqHowToBuildOnLand from './components/FaqHowToBuildOnLand';
import FaqHowToRemoveLand from './components/FaqHowToRemoveLand';
import FaqHowToRentLand from './components/FaqHowToRentLand';
import FaqIsItSafe from './components/FaqIsItSafe';
import FaqSupport from './components/FaqSupport';
import FaqWhatIsLandWorks from './components/FaqWhatIsLandWorks';
import FaqWhatToDoWithLand from './components/FaqWhatToDoWithLand';
import FaqWhyError from './components/FaqWhyError';
import FaqWhyHaveToPayNetworkFee from './components/FaqWhyHaveToPayNetworkFee';

export const FAQ_HOW_DOES_IT_WORK_ANCHOR_ID = 'how-does-it-work';

export const faq: {
  id?: string;
  question: string;
  answer: ReactNode;
}[] = [
  {
    question: 'What is LandWorks?',
    answer: <FaqWhatIsLandWorks />,
  },
  {
    id: FAQ_HOW_DOES_IT_WORK_ANCHOR_ID,
    question: 'How does it work?',
    answer: <FaqHowDoesLandWorksWork />,
  },
  {
    question: 'How do I list my land?',
    answer: <FaqHowListLand />,
  },
  {
    answer: <FaqHowToRentLand />,
    question: 'How do I rent land?',
  },
  {
    question: 'Is it safe?',
    answer: <FaqIsItSafe />,
  },
  {
    question: 'What do I do with the land?',
    answer: <FaqWhatToDoWithLand />,
  },
  {
    question: 'How do I build?',
    answer: <FaqHowToBuildOnLand />,
  },
  {
    question: 'Can I have someone else build my project for me?',
    answer: <FaqBuildForMe />,
  },
  {
    question: 'Can I hire someone to build my project for me?',
    answer: <FaqCanIHire />,
  },
  {
    question: 'Can I contact the owner?',
    answer: <FaqCanIContact />,
  },
  {
    question: 'How do I remove my land from LandWorks?',
    answer: <FaqHowToRemoveLand />,
  },
  {
    question: 'Why do I get an error when I try to rent?',
    answer: <FaqWhyError />,
  },
  {
    question: 'Why do I have to pay a network fee?',
    answer: <FaqWhyHaveToPayNetworkFee />,
  },
  {
    question: 'Is there support available?',
    answer: <FaqSupport />,
  },
];
