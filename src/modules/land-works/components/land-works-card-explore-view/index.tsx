import React, { MouseEvent, Ref, forwardRef } from 'react';
import classNames from 'classnames';
import { ZERO_BIG_NUMBER } from 'web3/utils';

import Divider from 'components/custom/divider';
import Icon from 'components/custom/icon';
import SmallAmountTooltip from 'components/custom/small-amount-tooltip';
import { getTokenIconName } from 'helpers/helpers';
import { getPropertyPath } from 'router/routes';

import config from '../../../../config';
import { AssetEntity } from '../../api';
import LandCardAvailability from '../land-works-card-availability';
import { ReactComponent as HotIcon } from './assets/hot.svg';

import { shortenString } from 'modules/land-works/utils';

import './index.scss';

interface Props {
  land: AssetEntity;
  layout?: 'normal' | 'compact';
  isActive?: boolean;
  onClick?: (e: MouseEvent<HTMLAnchorElement>, land: AssetEntity) => void;
  onMouseOver?: (e: MouseEvent<HTMLAnchorElement>, land: AssetEntity) => void;
  onMouseOut?: (e: MouseEvent<HTMLAnchorElement>, land: AssetEntity) => void;
}

// TODO: refactor
const LandWorksCard = (
  { land, isActive, onClick, onMouseOver, onMouseOut, layout = 'normal' }: Props,
  ref: Ref<HTMLAnchorElement>
) => {
  const isStaked = land.owner.id == config.contracts.yf.staking;
  const ownerOrConsumer = isStaked ? land.consumer?.id : land.owner.id;

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (onClick) {
      onClick(e, land);
    }
  };

  return (
    <a
      ref={ref}
      className={classNames('land-explore-card', `land-explore-card--layout-${layout}`, isActive && 'active')}
      onClick={handleClick}
      onMouseOver={(e) => onMouseOver && onMouseOver(e, land)}
      onMouseOut={(e) => onMouseOut && onMouseOut(e, land)}
      href={getPropertyPath(land.id)}
    >
      <div>
        <div className="land-explore-image">
          <img className="land-explore-image-img" src={land.imageUrl} alt="land-explore-image-img" />
        </div>
        {land.isHot && (
          <span className="land-explore-card-hot">
            <HotIcon className="name-label" />
          </span>
        )}

        <div className="land-explore-card__info">
          <div className="land-explore-card__name-and-address">
            <p className="land-explore-card__name" title={land.name}>
              {land.name.toLowerCase()}
            </p>
            <p className="land-explore-card__address" title={ownerOrConsumer}>
              BY {shortenString(ownerOrConsumer)}
            </p>
          </div>

          <div className="land-explore-card__price">
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
        </div>

        <Divider sx={{ my: layout === 'compact' ? 2 : 3 }} />

        <div className="land-explore-card__rent land-explore-row">
          <div className="land-explore-card__rent-period">
            <span className="land-explore-rent-label">Rent period</span>
            <p className="land-explore-rent-value">
              {land.minPeriodTimedType}-{land.maxPeriodTimedType}
            </p>
          </div>
          <div className="land-explore-card__rent-status">
            <LandCardAvailability layout={layout} land={land} />
          </div>
        </div>

        <div className="land-explore-card__hashtags land-explore-row">
          #{land.type} #{land.metaverse.name}
        </div>
      </div>
    </a>
  );
};

export default forwardRef(LandWorksCard);
