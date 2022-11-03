import React, { createContext, useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { Box } from '@mui/system';
import BigNumber from 'bignumber.js';

import TokenIcon from 'components/custom/token-icon';
// import Icon from 'components/custom/icon';
// import SmallAmountTooltip from 'components/custom/small-amount-tooltip';
// import { Text } from 'components/custom/typography';
import { Button, Checkbox, Divider, Grid, Modal, Stack, Typography } from 'design-system';
// import { CloseIcon, WarningIcon } from 'design-system/icons';
import { ToastType, showToastNotification } from 'helpers/toast-notifcations';
import useGetIsMounted from 'hooks/useGetIsMounted';
import { AssetEntity, PaymentToken } from 'modules/land-works/api';
import { useLandworks } from 'modules/land-works/providers/landworks-provider';

import ClaimRewardsModalAdsTab from './ClaimRewardsModalAdsTab';
import ClaimRewardsModalRentsTab from './ClaimRewardsModalRentsTab';

import { formatBigNumber } from 'utils';
import { createSafeContext, useSafeContext } from 'utils/context';

import { THEME_COLORS } from 'themes/theme-constants';

const tabs = [
  {
    label: 'Rents',
    Component: ClaimRewardsModalRentsTab,
  },
  {
    label: 'Ads',
    Component: ClaimRewardsModalAdsTab,
  },
];

interface ClaimRewardsModalProps {
  open: boolean;
  onClose: () => void;
  unclaimedAssets: AssetEntity[];
  adsReward: BigNumber;
}

interface ContextValue {
  unclaimedAssets: AssetEntity[];
  adsReward: BigNumber;
  isRentRewardClaiming: boolean;
  isAdsRewardClaiming: boolean;
  selectedAssetIds: string[];
  claimedAssetIds: string[];
  claimRentReward: () => Promise<void>;
  claimAdsReward: () => Promise<void>;
  toggleSelectedAssetById: (assetId: string) => void;
  isAssetSelected: (assetId: string) => boolean;
}

const Context = createSafeContext<ContextValue>();

export const useClaimRewards = () => useSafeContext(Context);

const ClaimRewardsModal: React.FC<ClaimRewardsModalProps> = ({ open, onClose, adsReward, unclaimedAssets }) => {
  const { landWorksContract } = useLandworks();
  const getIsMounted = useGetIsMounted();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [selectedAssetIds, setSelectedAssetIds] = useState<string[]>([]);
  const [claimedAssetIds, setClaimedAssetIds] = useState<string[]>([]);
  const [isRentRewardClaiming, setIsRentRewardClaiming] = useState(false);
  const [isAdsRewardClaiming, setIsAdsRewardClaiming] = useState(false);

  const [actualAdsReward, setActualAdsReward] = useState(adsReward);
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
    if (!landWorksContract) {
      return;
    }

    setIsAdsRewardClaiming(true);

    try {
      // TODO: replace with real logic
      await new Promise((res) => {
        setTimeout(res, 3000);
      });

      showToastNotification(ToastType.Success, 'Ads reward claimed successfully!');

      setActualAdsReward(BigNumber.ZERO);
    } catch (e) {
      console.log(e);

      showToastNotification(ToastType.Error, 'There was an error while claiming the ads reward.');
    } finally {
      if (getIsMounted()) {
        setIsAdsRewardClaiming(false);
      }
    }
  }, [getIsMounted]);

  useLayoutEffect(() => {
    setActualAdsReward(adsReward);
  }, [adsReward]);

  const value = useMemo(() => {
    return {
      unclaimedAssets: actualUnclaimedAssets,
      adsReward: actualAdsReward,
      selectedAssetIds,
      claimedAssetIds,
      isRentRewardClaiming,
      isAdsRewardClaiming,
      isAssetSelected,
      toggleSelectedAssetById,
      claimRentReward,
      claimAdsReward,
    };
  }, [
    actualUnclaimedAssets,
    actualAdsReward,
    selectedAssetIds,
    claimedAssetIds,
    isRentRewardClaiming,
    isAdsRewardClaiming,
    isAssetSelected,
    toggleSelectedAssetById,
    claimRentReward,
    claimAdsReward,
  ]);

  const activeTab = tabs[activeTabIndex];
  const TabContent = activeTab.Component;

  return (
    <Context.Provider value={value}>
      <Modal handleClose={onClose} open={open} width={500}>
        <Typography variant="h3" mb={2}>
          Claim Rewards
        </Typography>
        <Typography variant="subtitle1" color={THEME_COLORS.grey02} mb={5}>
          Here you can claim accrued rents and rewards from ads.
        </Typography>

        <Box display="flex" gap={3}>
          {tabs.map((tab, i) => {
            const isActive = i === activeTabIndex;

            return (
              <Button
                key={i}
                variant="secondary"
                onClick={() => setActiveTabIndex(i)}
                sx={[
                  {
                    transition: 'all 0.2s',
                    boxShadow: isActive
                      ? 'inset 0 0 0 2px var(--theme-light-color), 0px 0px 4px var(--theme-light-color)'
                      : undefined,
                  },
                  !isActive && {
                    color: THEME_COLORS.grey02,
                  },
                ]}
              >
                {tab.label}
              </Button>
            );
          })}
        </Box>

        <Divider sx={{ my: 5, borderColor: '#3A3A4E' }} />

        <Stack gap={5}>
          <TabContent />
        </Stack>
      </Modal>
    </Context.Provider>
  );
};

export default ClaimRewardsModal;
