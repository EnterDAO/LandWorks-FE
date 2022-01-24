import React, { useEffect, useState } from 'react';
import Select, { components } from 'react-select';

import Icon, { TokenIconNames } from 'components/custom/icon';
import { getTokenIconName } from 'helpers/helpers';

const styles = {
  container: (defaultStyles: any) => ({
    ...defaultStyles,
    width: '100px',
    background: 'rgba(22, 22, 34, 1)',
    borderRadius: '15px',
    cursor: 'pointer',
    position: 'relative',
    display: 'inline-block',
  }),
  menu: (defaultStyles: any) => ({
    ...defaultStyles,
    position: 'absolute',
    marginTop: '0',
    backgroundColor: 'nine',
    top: '80%',
    cursor: 'pointer',
  }),
  indicatorContainer: () => ({
    '& > div': {
      padding: 0,
    },
  }),
  input: (defaultStyles: any) => ({
    ...defaultStyles,
    appearance: 'auto',
    caretColor: 'transparent',
    cursor: 'pointer',
  }),
  control: (base: any, state: any) => ({
    ...base,
    fontFamily: 'Space Grotesk, sans-serif',
    fontStyle: 'normal',
    fontWeight: 'normal',
    border: '1px solid rgba(0, 0, 0, 0.1);',
    boxShadow: 'none',
    '&:hover': {
      border: '1px solid rgba(0, 0, 0, 0.1);',
    },
    fontSize: '12px',
    lineHeight: '18px',
    alignItems: 'center',
    color: 'white',
    background: 'rgba(22, 22, 34, 1)',
    borderRadius: '12px',
    flexGrow: '0',
    padding: '0 8px 2px 0',
    cursor: 'pointer',
    minHeight: 'initial',
    width: '100%',
  }),
  valueContainer: (base: any, state: any) => ({
    ...base,
    padding: '0 0 0 8px',
    display: 'flex',
  }),
  dropdownIndicator: (base: any, state: any) => ({
    ...base,
    color: 'white',
    transform: state.selectProps.menuIsOpen ? 'rotate(-180deg)' : 'rotate(0)',
    transition: '250ms',
    padding: '10px 0px',
  }),
  option: (base: any, state: any) => ({
    ...base,
    color: 'white',
    fontFamily: 'Space Grotesk, sans-serif',
    fontStyle: 'normal',
    fontWeight: 'normal',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '9px',
    cursor: 'pointer',
    background: state.isSelected || state.isFocused ? 'rgba(22, 22, 34, 1)' : 'rgba(22, 22, 34, 1)',
    '&:active': {
      background: 'rgba(22, 22, 34, 1)',
    },
  }),
};

const CurrencyDropdown = (props: any) => {
  const { changeHandler, paymentTokens, value } = props;

  const Option = (props: any) => {
    const { data } = props;

    return (
      <div className={`available-select`}>
        <components.Option className="option" {...props}>
          <Icon
            name={getTokenIconName(data?.symbol || 'png/eth')}
            style={{ width: '16px', height: '16px', verticalAlign: 'middle', marginRight: '5px' }}
          />
          <label className="option">{data?.symbol}</label>
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
        <Icon
          name={getTokenIconName(value?.symbol || defaultValue?.symbol || 'png/eth')}
          style={{ width: '16px', height: '16px', verticalAlign: 'middle', marginRight: '5px' }}
        />
        <label className="option" style={{ fontSize: '14px', color: 'white' }}>
          {value?.symbol || defaultValue?.symbol}
        </label>
      </components.ValueContainer>
    );
  };

  return (
    <Select
      options={paymentTokens}
      styles={styles}
      onChange={changeHandler}
      value={value}
      components={{
        Option,
        ValueContainer,
        IndicatorSeparator: () => null,
      }}
    />
  );
};

export default CurrencyDropdown;
