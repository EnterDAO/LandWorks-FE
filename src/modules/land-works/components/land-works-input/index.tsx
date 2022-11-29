import { ChangeEvent, FC } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import { ControlledSelect, Typography } from 'design-system';
import { Option } from 'modules/interface';

import { THEME_COLORS } from 'themes/theme-constants';

import s from './s.module.scss';

interface InputProps {
  options: Option[];
  optionsValue: number;
  handleOptionChange: (value: number) => void;
  onInput: (e: ChangeEvent<HTMLInputElement>) => void;
  ethInUsd?: string;
  error?: string;
  defaultInputValue: number;
}

const CustomDropdownInput: FC<InputProps> = ({
  options,
  handleOptionChange,
  onInput,
  ethInUsd,
  optionsValue,
  error,
  defaultInputValue,
}) => {
  const handleChange = (value: number) => {
    handleOptionChange(value);
  };
  const borderColor = error !== '' ? `1px solid ${THEME_COLORS.red}` : '1px solid none';
  return (
    <Box
      style={{ border: error && borderColor }}
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      className={s.wrapper}
    >
      <input
        className={s.input}
        onWheel={(event) => event.currentTarget.blur()}
        type={'number'}
        onInput={onInput}
        defaultValue={defaultInputValue}
      />
      <Box display="flex" flexDirection="row" className={s.dropdownBox}>
        <Typography minWidth={0} color="var(--theme-grey700-color)" variant="caption" noWrap>
          {ethInUsd}
        </Typography>
        <Divider orientation="vertical" flexItem className={s.divider} />
        <Box>
          <ControlledSelect
            sx={{ '& > button': { height: 1 } }}
            value={optionsValue}
            onChange={handleChange}
            options={options}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CustomDropdownInput;
