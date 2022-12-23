import React from 'react';

const FaqHowListLand = () => {
  return (
    <>
      <p>1. Connect your wallet.</p>
      <p>2. Click the “List new property” button.</p>
      <p>
        3. A popup will appear. Select the land you want to list (it should be in the wallet you have connected with).
      </p>
      <p>
        4. Set the parameters of the listing. Make sure all parameters are correct.
        <ul>
          <li>
            Minimum renting period - the minimum amount of time a land can be rented for (e.g. if you set it to 1 week -
            that would be the minimum length someone can rent the land for).
          </li>
          <li>
            Maximum renting period - the maximum amount of time a land can be rented for(e.g. if you set it to 6 months
            - that would be the maximum length someone can rent the land for).
          </li>
          <li>
            Maximum rent queue - the maximum amount of time you are willing your land to be rented for in the future.
            This parameter ensures liquidity of the land for the landowner (based on their preferences) and at the same
            time makes sure that all booked rents are fulfilled. Example: if you set the maximum rent queue to 6 months
            and you set the maximum renting period to 2 months - it would mean that you can have up to 3 2-month rents
            booked for the land. Or 6 1-month rents. Or any other configuration that books the property up to 6 months
            in the future.
          </li>
        </ul>
      </p>
      <p>
        5. Approve for LandWorks to interact with your wallet. That would be needed just the first time you are listing
        and there will be a network fee.
      </p>
      <p>6. List the land on LandWorks. There will be a network fee for this transaction.</p>
      <p>8. Profit!</p>
    </>
  );
};

export default FaqHowListLand;
