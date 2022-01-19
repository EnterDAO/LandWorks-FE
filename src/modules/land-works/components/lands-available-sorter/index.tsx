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
    <div className="available-sort-wrapper" onClick={() => onAvailableChange({ target: { checked: !availableOnly } })}>
      <Radio checked={availableOnly} onChange={onAvailableChange}></Radio>
      <span className="label">{text}</span>
    </div>
  );
};
