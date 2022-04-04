import React, { Ref } from 'react';
import InputUnstyled, { InputUnstyledProps } from '@mui/base/InputUnstyled';

import { StyledTextarea, StyledTextareaRoot } from './textarea-styles';

type TextareaProps = InputUnstyledProps;

const Textarea = (props: TextareaProps, ref: Ref<HTMLDivElement>) => {
  return (
    <InputUnstyled
      {...props}
      components={{
        Root: StyledTextareaRoot,
        Textarea: StyledTextarea,
      }}
      multiline
      ref={ref}
    />
  );
};

export default React.forwardRef<HTMLDivElement, InputUnstyledProps>(Textarea);
