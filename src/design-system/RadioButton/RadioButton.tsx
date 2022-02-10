import React, { FC } from 'react';
import Radio, { RadioProps } from '@mui/material/Radio';

import { CheckedIcon, Icon, radioButtonStyles } from './radio-button-styles';

const RadioButton: FC<RadioProps> = (props) => {
  return <Radio sx={radioButtonStyles} disableRipple checkedIcon={<CheckedIcon />} icon={<Icon />} {...props} />;
};
export default RadioButton;
