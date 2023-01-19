import React from 'react';

const FaqHowToRemoveLand = () => {
  return (
    <>
      <p>
        If your land is currently rented you will have the option to delist it. Delisting would prevent the land from
        being rented further, however, the land will remain in the protocol until the last booked rent is over. This
        ensures that all booked rents are fulfilled. Once they are - you would be able to withdraw the land to your
        wallet.
      </p>
      <p>If your land is not currently rented, you would be able to withdraw it directly to your wallet.</p>
      <p>
        {' '}
        If you have staked your land (currently available only for Decentraland), you would need to unstake the land
        first and then proceed to delisting/withdrawing.
      </p>
    </>
  );
};

export default FaqHowToRemoveLand;
