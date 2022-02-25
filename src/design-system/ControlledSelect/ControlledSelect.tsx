import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import SelectUnstyled, { SelectUnstyledProps } from '@mui/base/SelectUnstyled';
import { styled } from '@mui/system';

import { Option } from 'modules/interface';

import { THEME_COLORS, THEME_FONT_FAMILY } from '../../themes/theme-constants';

const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
};

const StyledButton = styled('button')(
  () => `
  font-family: ${THEME_FONT_FAMILY};
  font-size: 0.875rem;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  background: ${THEME_COLORS.grey01};
  border: 1px solid ${THEME_COLORS.grey01};
  border-radius: 10px;
  padding: 10px;
  text-align: left;
  line-height: 1.5;
  width: 100%;
  color: ${THEME_COLORS.light};

  &:hover {
    background: ${THEME_COLORS.grey02};
    border-color: ${THEME_COLORS.grey02};
  }

  &::after {
    content: '▾';
    float: right;
  }
  `
);

const StyledListbox = styled('ul')(
  () => `
  font-family: ${THEME_FONT_FAMILY};
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 5px;
  margin: 10px 0;
  width: 100%;
  min-width: 190px;
  background: ${THEME_COLORS.grey01};
  border: 1px solid ${THEME_COLORS.grey01};
  border-radius: 0.75em;
  color: ${THEME_COLORS.light};
  overflow: auto;
  outline: 0px;
  box-shadow: 0px 4px 12px -3px rgba(0,0,0,0.75);
  `
);

const StyledOption = styled(OptionUnstyled)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 0.45em;
  cursor: default;
  display: flex;
  flex-direction: row;
  align-items: center;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.selected} {
    background-color: ${THEME_COLORS.grey01};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    background-color: ${THEME_COLORS.grey01};
    color: ${THEME_COLORS.light};
  }

  &.${optionUnstyledClasses.disabled} {
    color: ${THEME_COLORS.grey01};
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background: ${THEME_COLORS.grey02};
    color: ${THEME_COLORS.light};
  }
  `
);

const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
`;

function CustomSelect(props: SelectUnstyledProps<number>) {
  const components: SelectUnstyledProps<number>['components'] = {
    Root: StyledButton,
    Listbox: StyledListbox,
    Popper: StyledPopper,
    ...props.components,
  };

  console.log({ props });

  return <SelectUnstyled {...props} components={components} />;
}

interface ControlledSelectProps {
  onChange: (value: number) => void;
  value: number;
  options: Option[];
  width?: string;
}

const ControlledSelect: React.FC<ControlledSelectProps> = (props) => {
  const { onChange, value, options, width } = props;

  return (
    <div style={{ width: width }}>
      <CustomSelect
        width={width}
        value={value}
        onChange={(e) => {
          if (e) {
            onChange(e);
            console.log('change occurred', e);
          }
        }}
      >
        {options.map((o) => (
          <StyledOption key={o.value} value={o.value}>
            <span style={{ marginRight: '15px', width: '15px' }}>{o.icon}</span>
            {o.label}
          </StyledOption>
        ))}
      </CustomSelect>
    </div>
  );
};

export default ControlledSelect;
