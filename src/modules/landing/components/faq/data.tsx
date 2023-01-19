import howDoesItWorksImgSrc from 'assets/img/HowItWorks.png';
import { FAQ_HOW_DOES_IT_WORK_ANCHOR_ID } from 'modules/faq/data';

export const faq = [
  {
    question: 'What is LandWorks?',
    answer: (
      <p>
        LandWorks is a renting marketplace enabling period-based renting of land in several Web3 Metaverse games.
        LandWorks is part of the portfolio of products developed and maintained by the EnterDAO community and aims to
        democratize real estate in the Metaverse.
      </p>
    ),
  },
  {
    question: 'How does it work?',
    answer: (
      <>
        <p>
          Read more{' '}
          <a href={`/faq#${FAQ_HOW_DOES_IT_WORK_ANCHOR_ID}`} target="_blank">
            here
          </a>
          .
        </p>

        <img src={howDoesItWorksImgSrc} alt="" />
      </>
    ),
  },
  {
    question: 'Is it safe?',
    answer: (
      <p>
        Yes! Landworks has more than 300 successful rents and has been audited 3 times. Twice by Omega and once by
        Qunatstamp. Find the audit reports{' '}
        <a href="https://github.com/EnterDAO/LandWorks-protocol/tree/main/audits" target="_blank">
          here
        </a>
        .
      </p>
    ),
  },
];
