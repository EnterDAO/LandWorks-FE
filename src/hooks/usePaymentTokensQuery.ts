import { useQuery } from '@apollo/client';

import { GET_TOKEN_PAYMENTS, PaymentToken } from 'modules/land-works/api';
import { KnownTokens } from 'providers/known-tokens-provider';

import config from '../config';

import { ONE_ADDRESS } from '../web3/utils';

const initialPaymentTokens: PaymentToken[] = [
  {
    id: ONE_ADDRESS,
    decimals: 18,
    feePercentage: 3000,
    name: 'Ether',
    symbol: KnownTokens.ETH,
  },
  {
    id: config.tokens.usdc,
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
