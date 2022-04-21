import { FC, useEffect, useState } from 'react';

import { getENSName } from 'helpers/helpers';
import { useLandsMapTile } from 'modules/land-works/providers/lands-map-tile';

import { shortenString } from 'modules/land-works/utils';

import styles from './lands-explore-navigator-info.module.scss';

const LandsExploreNavigatorInfo: FC = () => {
  const { selectedTile } = useLandsMapTile();
  const [positionId, setPositionId] = useState(selectedTile?.id || '');
  const [positionType, setPositionType] = useState(selectedTile?.type);
  const [positionOwner, setPositionOwner] = useState(selectedTile?.owner);

  useEffect(() => {
    setPositionId(selectedTile?.id || '');
    setPositionType(selectedTile?.type);
    setPositionOwner(selectedTile?.owner || '');
  }, [selectedTile]);

  useEffect(() => {
    if (positionOwner && !!positionOwner.length && positionOwner.search('0x') !== -1) {
      getENSName(positionOwner).then((ensName) => {
        setPositionOwner(ensName);
      });
    }
  }, [positionOwner]);

  return (
    <div
      className={styles.root}
      style={{
        opacity: !positionId.length ? 0 : 1,
      }}
    >
      <div className={styles.block}>
        X: {positionId.split(',')[0]} Y: {positionId.split(',')[1]}
        <br />
        {positionType}
        <br />
        Owner:{' '}
        {!!positionOwner?.length && (
          <a href={`https://etherscan.io/address/${positionOwner}`} target="_blank">
            {shortenString(positionOwner)}
          </a>
        )}
      </div>
    </div>
  );
};

export default LandsExploreNavigatorInfo;
