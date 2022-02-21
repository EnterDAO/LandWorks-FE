import React from 'react';
import { useHistory } from 'react-router-dom';

import { ReactComponent as AddIcon } from '../../../../resources/svg/add.svg';

import './index.scss';

interface Props {
  totalLands: number;
  hasMetamaskConnected: boolean;
}

const LandsSubheader: React.FC<Props> = ({ totalLands, hasMetamaskConnected }) => {
  const history = useHistory();

  return (
    <div className="lands-header">
      <h1>
        Explore Properties <span>Total listed {totalLands}</span>
      </h1>
      {hasMetamaskConnected && (
        <div className="addTokenWrapper">
          <button type="button" className={`button-primary list-new-property`} onClick={() => history.push('/list')}>
            <AddIcon className={`add-icon`} />
            List New Property
          </button>
        </div>
      )}
    </div>
  );
};

export default LandsSubheader
