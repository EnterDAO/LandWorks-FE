import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { Box } from '@mui/system';
import BigNumber from 'bignumber.js';

import { Button, Divider, Modal, Stack, Typography } from 'design-system';
import { ToastType, showToastNotification } from 'helpers/toast-notifcations';
import { AssetEntity } from 'modules/land-works/api';

import ClaimRewardsModalAdsTab from './ClaimRewardsModalAdsTab';
import ClaimRewardsModalRentsTab from './ClaimRewardsModalRentsTab';
import ClaimRewardsProvider from './ClaimRewardsProvider';

import { THEME_COLORS } from 'themes/theme-constants';

const tabs = [
  {
    label: 'Rents',
    Component: ClaimRewardsModalRentsTab,
  },
  {
    label: 'Ads',
    Component: ClaimRewardsModalAdsTab,
  },
];

interface ClaimRewardsModalProps {
  open: boolean;
  onClose: () => void;
  unclaimedAssets: AssetEntity[];
  adsReward: BigNumber;
}

const ClaimRewardsModal: React.FC<ClaimRewardsModalProps> = ({ open, onClose, adsReward, unclaimedAssets }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const activeTab = tabs[activeTabIndex];
  const TabContent = activeTab.Component;

  return (
    <Modal handleClose={onClose} open={open} width={500}>
      <Typography variant="h3" mb={2}>
        Claim Rewards
      </Typography>
      <Typography variant="subtitle1" color={THEME_COLORS.grey02} mb={5}>
        Here you can claim accrued rents and rewards from ads.
      </Typography>

      <Box display="flex" gap={3}>
        {tabs.map((tab, i) => {
          const isActive = i === activeTabIndex;

          return (
            <Button
              key={i}
              variant="secondary"
              onClick={() => setActiveTabIndex(i)}
              sx={[
                {
                  transition: 'all 0.2s',
                  boxShadow: isActive
                    ? 'inset 0 0 0 2px var(--theme-light-color), 0px 0px 4px var(--theme-light-color)'
                    : undefined,
                },
                !isActive && {
                  color: THEME_COLORS.grey02,
                },
              ]}
            >
              {tab.label}
            </Button>
          );
        })}
      </Box>

      <Divider sx={{ my: 5, borderColor: '#3A3A4E' }} />

      <Stack gap={5}>
        <ClaimRewardsProvider adsReward={adsReward} unclaimedAssets={unclaimedAssets}>
          <TabContent />
        </ClaimRewardsProvider>
      </Stack>
    </Modal>
  );
};

export default ClaimRewardsModal;
