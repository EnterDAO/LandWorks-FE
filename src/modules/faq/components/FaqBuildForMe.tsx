import React from 'react';

import rentHistoryImgSrc from 'assets/img/RentHistory.png';
import rentModalImgSrc from 'assets/img/RentModal.png';

const FaqBuildForMe = () => {
  return (
    <>
      <p>
        Yes, you can. Once you rent a land, the address you have rented it from will become the land’s operator. This
        would mean that the address will have the right to build on (or utilize in any other way) that land. As a renter
        you might change that by:
      </p>
      <p className="color-light">1. specifying the operator address upon renting the land:</p>
      <img src={rentModalImgSrc} />
      <p className="color-light">2. navigating to the land’s page and clicking the pencil icon in the history table:</p>
      <img src={rentHistoryImgSrc} />
      <p>
        By changing the operator, the address you input would be able to build on top of the land (or utilize it in any
        other way).
      </p>
      <p>
        You can change the operator as many times as you’d like, just bear in mind that there are network fees for doing
        so. One for changing the operator in the rent agreement and another for synchronizing the operator with the
        metaverse.
      </p>
      <p>
        Also, keep in mind that as of now there can be only a single operator - only one address working on the land.
      </p>
    </>
  );
};

export default FaqBuildForMe;
