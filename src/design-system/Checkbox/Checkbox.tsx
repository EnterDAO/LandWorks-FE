import { FC } from 'react';
import CheckboxMUI, { CheckboxProps } from '@mui/material/Checkbox';

import { CheckedIcon, Icon, checkboxStyle } from './checkbox-style';

const Checkbox: FC<CheckboxProps> = (props) => {
  return <CheckboxMUI sx={checkboxStyle} disableRipple checkedIcon={<CheckedIcon />} icon={<Icon />} {...props} />;
};

export default Checkbox;
