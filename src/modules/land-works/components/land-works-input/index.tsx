import { useState } from 'react';
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

interface Props {
  options: 'times' | 'currencies';
  handleOptionChange: () => void;
}

export default function CustomDropdownInput({ options, handleOptionChange }: Props) {
  const [currency, setCurrency] = useState(currencies[0]);
  const [selectedCurrency, setSelectedCurrency] = useState(0);

  const handleChange = (value: number) => {
    const sortIndex = Number(value) - 1;
    setSelectedCurrency(value);
    setCurrency(currencies[sortIndex]);
    handleOptionChange();
  };

  return (
    <Box display="flex" flexDirection="row" className={s.wrapper}>
      <input className={s.input} type={'number'} />
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
  );
}
