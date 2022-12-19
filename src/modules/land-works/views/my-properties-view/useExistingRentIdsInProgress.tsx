import { useMemo } from 'react';

import { AssetEntity } from 'modules/land-works/api';

import { getNowTs } from 'utils';

const EXISTING_RENT_IDS_IN_PROGRESS_LOCAL_STORAGE_KEY = 'existing-rents-in-progress';

const getExistingRentIdsInProgress = (): string[] => {
  const storedExistingRentIdsInProgress = localStorage.getItem(EXISTING_RENT_IDS_IN_PROGRESS_LOCAL_STORAGE_KEY);

  if (!storedExistingRentIdsInProgress) {
    return [];
  }

  try {
    const parsedStoredExistingRentIdsInProgress = JSON.parse(storedExistingRentIdsInProgress);

    return Array.isArray(parsedStoredExistingRentIdsInProgress) ? parsedStoredExistingRentIdsInProgress : [];
  } catch (e) {
    return [];
  }
};

const setExistingRentIdsInProgress = (existingRentIdsInProgress: string[]) => {
  localStorage.setItem(EXISTING_RENT_IDS_IN_PROGRESS_LOCAL_STORAGE_KEY, JSON.stringify(existingRentIdsInProgress));
};

export const addExistingRentIdsInProgress = (existingRentIdInProgress: string) => {
  const uniqueExistingRentIdsInProgress = new Set(getExistingRentIdsInProgress());

  uniqueExistingRentIdsInProgress.add(existingRentIdInProgress);

  setExistingRentIdsInProgress([...uniqueExistingRentIdsInProgress]);
};

const useExistingRentIdsInProgress = (assets: AssetEntity[]): string[] => {
  return useMemo(() => {
    const storedExistingRentIdsInProgress = getExistingRentIdsInProgress();

    if (!storedExistingRentIdsInProgress.length) {
      return [];
    }
    const actualExistingRentIdsInProgress = storedExistingRentIdsInProgress.filter((existingRentIdInProgress) => {
      const foundAsset = assets.find((asset) => asset.metaverseAssetId === existingRentIdInProgress);

      return foundAsset && +foundAsset.lastRentEnd < getNowTs();
    });

    setExistingRentIdsInProgress(actualExistingRentIdsInProgress);

    return actualExistingRentIdsInProgress;
  }, [assets]);
};

export default useExistingRentIdsInProgress;
