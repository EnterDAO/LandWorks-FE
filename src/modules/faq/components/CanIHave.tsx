import React from 'react';

import RentHistory from 'assets/img/RentHistory.png';
import RentModal from 'assets/img/RentModal.png';

import { AnswerPoint, StyledImage } from '../styled';

export const CanIHave: React.FC = () => {
  return (
    <>
      <span>
        Yes, you can. Once you rent a land, the address you have rented it from will become the land’s operator. This
        would mean that the address will have the right to build on (or utilize in any other way) that land. As a renter
        you might change that by:
      </span>
      <AnswerPoint>1. specifying the operator address upon renting the land:</AnswerPoint>
      <StyledImage src={RentModal} />
      <AnswerPoint>2. navigating to the land’s page and clicking the pencil icon in the history table:</AnswerPoint>
      <StyledImage src={RentHistory} />
      <span>
        By changing the operator, the address you input would be able to build on top of the land (or utilize it in any
        other way). <br /> <br /> You can change the operator as many times as you’d like, just bear in mind that there
        are network fees for doing so. One for changing the operator in the rent agreement and another for synchronizing
        the operator with the metaverse. <br /> <br /> Also, keep in mind that as of now there can be only a single
        operator - only one address working on the land.
      </span>
    </>
  );
};
