import { useMemo } from 'react';

import { AssetEntity } from 'modules/land-works/api';

const RENT_IDS_IN_PROGRESS_LOCAL_STORAGE_KEY = 'rents-in-progress';

const getRentIdsInProgress = (): string[] => {
  const storedRentsInProgress = localStorage.getItem(RENT_IDS_IN_PROGRESS_LOCAL_STORAGE_KEY);

  if (!storedRentsInProgress) {
    return [];
  }

  try {
    const parsedStoredRentsInProgress = JSON.parse(storedRentsInProgress);

    return Array.isArray(parsedStoredRentsInProgress) ? parsedStoredRentsInProgress : [];
  } catch (e) {
    return [];
  }
};

const setRentIdsInProgress = (rentIdsInProgress: string[]) => {
  localStorage.setItem(RENT_IDS_IN_PROGRESS_LOCAL_STORAGE_KEY, JSON.stringify(rentIdsInProgress));
};

export const addRentIdsInProgress = (rentIdInProgress: string) => {
  const uniqueRentIdsInProgress = new Set(getRentIdsInProgress());

  uniqueRentIdsInProgress.add(rentIdInProgress);

  setRentIdsInProgress([...uniqueRentIdsInProgress]);
};

const useRentIdsInProgress = (assets: AssetEntity[]): string[] => {
  return useMemo(() => {
    const storedRentsInProgress = getRentIdsInProgress();

    if (!storedRentsInProgress.length) {
      return [];
    }

    const actualRentsInProgress = storedRentsInProgress.filter((rentIdInProgress) => {
      return !assets.find((asset) => asset.metaverseAssetId === rentIdInProgress);
    });

    setRentIdsInProgress(actualRentsInProgress);

    return actualRentsInProgress;
  }, [assets]);
};

export default useRentIdsInProgress;
