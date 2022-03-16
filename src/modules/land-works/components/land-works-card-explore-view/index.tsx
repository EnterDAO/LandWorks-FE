import React, { SyntheticEvent, useState } from 'react';
import { ZERO_BIG_NUMBER } from 'web3/utils';

import Icon from 'components/custom/icon';
import SmallAmountTooltip from 'components/custom/smallAmountTooltip';
import { getLandImageUrl, getTokenIconName } from 'helpers/helpers';
import { useLandsMapTile } from 'modules/land-works/providers/lands-map-tile';

import { AssetEntity } from '../../api';
import LandCardAvailability from '../land-works-card-availability';
import { LandsTooltip } from '../lands-tooltip';
import { ReactComponent as HotIcon } from './assets/hot.svg';

import './index.scss';

interface Props {
  land: AssetEntity;
  onClick?: (e: SyntheticEvent, land: AssetEntity) => void;
  onMouseOver?: (e: SyntheticEvent, land: AssetEntity) => void;
}

const LandWorksCard: React.FC<Props> = ({ land, onClick, onMouseOver }) => {
  const { clickedLandId } = useLandsMapTile();
  const did = `${land.decentralandData?.coordinates[0]?.x},${land.decentralandData?.coordinates[0]?.y}`;
  const isActive = clickedLandId === did;
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const onMouseOverHandler = (e: SyntheticEvent, land: AssetEntity) => {
    if (!timeoutId && onMouseOver) {
      setTimeoutId(setTimeout(() => onMouseOver(e, land), 250));
    }
  };

  const onMouseOutHandler = () => {
    if (timeoutId) {
      setTimeoutId(null);
      clearTimeout(timeoutId);
    }
  };

  return (
    <div
      className={`land-explore-card${isActive ? ' active' : ''}`}
      onClick={(e) => !!onClick && onClick(e, land)}
      onMouseOver={(e) => onMouseOverHandler(e, land)}
      onMouseOut={() => onMouseOutHandler()}
      id={`land-explore-card--${did}`}
    >
      <div className="land-explore-image">
        <img className="land-explore-image-img" src={getLandImageUrl(land)} alt="land-explore-image-img" />
      </div>
      {land.isHot && (
        <span className="land-explore-card-hot">
          <HotIcon className="name-label" />
        </span>
      )}

      <div className="land-explore-name">
        <span title={land.name}>{land.name.toLowerCase()}</span>
        {!land.decentralandData?.isLAND && <span className="label card-name-estate-label"> ESTATE</span>}
      </div>

      <div className="land-explore-row start">
        <span className="land-explore-price-crypto">
          <Icon name={getTokenIconName(land.paymentToken.symbol)} className="eth-icon" />
          <SmallAmountTooltip amount={land.pricePerMagnitude.price} />
        </span>

        <span className="land-explore-price">
          <SmallAmountTooltip symbol="$" amount={land.pricePerMagnitude.usdPrice || ZERO_BIG_NUMBER} />
          <span>/{land.pricePerMagnitude.magnitude}</span>
        </span>

        <LandsTooltip
          placement="bottomLeft"
          trigger="hover"
          text={
            <>
              The price for renting this property is {land.humanPricePerSecond.toString(10)}{' '}
              <Icon name={getTokenIconName(land.paymentToken.symbol)} className="eth-icon" /> per second.
            </>
          }
        />
      </div>

      <div className="land-explore-divider"></div>

      <div className="land-explore-row">
        <div>
          <span className="land-explore-rent-label">Rent period</span>
          <p className="land-explore-rent-value">
            {land.minPeriodTimedType}-{land.maxPeriodTimedType}
          </p>
        </div>
        <div>
          <LandCardAvailability land={land} />
        </div>
      </div>

      <div className="land-explore-row start">
        <div className="land-explore-hashtags">{land.decentralandData?.isLAND ? '#LAND' : '#ESTATE'} #DECENTRALAND</div>
      </div>
    </div>
  );
};

export default LandWorksCard;
