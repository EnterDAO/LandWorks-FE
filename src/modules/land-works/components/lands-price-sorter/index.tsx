import React from 'react';

// import { Select } from 'antd';
import Select from 'components/antd/select';

import './index.scss';

const options = [
  {
    label: 'Hottest first',
    value: 1,
  },
  {
    label: 'Price: low first',
    value: 2,
  },
  {
    label: 'Price: high first',
    value: 3,
  },
];
interface ILandsSorterProps {
  onSortDirectionChange: (event: any) => void;
}
export const LandsPriceSorter: React.FC<ILandsSorterProps> = ({ onSortDirectionChange }) => {
  return <Select options={options} defaultValue="Hotest first" onChange={onSortDirectionChange}></Select>;
};
