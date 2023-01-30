import useGetCoinGeckoCoinBySymbol from './useGetCoinGeckoCoinBySymbol';

const useGetTokenPriceInUsdQuery = (symbol: string) => {
  const { data, ...other } = useGetCoinGeckoCoinBySymbol(symbol);

  return {
    data: data?.market_data.current_price.usd,
    ...other,
  };
};

export default useGetTokenPriceInUsdQuery;
