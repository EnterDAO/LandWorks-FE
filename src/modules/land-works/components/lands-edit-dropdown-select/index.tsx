import React from 'react';
import Select from 'react-select';

import './index.scss';

type Item = {
  label: string;
  value: any;
};

interface IProps {
  onChange: (event: any) => void;
  options: Item[];
  initialValuе: Item;
  disabled?: boolean;
}

export const EditViewLandDropdown: React.FC<IProps> = ({ onChange, options, initialValuе, disabled }) => {
  return (
    <Select options={options} isDisabled={disabled} value={initialValuе} onChange={onChange} className="drop-select" />
  );
};
