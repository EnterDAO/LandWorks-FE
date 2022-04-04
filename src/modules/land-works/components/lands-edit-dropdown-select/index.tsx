/* eslint-disable @typescript-eslint/no-explicit-any */

import Select, { ActionMeta, SingleValue } from 'react-select';

import { Option } from 'modules/interface';

import './index.scss';

const styles = {
  placeholder: () => ({
    color: '#ffffff',
    fontFamily: 'Poppins, sans-serif',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '16px',
    width: 'fit-content',
  }),
  noOptionsMessage: (defaultStyles: any) => ({
    ...defaultStyles,
    background: '#161622',
    color: '#ffffff',
  }),
  container: (defaultStyles: any) => ({
    ...defaultStyles,
    backgroundColor: '#161622',
    boxShadow: 'transparent',
    border: 'none',
    borderRadius: '15px',
    cursor: 'pointer',
    position: 'relative',
  }),
  menu: (defaultStyles: any) => ({
    ...defaultStyles,
    position: 'absolute',
    background: '#161622',
    color: '#ffffff',
    top: '79%',
    left: '3%',
    width: '95%',
    borderBottomRightRadius: '10px',
    borderBottomLeftRadius: '10px',
    borderTopRightRadius: '0px',
    borderTopLeftRadius: '0px',
  }),
  indicatorsContainer: () => ({
    '& > div': {
      padding: 0,
      marginTop: '3px',
      color: '#fff',
      width: '24px',
      height: '24px',
    },
  }),
  input: (defaultStyles: any) => ({
    ...defaultStyles,
    appearance: 'auto',
    caretColor: 'transparent',
    cursor: 'pointer',
    color: '#ffffff',
  }),
  singleValue: (defaultStyles: any, state: any) => ({
    ...defaultStyles,
    color: state.isDisabled ? '#666666' : '#ffffff',
  }),
  control: (base: any) => ({
    ...base,
    fontFamily: 'Poppins, sans-serif',
    fontStyle: 'normal',
    fontWeight: 'normal',
    border: '1px solid rgba(0, 0, 0, 0.1);',
    boxShadow: 'none',
    '&:hover': {
      border: '1px solid rgba(0, 0, 0, 0.1);',
    },
    fontSize: '16px',
    lineHeight: '24px',
    alignItems: 'center',
    color: '#ffffff',
    background: '#161622',
    borderRadius: '12px',
    flexGrow: '0',
    padding: '0 8px 2px 0',
    cursor: 'pointer',
    minHeight: 'initial',
    width: '100%',
  }),
  valueContainer: (base: any) => ({
    ...base,
    padding: '0 0 0 8px',
    display: 'grid',
  }),
  dropdownIndicator: (base: any, state: any) => ({
    ...base,
    transformOrigin: '50% 50%',
    transform: state.selectProps.menuIsOpen ? 'rotate(-180deg)' : 'rotate(0)',
    transition: '150ms',
    width: '24px',
    opacity: state.isHovered ? '1' : '0.4',
  }),
  optionContainer: (base: any) => ({
    ...base,
    background: '#161622',
    color: '#ffffff',
  }),
  option: (base: any, state: any) => ({
    ...base,
    color: state.isDisabled ? 'color: #ffffff' : '#B9B9D3',
    fontFamily: 'Poppins, sans-serif',
    fontStyle: 'normal',
    fontWeight: 'normal',
    // height: '30px',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '15px',
    cursor: 'pointer',
    opacity: state.isFocused ? '1' : '0.7',
    background: state.isSelected || state.isFocused ? '#161622' : null,
    '&:active': {
      background: '#161622',
    },
    borderBottom: 'none',
    '& label': {
      cursor: 'pointer',
      fontSize: '12px',
    },
    '&:first-of-type': {
      borderTop: 'none',
      borderBottom: 'none',
    },
    '& i::after': {
      borderColor: 'transparent !important',
    },
  }),
};

interface IProps {
  onChange: (newValue: SingleValue<Option>, actionMeta: ActionMeta<Option>) => void;
  options: Option[];
  initialValue: Option;
  disabled?: boolean;
}

export const EditViewLandDropdown: React.FC<IProps> = ({ onChange, options, initialValue, disabled }) => {
  return (
    <Select
      options={options}
      isDisabled={disabled}
      value={initialValue}
      onChange={onChange}
      className="drop-select"
      styles={styles}
    />
  );
};
