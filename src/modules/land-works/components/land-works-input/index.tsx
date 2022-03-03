import { ChangeEvent, FC, useState } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import { ControlledSelect } from 'design-system';

import s from './s.module.scss';

const times = [
  {
    value: 1,
    label: 'Mins',
  },
  {
    value: 2,
    label: 'Hours',
  },
  {
    value: 3,
    label: 'Days',
  },
  {
    value: 4,
    label: 'Weeks',
  },
];

const currencies = [
  {
    value: 1,
    label: 'ETH',
  },
  {
    value: 2,
    label: 'USDC',
  },
];

interface InputProps {
  options: 'times' | 'currencies';
  handleOptionChange: (value: number) => void;
  onInput: (e: ChangeEvent<HTMLInputElement>) => void;
  ethInUsd?: string;
}

const CustomDropdownInput: FC<InputProps> = ({ options, handleOptionChange, onInput, ethInUsd }) => {
  const [currency, setCurrency] = useState(currencies[0]);

  const handleChange = (value: number) => {
    const sortIndex = Number(value) - 1;
    setCurrency(currencies[sortIndex]);
    handleOptionChange(value);
  };

  return (
    <Box display="flex" flexDirection="row" justifyContent="space-between" className={s.wrapper}>
      <input className={s.input} type={'number'} onInput={onInput} />
      <Box display="flex" flexDirection="row" className={s.dropdownBox}>
        <span>{ethInUsd}</span>
        <Divider orientation="vertical" flexItem className={s.divider} />
        <Box>
          <ControlledSelect
            width={'7rem'}
            value={currency.value}
            onChange={handleChange}
            options={options === 'times' ? times : currencies}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CustomDropdownInput;
