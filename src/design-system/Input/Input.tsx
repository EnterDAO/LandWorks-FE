import React, { ReactNode, useMemo, useState } from 'react';
import InputUnstyled, { InputUnstyledProps } from '@mui/base/InputUnstyled';
import { IconButton, InputAdornment } from '@mui/material';

import { NotVisibleIcon, VisibleIcon } from '../icons';
import Icon from '../icons/Icon';
import { StyledInput, StyledInputRoot } from './input-styles';
import PasswordStrength from './PasswordStrength';

import { THEME_COLORS } from '../../themes/theme-constants';

import { PasswordStrengthEnum, PasswordStrengthTypes } from './password-strength-types';

export interface InputProps extends InputUnstyledProps {
  error?: boolean;
  showPasswordStrength?: boolean;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
}

const Input = React.forwardRef<HTMLDivElement, InputProps>((props, ref) => {
  const { type, showPasswordStrength, onChange, onFocus, onBlur, startAdornment, endAdornment } = props;
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const [showStrength, setShowStrength] = useState<boolean>(false);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrengthTypes>(undefined);

  const checkPasswordStrength = (event: React.ChangeEvent<HTMLInputElement>) => {
    const passwordLength = event.target.value.length;

    if (passwordLength >= 8) {
      setPasswordStrength(PasswordStrengthEnum.Strong);
    } else if (passwordLength >= 3 && passwordLength <= 7) {
      setPasswordStrength(PasswordStrengthEnum.Medium);
    } else if (passwordLength >= 1 && passwordLength <= 2) {
      setPasswordStrength(PasswordStrengthEnum.Weak);
    } else {
      setPasswordStrength(undefined);
    }
  };

  let passwordIcons = null;

  if (type === 'password') {
    passwordIcons = useMemo(
      () => (
        <InputAdornment position="start">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            type="button"
            edge="end"
            disableRipple
            tabIndex={-1}
            sx={{
              color: showPassword ? THEME_COLORS.light : THEME_COLORS.grey02,
              padding: 0,
            }}
          >
            <Icon
              iconElement={showPassword ? <VisibleIcon /> : <NotVisibleIcon />}
              sx={{ color: THEME_COLORS.grey02 }}
            />
          </IconButton>
        </InputAdornment>
      ),
      [showPassword]
    );
  }

  const copyProps = { ...props };
  delete copyProps.showPasswordStrength;

  return (
    <>
      <InputUnstyled
        components={{
          Root: StyledInputRoot,
          Input: StyledInput,
        }}
        {...copyProps}
        ref={ref}
        {...(type === 'password' && {
          type: showPassword ? 'text' : 'password',
          endAdornment: passwordIcons,
        })}
        {...(showPasswordStrength &&
          type === 'password' && {
            onChange: (event) => {
              checkPasswordStrength(event);

              if (onChange) {
                onChange(event);
              }
            },
            onFocus: (event: React.FocusEvent<HTMLInputElement, Element>) => {
              setShowStrength(true);

              if (onFocus) {
                onFocus(event);
              }
            },
            onBlur: (event: React.FocusEvent<HTMLInputElement, Element>) => {
              setShowStrength(false);

              if (onBlur) {
                onBlur(event);
              }
            },
          })}
        startAdornment={startAdornment}
        endAdornment={endAdornment}
      />
      {showStrength && <PasswordStrength strength={passwordStrength} />}
    </>
  );
});

export default Input;
