export interface IQuestion {
  id: number;
  question: string;
  answer: string;
}

export const questionData: IQuestion[] = [
  {
    id: 1,
    question: '- What is LandWorks?',
    answer: 'LandWorks is a metaverse land renting marketplace based on Ethereum.Think AirBnb for the metaverse.',
  },
  {
    id: 2,
    question: '- How does it work?',
    answer: 'LandWorks uses a trust-less protocol that enables renting by introducing the role of the consumer.IMAGE',
  },
  {
    id: 3,
    question: '- Is it safe?',
    answer:
      'Yes! LandWorks has been audited twice. Initially by Omega in December 2021 and later on by Quantstamp in March of 2022.',
  },
];
