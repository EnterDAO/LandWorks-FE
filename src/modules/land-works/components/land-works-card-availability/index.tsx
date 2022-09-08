import { FC } from 'react';
import classNames from 'classnames';

import { AssetEntity } from 'modules/land-works/api';

import './index.scss';

interface Props {
  land: AssetEntity;
  layout?: 'normal' | 'compact';
}

const LandCardAvailability: FC<Props> = ({ land, layout }) => {
  let status = 'delisted';

  if (land.isAvailable) {
    status = land.availability.isCurrentlyAvailable ? 'available' : 'rented';
  }

  return (
    <p
      title={status}
      className={classNames(
        'land-works-card-availability',
        `land-works-card-availability--status-${status}`,
        `land-works-card-availability--layout-${layout}`
      )}
    >
      <span className="land-works-card-availability__label">{status}</span>
    </p>
  );
};

export default LandCardAvailability;
