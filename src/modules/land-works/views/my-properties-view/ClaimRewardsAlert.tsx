import React, { FC, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { Button } from 'design-system';
import InfoAlert from 'layout/components/info-alert';
import { LocationState } from 'modules/interface';
import { ClaimModal } from 'modules/land-works/components/lands-claim-modal';
import { ReactComponent as DollarRibbonIcon } from 'resources/svg/dollar-ribbon.svg';

import { useWallet } from '../../../../wallets/wallet';
import useGetAccountUnclaimedAssetsQuery from './useGetAccountUnclaimedQuery';

const ClaimRewardsAlert: FC = () => {
  const wallet = useWallet();

  const { data: notListedAssets } = useGetAccountUnclaimedAssetsQuery(wallet.account || '');

  const history = useHistory();
  const location = useLocation<LocationState>();
  const [isClaimButtonDisabled, setIsClaimButtonDisabled] = useState(false);
  const [isClaimRewardsModalOpen, setIsClaimRewardsModalOpen] = useState(false);

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
      <ClaimModal
        onSubmit={() => {
          setIsClaimButtonDisabled(true);
          setIsClaimRewardsModalOpen(false);
        }}
        onCancel={() => setIsClaimRewardsModalOpen(false)}
        open={isClaimRewardsModalOpen}
        rentFees={notListedAssets.unclaimed}
      />

      {notListedAssets.unclaimed.length > 0 && (
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
          description="There are unclaimed rents rewards from your listed properties. Claim now."
          action={
            <Button
              disabled={isClaimButtonDisabled}
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
