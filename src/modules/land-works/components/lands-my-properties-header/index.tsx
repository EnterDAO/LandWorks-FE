import { FC, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSubscription } from '@apollo/client';

import { Box, Grid, Typography } from 'design-system';
import SplitBeeListButton from 'layout/metric/SplitBeeListButton';
import { LocationState } from 'modules/interface';
import { USER_CLAIM_SUBSCRIPTION, UserEntity, parseUser } from 'modules/land-works/api';
import { useListingModal } from 'providers/listing-modal-provider';
import { MY_PROPERTIES_ROUTE_TABS, MyPropertiesRouteTabsValue, getMyPropertiesPath } from 'router/routes';
import { useWallet } from 'wallets/wallet';

import { ReactComponent as AddIcon } from '../../../../resources/svg/add.svg';
import LandsBannerClaimRents from '../lands-banner-claim-rents';
import { ClaimModal } from '../lands-claim-modal';
import { TabListStyled, TabStyled } from './styled';

import { THEME_COLORS } from 'themes/theme-constants';

interface Props {
  rentedCount: number;
  lentCount: number;
  user?: UserEntity | null;
}

const LandsMyPropertiesHeader: FC<Props> = ({ rentedCount, lentCount, user }) => {
  const wallet = useWallet();
  const history = useHistory();
  const location = useLocation<LocationState>();
  const listingModal = useListingModal();

  const [showClaimModal, setShowClaimModal] = useState(false);
  const [claimButtonDisabled, setClaimButtonDisabled] = useState(false);

  const [claimData, setClaimData] = useState<UserEntity>();

  const { data: userClaimData } = useSubscription(USER_CLAIM_SUBSCRIPTION, {
    skip: wallet.account === undefined,
    variables: { id: wallet.account?.toLowerCase() },
  });

  const handleChange = (event: React.SyntheticEvent, tab: string) => {
    history.push(getMyPropertiesPath(tab as MyPropertiesRouteTabsValue));
  };

  useEffect(() => {
    if (userClaimData && userClaimData.user) {
      parseUser(userClaimData.user).then((result) => {
        setClaimData(result);
      });
    } else {
      setClaimData({} as UserEntity);
    }
  }, [userClaimData]);

  useEffect(() => setClaimButtonDisabled(false), [user]);
  const hasMetamaskConnected = wallet.isActive && wallet.connector?.id === 'metamask';

  useEffect(() => {
    if (location.state?.openClaimModal) {
      setShowClaimModal(true);
      history.push({
        state: { openClaimModal: false },
      });
    }
  }, [location.state]);

  return (
    <>
      {claimData?.hasUnclaimedRent && (
        <Box>
          <LandsBannerClaimRents
            onButtonClick={() => setShowClaimModal(true)}
            isClaimButtonDisabled={claimButtonDisabled}
          />
        </Box>
      )}
      <Grid
        container
        minHeight="var(--explore-subheader)"
        spacing={4}
        py={2}
        mb={3}
        alignItems="center"
        boxShadow={`inset 0 -2px 0 ${THEME_COLORS.grey01}`}
      >
        <Grid item xs={12} lg={4}>
          <Typography component="h1" variant="h3">
            My Properties
          </Typography>
        </Grid>

        <Grid item xs={6} lg={4} display="flex" justifyContent={{ lg: 'center' }}>
          <TabListStyled onChange={handleChange} aria-label="Lands tabs filter">
            <TabStyled
              label={
                <>
                  <strong>
                    Rented <span>{rentedCount}</span>
                  </strong>
                </>
              }
              value={MY_PROPERTIES_ROUTE_TABS.rented}
            />
            <TabStyled
              label={
                <>
                  <strong>
                    Listed <span>{lentCount}</span>
                  </strong>
                </>
              }
              value={MY_PROPERTIES_ROUTE_TABS.listed}
            />
          </TabListStyled>
        </Grid>
        {hasMetamaskConnected && (
          <Grid item xs={6} lg={4} display="flex" justifyContent="flex-end">
            <SplitBeeListButton
              btnSize="medium"
              variant="gradient"
              sx={{ marginLeft: 'auto', alignItems: 'center' }}
              onClick={listingModal.open}
            >
              <AddIcon style={{ marginRight: '10px' }} />
              List New Property
            </SplitBeeListButton>
          </Grid>
        )}
      </Grid>

      <ClaimModal
        onSubmit={() => {
          setClaimButtonDisabled(true);
          setShowClaimModal(false);
        }}
        onCancel={() => setShowClaimModal(false)}
        open={showClaimModal}
        rentFees={claimData?.unclaimedRentAssets}
      />
    </>
  );
};

export default LandsMyPropertiesHeader;
