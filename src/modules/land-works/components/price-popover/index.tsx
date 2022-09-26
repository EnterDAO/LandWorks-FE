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
import usePriceQueryParams from './usePriceQueryParams';

import './styles.scss';

interface IProps {
  text: string;
  onSubmit?: (currency: number, minValue: number | null, maxValue: number | null) => void;
}

export const PricePopover: React.FC<IProps> = ({ text }) => {
  const [disableApply, setDisableApply] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const [priceParams, setPriceParams] = usePriceQueryParams();
  const [currency, setCurrency] = useState<number>(priceParams.currency);
  const [minPrice, setMinPrice] = useState<string | number | null>(priceParams.minPrice || null);
  const [maxPrice, setMaxPrice] = useState<string | number | null>(priceParams.maxPrice || null);
  const [error, setError] = useState<string>('');

  const openPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closePopover = () => {
    setAnchorEl(null);
  };

  const handleCurrency = (event: React.MouseEvent<HTMLElement>, cur: number | null) => {
    cur !== null && setCurrency(cur);
    cur == 0 && resetPrice();
    setDisableApply(false);
  };

  const onInput = (value: string, type: 'min' | 'max') => {
    type === 'min' ? setMinPrice(value) : setMaxPrice(value);
    disableApply && setDisableApply(false);
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
      setError('Min should be > than Max');
      return;
    } else {
      setError('');
    }
  }, [minPrice, maxPrice]);

  const handleSubmit = () => {
    setPriceParams({
      currency,
      minPrice: minPrice ? +minPrice : undefined,
      maxPrice: maxPrice ? +maxPrice : undefined,
    });

    closePopover();
    setDisableApply(true);
  };

  const disableInput = currency == 0;

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
              <span style={{ color: disableInput ? 'var(--theme-grey700-color)' : 'var(--theme-grey900-color)' }}>
                {getUsdPrice(minPrice || 0)} $
              </span>
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
              <span style={{ color: disableInput ? 'var(--theme-grey700-color)' : 'var(--theme-grey900-color)' }}>
                {getUsdPrice(maxPrice || 0)} $
              </span>
            </InputRow>
          </div>
          <ErrorText>
            <span>{error}</span>
          </ErrorText>
          <StyledGrid container>
            <Button onClick={resetPrice} btnSize="xsmall" disabled={!minPrice || !maxPrice} variant="secondary">
              Clear
            </Button>
            <Button disabled={disableApply} onClick={handleSubmit} btnSize="xsmall" variant="secondary">
              Apply
            </Button>
          </StyledGrid>
        </>
      </StyledPopover>
    </div>
  );
};
