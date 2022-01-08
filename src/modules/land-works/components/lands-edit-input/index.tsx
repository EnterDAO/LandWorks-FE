import React from 'react';
import { Input } from 'antd';

import './index.scss';

interface IProps {
  onInputChange: (event: any) => void;
  customClassName?: string;
  value?: number;
}

export const LandsEditInput: React.FC<IProps> = ({ onInputChange, customClassName, value }) => {
  return (
    <Input placeholder="1" className={`custom-lands-input ${customClassName}`} onChange={onInputChange} value={value} />
  );
};
