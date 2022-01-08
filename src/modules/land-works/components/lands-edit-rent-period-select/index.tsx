import React from 'react';
import Select from 'react-select';

import { LandsEditInput } from '../lands-edit-input';

import './index.scss';

type Item = {
  label: string;
  value: number | string;
};

interface IProps {
  onChange: (event: any) => void;
  onInputChange: (event: any) => void;
  options: any[];
  initialValuе?: Item;
  inputValue?: number;
}

export const LandsEditPeriodDropdown: React.FC<IProps> = ({
  onChange,
  onInputChange,
  options,
  initialValuе,
  inputValue,
}) => {
  return (
    <div className="period-select-component">
      <LandsEditInput onInputChange={onInputChange} value={inputValue} />
      <Select options={options} value={initialValuе} onChange={onChange} className="lands-period-drop" />
    </div>
  );
};
