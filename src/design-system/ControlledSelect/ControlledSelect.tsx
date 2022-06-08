import SelectUnstyled, { SelectUnstyledProps } from '@mui/base/SelectUnstyled';
import { isNull } from 'lodash';

import { Checkbox } from 'design-system';
import { Option } from 'modules/interface';

import { StyledButton, StyledListbox, StyledOption, StyledPopper } from './styled';

function CustomSelect(props: SelectUnstyledProps<number>) {
  const components: SelectUnstyledProps<number>['components'] = {
    Root: StyledButton,
    Listbox: StyledListbox,
    Popper: StyledPopper,
    ...props.components,
  };

  return <SelectUnstyled {...props} components={components} />;
}

interface ControlledSelectProps {
  onChange: (value: number) => void;
  value: number;
  options: Option[];
  width?: string;
  disabled?: boolean;
  withCheckbox?: boolean;
}

const ControlledSelect: React.FC<ControlledSelectProps> = (props) => {
  const { disabled = false, withCheckbox = false, onChange, value, options, width } = props;

  return (
    <div style={{ width: width }}>
      <CustomSelect
        disabled={disabled}
        value={value}
        onChange={(e) => {
          if (!isNull(e)) {
            onChange(e);
          }
        }}
      >
        {options.map((o) => (
          <StyledOption key={o.value} value={o.value}>
            {o.icon && <span style={{ marginRight: '15px', width: '20px' }}>{o.icon}</span>}
            {withCheckbox && <Checkbox checked={o.value == value} />}
            {o.label}
          </StyledOption>
        ))}
      </CustomSelect>
    </div>
  );
};

export default ControlledSelect;
