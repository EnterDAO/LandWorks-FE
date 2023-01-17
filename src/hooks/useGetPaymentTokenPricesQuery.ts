import { useMemo } from 'react';

import { PaymentToken } from 'modules/land-works/api';

import useGetAllCoingeckoCoinIdsQuery from './useGetAllCoingeckoCoinIdsQuery';
import useGetCoinPricesInUsd from './useGetCoinPricesInUsd';

const useGetPaymentTokenPricesQuery = (paymentTokens: PaymentToken[]) => {
  const {
    data: symbolToCoingeckoCoinId,
    error: errorGetAllCoingeckoCoinIdsQuery,
    isLoading: areAllCoingeckoCoinIdsLoading,
  } = useGetAllCoingeckoCoinIdsQuery();

  const coinGeckoIdToPaymentTokenId = useMemo(() => {
    return paymentTokens.reduce((acc, paymentToken) => {
      const symbol = paymentToken.symbol.toLowerCase();

      if (symbol in symbolToCoingeckoCoinId) {
        acc[symbolToCoingeckoCoinId[symbol]] = paymentToken.id;
      }

      return acc;
    }, {} as Record<string, string>);
  }, [paymentTokens, symbolToCoingeckoCoinId]);

  const coingeckoIds = Object.keys(coinGeckoIdToPaymentTokenId);

  const { data: coingeckoIdToPrice, error: errorGetCoinPricesInUsd } = useGetCoinPricesInUsd(coingeckoIds);

  const data = useMemo(() => {
    if (!coingeckoIdToPrice) {
      return coingeckoIdToPrice;
    }

    return Object.entries(coingeckoIdToPrice).reduce((acc, [coinGeckoId, price]) => {
      const paymentTokenId = coinGeckoIdToPaymentTokenId[coinGeckoId];

      if (paymentTokenId) {
        acc[paymentTokenId] = price.usd;
      }

      return acc;
    }, {} as Record<string, number>);
  }, [coingeckoIdToPrice, coinGeckoIdToPaymentTokenId]);

  return {
    data,
    isLoading: areAllCoingeckoCoinIdsLoading || (!coingeckoIdToPrice && !errorGetCoinPricesInUsd),
    error: errorGetAllCoingeckoCoinIdsQuery || errorGetCoinPricesInUsd,
  };
};

export default useGetPaymentTokenPricesQuery;
