import useSWRImmutable from 'swr/immutable';

import useGetCoinGeckoSupportedCoinsGroupedBySymbolQuery from './useGetCoinGeckoSupportedCoinsQuery';

interface CoinGeckoCoin {
  id: string;
  symbol: string;
  name: string;
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  market_data: {
    current_price: {
      usd: number;
    };
  };
}

const useGetCoinGeckoCoinBySymbol = (symbol: string) => {
  const {
    data: supportedCoins,
    isLoading: areSupportedCoinsLoading,
    error: errorSupportedCoins,
  } = useGetCoinGeckoSupportedCoinsGroupedBySymbolQuery();
  const supportedCoinsBySymbol = supportedCoins[symbol.toLowerCase()];

  const { data, error } = useSWRImmutable<CoinGeckoCoin>(
    // NOTE coingecko can have multiple coins with the same symbol
    supportedCoinsBySymbol
      ? `https://api.coingecko.com/api/v3/coins/${supportedCoinsBySymbol[0].id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
      : null
  );

  return {
    data,
    isLoading: areSupportedCoinsLoading || (!data && !error && !!supportedCoinsBySymbol),
    error: errorSupportedCoins || error,
  };
};

export default useGetCoinGeckoCoinBySymbol;
