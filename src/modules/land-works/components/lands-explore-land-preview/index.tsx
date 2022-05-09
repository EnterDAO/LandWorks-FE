import { FC, useEffect, useState } from 'react';
import { ZERO_BIG_NUMBER } from 'web3/utils';

import Icon from 'components/custom/icon';
import SmallAmountTooltip from 'components/custom/small-amount-tooltip';
import { getTokenIconName } from 'helpers/helpers';
import { AssetEntity } from 'modules/land-works/api';
import { useLandsMapTile } from 'modules/land-works/providers/lands-map-tile';
import { useLandsSearchQuery } from 'modules/land-works/providers/lands-search-query';

import styles from './lands-explore-land-preview.module.scss';

interface Props {
  lands: AssetEntity[];
}

const LandsExploreLandPreview: FC<Props> = ({ lands }) => {
  const { clickedLandId, setClickedLandId } = useLandsMapTile();
  const { setSearchQuery } = useLandsSearchQuery();
  const [land, setLand] = useState<AssetEntity>();

  const onClickLinkHandler = () => {
    setSearchQuery('');
    const [x, y] = clickedLandId.split(',');

    if (setClickedLandId) {
      setClickedLandId(0, 0);
      setTimeout(() => setClickedLandId(x, y));
    }
  };

  const getLand = (): AssetEntity | null => {
    let foundLand = null;

    lands.forEach((land) => {
      land.decentralandData?.coordinates.forEach((coord) => {
        if (coord.id === clickedLandId.replace(',', '-')) {
          foundLand = land;
        }
      });
    });

    return foundLand;
  };

  useEffect(() => {
    const land = getLand();

    if (land) {
      setLand(land);
    }
  }, [clickedLandId]);

  return (
    <div className={styles.root}>
      {land && (
        <div className={styles.block}>
          <div className="land-explore-name">
            <span title={land?.name}>{land?.name.toLowerCase()}</span>
            {!land.decentralandData?.isLAND && <span className="label card-name-estate-label"> ESTATE</span>}
          </div>
          <div>
            <span className="land-explore-price-crypto">
              <Icon name={getTokenIconName(land.paymentToken.symbol)} className="eth-icon" />
              <SmallAmountTooltip amount={land.pricePerMagnitude.price} />
            </span>

            <span className="land-explore-price">
              <SmallAmountTooltip symbol="$" amount={land.pricePerMagnitude.usdPrice || ZERO_BIG_NUMBER} />
              <span>/{land.pricePerMagnitude.magnitude}</span>
            </span>
          </div>
          <div className={styles.blockTopBorder}>
            <a onClick={onClickLinkHandler} className={styles.link}>
              {'<<'} See details and close search
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandsExploreLandPreview;
