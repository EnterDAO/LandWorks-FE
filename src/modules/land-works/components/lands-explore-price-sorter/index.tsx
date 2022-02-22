/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from 'react';
import Select, { ActionMeta, GroupBase, OptionsOrGroups, PropsValue, SingleValue, components } from 'react-select';

import { Option } from 'modules/interface';

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
    borderRadius: '10px',
    cursor: 'pointer',
    position: 'relative',
  }),
  menu: (defaultStyles: any) => ({
    ...defaultStyles,
    position: 'absolute',
    borderRadius: '10px',
    right: 0,
    //top: '80%',
    marginTop: '15px',
    background: '#27273a',
    color: '#ffffff',
    overflow: 'hidden',
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
    lineHeight: '26px',
    alignItems: 'center',
    color: '#ffffff',
    background: '#27273a',
    borderRadius: '10px',
    flexGrow: '0',
    padding: '6px 10px',
    cursor: 'pointer',
    minHeight: 'initial',
    width: 'auto',
  }),
  valueContainer: (base: any) => ({
    ...base,
    padding: '0 0 0 8px',
    display: 'grid',
    width: '100%',
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
    background: state.isSelected || state.isFocused ? '#27273a' : null,
    '&:active': {
      background: '#27273a',
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
  onChange: (newValue: SingleValue<Option>, actionMeta: ActionMeta<Option>) => void;
  value?: PropsValue<Option>;
  isDisabled?: boolean;
  data: OptionsOrGroups<any, GroupBase<any>> | undefined;
}

export const LandsSorter: React.FC<ILandsSorterProps> = ({ onChange, value, data, isDisabled }) => {
  const ref = useRef(null);
  const [isOpen, toggleIsOpen] = useState(false);

  const handleToggle = () => {
    toggleIsOpen(!isOpen);
  };

  const OptionComponent = (props: any) => {
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
    <div className="react-select-wrapper" ref={ref} aria-hidden role="button" onClick={handleToggle}>
      <Select
        isDisabled={isDisabled}
        options={data}
        styles={styles}
        onChange={onChange}
        value={value}
        menuIsOpen={isOpen}
        components={{
          Option: OptionComponent,
          ValueContainer,
          IndicatorSeparator: () => null,
        }}
      />
    </div>
  );
};

export default LandsSorter;