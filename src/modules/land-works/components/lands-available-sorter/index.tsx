import React from 'react';
import { Radio } from 'antd';

import './index.scss';

interface IAvailableSorterProps {
  onAvailableChange: (available: any) => void;
  availableOnly: boolean;
  text: string;
}
export const LandsAvailableSorter: React.FC<IAvailableSorterProps> = ({ onAvailableChange, availableOnly, text }) => {
  return (
    <div className="available-sort-wrapper">
      <Radio checked={availableOnly} onChange={onAvailableChange}></Radio>
      <span onClick={() => onAvailableChange({ target: { checked: !availableOnly } })} className="label">
        {text}
      </span>
    </div>
  );
};
