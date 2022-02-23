import { FC } from 'react';

import { AssetEntity } from 'modules/land-works/api';

import './index.scss';

interface Props {
  land: AssetEntity;
}

const LandCardAvailability: FC<Props> = ({ land }) => {
  const baseClass = 'land-works-card-availability--';
  let variantClass = '';

  if (land.isAvailable) {
    if (land.availability.isCurrentlyAvailable) {
      variantClass = 'available';
    } else {
      variantClass = 'rented';
    }
  } else {
    variantClass = 'delisted';
  }

  return <div className={`land-works-card-availability ${baseClass + variantClass}`}>{variantClass}</div>;
};

export default LandCardAvailability;
