import React from 'react';

import Select from 'components/antd/select';

import './index.scss';

const options = [
  {
    label: 'Most recent',
    value: 1,
  },
];
interface ILandsPlaceSorterProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onRentSortChange: (event: any) => void;
}

const LandsRentingSorter: React.FC<ILandsPlaceSorterProps> = ({ onRentSortChange }) => {
  return <Select options={options} disabled defaultValue={options[0].label} onChange={onRentSortChange}></Select>;
};

export default LandsRentingSorter;
