import React, { FC, useMemo } from 'react';
import BigNumber from 'bignumber.js';

import ExternalLink from 'components/custom/external-link';
import { Box, Button, Stack, Typography } from 'design-system';
import { PaymentToken } from 'modules/land-works/api';
import { UsdcToken } from 'providers/known-tokens-provider';

import ClaimRewardsModalEmpty from './ClaimRewardsModalEmpty';
import ClaimRewardsModalTotal from './ClaimRewardsModalTotal';
import { useClaimRewards } from './ClaimRewardsProvider';

import { THEME_COLORS } from 'themes/theme-constants';

const ClaimRewardsModalAdsTab: FC = () => {
  const { adsReward, isAdsRewardClaiming, adsRewardsPaymentToken, claimAdsReward } = useClaimRewards();
  const adsTotalRewards = useMemo(() => {
    if (!adsRewardsPaymentToken) {
      return [
        {
          paymentToken: {
            symbol: UsdcToken.symbol,
          },
        },
      ];
    }

    const reward: {
      paymentToken: PaymentToken;
      total?: BigNumber;
    } = {
      paymentToken: adsRewardsPaymentToken,
    };

    if (adsReward.gt(0)) {
      reward.total = adsReward;
    }

    return [reward];
  }, [adsReward, adsRewardsPaymentToken]);

  const isAdsRewardAvailable = adsReward.gt(0);
  const isClaimButtonDisabled = !isAdsRewardAvailable || isAdsRewardClaiming;

  return (
    <>
      <Stack textAlign="left" height={315}>
        {isAdsRewardAvailable ? (
          <ClaimRewardsModalEmpty />
        ) : (
          <Typography component="p" variant="caption" color={THEME_COLORS.grey03}>
            You have pending awards from the ads that have been displayed on your land(s) while listed on LandWorks.
            <br />
            <br />
            The awards are paid out based on the unique views the ad(s) accumulate within a given month. Each unique
            view pays 0.025 USDC (0.05 USDC if you own a{' '}
            <ExternalLink variant="link2" href="https://opensea.io/collection/sharded-minds">
              Sharded Minds
            </ExternalLink>{' '}
            NFT). Full info on how the ads work can be found here. For a more detailed split of the accumulated unique
            views of your listed land(s) or if you have any questions, please reach out on our{' '}
            <ExternalLink variant="link2" href="https://discord.com/invite/7QJvEctG2G">
              Discord server
            </ExternalLink>
            .
            <br />
            <br />
            You have <b>X</b> listed properties on LandWorks where you have allowed ads to be displayed. Click the CLAIM
            button below to transfer the rewards to your wallet.
          </Typography>
        )}
      </Stack>

      <ClaimRewardsModalTotal items={adsTotalRewards} />

      <Box display="flex" justifyContent="center">
        <Button disabled={isClaimButtonDisabled} onClick={claimAdsReward} btnSize="medium" variant="gradient">
          {isAdsRewardClaiming ? 'Claiming...' : 'Claim'}
        </Button>
      </Box>
    </>
  );
};

export default ClaimRewardsModalAdsTab;
