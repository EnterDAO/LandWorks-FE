import * as React from 'react';
import SwitchUnstyled, { SwitchUnstyledProps } from '@mui/base/SwitchUnstyled';

import { ToggleButtonRoot } from './toggle-button-styles';

type ToggleButtonProps = SwitchUnstyledProps;

const ToggleButton = (props: ToggleButtonProps, ref: React.Ref<unknown>) => {
  return <SwitchUnstyled {...props} ref={ref} component={ToggleButtonRoot} />;
};

export default React.forwardRef<unknown, ToggleButtonProps>(ToggleButton);
