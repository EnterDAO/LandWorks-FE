import { Input } from 'antd';

import Select from 'components/antd/select';

import { LandsInput } from '../lands-input';

import './index.scss';

type Item = {
  label: string;
  value: number | string;
};

interface IProps {
  onChange: (event: any) => void;
  onInputChange: (event: any) => void;
  options: Item[];
  initialValue: Item;
}

export const LandsPeriodDropdown: React.FC<IProps> = ({ onChange, onInputChange, options, initialValue }) => {
  return (
    <div className="period-select-component">
      <LandsInput onInputChange={onInputChange} />
      <Select options={options} defaultValue={initialValue.value} onChange={onChange} className="lands-period-drop" />
    </div>
  );
};
