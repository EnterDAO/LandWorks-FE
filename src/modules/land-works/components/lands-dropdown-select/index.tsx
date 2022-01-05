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
  initialValuе: Item;
}

export const Dropdown: React.FC<IProps> = ({ onChange, options, initialValuе }) => {
  return (
    <Select options={options} defaultValue={initialValuе.value} onChange={onChange} className="drop-select"></Select>
  );
};
