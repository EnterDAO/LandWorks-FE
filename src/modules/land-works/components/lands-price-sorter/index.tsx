import React from 'react';
import Select, { components } from 'react-select';

const styles = {
  placeholder: () => ({
    color: '#ffffff',
    fontFamily: 'Poppins, sans-serif',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '16px',
    width: 'fit-content',
  }),
  container: (defaultStyles: any) => ({
    ...defaultStyles,
    backgroundColor: 'transparent',
    boxShadow: 'transparent',
    border: 'none',
    borderRadius: '15px',
    cursor: 'pointer',
    position: 'relative',
  }),
  menu: (defaultStyles: any) => ({
    ...defaultStyles,
    position: 'absolute',
    right: 0,
    top: '80%',
    background: '#27273a',
    color: '#ffffff',
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
  singleValue: (defaultStyles: any) => ({
    ...defaultStyles,
    color: '#ffffff',
  }),
  control: (base: any, state: any) => ({
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
    lineHeight: '26px',
    alignItems: 'center',
    color: '#ffffff',
    background: ' #27273a',
    borderRadius: '30px',
    flexGrow: '0',
    padding: '6px 10px',
    cursor: 'pointer',
    minHeight: 'initial',
    width: '100%',
  }),
  valueContainer: (base: any, state: any) => ({
    ...base,
    padding: '0 0 0 8px',
    display: 'grid',
    width: '140px',
    justifyContent: 'center',
  }),
  dropdownIndicator: (base: any, state: any) => ({
    ...base,
    transformOrigin: '50% 50%',
    transform: state.selectProps.menuIsOpen ? 'rotate(-180deg)' : 'rotate(0)',
    transition: '150ms',
    width: '24px',
    opacity: state.isHovered ? 1 : 0.4,
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
    height: '30px',
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

interface ILandsSorterProps {
  onSortDirectionChange: (event: any) => void;
  value?: any;
  data: any;
}

export const LandsPriceSorter: React.FC<ILandsSorterProps> = (props) => {
  const { onSortDirectionChange, value, data } = props;

  const Option = (props: any) => {
    const { data } = props;

    return (
      <div className={`available-select`} {...props}>
        <components.Option className="option" {...props}>
          <span style={{ marginRight: '8px' }}>{data?.icon}</span>
          <label className="option">{data?.label}</label>
        </components.Option>
      </div>
    );
  };

  const ValueContainer = (props: any) => {
    const { getValue } = props;
    const defaultValue = props.options[0];
    const [value] = getValue();

    const usedValue = value || defaultValue;

    if (usedValue === undefined) {
      return <></>;
    }

    return (
      <components.ValueContainer {...props}>
        <label className="option" style={{ fontSize: '14px', color: 'white', display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '8px', height: '16px', display: 'flex', alignItems: 'center' }}>
            {value?.icon || defaultValue?.icon}
          </span>
          {value?.label || defaultValue?.label}
        </label>
      </components.ValueContainer>
    );
  };

  return (
    <Select
      options={data}
      styles={styles}
      onChange={onSortDirectionChange}
      value={value}
      components={{
        Option,
        ValueContainer,
        IndicatorSeparator: () => null,
      }}
    />
  );
};

export default LandsPriceSorter;
