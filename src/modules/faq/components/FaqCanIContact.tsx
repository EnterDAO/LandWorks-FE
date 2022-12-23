import React from 'react';

import contactToOwnerImgSrc from 'assets/img/OwnerContact.png';

const FaqCanIContact = () => {
  return (
    <>
      <p>
        Yes. You can either send them a message via{' '}
        <a href="https://chat.blockscan.com/start" target="_blank">
          Blockscan
        </a>{' '}
        by clicking the chat button next to the owner’s address:
      </p>

      <img src={contactToOwnerImgSrc} />

      <p>
        Or you can send them a message in our Discord server in channel{' '}
        <a href="https://discord.gg/JW5se6dG" target="_blank">
          #landlords-meet-tenants
        </a>
        .
      </p>
    </>
  );
};

export default FaqCanIContact;
