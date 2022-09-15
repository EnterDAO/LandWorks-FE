import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSubscription } from '@apollo/client';

import { Box, Button, Modal, Typography } from 'design-system';
import { LocationState } from 'modules/interface';
import { USER_CLAIM_SUBSCRIPTION, UserEntity, parseUser } from 'modules/land-works/api';
import { useWallet } from 'wallets/wallet';

import { ReactComponent as AddIcon } from '../../../../resources/svg/add.svg';
import LandsBannerClaimRents from '../lands-banner-claim-rents';
import { ClaimModal } from '../lands-claim-modal';
import ListNewProperty from '../list-new-property';
import { TabListStyled, TabStyled } from './styled';

import { MY_PROPERTIES_TAB_STATE_LENT, MY_PROPERTIES_TAB_STATE_RENTED } from 'modules/land-works/constants';
import { THEME_COLORS } from 'themes/theme-constants';

interface Props {
  setTab: Dispatch<SetStateAction<string>>;
  rentedCount: number;
  lentCount: number;
  user?: UserEntity;
}

const LandsMyPropertiesHeader: FC<Props> = ({ rentedCount, lentCount, setTab, user }) => {
  const wallet = useWallet();
  const history = useHistory();
  const location = useLocation<LocationState>();

  const [showClaimModal, setShowClaimModal] = useState(false);
  const [showListNewModal, setShowListNewModal] = useState(false);
  const [claimButtonDisabled, setClaimButtonDisabled] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    history.push({ state: { tab: newValue } });
    setTab(newValue);
  };
  const [claimData, setClaimData] = useState<UserEntity>();

  const { data: userClaimData } = useSubscription(USER_CLAIM_SUBSCRIPTION, {
    skip: wallet.account === undefined,
    variables: { id: wallet.account?.toLowerCase() },
  });

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
      <Box
        display="flex"
        minHeight="var(--explore-subheader)"
        gap={4}
        mb={3}
        flexWrap="wrap"
        alignItems="center"
        boxShadow={`inset 0 -2px 0 ${THEME_COLORS.grey01}`}
      >
        <Box flexGrow={1} order={1}>
          <Typography component="h1" variant="h3">
            My Properties
          </Typography>
        </Box>

        <Box
          flexGrow={1}
          flexBasis={{ xs: '100%', lg: 'auto' }}
          order={{ xs: 3, lg: 2 }}
          display="flex"
          justifyContent={{ lg: 'center' }}
        >
          <TabListStyled onChange={handleChange} aria-label="Lands tabs filter">
            <TabStyled
              label={
                <>
                  <strong>
                    Rented <span>{rentedCount}</span>
                  </strong>
                </>
              }
              value={MY_PROPERTIES_TAB_STATE_RENTED}
            />
            <TabStyled
              label={
                <>
                  <strong>
                    Lent <span>{lentCount}</span>
                  </strong>
                </>
              }
              value={MY_PROPERTIES_TAB_STATE_LENT}
            />
          </TabListStyled>
        </Box>
        {hasMetamaskConnected && (
          <Box flexGrow={1} order={{ xs: 2, lg: 3 }} display="flex" justifyContent="flex-end">
            <Button
              btnSize="medium"
              variant="gradient"
              sx={{ marginLeft: 'auto', alignItems: 'center' }}
              onClick={() => setShowListNewModal(true)}
            >
              <AddIcon style={{ marginRight: '10px' }} />
              List New Property
            </Button>
          </Box>
        )}
      </Box>

      <Modal open={showListNewModal} handleClose={() => setShowListNewModal(false)}>
        <ListNewProperty closeModal={() => setShowListNewModal(false)} />
      </Modal>

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
