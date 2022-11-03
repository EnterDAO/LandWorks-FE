import React, { FC, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSubscription } from '@apollo/client';
import BigNumber from 'bignumber.js';

import InfoAlert from 'components/custom/info-alert';
import { Button } from 'design-system';
import { LocationState } from 'modules/interface';
import { USER_CLAIM_SUBSCRIPTION, UserEntity, parseUser } from 'modules/land-works/api';
import { ReactComponent as DollarRibbonIcon } from 'resources/svg/dollar-ribbon.svg';
import { useWallet } from 'wallets/wallet';

import ClaimRewardsModal from './ClaimRewardsModal';

const ClaimRewardsAlert: FC = () => {
  const history = useHistory();
  const location = useLocation<LocationState>();
  const wallet = useWallet();
  const [isClaimRewardsModalOpen, setIsClaimRewardsModalOpen] = useState(false);
  const { data: userClaimData } = useSubscription<{ user: UserEntity }>(USER_CLAIM_SUBSCRIPTION, {
    skip: !wallet.account,
    variables: {
      id: wallet.account?.toLowerCase(),
    },
  });

  const [userData, setUserData] = useState<UserEntity | null>(null);

  useLayoutEffect(() => {
    if (!userClaimData || !userClaimData.user) {
      return;
    }

    let isCancelled = false;

    parseUser(userClaimData.user)
      .then((result) => {
        if (!isCancelled) {
          setUserData(result);
        }
      })
      .catch(console.error);

    return () => {
      isCancelled = true;
    };
  }, [userClaimData]);

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

  // TODO: replace with real data
  const adsReward = useMemo(() => new BigNumber(1), []);
  const unclaimedRentAssets = userData?.unclaimedRentAssets || [];

  return (
    <>
      <ClaimRewardsModal
        open={isClaimRewardsModalOpen}
        onClose={() => setIsClaimRewardsModalOpen(false)}
        unclaimedAssets={unclaimedRentAssets}
        adsReward={adsReward}
      />

      {(unclaimedRentAssets.length > 0 || adsReward.gt(0)) && (
        <InfoAlert
          sx={{
            px: 6,
            py: 4,
            gap: 6,
            mt: 6,
            mb: 12,
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
