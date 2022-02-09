import React, { FC } from 'react';
import { Typography } from '@mui/material';

type InputLabelProps = {
  htmlFor?: string;
  children?: React.ReactNode;
};

const InputLabel: FC<InputLabelProps> = (props) => {
  const { htmlFor, children } = props;

  return (
    <Typography
      variant="caption"
      component="label"
      display="inline-block"
      alignSelf="baseline"
      ml={2}
      mb={2}
      htmlFor={htmlFor}
    >
      {children}
    </Typography>
  );
};

export default InputLabel;
