import React, { useEffect, useState } from 'react';
import { ToggleButton } from '@mui/material';
import BigNumber from 'bignumber.js';

import { Button } from 'design-system';
import { getTokenPrice } from 'providers/known-tokens-provider';

import { currencyData } from '../lands-explore-filters/filters-data';
import {
  ButtonGroup,
  ErrorText,
  InputRow,
  PopoverButton,
  StyledGrid,
  StyledPopover,
  StyledTypography,
  Subtitle,
} from './styled';

import { sessionStorageHandler } from 'utils';

import './styles.scss';

interface IProps {
  text: string;
  onSubmit?: (currency: number, minValue: number | null, maxValue: number | null) => void;
}

export const PricePopover: React.FC<IProps> = ({ text, onSubmit }) => {
  const storageCurrency = sessionStorageHandler('get', 'explore-filters', 'currency');

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [currency, setCurrency] = useState<number | null>(storageCurrency || null);
  const [minPrice, setMinPrice] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState<string | null>(null);
  const [error, setError] = useState<string>('');

  const isNumber = (value: any): boolean => Number.isInteger(value);
  const isNotNull = (value: any): boolean => value !== null;

  const openPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closePopover = () => {
    setAnchorEl(null);
  };

  const handleCurrency = (event: React.MouseEvent<HTMLElement>, cur: number | null) => {
    cur !== null && setCurrency(cur);
    cur == 0 && resetPrice();
  };

  const onInput = (value: string, type: 'min' | 'max') => {
    type === 'min' ? setMinPrice(value) : setMaxPrice(value);
  };

  const resetPrice = () => {
    setMinPrice(null);
    setMaxPrice(null);
  };

  const getUsdPrice = (price: string | number | BigNumber) => {
    const symbol = currency ? currencyData[currency].label : 'ETH';
    const ethPrice = new BigNumber(getTokenPrice(symbol) || '0');
    const ethToUsdPrice = ethPrice.multipliedBy(price);
    return ethToUsdPrice.toFixed(2).replace(/\.00$/, '');
  };

  useEffect(() => {
    const isNegativeMin = minPrice !== null && +minPrice <= 0;
    const isNegativeMax = maxPrice !== null && +maxPrice <= 0;

    if (isNegativeMin) {
      setError('Price cannot be negative or equal zero');
      return;
    }
    if (isNegativeMax) {
      setError('Price cannot be negative or equal zero');
      return;
    }
    if (minPrice && maxPrice && minPrice >= maxPrice) {
      setError('invalid');
      return;
    } else {
      setError('');
    }
  }, [minPrice, maxPrice]);

  const handleSubmit = () => {
    if (currency !== null && onSubmit) {
      onSubmit(currency, Number(minPrice), Number(maxPrice));
      resetPrice();
      closePopover();
    }
  };

  const disableInput = !isNotNull(currency) || currency == 0;
  const applyDisabled = !isNumber(currency) || (currency !== null && currency < 1) || Boolean(error.length);
  return (
    <div>
      <PopoverButton onClick={openPopover}>{text}</PopoverButton>
      <StyledPopover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={closePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <>
          <StyledTypography>Currency</StyledTypography>
          <ButtonGroup exclusive value={currency} onChange={handleCurrency}>
            {currencyData.map((cur, index) => (
              <ToggleButton value={cur.value} key={cur.value}>
                {cur.icon && <span>{cur.icon}</span>}
                <span>{index === 0 ? cur.label.split(' ')[0] : cur.label}</span>
              </ToggleButton>
            ))}
          </ButtonGroup>
          <StyledTypography>Price per day</StyledTypography>
          <div>
            <Subtitle>Min</Subtitle>
            <InputRow>
              <input
                value={minPrice !== null ? minPrice : ''}
                disabled={disableInput}
                onChange={(e) => onInput(e.target.value, 'min')}
                type="number"
              />
              <span>{getUsdPrice(minPrice || 0)} $</span>
            </InputRow>
          </div>
          <div>
            <Subtitle>Max</Subtitle>
            <InputRow>
              <input
                value={maxPrice !== null ? maxPrice : ''}
                disabled={disableInput}
                onChange={(e) => onInput(e.target.value, 'max')}
                type="number"
              />
              <span>{getUsdPrice(maxPrice || 0)} $</span>
            </InputRow>
          </div>
          <ErrorText>
            <span>{error}</span>
          </ErrorText>
          <StyledGrid container>
            <Button onClick={resetPrice} btnSize="xsmall" disabled={!minPrice || !maxPrice} variant="secondary">
              Clear
            </Button>
            <Button disabled={applyDisabled} onClick={handleSubmit} btnSize="xsmall" variant="secondary">
              Apply
            </Button>
          </StyledGrid>
        </>
      </StyledPopover>
    </div>
  );
};
