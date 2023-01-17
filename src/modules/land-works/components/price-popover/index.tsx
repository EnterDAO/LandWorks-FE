import React, { useMemo, useState } from 'react';
import { Stack, ToggleButton } from '@mui/material';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { formatUSD } from 'web3/utils';

import { Button } from 'design-system';
import { usePaymentTokens } from 'modules/land-works';
import { getTokenPrice } from 'providers/known-tokens-provider';

import PaymentTokenIcon from '../PaymentTokenIcon';
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

const ALL_CURRENCIES_ID = '';

// TODO: refactor
export const PricePopover: React.FC<IProps> = ({ text }) => {
  const paymentTokens = usePaymentTokens();

  const [disableApply, setDisableApply] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const [priceParams, setPriceParams] = usePriceQueryParams();

  const [currency, setCurrency] = useState(priceParams.paymentToken?.symbol.toLowerCase() || ALL_CURRENCIES_ID);
  const [minPrice, setMinPrice] = useState<string | undefined>(priceParams.minPrice?.toString());
  const [maxPrice, setMaxPrice] = useState<string | undefined>(priceParams.maxPrice?.toString());

  const openPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closePopover = () => {
    setAnchorEl(null);
  };

  const handleCurrency = (event: React.MouseEvent<HTMLElement>, id: string | null) => {
    if (id === null) {
      return;
    }

    setCurrency(id);

    if (id === ALL_CURRENCIES_ID) {
      resetPrice();
    }

    setDisableApply(false);
  };

  const onInput = (value: string, type: 'min' | 'max') => {
    const setter = type === 'min' ? setMinPrice : setMaxPrice;

    setter(value);

    if (disableApply) {
      setDisableApply(false);
    }
  };

  const resetPrice = () => {
    setMinPrice('');
    setMaxPrice('');
  };

  const getUsdPrice = (price: string | number | BigNumber) => {
    const symbol = currency !== ALL_CURRENCIES_ID ? currency : 'eth';
    const ethPrice = new BigNumber(getTokenPrice(symbol) || '0');
    const ethToUsdPrice = ethPrice.multipliedBy(price);

    return ethToUsdPrice.toFixed();
  };

  const error = useMemo(() => {
    const parsedMinPrice = minPrice ? +minPrice : undefined;
    const parsedMaxPrice = maxPrice ? +maxPrice : undefined;
    const isNegativeMin = typeof parsedMinPrice === 'number' && parsedMinPrice <= 0;
    const isNegativeMax = typeof parsedMaxPrice === 'number' && parsedMaxPrice <= 0;

    if (isNegativeMin) {
      return 'Price cannot be negative or equal zero';
    } else if (isNegativeMax) {
      return 'Price cannot be negative or equal zero';
    } else if (parsedMinPrice && parsedMaxPrice && parsedMinPrice >= parsedMaxPrice) {
      return 'Min should be > than Max';
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

  const disableInput = currency === ALL_CURRENCIES_ID;

  const currencyOptions = useMemo(() => {
    return [
      {
        id: ALL_CURRENCIES_ID,
        label: 'All',
      },
      ...paymentTokens.map((paymentToken) => {
        return {
          id: paymentToken.symbol.toLowerCase(),
          label: paymentToken.symbol,
        };
      }),
    ];
  }, [paymentTokens]);

  return (
    <div>
      <PopoverButton
        className={classNames({ 'Mui-expanded': !!anchorEl })}
        isActive={!!priceParams.paymentToken}
        onClick={openPopover}
      >
        {text}
      </PopoverButton>
      <StyledPopover
        TransitionProps={{ timeout: 0 }}
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
            {currencyOptions.map((options) => (
              <ToggleButton value={options.id} key={options.id}>
                {options.id !== ALL_CURRENCIES_ID && <PaymentTokenIcon symbol={options.id} />}
                <span>{options.label}</span>
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
              disabled={!minPrice && !maxPrice}
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
