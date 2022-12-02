import React, { FC, useEffect, useState } from 'react';
import { refreshWeb3Token } from 'web3/token';

import { StyledSwitch } from 'design-system';
import { ToastType, showToastNotification } from 'helpers/toast-notifcations';
import useGetIsMounted from 'hooks/useGetIsMounted';
import { AssetEntity, getAssetAdvertisement, updateAssetAdvertisement } from 'modules/land-works/api';
import { useWallet } from 'wallets/wallet';

import DisableAdsModal from './DisableAdsModal';
import EnableAdsModal from './EnableAdsModal';

interface AdsToggleProps {
  asset: AssetEntity;
}

const AdsToggle: FC<AdsToggleProps> = ({ asset }) => {
  const getIsMounted = useGetIsMounted();
  const [isActive, setIsActive] = useState(false);
  const [isAllowAdvertiseModalOpen, setIsAllowAdvertiseModalOpen] = useState(false);
  const [isDisableAdvertiseModalOpen, setIsDisableAdvertiseModalOpen] = useState(false);
  const { networkId, account = '', provider } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [isTokenRefreshing, setIsTokenRefreshing] = useState(false);

  useEffect(() => {
    if (!networkId || !asset.metaverseRegistry) {
      return;
    }

    let isCancelled = false;

    setIsLoading(true);

    getAssetAdvertisement({
      metaverseAssetId: asset.metaverseAssetId,
      metaverseRegistry: asset.metaverseRegistry.id,
    })
      .then(({ hasAgreedForAds }) => {
        if (!isCancelled) {
          setIsActive(hasAgreedForAds);
        }
      })
      .catch(console.log)
      .finally(() => {
        if (!isCancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [networkId]);

  const handleAllowAdvertisingSwitchChange = () => {
    if (isActive) {
      setIsDisableAdvertiseModalOpen(true);
    } else {
      setIsAllowAdvertiseModalOpen(true);
    }
  };

  const toggleAdvertisement = async () => {
    const prevIsActive = isActive;

    setIsActive(!isActive);

    if (getIsMounted()) {
      setIsLoading(true);
    }

    try {
      await updateAssetAdvertisement({
        assetId: asset.id,
        hasAgreedForAds: !prevIsActive,
      });
    } catch (e) {
      if (getIsMounted()) {
        setIsActive(prevIsActive);
      }

      console.error(e);

      showToastNotification(ToastType.Error, `Couldn't ${prevIsActive ? 'disable' : 'enable'} advertising`);
    }

    if (getIsMounted()) {
      setIsLoading(false);
    }
  };

  const refreshToken = async (msg?: string) => {
    setIsTokenRefreshing(true);

    try {
      await refreshWeb3Token(account, provider, msg);
    } finally {
      if (getIsMounted()) {
        setIsTokenRefreshing(false);
      }
    }
  };

  const handleEnableAdsConfirm = async () => {
    try {
      await refreshToken('I agree for my land to be provided for advertising purposes until it gets rented.');

      setIsAllowAdvertiseModalOpen(false);
    } catch (e) {
      console.error(e);

      return;
    }

    await toggleAdvertisement();
  };

  const handleDisableAdsConfirm = async () => {
    try {
      await refreshToken('I do not want my land to be used for advertising purposes until it gets rented anymore.');

      setIsDisableAdvertiseModalOpen(false);
    } catch (e) {
      console.error(e);

      return;
    }

    await toggleAdvertisement();
  };

  return (
    <>
      <StyledSwitch disabled={isLoading} checked={isActive} onChange={handleAllowAdvertisingSwitchChange} />

      <EnableAdsModal
        open={isAllowAdvertiseModalOpen}
        onClose={() => setIsAllowAdvertiseModalOpen(false)}
        onConfirm={handleEnableAdsConfirm}
        actionDisabled={isTokenRefreshing}
      />

      <DisableAdsModal
        open={isDisableAdvertiseModalOpen}
        onClose={() => setIsDisableAdvertiseModalOpen(false)}
        onConfirm={handleDisableAdsConfirm}
        actionDisabled={isTokenRefreshing}
      />
    </>
  );
};

export default AdsToggle;
