import React from 'react';
import { Checkbox } from 'antd';

import './index.scss';

interface IAvailableSorterProps {
  onAvailableChange: (available: any) => void;
  availableOnly: boolean;
  text: string;
}
export const LandsAvailableSorter: React.FC<IAvailableSorterProps> = ({ onAvailableChange, availableOnly, text }) => {
  return (
    <div className="available-sort-wrapper">
      <Checkbox checked={availableOnly} onChange={onAvailableChange}></Checkbox>
      <span onClick={() => onAvailableChange({ target: { checked: !availableOnly } })} className="label">
        {text}
      </span>
    </div>
  );
};
