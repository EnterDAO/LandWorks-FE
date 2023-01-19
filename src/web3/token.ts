import Web3Token from 'web3-token';

export const getWeb3Token = (): string => localStorage.getItem('web3-token') || '';
export const setWeb3Token = (token: string): void => localStorage.setItem('web3-token', token);

export const refreshWeb3Token = async (
  account: string,
  provider: { request: (params: { method: string; params?: unknown[]; from?: string }) => Promise<string> },
  msg?: string
): Promise<void> => {
  const chainId = await provider.request({ method: 'eth_chainId' });

  const token = await Web3Token.sign(
    async (msg: string) => {
      return provider.request({
        method: 'personal_sign',
        params: [account, msg],
        from: account,
      });
    },
    {
      chain_id: parseInt(chainId, 16),
      expires_in: '30m',
      statement: msg,
    }
  );

  setWeb3Token(token);
};
