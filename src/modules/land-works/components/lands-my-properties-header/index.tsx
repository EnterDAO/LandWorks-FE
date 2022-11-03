import { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import splitbee from '@splitbee/web';

import { Button, Grid, Modal, Typography } from 'design-system';
import { UserEntity } from 'modules/land-works/api';
import { MY_PROPERTIES_ROUTE_TABS, MyPropertiesRouteTabsValue, getMyPropertiesPath } from 'router/routes';
import { useWallet } from 'wallets/wallet';

import { ReactComponent as AddIcon } from '../../../../resources/svg/add.svg';
import LandClaimRentsAlert from '../land-claim-rents-alert';
import ListNewProperty from '../list-new-property';
import { TabListStyled, TabStyled } from './styled';

import { THEME_COLORS } from 'themes/theme-constants';

interface Props {
  rentedCount: number;
  lentCount: number;
  user?: UserEntity | null;
}

const LandsMyPropertiesHeader: FC<Props> = ({ rentedCount, lentCount }) => {
  const wallet = useWallet();
  const history = useHistory();

  const [showListNewModal, setShowListNewModal] = useState(false);

  const handleChange = (event: React.SyntheticEvent, tab: string) => {
    history.push(getMyPropertiesPath(tab as MyPropertiesRouteTabsValue));
  };

  const hasMetamaskConnected = wallet.isActive && wallet.connector?.id === 'metamask';

  return (
    <>
      <LandClaimRentsAlert />

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
            <Button
              btnSize="medium"
              variant="gradient"
              sx={{ marginLeft: 'auto', alignItems: 'center' }}
              onClick={() => {
                setShowListNewModal(true);

                splitbee.track('List new property button click');
              }}
            >
              <AddIcon style={{ marginRight: '10px' }} />
              List New Property
            </Button>
          </Grid>
        )}
      </Grid>

      <Modal open={showListNewModal} handleClose={() => setShowListNewModal(false)}>
        <ListNewProperty closeModal={() => setShowListNewModal(false)} />
      </Modal>
    </>
  );
};

export default LandsMyPropertiesHeader;
