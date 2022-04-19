import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  MY_PROPERTIES_TAB_STATE_ALL,
  MY_PROPERTIES_TAB_STATE_LENT,
  MY_PROPERTIES_TAB_STATE_RENTED,
} from 'constants/modules';

import { Box } from 'design-system';
import { UserEntity } from 'modules/land-works/api';

import LandsBannerClaimRents from '../lands-banner-claim-rents';
import { ClaimModal } from '../lands-claim-modal';
import { RootStyled, TabListStyled, TabStyled, TypographyStyled } from './styled';

interface Props {
  setTab: Dispatch<SetStateAction<string>>;
  allCount: number;
  rentedCount: number;
  lentCount: number;
  user?: UserEntity;
}

const LandsMyPropertiesHeader: FC<Props> = ({ allCount, rentedCount, lentCount, setTab, user }) => {
  const history = useHistory();
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [claimButtonDisabled, setClaimButtonDisabled] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    history.push({ state: { tab: newValue } });
    setTab(newValue);
  };

  useEffect(() => setClaimButtonDisabled(false), [user]);

  return (
    <>
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

        {user?.hasUnclaimedRent && (
          <Box style={{ marginLeft: 'auto' }}>
            <LandsBannerClaimRents
              onButtonClick={() => setShowClaimModal(true)}
              isClaimButtonDisabled={claimButtonDisabled}
            />
          </Box>
        )}
      </RootStyled>

      <ClaimModal
        onSubmit={() => {
          setClaimButtonDisabled(true);
          setShowClaimModal(false);
        }}
        onCancel={() => setShowClaimModal(false)}
        visible={showClaimModal}
      />
    </>
  );
};

export default LandsMyPropertiesHeader;
