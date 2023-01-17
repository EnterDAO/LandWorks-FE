import { useMemo } from 'react';
import useSWRImmutable from 'swr/immutable';

const useGetAllCoingeckoCoinIdsQuery = () => {
  const { data: coinList, error } = useSWRImmutable<{ id: string; symbol: string; name: string }[]>(
    'https://api.coingecko.com/api/v3/coins/list'
  );

  const symbolToCoingeckoCoinId = useMemo(() => {
    if (!coinList) {
      return {};
    }

    return coinList.reduce((acc, coin) => {
      acc[coin.symbol] = coin.id;

      return acc;
    }, {} as Record<string, string>);
  }, [coinList]);

  return {
    data: symbolToCoingeckoCoinId,
    isLoading: !symbolToCoingeckoCoinId && !error,
    error,
  };
};

export default useGetAllCoingeckoCoinIdsQuery;
