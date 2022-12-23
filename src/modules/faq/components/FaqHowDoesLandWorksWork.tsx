import React from 'react';

import howDoesItWorksImgSrc from 'assets/img/HowItWorks.png';

const FaqHowDoesLandWorksWork = () => {
  return (
    <>
      <p>LandWorks uses a trustless protocol that enables renting by introducing the role of the consumer.</p>
      <p>
        The consumer is an actor that does not have transfer permissions, but has rights for “consuming” the NFT (e.g
        building a scene/experience on top of a land NFT).{' '}
      </p>
      <p>
        {' '}
        By listing your land on LandWorks, you transfer the land NFT to the protocol. This way the LandWorks protocol
        becomes the owner of the land NFT. At the same time you get back a representation of your land in the form of
        another NFT{' '}
        <a href="https://opensea.io/collection/landworks" target="_blank">
          issued by LandWorks
        </a>
        .
      </p>
      <p>
        <strong>At no point in time anyone other than the protocol is the owner of the NFT.</strong> By renting land on
        LandWorks the protocol lists you as an operator/collaborator of that land. This allows you to build on top of
        the land or utilize it in any other way depending on the metaverse without actually owning the land.{' '}
      </p>
      <p>
        In many cases renting works through a collateral.
        <b>
          In the case of landworks there is no need for collateral since the rents are paid directly (upfront) and the
          lender is not becoming the land owner.
        </b>
      </p>
      <p>The image below illustrates the process:</p>
      <img src={howDoesItWorksImgSrc} alt="diagram" />
    </>
  );
};

export default FaqHowDoesLandWorksWork;
