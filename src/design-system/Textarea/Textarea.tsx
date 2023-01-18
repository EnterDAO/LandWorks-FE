import React, { Ref } from 'react';
import InputUnstyled, { InputUnstyledProps } from '@mui/base/InputUnstyled';

import { StyledTextarea, StyledTextareaRoot } from './textarea-styles';

type TextareaProps = InputUnstyledProps;

const Textarea = (props: TextareaProps, ref: Ref<HTMLDivElement>) => {
  // NOTE: workaround to pass components prop
  const additionalProps = {
    components: {
      Root: StyledTextareaRoot,
      Textarea: StyledTextarea,
    },
  } as any;

  return <InputUnstyled {...props} {...additionalProps} multiline ref={ref} />;
};

export default React.forwardRef<HTMLDivElement, InputUnstyledProps>(Textarea);
