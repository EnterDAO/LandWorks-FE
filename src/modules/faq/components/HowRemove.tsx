import React from 'react';

export const HowRemove: React.FC = () => {
  return (
    <span>
      If your land is currently rented you will have the option to delist it. Delisting would prevent the land from
      being rented further, however, the land will remain in the protocol until the last booked rent is over. This
      ensures that all booked rents are fulfilled. Once they are - you would be able to withdraw the land to your
      wallet.
      <br /> <br /> If your land is not currently rented, you would be able to withdraw it directly to your wallet.
      <br /> <br /> If you have staked your land (currently available only for Decentraland), you would need to unstake
      the land first and then proceed to delisting/withdrawing.
    </span>
  );
};
