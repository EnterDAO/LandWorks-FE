import React from 'react';

import ContactToOwner from 'assets/img/OwnerContact.png';

import { StyledImage } from '../styled';

export const CanIContact: React.FC = () => {
  return (
    <>
      <span>
        Yes. You can either send them a message via{' '}
        <a href="https://chat.blockscan.com/start" target="_blank">
          Blockscan
        </a>{' '}
        by clicking the chat button next to the owner’s address:
      </span>
      <StyledImage src={ContactToOwner} />
      <span>
        Or you can send them a message in our Discord server in channel{' '}
        <a href="https://discord.gg/JW5se6dG" target="_blank">
          #landlords-meet-tenants
        </a>
        .
      </span>
    </>
  );
};
