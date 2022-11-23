import React, { FC, useMemo } from 'react';
import { Box } from '@mui/system';
import BigNumber from 'bignumber.js';

import TokenIcon from 'components/custom/token-icon';
import { Button, Checkbox, Stack, Typography } from 'design-system';

import ClaimRewardsModalEmpty from './ClaimRewardsModalEmpty';
import ClaimRewardsModalTotal from './ClaimRewardsModalTotal';
import { useClaimRewards } from './ClaimRewardsProvider';

import { formatBigNumber } from 'utils';

import { THEME_COLORS } from 'themes/theme-constants';

const MAX_CLAIM_SELECTED_ASSETS = 10;

const ClaimRewardsModalRentsTab: FC = () => {
  const {
    unclaimedAssets,
    isAssetSelected,
    isRentRewardClaiming,
    toggleSelectedAssetById,
    selectedAssetIds,
    claimRentReward,
  } = useClaimRewards();

  const rentTotalRewards = useMemo(() => {
    const rewards: {
      paymentToken: {
        symbol: string;
      };
      total?: BigNumber;
    }[] = [
      {
        paymentToken: {
          symbol: 'ETH',
        },
      },
      {
        paymentToken: {
          symbol: 'USDC',
        },
      },
    ];

    if (unclaimedAssets.length > 0) {
      rewards.forEach((reward) => (reward.total = new BigNumber(0)));

      unclaimedAssets.forEach((unclaimedAsset) => {
        const reward = rewards.find(({ paymentToken }) => {
          return unclaimedAsset.paymentToken.symbol.toLowerCase() === paymentToken.symbol.toLowerCase();
        });

        if (reward && isAssetSelected(unclaimedAsset.id)) {
          reward.total = reward.total?.plus(unclaimedAsset.unclaimedRentFee);
        }
      });
    }

    return rewards;
  }, [unclaimedAssets, isAssetSelected]);

  const isClaimButtonDisabled =
    isRentRewardClaiming || selectedAssetIds.length === 0 || selectedAssetIds.length > MAX_CLAIM_SELECTED_ASSETS;
  const isAssetButtonDisabled = isRentRewardClaiming || selectedAssetIds.length > MAX_CLAIM_SELECTED_ASSETS;

  return (
    <>
      <Stack textAlign="left" height={315}>
        {unclaimedAssets.length === 0 ? (
          <ClaimRewardsModalEmpty />
        ) : (
          <>
            <Typography component="p" variant="caption" color={THEME_COLORS.grey03} mb={5}>
              Select the properties you want to claim rent for. Please note you can select up to 10 rents per
              transaction.
            </Typography>
            <Stack p={2} m={-2} gap={3} flex="1 1 100%" overflow="auto">
              {unclaimedAssets.map((asset) => {
                const isSelected = isAssetSelected(asset.id);

                return (
                  <Box
                    component="label"
                    display="flex"
                    alignItems="center"
                    height={58}
                    borderRadius="10px"
                    flexShrink={0}
                    px={4}
                    sx={{
                      overflow: 'hidden',
                      position: 'relative',
                      bgcolor: 'var(--theme-grey200-color)',
                      cursor: isAssetButtonDisabled ? 'default' : 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: isSelected ? 'inset 0 0 0 2px currentColor, 0px 0px 4px currentColor' : undefined,
                      color: isAssetButtonDisabled ? 'var(--theme-grey700-color)' : 'var(--theme-light-color)',
                    }}
                  >
                    <Checkbox
                      disabled={isAssetButtonDisabled}
                      onChange={() => toggleSelectedAssetById(asset.id)}
                      checked={isSelected}
                    />
                    <Typography component="span" color="inherit" display="inline-flex" variant="button">
                      {asset.name}
                    </Typography>
                    <Typography
                      component="span"
                      color="inherit"
                      display="inline-flex"
                      alignItems="center"
                      variant="button"
                      ml="auto"
                    >
                      <TokenIcon name={asset.paymentToken.symbol} size={15} sx={{ mr: 1 }} />
                      {formatBigNumber(asset.unclaimedRentFee)}
                    </Typography>
                  </Box>
                );
              })}
            </Stack>
          </>
        )}
      </Stack>

      <ClaimRewardsModalTotal items={rentTotalRewards} />

      <Box display="flex" justifyContent="center">
        <Button disabled={isClaimButtonDisabled} btnSize="medium" variant="gradient" onClick={claimRentReward}>
          Claim
        </Button>
      </Box>
    </>
  );
};

export default ClaimRewardsModalRentsTab;
