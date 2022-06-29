import React from 'react';

import ContactToOwner from 'assets/img/OwnerContact.png';

import { StyledImage } from '../styled';

export const CanIContact: React.FC = () => {
  return (
    <>
      <span>
        Yes. You can either send them a message via <u>Blockscan</u> by clicking the chat button next to the owner’s
        address:
      </span>
      <StyledImage src={ContactToOwner} />
      <span>
        Or you can send them a message in our Discord server in channel <u>#landlords-and-tenants</u>.
      </span>
    </>
  );
};
