import SelectUnstyled, { SelectUnstyledProps } from '@mui/base/SelectUnstyled';
import { SxProps } from '@mui/system';
import { isNull } from 'lodash';

import Icon from 'components/custom/icon';
import { Box, RadioButton, Tooltip } from 'design-system';
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
  onChange?: (value: number) => void;
  value?: number;
  options: Option[];
  width?: string;
  disabled?: boolean;
  withCheckbox?: boolean;
  staticPlaceholder?: string;
  isActive?: boolean;
  sx?: SxProps;
}

interface OptionContentProps {
  option: Option;
  withCheckbox?: boolean;
  value?: string | number;
}

const OptionContent = ({ option, withCheckbox, value }: OptionContentProps) => {
  return (
    <Box display="inline-flex" flexGrow={1} alignItems="center">
      {option.icon && <span style={{ marginRight: '15px', width: '20px' }}>{option.icon}</span>}
      {withCheckbox && <RadioButton disabled checked={option.value == value} />}
      {option.label}
      {option.tooltip && (
        <Tooltip arrow title={option.tooltip}>
          <Box component="span" display="inline-flex" ml="auto">
            <Icon style={{ color: 'var(--theme-subtle-color)', width: '16px', height: '16px' }} name="about" />
          </Box>
        </Tooltip>
      )}
    </Box>
  );
};

const ControlledSelect: React.FC<ControlledSelectProps> = (props) => {
  const {
    disabled = false,
    withCheckbox = false,
    onChange,
    value,
    options,
    width,
    staticPlaceholder,
    isActive,
    sx,
  } = props;
  const valueForPlaceholder = options.length + 10;

  return (
    <Box width={width} sx={sx}>
      <CustomSelect
        disabled={disabled}
        value={staticPlaceholder ? valueForPlaceholder : value}
        componentsProps={{
          root: {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            sx: {
              borderColor: isActive ? 'var(--theme-light-color)' : 'transparent',
              boxShadow: isActive ? '0 0 4px var(--theme-light-color)' : '',
            },
          },
        }}
        onChange={(e) => {
          if (!isNull(e) && onChange) {
            onChange(e);
          }
        }}
        renderValue={(val) => {
          if (!val) {
            return;
          }
          const option = options.find((o) => o.value == val.value);

          if (option) {
            return (
              <OptionContent option={{ ...option, tooltip: false }} value={val.value} withCheckbox={withCheckbox} />
            );
          }

          return val?.label;
        }}
      >
        {staticPlaceholder && (
          <StyledOption sx={{ display: 'none' }} value={valueForPlaceholder} disabled>
            {staticPlaceholder}
          </StyledOption>
        )}
        {options.map((o) => (
          <StyledOption key={o.value} value={o.value}>
            <OptionContent option={o} withCheckbox={withCheckbox} value={value} />
            {/* {o.icon && <span style={{ marginRight: '15px', width: '20px' }}>{o.icon}</span>}
            {withCheckbox && <RadioButton disabled checked={o.value == value} />}
            {o.label}
            {o.tooltip && (
              <Tooltip title={o.tooltip}>
                <Box component="span" >
                  <Icon name="about" color="var(--theme-light-color)" />
                </Box>
              </Tooltip>
            )} */}
          </StyledOption>
        ))}
      </CustomSelect>
    </Box>
  );
};

export default ControlledSelect;
