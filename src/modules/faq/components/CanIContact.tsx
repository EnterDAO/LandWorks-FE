import React from 'react';

import ContactToOwner from 'assets/img/OwnerContact.png';

import { StyledImage } from '../styled';

export const CanIContact: React.FC = () => {
  return (
    <>
      <span>
        Yes. You can either send them a message via Blockscan by clicking the chat button next to the owner’s address:
      </span>
      <StyledImage src={ContactToOwner} />
    </>
  );
};
