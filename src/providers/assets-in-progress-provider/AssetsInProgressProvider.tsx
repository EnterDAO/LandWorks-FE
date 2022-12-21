import React, { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { addSeconds } from 'date-fns';

import { localStorageGet, localStorageSet } from 'utils';
import { createSafeContext } from 'utils/context';

interface ContextValue {
  assetIdsInProcessOfListing: Record<string, string>;
  addAssetIdInProcessOfListing: (assetId: string) => void;
  deleteAssetIdInProcessOfListing: (assetId: string) => void;
}

const Context = createSafeContext<ContextValue>();

interface AssetsInProgressProviderProps {
  children: ReactNode;
}

const LISTING_ASSETS_IN_PROGRESS_LS_KEY = 'listing-asset-ids-in-progress';

const getListingAssetIdsInProgress = () => {
  return localStorageGet<Record<string, string>>(LISTING_ASSETS_IN_PROGRESS_LS_KEY) || {};
};

const setLocalStorageRentIdsInProgress = (rentIdsInProgress: Record<string, string>) => {
  localStorageSet(LISTING_ASSETS_IN_PROGRESS_LS_KEY, rentIdsInProgress);
};

const AssetsInProgressProvider = ({ children }: AssetsInProgressProviderProps) => {
  const [assetIdsInProcessOfListing, setAssetIdsInProcessOfListing] = useState(getListingAssetIdsInProgress);

  useEffect(() => {
    setLocalStorageRentIdsInProgress(assetIdsInProcessOfListing);
  }, [assetIdsInProcessOfListing]);

  const addAssetIdInProcessOfListing = useCallback((assetId: string) => {
    setAssetIdsInProcessOfListing((prevState) => {
      return {
        ...prevState,
        [assetId]: addSeconds(new Date(), 30).toISOString(),
      };
    });
  }, []);

  const deleteAssetIdInProcessOfListing = useCallback((assetId: string) => {
    setAssetIdsInProcessOfListing((prevState) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [assetId]: _, ...other } = prevState;

      return other;
    });
  }, []);

  const value = useMemo(() => {
    return {
      addAssetIdInProcessOfListing,
      deleteAssetIdInProcessOfListing,
      assetIdsInProcessOfListing,
    };
  }, [deleteAssetIdInProcessOfListing, addAssetIdInProcessOfListing, assetIdsInProcessOfListing]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default AssetsInProgressProvider;
