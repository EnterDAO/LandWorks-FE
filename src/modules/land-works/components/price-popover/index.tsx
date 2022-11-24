import React, { useEffect, useState } from 'react';
import { Stack, ToggleButton } from '@mui/material';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { formatUSD } from 'web3/utils';

import { Button } from 'design-system';
import { getTokenPrice } from 'providers/known-tokens-provider';

import { currencyData } from '../lands-explore-filters/filters-data';
import {
  ButtonGroup,
  ErrorText,
  PopoverButton,
  PriceField,
  StyledGrid,
  StyledPopover,
  StyledTypography,
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

    return ethToUsdPrice.toFixed();
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
      <PopoverButton
        className={classNames({ 'Mui-expanded': !!anchorEl })}
        isActive={priceParams.currency !== 0}
        onClick={openPopover}
      >
        {text}
      </PopoverButton>
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

          <Stack gap={3}>
            <PriceField
              label="Min"
              disabled={disableInput}
              onChange={(e) => onInput(e.target.value, 'min')}
              value={minPrice !== null ? minPrice : ''}
              right={formatUSD(getUsdPrice(minPrice || 0))}
            />
            <PriceField
              label="Max"
              disabled={disableInput}
              onChange={(e) => onInput(e.target.value, 'max')}
              value={maxPrice !== null ? maxPrice : ''}
              right={formatUSD(getUsdPrice(maxPrice || 0))}
            />
          </Stack>

          <ErrorText>
            <span>{error}</span>
          </ErrorText>
          <StyledGrid container>
            <Button
              sx={{
                ':disabled': {
                  pointerEvents: 'none',
                },

                ':disabled:before': {
                  display: 'none',
                },
              }}
              onClick={resetPrice}
              btnSize="xsmall"
              disabled={!minPrice || !maxPrice}
              variant="tertiary"
            >
              Clear
            </Button>
            <Button
              sx={{
                background: 'transparent',
              }}
              disabled={disableApply}
              onClick={handleSubmit}
              btnSize="xsmall"
              variant="tertiary"
            >
              Apply
            </Button>
          </StyledGrid>
        </>
      </StyledPopover>
    </div>
  );
};
