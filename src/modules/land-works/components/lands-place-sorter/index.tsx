import React from 'react';
import { Select } from 'antd';

import './index.scss';

interface ILandsPlaceSorterProps {
  onPlaceChange: (event: any) => void;
}
export const LandsPlaceSorter: React.FC<ILandsPlaceSorterProps> = ({ onPlaceChange }) => {
  const { Option } = Select;
  return (
    <div className="place-sort-wrapper">
      <Select bordered={false} defaultValue="Decentraland" style={{ width: '130px' }} onChange={onPlaceChange}>
        <Option value="jack">Decentraland</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="disabled" disabled>
          Disabled
        </Option>
        <Option value="Yiminghe">yiminghe</Option>
      </Select>
    </div>
  );
};
