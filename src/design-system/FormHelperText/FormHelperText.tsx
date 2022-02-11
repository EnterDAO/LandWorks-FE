import { FC, ReactNode } from 'react';
import { SxProps, Typography } from '@mui/material';

import { THEME_COLORS } from 'themes/theme-constants';

type FormHelperTextProps = {
  children?: ReactNode;
  sx?: SxProps;
};

const FormHelperText: FC<FormHelperTextProps> = ({ children, sx }) => {
  return (
    <Typography variant="body2" component="p" mt={1} pl={2} color={THEME_COLORS.red} width="300px" sx={sx}>
      {children}
    </Typography>
  );
};

export default FormHelperText;
