export interface IQuestion {
  id: number;
  question: string;
  answer: string;
}

export const questionData: IQuestion[] = [
  {
    id: 1,
    question: 'What is LandWorks?',
    answer: 'It aims to provide renting infrastructure for the metaverse and lower the barrier to entry.',
  },
  {
    id: 2,
    question: 'How does it work?',
    answer:
      'LandWorks uses a trustless protocol that enables renting by introducing the role of the consumer. The consumer is an actor that does not have transfer permissions, but has rights for “consuming” the NFT (e.g building a scene/experience on top of a land NFT).',
  },
  {
    id: 3,
    question: 'Is it safe?',
    answer:
      'Yes! LandWorks has been audited twice. Initially by Omega in December 2021 and later on by Quantstamp in March of 2022.',
  },
];
