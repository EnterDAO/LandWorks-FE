import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  MY_PROPERTIES_TAB_STATE_ALL,
  MY_PROPERTIES_TAB_STATE_LENT,
  MY_PROPERTIES_TAB_STATE_RENTED,
} from 'constants/modules';
import { useSubscription } from '@apollo/client';

import { Box, Button, Modal } from 'design-system';
import { USER_CLAIM_SUBSCRIPTION, UserEntity, parseUser } from 'modules/land-works/api';
import { useWallet } from 'wallets/wallet';

import { ReactComponent as AddIcon } from '../../../../resources/svg/add.svg';
import LandsBannerClaimRents from '../lands-banner-claim-rents';
import { ClaimModal } from '../lands-claim-modal';
import ListNewProperty from '../list-new-property';
import { RootStyled, TabListStyled, TabStyled, TypographyStyled } from './styled';

interface Props {
  setTab: Dispatch<SetStateAction<string>>;
  allCount: number;
  rentedCount: number;
  lentCount: number;
  user?: UserEntity;
}

const LandsMyPropertiesHeader: FC<Props> = ({ allCount, rentedCount, lentCount, setTab, user }) => {
  const wallet = useWallet();
  const history = useHistory();
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
      <RootStyled>
        <Box>
          <TypographyStyled variant="h1">My Properties</TypographyStyled>
        </Box>

        <Box style={{ marginLeft: '19%' }}>
          <TabListStyled onChange={handleChange} aria-label="Lands tabs filter">
            <TabStyled
              label={
                <>
                  <strong>
                    All <span>{allCount}</span>
                  </strong>
                </>
              }
              value={MY_PROPERTIES_TAB_STATE_ALL}
            />
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
          <Button
            btnSize="medium"
            variant="gradient"
            sx={{ marginLeft: 'auto', alignItems: 'center' }}
            onClick={() => setShowListNewModal(true)}
          >
            <AddIcon style={{ marginRight: '10px' }} />
            List New Property
          </Button>
        )}
      </RootStyled>

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
