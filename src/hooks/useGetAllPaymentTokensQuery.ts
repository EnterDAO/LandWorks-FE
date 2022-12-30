import { useQuery } from '@apollo/client';

import { GET_TOKEN_PAYMENTS, PaymentToken } from 'modules/land-works/api';

const useGetAllPaymentTokensQuery = () => {
  const { data, ...other } = useQuery<{
    paymentTokens: PaymentToken[];
  }>(GET_TOKEN_PAYMENTS);

  return {
    data: data?.paymentTokens,
    ...other,
  };
};

export default useGetAllPaymentTokensQuery;
