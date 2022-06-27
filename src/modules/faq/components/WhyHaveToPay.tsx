import React from 'react';

export const WhyHaveToPay: React.FC = () => {
  return (
    <>
      <span>
        Network fees are usually needed when a certain action emits a transaction on the blockchain or gives access?
        Here is a list of all the possible network fees you might be asked to pay in LandWorks:
      </span>
      <ul>
        <li>Give LandWorks access to your wallet when listing a land.</li>
        <li>Listing land for rent</li>
        <li>Renting land</li>
        <li>Claiming rent</li>
        <li>Change an operator of a rented land</li>
        <li>Synchronize a new operator</li>
        <li>Delist a rented land</li>
        <li>Withdraw a listed land from LandWorks</li>
      </ul>
    </>
  );
};
