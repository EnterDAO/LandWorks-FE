import React, { SyntheticEvent } from 'react';
import { ZERO_BIG_NUMBER } from 'web3/utils';

import Icon from 'components/custom/icon';
import SmallAmountTooltip from 'components/custom/smallAmountTooltip';
import { getLandImageUrl, getTokenIconName } from 'helpers/helpers';

import { AssetEntity } from '../../api';
import LandCardAvailability from '../land-works-card-availability';
import { LandsTooltip } from '../lands-tooltip';
import { ReactComponent as HotIcon } from './assets/hot.svg';

import './index.scss';

interface ILandWorksCardProps {
  land: AssetEntity;
  onClick?: (e: SyntheticEvent, land: AssetEntity) => void;
}

const LandWorksCard: React.FC<ILandWorksCardProps> = ({ land, onClick }) => {
  return (
    <a href={`/property/${land.id}`} className="land-explore-card" onClick={(e) => !!onClick && onClick(e, land)}>
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
        {land?.availability?.isRentable && (
          <div>
            <span className="land-explore-rent-label">Rent period</span>
            <p className="land-explore-rent-value">{land.availability?.label}</p>
          </div>
        )}
        <div>
          <LandCardAvailability land={land} />
        </div>
      </div>

      <div className="land-explore-row start">
        <div className="land-explore-hashtags">{land.decentralandData?.isLAND ? '#LAND' : '#ESTATE'} #DECENTRALAND</div>
      </div>
    </a>
  );
};

export default LandWorksCard;
