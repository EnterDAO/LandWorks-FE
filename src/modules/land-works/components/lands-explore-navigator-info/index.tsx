import { FC, useEffect, useState } from 'react';

import { shortenString } from 'modules/land-works/utils';

import styles from './lands-explore-navigator-info.module.scss';

export type SelectedTile = {
  id: string;
  type: string;
  owner: string;
};

interface Props {
  selected: SelectedTile;
}

const LandsExploreNavigatorInfo: FC<Props> = ({ selected }) => {
  const [positionId, setPositionId] = useState(selected?.id || '');
  const [positionType, setPositionType] = useState(selected?.type);
  const [positionOwner, setPositionOwner] = useState(selected?.owner);

  useEffect(() => {
    setPositionId(selected?.id || '');
    setPositionType(selected?.type);
    setPositionOwner(selected?.owner || '');
  }, [selected]);

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
