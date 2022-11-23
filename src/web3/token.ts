import Web3Token from 'web3-token';

export const getWeb3Token = (): string => localStorage.getItem('web3-token') || '';
export const setWeb3Token = (token: string): void => localStorage.setItem('web3-token', token);

export const refreshWeb3Token = async (
  account: string,
  provider: { request: (params: { method: string; params?: unknown[]; from?: string }) => Promise<string> }
): Promise<void> => {
  const storedToken = getWeb3Token();
  let isStoredTokenVerified = false;

  if (storedToken) {
    try {
      const { address } = await Web3Token.verify(storedToken);

      if (address.toLowerCase() !== account.toLowerCase()) {
        throw new Error('Address is not matching');
      }

      isStoredTokenVerified = true;
    } catch (e) {
      console.error(e);
    }
  }

  if (!isStoredTokenVerified) {
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
      }
    );

    setWeb3Token(token);
  }
};
