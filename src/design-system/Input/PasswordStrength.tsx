import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';

import { THEME_COLORS } from 'themes/theme-constants';

import { PasswordStrengthEnum, PasswordStrengthTypes } from './password-strength-types';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    width: '300px',
    minHeight: '18px',
  },
  line: {
    width: '27px',
    height: '5px',
    borderRadius: '5px',
    transition: 'background 0.5s ease',
  },
} as const;

type PasswordStrengthProps = {
  strength: PasswordStrengthTypes;
};

const PasswordStrength: FC<PasswordStrengthProps> = (props) => {
  const { strength } = props;

  const defaultColor = THEME_COLORS.grey02;
  let color: string = defaultColor;

  switch (strength) {
    case PasswordStrengthEnum.Weak:
      color = THEME_COLORS.red;
      break;
    case PasswordStrengthEnum.Medium:
      color = THEME_COLORS.yellow;
      break;
    case PasswordStrengthEnum.Strong:
      color = THEME_COLORS.green;
      break;
    default:
      color = defaultColor;
      break;
  }

  return (
    <Box mt={1} pl={2} sx={styles.container}>
      <Box
        component="span"
        mr={1}
        sx={{
          ...styles.line,
          ...{ background: color },
        }}
      />
      <Box
        component="span"
        mr={1}
        sx={{
          ...styles.line,
          ...{
            background:
              strength === PasswordStrengthEnum.Medium || strength === PasswordStrengthEnum.Strong
                ? color
                : defaultColor,
          },
        }}
      />
      <Box
        component="span"
        mr={2}
        sx={{
          ...styles.line,
          ...{
            background: strength === PasswordStrengthEnum.Strong ? color : defaultColor,
          },
        }}
      />
      <Typography
        variant="body2"
        component="p"
        color={color}
        sx={{
          textTransform: 'capitalize',
        }}
      >
        {strength}
      </Typography>
    </Box>
  );
};

export default PasswordStrength;
