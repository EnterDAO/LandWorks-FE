import { useCallback } from 'react';
import { NumberParam, StringParam, useQueryParams } from 'use-query-params';

import { usePaymentTokens } from 'modules/land-works';

import { sessionStorageHandler } from 'utils';

import './styles.scss';

const CURRENCY_QUERY_PARAM_KEY = 'currency';
const MIN_PRICE_QUERY_PARAM_KEY = 'minPrice';
const MAX_PRICE_QUERY_PARAM_KEY = 'maxPrice';

const paramConfigMap = {
  [CURRENCY_QUERY_PARAM_KEY]: StringParam,
  [MIN_PRICE_QUERY_PARAM_KEY]: NumberParam,
  [MAX_PRICE_QUERY_PARAM_KEY]: NumberParam,
};

const usePriceQueryParams = () => {
  const paymentTokens = usePaymentTokens();
  const [priceQueryParams, setPriceQueryParams] = useQueryParams(paramConfigMap);
  const storedCurrency = sessionStorageHandler('get', 'explore-filters', CURRENCY_QUERY_PARAM_KEY);
  const storedMinPrice = +sessionStorageHandler('get', 'explore-filters', MIN_PRICE_QUERY_PARAM_KEY);
  const storedMaxPrice = +sessionStorageHandler('get', 'explore-filters', MAX_PRICE_QUERY_PARAM_KEY);

  const currency = priceQueryParams[CURRENCY_QUERY_PARAM_KEY] || storedCurrency || undefined;
  const minPrice = priceQueryParams[MIN_PRICE_QUERY_PARAM_KEY] || storedMinPrice || undefined;
  const maxPrice = priceQueryParams[MAX_PRICE_QUERY_PARAM_KEY] || storedMaxPrice || undefined;

  const paymentToken =
    currency && typeof currency === 'string'
      ? paymentTokens.find((paymentToken) => paymentToken.symbol.toLowerCase() === currency.toLowerCase())
      : undefined;

  const setPrice = useCallback(
    ({ currency, minPrice, maxPrice }: { currency?: string; minPrice?: number; maxPrice?: number }) => {
      sessionStorageHandler('set', 'explore-filters', CURRENCY_QUERY_PARAM_KEY, currency);
      sessionStorageHandler('set', 'explore-filters', MIN_PRICE_QUERY_PARAM_KEY, minPrice);
      sessionStorageHandler('set', 'explore-filters', MAX_PRICE_QUERY_PARAM_KEY, maxPrice);

      setPriceQueryParams({
        currency: currency || null,
        minPrice,
        maxPrice,
      });
    },
    []
  );

  return [
    {
      paymentToken,
      minPrice,
      maxPrice,
    },
    setPrice,
  ] as const;
};

export default usePriceQueryParams;
