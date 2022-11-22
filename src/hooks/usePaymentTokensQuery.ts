import { useQuery } from '@apollo/client';

import { GET_TOKEN_PAYMENTS, PaymentToken } from 'modules/land-works/api';
import { KnownTokens } from 'providers/known-tokens-provider';

const initialPaymentTokens: PaymentToken[] = [
  {
    id: '0x0000000000000000000000000000000000000001',
    decimals: 18,
    feePercentage: 3000,
    name: 'Ether',
    symbol: KnownTokens.ETH,
  },
  {
    id: '0xc3e551e3ab9d268ca526ce0fa9104dd8285c0488',
    decimals: 6,
    feePercentage: 3000,
    name: 'USD Coin',
    symbol: KnownTokens.USDC,
  },
];

const usePaymentTokensQuery = (): { data: PaymentToken[]; loading: boolean } => {
  const { data: { paymentTokens } = { paymentTokens: initialPaymentTokens }, ...other } = useQuery<{
    paymentTokens: PaymentToken[];
  }>(GET_TOKEN_PAYMENTS);

  return {
    data: paymentTokens,
    ...other,
  };
};

export default usePaymentTokensQuery;
