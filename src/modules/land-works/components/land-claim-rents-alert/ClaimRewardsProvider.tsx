import React, { useCallback, useMemo, useState } from 'react';
import BigNumber from 'bignumber.js';

import { ToastType, showToastNotification } from 'helpers/toast-notifcations';
import useGetIsMounted from 'hooks/useGetIsMounted';
import { AssetEntity, PaymentToken } from 'modules/land-works/api';
import { useLandworks } from 'modules/land-works/providers/landworks-provider';

import { createSafeContext, useSafeContext } from 'utils/context';

interface ClaimRewardsProviderProps {
  unclaimedAssets: AssetEntity[];
  adsReward: BigNumber;
  adsRewardsPaymentToken?: PaymentToken;
  claimAdsReward: () => Promise<void>;
}

interface ContextValue {
  unclaimedAssets: AssetEntity[];
  adsReward: BigNumber;
  isRentRewardClaiming: boolean;
  isAdsRewardClaiming: boolean;
  selectedAssetIds: string[];
  claimedAssetIds: string[];
  adsRewardsPaymentToken?: PaymentToken;
  claimRentReward: () => Promise<void>;
  claimAdsReward: () => Promise<void>;
  toggleSelectedAssetById: (assetId: string) => void;
  isAssetSelected: (assetId: string) => boolean;
}

const Context = createSafeContext<ContextValue>();

export const useClaimRewards = (): ContextValue => useSafeContext(Context);

const ClaimRewardsProvider: React.FC<ClaimRewardsProviderProps> = ({
  adsReward,
  adsRewardsPaymentToken,
  unclaimedAssets,
  children,
  claimAdsReward: claimAds,
}) => {
  const { landWorksContract } = useLandworks();
  const getIsMounted = useGetIsMounted();
  const [selectedAssetIds, setSelectedAssetIds] = useState<string[]>([]);
  const [claimedAssetIds, setClaimedAssetIds] = useState<string[]>([]);
  const [isRentRewardClaiming, setIsRentRewardClaiming] = useState(false);
  const [isAdsRewardClaiming, setIsAdsRewardClaiming] = useState(false);

  const actualUnclaimedAssets = useMemo(() => {
    return unclaimedAssets.filter((unclaimedAsset) => !claimedAssetIds.includes(unclaimedAsset.id));
  }, [unclaimedAssets, claimedAssetIds]);

  const toggleSelectedAssetById = useCallback((assetId: string) => {
    return setSelectedAssetIds((prevState) => {
      return prevState.indexOf(assetId) === -1 ? [...prevState, assetId] : prevState.filter((id) => id !== assetId);
    });
  }, []);

  const isAssetSelected = useCallback(
    (assetId: string) => {
      return selectedAssetIds.indexOf(assetId) !== -1;
    },
    [selectedAssetIds]
  );

  const claimRentReward = useCallback(async () => {
    if (!landWorksContract) {
      return;
    }

    setIsRentRewardClaiming(true);

    try {
      await landWorksContract.claimMultipleRentFees(selectedAssetIds, console.log);

      showToastNotification(ToastType.Success, 'Rent claimed successfully!');

      setClaimedAssetIds([...selectedAssetIds]);
      setSelectedAssetIds([]);
    } catch (e) {
      console.log(e);

      showToastNotification(ToastType.Error, 'There was an error while claiming the rent.');
    } finally {
      if (getIsMounted()) {
        setIsRentRewardClaiming(false);
      }
    }
  }, [selectedAssetIds, getIsMounted]);

  const claimAdsReward = useCallback(async () => {
    setIsAdsRewardClaiming(true);

    try {
      await claimAds();

      showToastNotification(ToastType.Success, 'Ads reward claimed successfully!');
    } catch (e) {
      console.log(e);

      showToastNotification(ToastType.Error, 'There was an error while claiming the ads reward.');
    } finally {
      if (getIsMounted()) {
        setIsAdsRewardClaiming(false);
      }
    }
  }, [getIsMounted, claimAds]);

  const value = useMemo(() => {
    return {
      unclaimedAssets: actualUnclaimedAssets,
      adsReward,
      selectedAssetIds,
      claimedAssetIds,
      isRentRewardClaiming,
      isAdsRewardClaiming,
      adsRewardsPaymentToken,
      isAssetSelected,
      toggleSelectedAssetById,
      claimRentReward,
      claimAdsReward,
    };
  }, [
    actualUnclaimedAssets,
    adsReward,
    selectedAssetIds,
    claimedAssetIds,
    isRentRewardClaiming,
    isAdsRewardClaiming,
    adsRewardsPaymentToken,
    isAssetSelected,
    toggleSelectedAssetById,
    claimRentReward,
    claimAdsReward,
  ]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default ClaimRewardsProvider;
