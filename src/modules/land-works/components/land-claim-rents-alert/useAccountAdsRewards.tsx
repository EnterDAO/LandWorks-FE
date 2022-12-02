import { useMemo } from 'react';
import BigNumber from 'bignumber.js';
import useSWR from 'swr';

import { getAccountAdsRewards } from 'modules/land-works/api';
import AdsRewardsContract from 'modules/land-works/contracts/rewards/AdsRewardsContract';
import { useWallet } from 'wallets/wallet';

import config from '../../../../config';

const initialData = {
  amount: '0',
  claimedAmount: '0',
  contractAddress: '',
  proof: [],
  token: config.contracts.adsContract,
};

const useAdsRewardsContract = (contractAddress: string): AdsRewardsContract | undefined => {
  const wallet = useWallet();
  return useMemo(() => {
    if (!contractAddress) {
      return;
    }

    const adsRewardsContract = new AdsRewardsContract(contractAddress);

    adsRewardsContract.setProvider(wallet.provider);
    adsRewardsContract.setAccount(wallet.account);

    return adsRewardsContract;
  }, [contractAddress, wallet.provider]);
};

const useAccountAdsRewards = () => {
  const wallet = useWallet();
  const {
    data = initialData,
    mutate,
    ...other
  } = useSWR(wallet.account ? [wallet.account] : null, getAccountAdsRewards);
  const contract = useAdsRewardsContract(data.contractAddress);
  const amount = useMemo(() => new BigNumber(data.amount).minus(data.claimedAmount), [data.amount, data.claimedAmount]);

  const claim = async () => {
    if (!contract || !wallet.provider || !wallet.account) {
      return;
    }

    await contract.claim(wallet.account, data.amount, data.proof);

    mutate({
      ...data,
      amount: '0',
      claimedAmount: '0',
    });
  };

  return {
    paymentTokenAddress: data.token,
    amount,
    claim,
    ...other,
  };
};

export default useAccountAdsRewards;
