import React from 'react';

import Select, { SelectOption } from 'components/antd/select';

import './index.scss';

type Item = {
  label: string;
  value: number | string;
};

interface IProps {
  onChange: (event: any) => void;
  options: Item[];
  initialValuе: Item;
}

export const CustomDropdown: React.FC<IProps> = ({ onChange, options, initialValuе, children }) => {
  return (
    <Select options={options} defaultValue={initialValuе.value} onChange={onChange} className="drop-select">
      {/* <Option value="lucy">lucy</Option> */}
    </Select>
  );
};
