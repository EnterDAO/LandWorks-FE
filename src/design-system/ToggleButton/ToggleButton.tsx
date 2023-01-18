import { Ref, forwardRef } from 'react';
import SwitchUnstyled, { SwitchUnstyledProps } from '@mui/base/SwitchUnstyled';

import { ToggleButtonRoot } from './toggle-button-styles';

type ToggleButtonProps = SwitchUnstyledProps;

const ToggleButton = (props: ToggleButtonProps, ref: Ref<HTMLSpanElement>) => {
  return <SwitchUnstyled {...props} ref={ref} component={ToggleButtonRoot} />;
};

export default forwardRef(ToggleButton);
