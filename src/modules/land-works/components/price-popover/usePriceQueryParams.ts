import {
  DecodedValueMap,
  QueryParamConfig,
  SetQuery,
  decodeNumber,
  encodeNumber,
  useQueryParams,
} from 'use-query-params';

import { currencyData } from '../lands-explore-filters/filters-data';

import { sessionStorageHandler } from 'utils';

import './styles.scss';

const CURRENCY_QUERY_PARAM_KEY = 'currency';
const MIN_PRICE_QUERY_PARAM_KEY = 'minPrice';
const MAX_PRICE_QUERY_PARAM_KEY = 'maxPrice';

const isValidCurrency = (currency: number | null | undefined) => {
  return typeof currency === 'number' && !!currencyData.find(({ value }) => value === currency);
};

const CurrencyParam: QueryParamConfig<number, number> = {
  encode: (value) => {
    sessionStorageHandler('set', 'explore-filters', CURRENCY_QUERY_PARAM_KEY, value);

    return encodeNumber(value);
  },
  decode: (value) => {
    const decodedValue = decodeNumber(value);

    if (isValidCurrency(decodedValue)) {
      return decodedValue;
    }

    const storedValue = sessionStorageHandler('get', 'explore-filters', CURRENCY_QUERY_PARAM_KEY);

    if (isValidCurrency(storedValue)) {
      return storedValue;
    }

    return currencyData[0].value;
  },
};

const getPriceLimitParamConfig = (queryKey: string): QueryParamConfig<number, number> => {
  return {
    encode: (value) => {
      sessionStorageHandler('set', 'explore-filters', queryKey, value);

      const encodedValue = encodeNumber(value);

      return encodedValue;
    },
    decode: (value) => {
      const decodedValue = decodeNumber(value);

      if (typeof decodedValue === 'number') {
        return decodedValue;
      }

      const storedValue = sessionStorageHandler('get', 'explore-filters', queryKey);

      if (typeof storedValue === 'number') {
        return storedValue;
      }

      return 0;
    },
  };
};

const MinPriceParam = getPriceLimitParamConfig(MIN_PRICE_QUERY_PARAM_KEY);
const MaxPriceParam = getPriceLimitParamConfig(MAX_PRICE_QUERY_PARAM_KEY);

const paramConfigMap = {
  [CURRENCY_QUERY_PARAM_KEY]: CurrencyParam,
  [MIN_PRICE_QUERY_PARAM_KEY]: MinPriceParam,
  [MAX_PRICE_QUERY_PARAM_KEY]: MaxPriceParam,
};

const usePriceQueryParams = (): [DecodedValueMap<typeof paramConfigMap>, SetQuery<typeof paramConfigMap>] => {
  return useQueryParams(paramConfigMap);
};

export default usePriceQueryParams;
