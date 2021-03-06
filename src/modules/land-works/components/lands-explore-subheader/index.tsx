import React from 'react';

import { Typography } from 'design-system';

import { ReactComponent as AddIcon } from '../../../../resources/svg/add.svg';

import styles from './lands-explore-subheader.module.scss';

interface Props {
  totalLands: number;
  hasMetamaskConnected: boolean;
  handleListNew: () => void;
}

const LandsExploreSubheader: React.FC<Props> = ({ totalLands, hasMetamaskConnected, handleListNew }) => {
  return (
    <div className={styles.root}>
      <Typography variant="h1">
        Explore Properties <span>Total listed {totalLands}</span>
      </Typography>
      {hasMetamaskConnected && (
        <div className={styles['add-token-wrapper']}>
          <button
            type="button"
            className={`button-primary ${styles['list-new-property-button']} ${styles['button-primary']}`}
            onClick={handleListNew}
          >
            <AddIcon className={`add-icon`} />
            List New Property
          </button>
        </div>
      )}
    </div>
  );
};

export default LandsExploreSubheader;
