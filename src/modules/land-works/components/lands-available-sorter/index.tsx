import React from 'react';
import { Checkbox } from 'antd';

import './index.scss';

interface IAvailableSorterProps {
  onAvailableChange: (available: any) => void;
  availableOnly: boolean;
}
export const LandsAvailableSorter: React.FC<IAvailableSorterProps> = ({ onAvailableChange, availableOnly }) => {
  return (
    <div className="available-sort-wrapper">
      <Checkbox checked={availableOnly} onChange={onAvailableChange}></Checkbox>
      <span onClick={() => onAvailableChange({ target: { checked: !availableOnly } })} className="label">
        Available only
      </span>
    </div>
  );
};
