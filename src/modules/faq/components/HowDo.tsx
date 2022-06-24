import React from 'react';

export const HowDo: React.FC = () => {
  return (
    <span>
      It really depends on the metaverse. <br /> For Decentraland, you can jump right into{' '}
      <a href="https://builder.decentraland.org/" target="_blank">
        their Builder
      </a>{' '}
      as it’s the most straightforward way to deploy a scene aka build something. If you are a more advanced user you
      can also use{' '}
      <a href="https://docs.decentraland.org/development-guide/coding-scenes/" target="_blank">
        their SDK
      </a>
      . <br /> For Voxels, you can jump in the parcel you have rented and start building right away. More info{' '}
      <a href="https://wiki.cryptovoxels.com/en/Parcels/Building" target="_blank">
        here
      </a>
      .
    </span>
  );
};
