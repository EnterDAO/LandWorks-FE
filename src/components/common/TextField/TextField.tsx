import React, { ComponentPropsWithoutRef, ReactNode, Ref, forwardRef } from 'react';
import { Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputBase, { inputBaseClasses } from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';

const Input = styled(InputBase)(({ theme }) => ({
  height: 52,
  borderRadius: 10,
  position: 'relative',
  backgroundColor: 'var(--theme-grey200-color)',
  border: '1px solid transparent',
  width: 'auto',
  padding: '0 20px',
  ...theme.typography.caption,
  marginBottom: theme.spacing(4),
  transition: theme.transitions.create('border-color', { duration: '0.15s' }),
  [`&.${inputBaseClasses.adornedEnd}`]: {
    paddingRight: 0,
  },
  [`&.${inputBaseClasses.focused}`]: {
    borderColor: 'var(--theme-light-color)',
  },
  [`&.${inputBaseClasses.error}`]: {
    marginBottom: 0,
    borderColor: 'var(--theme-red-color)',
  },
  [`&.${inputBaseClasses.disabled}`]: {
    color: 'var(--theme-grey700-color) !important',
    WebkitTextFillColor: 'initial !important',
  },
  'label + &': {
    marginTop: 13,
  },
  [`& > .${inputBaseClasses.input}`]: {
    padding: 0,
    height: '100%',
    appearance: 'none',
    '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
      appearance: 'none',
      margin: 0,
    },
    [`&.${inputBaseClasses.disabled}`]: {
      color: 'inherit',
      WebkitTextFillColor: 'inherit',
    },
  },
  [`&.${inputBaseClasses.adornedEnd} > .${inputBaseClasses.input}`]: {
    paddingRight: 20,
  },
}));

type BaseInputProps = ComponentPropsWithoutRef<typeof Input>;

interface TextFieldBaseProps
  extends Pick<
    BaseInputProps,
    | 'endAdornment'
    | 'onChange'
    | 'onBlur'
    | 'onFocus'
    | 'disabled'
    | 'autoComplete'
    | 'name'
    | 'placeholder'
    | 'readOnly'
    | 'spellCheck'
    | 'sx'
  > {
  id?: string;
  label?: ReactNode;
  error?: ReactNode;
  type?: 'number' | 'text' | 'date';
  defaultValue?: string | number | null | undefined;
}

export interface TextFieldTextTypeProps extends TextFieldBaseProps {
  type: 'text' | 'date';
  value?: string | number;
}

type TextFieldProps = TextFieldTextTypeProps;

const TextField = (
  { label, error, type = 'text', autoComplete = 'off', spellCheck = false, id, sx, ...otherProps }: TextFieldProps,
  ref: Ref<HTMLInputElement>
) => {
  const commonProps = {
    autoComplete,
    error: !!error,
    id,
  };

  return (
    <FormControl sx={sx} variant="standard">
      {label && (
        <Typography
          display="flex"
          alignItems="center"
          component="label"
          textTransform="initial"
          htmlFor={id}
          variant="button"
        >
          {label}
        </Typography>
      )}

      <Input type={type} inputRef={ref} spellCheck={spellCheck} {...commonProps} {...otherProps} />

      {!!error && (
        <Typography display="block" mt="2px" color="error" variant="body2">
          {error}
        </Typography>
      )}
    </FormControl>
  );
};

export default forwardRef(TextField);
