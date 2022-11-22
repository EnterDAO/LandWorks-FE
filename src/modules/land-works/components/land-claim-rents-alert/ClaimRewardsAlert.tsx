import React, { FC, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import InfoAlert from 'components/custom/info-alert';
import { Button } from 'design-system';
import usePaymentToken from 'hooks/usePaymentToken';
import { LocationState } from 'modules/interface';
import { ReactComponent as DollarRibbonIcon } from 'resources/svg/dollar-ribbon.svg';
import { useWallet } from 'wallets/wallet';

import ClaimRewardsModal from './ClaimRewardsModal';
import ClaimRewardsProvider from './ClaimRewardsProvider';
import useAccountAdsRewards from './useAccountAdsRewards';
import useGetAccountUnclaimedAssetsQuery from './useGetAccountUnclaimedQuery';

const ClaimRewardsAlert: FC = () => {
  const history = useHistory();
  const location = useLocation<LocationState>();
  const wallet = useWallet();
  const [isClaimRewardsModalOpen, setIsClaimRewardsModalOpen] = useState(false);
  const { amount, claim, paymentTokenAddress } = useAccountAdsRewards();
  const { data: unclaimedRentAssets } = useGetAccountUnclaimedAssetsQuery(wallet.account || '');
  const adsRewardsPaymentToken = usePaymentToken(paymentTokenAddress);

  useEffect(() => {
    if (location.state?.openClaimModal) {
      setIsClaimRewardsModalOpen(true);

      history.replace({
        state: {
          openClaimModal: false,
        },
      });
    }
  }, [location.state?.openClaimModal, history]);

  return (
    <>
      <ClaimRewardsProvider
        unclaimedAssets={unclaimedRentAssets}
        adsReward={amount}
        adsRewardsPaymentToken={adsRewardsPaymentToken}
        claimAdsReward={claim}
      >
        <ClaimRewardsModal open={isClaimRewardsModalOpen} onClose={() => setIsClaimRewardsModalOpen(false)} />
      </ClaimRewardsProvider>

      {(unclaimedRentAssets.length > 0 || amount.gt(0)) && (
        <InfoAlert
          sx={{
            px: 6,
            py: 4,
            gap: 6,
            mt: 6,
            mb: 9,
          }}
          icon={<DollarRibbonIcon width={42} height={42} />}
          title="You have pending Rewards"
          description="There are unclaimed rents and/or ad rewards from your listed properties. Claim now."
          action={
            <Button
              variant="primary"
              btnSize="small"
              onClick={() => setIsClaimRewardsModalOpen(true)}
              sx={{
                width: 'auto !important',
              }}
            >
              Claim Rewards
            </Button>
          }
        />
      )}
    </>
  );
};

export default ClaimRewardsAlert;
