import React, { useMemo } from 'react';
import BigNumber from 'bignumber.js';

import { Box, Button, Stack, Typography } from 'design-system';

import { useClaimRewards } from './ClaimRewardsModal';
import ClaimRewardsModalEmpty from './ClaimRewardsModalEmpty';
import ClaimRewardsModalTotal from './ClaimRewardsModalTotal';

import { THEME_COLORS } from 'themes/theme-constants';

const ClaimRewardsModalAdsTab = () => {
  const { adsReward, isAdsRewardClaiming, claimAdsReward } = useClaimRewards();

  const adsTotalRewards = useMemo(() => {
    const reward: {
      paymentToken: {
        symbol: string;
      };
      total?: BigNumber;
    } = {
      paymentToken: {
        symbol: 'USDC',
      },
    };

    if (adsReward.gt(0)) {
      reward.total = adsReward;
    }

    return [reward];
  }, [adsReward]);

  const isAdsRewardAvailable = adsReward.gt(0);
  const isClaimButtonDisabled = !isAdsRewardAvailable || isAdsRewardClaiming;

  return (
    <>
      <Stack textAlign="left" height={315}>
        {!isAdsRewardAvailable ? (
          <ClaimRewardsModalEmpty />
        ) : (
          <Typography component="p" variant="caption" color={THEME_COLORS.grey03}>
            You have awards to claim from the ads that have been displayed on your listed properties. Ads are displayed
            on the properties while listed on LandWorks until they get rented.
            <br />
            <br />
            The awards are paid out based on the unique views the ad accumulated until the last day of each month. Each
            unique view pays a 0.05 USDC. For a more detailed split of the accumulated unique views of your listed
            properties or if you have any questions, please reach out on our Discord server.
            <br />
            <br />
            You have <strong>X</strong> listed properties on LandWorks where you have allowed ads to be displayed. The
            awards available to claim have accrued for <strong>Y</strong> months.
          </Typography>
        )}
      </Stack>

      <ClaimRewardsModalTotal items={adsTotalRewards} />

      <Box display="flex" justifyContent="center">
        <Button disabled={isClaimButtonDisabled} onClick={claimAdsReward} btnSize="medium" variant="gradient">
          Claim
        </Button>
      </Box>
    </>
  );
};

export default ClaimRewardsModalAdsTab;
