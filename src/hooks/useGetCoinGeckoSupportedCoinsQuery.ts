import useSWRImmutable from 'swr/immutable';

interface CoinGeckoSupportedCoin {
  id: string;
  symbol: string;
  name: string;
}

const fetchCoinGeckoSupportedCoinsGroupedBySymbol = async (url: string) => {
  const supportedCoins: CoinGeckoSupportedCoin[] = await fetch(url).then((res) => res.json());

  return supportedCoins.reduce((acc, coin) => {
    if (!(coin.symbol in acc)) {
      acc[coin.symbol] = [];
    }

    acc[coin.symbol].push(coin);

    return acc;
  }, {} as Record<string, CoinGeckoSupportedCoin[]>);
};

const initialData = {} as Record<string, CoinGeckoSupportedCoin[]>;

const useGetCoinGeckoSupportedCoinsGroupedBySymbolQuery = () => {
  const { data, error } = useSWRImmutable(
    'https://api.coingecko.com/api/v3/coins/list',
    fetchCoinGeckoSupportedCoinsGroupedBySymbol
  );
  return {
    data: data || initialData,
    isLoading: !data && !error,
    error,
  };
};

export default useGetCoinGeckoSupportedCoinsGroupedBySymbolQuery;
