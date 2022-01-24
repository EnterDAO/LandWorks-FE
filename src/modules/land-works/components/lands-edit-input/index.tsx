import React from 'react';
import { Input } from 'antd';

import './index.scss';

interface IProps {
  onInputChange: (event: any) => void;
  customClassName?: string;
  value?: number;
  disabled?: boolean;
}

export const LandsEditInput: React.FC<IProps> = ({ onInputChange, customClassName, value, disabled }) => {
  return (
    <Input
      // placeholder="1"
      step="0.01"
      type="number"
      className={`custom-lands-input ${customClassName}`}
      onChange={onInputChange}
      value={value}
      disabled={disabled}
    />
  );
};
