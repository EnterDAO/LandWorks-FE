import { useMemo } from 'react';

import { PaymentToken } from 'modules/land-works/api';

import usePaymentTokensQuery from './usePaymentTokensQuery';

const usePaymentToken = (tokenAddress: string): PaymentToken | undefined => {
  const { data } = usePaymentTokensQuery();

  return useMemo(() => {
    return data.find(({ id }) => id.toLowerCase() === tokenAddress.toLowerCase());
  }, [data, tokenAddress]);
};

export default usePaymentToken;
