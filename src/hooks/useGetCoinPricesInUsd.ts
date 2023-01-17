import useSWR from 'swr';

const useGetCoinPricesInUsd = (coingeckoIds: string[]) => {
  return useSWR<Record<string, { usd: number }>>(
    coingeckoIds.length ? `https://api.coingecko.com/api/v3/simple/price?ids=${coingeckoIds}&vs_currencies=usd` : null
  );
};

export default useGetCoinPricesInUsd;
