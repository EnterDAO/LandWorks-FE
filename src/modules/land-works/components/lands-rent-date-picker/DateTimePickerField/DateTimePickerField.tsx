import React, { ComponentProps, ReactNode, Ref, forwardRef, useState } from 'react';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import TextField from 'components/common/TextField';
import { Button } from 'design-system';
import { CalendarIcon } from 'design-system/icons';

interface DateAndTimePickerFieldProps
  extends Pick<ComponentProps<'input'>, 'name' | 'id' | 'disabled' | 'placeholder' | 'onBlur' | 'defaultValue'> {
  error?: string;
  value?: Date;
  onChange?: (value: Date | undefined) => void;
  minDate?: Date;
  maxDate?: Date;
  inputReadOnly?: boolean;
  label?: ReactNode;
}

const DateAndTimePickerField = (
  {
    name,
    id,
    defaultValue,
    disabled,
    error,
    label,
    placeholder,
    value,
    minDate,
    maxDate,
    onBlur,
    onChange,
    inputReadOnly,
  }: DateAndTimePickerFieldProps,
  ref: Ref<HTMLInputElement>
) => {
  const [open, setOpen] = useState(false);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        open={open}
        onClose={() => setOpen(false)}
        value={value}
        disabled={disabled}
        label={label}
        minDate={minDate}
        maxDate={maxDate}
        inputRef={ref}
        inputFormat="dd/MM/yyyy hh:mm aaa"
        renderInput={({ inputRef, label, inputProps: { value, ...otherInputProps } = {} }) => {
          return (
            <TextField
              id={id}
              type="text"
              name={name}
              error={error}
              ref={inputRef}
              label={label}
              placeholder={placeholder}
              defaultValue={defaultValue as any}
              onBlur={onBlur}
              value={value as string}
              readOnly={inputReadOnly}
              {...otherInputProps}
              endAdornment={
                <Button
                  onClick={() => setOpen(true)}
                  variant="accentblue"
                  disabled={disabled}
                  sx={{
                    width: '36px !important',
                    height: '36px !important',
                    minWidth: 'auto',
                    minHeight: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    padding: 0,
                    borderRadius: '8px',
                    mr: '6px',
                    '::before': {
                      borderRadius: '8px !important',
                    },
                    '> *': {
                      display: 'flex',
                    },
                  }}
                >
                  <CalendarIcon width={16} height={16} />
                </Button>
              }
            />
          );
        }}
        onChange={(value) => {
          onChange && onChange(value as any as Date);
        }}
      />
    </LocalizationProvider>
  );
};

export default forwardRef(DateAndTimePickerField);
