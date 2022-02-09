import React from 'react';

// import { Select } from 'antd';
import Select from 'components/antd/select';

import './index.scss';

type Item = {
  label: string;
  value: any;
};

interface IProps {
  onChange: (event: any) => void;
  options: Item[];
  initialValue: Item;
}

export const Dropdown: React.FC<IProps> = ({ onChange, options, initialValue }) => {
  return (
    <Select options={options} defaultValue={initialValue.value} onChange={onChange} className="drop-select"></Select>
  );
};
