import { useWallet } from 'wallets/wallet';

const useIsMetamaskConnected = (): boolean => {
  const wallet = useWallet();

  return wallet.isActive && wallet.connector?.id === 'metamask';
};

export default useIsMetamaskConnected;
