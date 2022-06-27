export interface IQuestion {
  id: number;
  question: React.ReactNode;
  answer: React.ReactNode;
}

export const questionData: IQuestion[] = [
  {
    id: 1,
    question: <span>What is LandWorks?</span>,
    answer: <span>It aims to provide renting infrastructure for the metaverse and lower the barrier to entry.</span>,
  },
  {
    id: 2,
    question: <span>How does it work?</span>,
    answer: (
      <span>
        LandWorks uses a trustless protocol that enables renting by introducing the role of the consumer. The consumer
        is an actor that does not have transfer permissions, but has rights for “consuming” the NFT (e.g building a
        scene/experience on top of a land NFT).
      </span>
    ),
  },
  {
    id: 3,
    question: <span>Is it safe?</span>,
    answer: (
      <span>
        Yes! LandWorks has been audited twice. Initially by Omega in December 2021 and later on by Quantstamp in March
        of 2022.
      </span>
    ),
  },
];
