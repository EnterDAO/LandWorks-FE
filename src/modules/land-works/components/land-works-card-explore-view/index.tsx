import React, { SyntheticEvent, useState } from 'react';
import { ZERO_BIG_NUMBER } from 'web3/utils';

import Icon from 'components/custom/icon';
import SmallAmountTooltip from 'components/custom/small-amount-tooltip';
import { getTokenIconName } from 'helpers/helpers';
import { useLandsMapTile } from 'modules/land-works/providers/lands-map-tile';

import { AssetEntity } from '../../api';
import LandCardAvailability from '../land-works-card-availability';
import { ReactComponent as HotIcon } from './assets/hot.svg';

import './index.scss';

interface Props {
  land: AssetEntity;
  onClick?: (e: SyntheticEvent, land: AssetEntity) => void;
  onMouseOver?: (e: SyntheticEvent, land: AssetEntity) => void;
}

const LandWorksCard: React.FC<Props> = ({ land, onClick, onMouseOver }) => {
  const { clickedLandId } = useLandsMapTile();
  const did = land.decentralandData
    ? `${land.decentralandData?.coordinates[0]?.x},${land.decentralandData?.coordinates[0]?.y}`
    : `${land.metaverseAssetId}`;
  const isActive = clickedLandId === did;
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const isDecentraland = land.metaverse.name == 'Decentraland';

  const onMouseOverHandler = (e: SyntheticEvent, land: AssetEntity) => {
    if (!timeoutId && onMouseOver) {
      setTimeoutId(setTimeout(() => onMouseOver(e, land), isDecentraland ? 500 : 1000));
    }
  };

  const onMouseOutHandler = () => {
    if (timeoutId) {
      setTimeoutId(null);
      clearTimeout(timeoutId);
    }
  };

  return (
    <a
      className={`land-explore-card${isActive ? ' active' : ''}`}
      onClick={(e) => {
        e.preventDefault();
        !!onClick && onClick(e, land);
      }}
      onMouseOver={(e) => onMouseOverHandler(e, land)}
      onMouseOut={() => onMouseOutHandler()}
      id={`land-explore-card--${did}`}
      href={`/property/${land.id}`}
    >
      <div style={{ pointerEvents: 'none' }}>
        <div className="land-explore-image">
          <img className="land-explore-image-img" src={land.imageUrl} alt="land-explore-image-img" />
        </div>
        {land.isHot && (
          <span className="land-explore-card-hot">
            <HotIcon className="name-label" />
          </span>
        )}

        <div className="land-explore-name">
          <span title={land.name}>{land.name.toLowerCase()}</span>
        </div>

        <div className="land-explore-row start">
          <span className="land-explore-price-crypto">
            <SmallAmountTooltip
              className="land-explore-price-amount"
              amount={land.pricePerMagnitude.price}
              icon={
                <Icon
                  name={getTokenIconName(land.paymentToken.symbol)}
                  className="land-explore-price-crypto-icon eth-icon"
                />
              }
            />
          </span>

          <span className="land-explore-price">
            <SmallAmountTooltip symbol="$" amount={land.pricePerMagnitude.usdPrice || ZERO_BIG_NUMBER} />
            <span>/{land.pricePerMagnitude.magnitude}</span>
          </span>
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
          <div className="land-explore-hashtags">
            #{land.type} #{land.metaverse.name}
          </div>
        </div>
      </div>
    </a>
  );
};

export default LandWorksCard;
