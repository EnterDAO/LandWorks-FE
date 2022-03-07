import { ChangeEvent, FC, useState } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import { ControlledSelect } from 'design-system';
import { Option } from 'modules/interface';

import s from './s.module.scss';

interface InputProps {
  options: Option[];
  value: number;
  handleOptionChange: (value: number) => void;
  onInput: (e: ChangeEvent<HTMLInputElement>) => void;
  ethInUsd?: string;
}

const CustomDropdownInput: FC<InputProps> = ({ options, handleOptionChange, onInput, ethInUsd, value }) => {
  const handleChange = (value: number) => {
    handleOptionChange(value);
  };

  return (
    <Box display="flex" flexDirection="row" justifyContent="space-between" className={s.wrapper}>
      <input className={s.input} type={'number'} onInput={onInput} defaultValue={1} />
      <Box display="flex" flexDirection="row" className={s.dropdownBox}>
        <span>{ethInUsd}</span>
        <Divider orientation="vertical" flexItem className={s.divider} />
        <Box>
          <ControlledSelect value={value} width={'7rem'} onChange={handleChange} options={options} />
        </Box>
      </Box>
    </Box>
  );
};

export default CustomDropdownInput;
