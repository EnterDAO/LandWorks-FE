import React from 'react';

import HowItWorksImage from 'assets/img/HowItWorks.png';

import { StyledImage } from '../styled';

export const HowItWorks: React.FC = () => {
  return (
    <>
      <span>
        LandWorks uses a trustless protocol that enables renting by introducing the role of the consumer. <br />
        <br /> The consumer is an actor that does not have transfer permissions, but has rights for “consuming” the NFT
        (e.g building a scene/experience on top of a land NFT). <br />
        <br /> By listing your land on LandWorks, you transfer the land NFT to the protocol. This way the LandWorks
        protocol becomes the owner of the land NFT. At the same time you get back a representation of your land in the
        form of another NFT issued by LandWorks. <br />
        <br />
        <b>At no point in time anyone other than the protocol is the owner of the NFT.</b> By renting land on LandWorks
        the protocol lists you as an operator/collaborator of that land. This allows you to build on top of the land or
        utilize it in any other way depending on the metaverse without actually owning the land. <br />
        <br /> In many cases renting works through a collateral. In the case of landworks there is no need for
        collateral since the rents are paid directly (upfront) and the lender is not becoming the land owner. <br />
        <br /> The image below illustrates the process:
      </span>
      <StyledImage src={HowItWorksImage} />
    </>
  );
};
