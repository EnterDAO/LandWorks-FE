import React, { MutableRefObject, ReactNode, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { getUnixTime } from 'date-fns';
import { omit } from 'lodash';

import { BaseNFT } from 'modules/interface';
import { AssetEntity } from 'modules/land-works/api';
import { useEthWeb3 } from 'providers/eth-web3-provider';

import { localStorageGet, localStorageSet } from 'utils';
import { createSafeContext, useSafeContext } from 'utils/context';

interface ContextValue {
  withdrawTransactionIds: Record<string, string>;
  addWithdrawTransaction: (assetId: string, txHash: string) => void;
  deleteWithdrawTransaction: (assetId: string) => void;
  listingTransactionIds: Record<string, string>;
  addListingTransaction: (assetId: string, txHash: string) => void;
  deleteListingTransaction: (assetId: string) => void;
  rentingTransactionIds: Record<string, { txHash: string; timestamp: number }>;
  addRentingTransaction: (assetId: string, txHash: string) => void;
  deleteRentingTransaction: (assetId: string) => void;
}

const Context = createSafeContext<ContextValue>();

const LISTING_TRANSACTIONS_LS_KEY = 'active-listing-transactions';
const WITHDRAW_TRANSACTIONS_LS_KEY = 'active-withdraw-transactions';
const RENTING_TRANSACTIONS_LS_KEY = 'active-renting-transactions';

const getLocalStorageListingTransactions = () => {
  return localStorageGet<Record<string, string>>(LISTING_TRANSACTIONS_LS_KEY) || {};
};

const setLocalStorageListingTransactions = (rentIdsInProgress: Record<string, string>) => {
  localStorageSet(LISTING_TRANSACTIONS_LS_KEY, rentIdsInProgress);
};

const getLocalStorageWithdrawTransactions = () => {
  return localStorageGet<Record<string, string>>(WITHDRAW_TRANSACTIONS_LS_KEY) || {};
};

const setLocalStorageWithdrawTransactions = (withdrawTransactions: Record<string, string>) => {
  localStorageSet(WITHDRAW_TRANSACTIONS_LS_KEY, withdrawTransactions);
};

const getLocalStorageRentingTransactions = () => {
  return localStorageGet<Record<string, { txHash: string; timestamp: number }>>(RENTING_TRANSACTIONS_LS_KEY) || {};
};

const setLocalStorageRentingTransactions = (
  rentingTransactions: Record<string, { txHash: string; timestamp: number }>
) => {
  localStorageSet(RENTING_TRANSACTIONS_LS_KEY, rentingTransactions);
};

export const useActiveAssetTransactions = () => useSafeContext(Context);

interface ActiveAssetTransactionsProviderProps {
  children: ReactNode;
}

export const useSyncActiveAssetTransactions = ({
  rented,
  listed,
  notListed,
}: {
  rented: AssetEntity[];
  listed: AssetEntity[];
  notListed: BaseNFT[];
}) => {
  const {
    withdrawTransactionIds,
    listingTransactionIds,
    rentingTransactionIds,
    deleteRentingTransaction,
    deleteListingTransaction,
    deleteWithdrawTransaction,
  } = useActiveAssetTransactions();

  useLayoutEffect(() => {
    const withdrawnAssetIds = Object.keys(withdrawTransactionIds).filter((assetId) => {
      return (
        !listed.find((asset) => asset.metaverseAssetId === assetId) && !!notListed.find((asset) => asset.id === assetId)
      );
    });

    withdrawnAssetIds.forEach(deleteWithdrawTransaction);

    const listedAssetIds = Object.keys(listingTransactionIds).filter((assetId) => {
      return (
        !!listed.find((asset) => asset.metaverseAssetId === assetId) && !notListed.find((asset) => asset.id === assetId)
      );
    });

    listedAssetIds.forEach(deleteListingTransaction);
  }, [
    notListed,
    listed,
    withdrawTransactionIds,
    listingTransactionIds,
    deleteListingTransaction,
    deleteWithdrawTransaction,
  ]);

  useEffect(() => {
    const rentedAssetIds = Object.keys(rentingTransactionIds).filter((assetId) => {
      const asset = rented.find((asset) => asset.id === assetId);

      if (!asset) {
        return false;
      }

      return +asset.lastRentTimestamp >= rentingTransactionIds[assetId].timestamp;
    });

    rentedAssetIds.forEach(deleteRentingTransaction);
  }, [rented, rentingTransactionIds, deleteRentingTransaction]);
};

// TODO: refactor
const ActiveAssetTransactionsProvider = ({ children }: ActiveAssetTransactionsProviderProps) => {
  const { web3 } = useEthWeb3();
  const [listingTransactions, setListingTransactions] = useState<Record<string, string>>(
    getLocalStorageListingTransactions
  );
  const [withdrawTransactions, setWithdrawTransactions] = useState<Record<string, string>>(
    getLocalStorageWithdrawTransactions
  );
  const [rentingTransactions, setRentingTransactions] = useState<Record<string, { txHash: string; timestamp: number }>>(
    getLocalStorageRentingTransactions
  );
  const oldListingTransactionsRef = useRef(listingTransactions);
  const oldWithdrawTransactionsRef = useRef(withdrawTransactions);
  const oldRentingTransactionsRef = useRef(rentingTransactions);

  const setters = useMemo(() => {
    const addAssetTransactionHash = (
      set: (cb: (prevState: Record<string, string>) => Record<string, string>) => void,
      assetId: string,
      txHash: string
    ) => {
      set((prevState) => {
        return {
          ...prevState,
          [assetId]: txHash,
        };
      });
    };

    const deleteAssetTransaction = (
      set: (cb: (prevState: Record<string, any>) => Record<string, any>) => void,
      assetId: string
    ) => {
      set((prevState) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [assetId]: _, ...other } = prevState;

        return other;
      });
    };

    const addWithdrawTransaction = (assetId: string, txHash: string) => {
      addAssetTransactionHash(setWithdrawTransactions, assetId, txHash);
    };

    const deleteWithdrawTransaction = (assetId: string) => {
      deleteAssetTransaction(setWithdrawTransactions, assetId);
    };

    const addListingTransaction = (assetId: string, txHash: string) => {
      addAssetTransactionHash(setListingTransactions, assetId, txHash);
    };

    const deleteListingTransaction = (assetId: string) => {
      deleteAssetTransaction(setListingTransactions, assetId);
    };

    const addRentingTransaction = (assetId: string, txHash: string) => {
      setRentingTransactions((prevState) => {
        return {
          ...prevState,
          [assetId]: {
            txHash,
            timestamp: getUnixTime(new Date()),
          },
        };
      });
    };

    const deleteRentingTransaction = (assetId: string) => {
      deleteAssetTransaction(setRentingTransactions, assetId);
    };

    return {
      addWithdrawTransaction,
      deleteWithdrawTransaction,
      addListingTransaction,
      deleteListingTransaction,
      addRentingTransaction,
      deleteRentingTransaction,
    };
  }, []);

  useEffect(() => {
    setLocalStorageListingTransactions(listingTransactions);
  }, [listingTransactions]);

  useEffect(() => {
    setLocalStorageWithdrawTransactions(withdrawTransactions);
  }, [withdrawTransactions]);

  useEffect(() => {
    setLocalStorageRentingTransactions(rentingTransactions);
  }, [rentingTransactions]);

  useEffect(() => {
    const getGroupedByStatusAssetIds = (assetsWithHashes: Record<string, string | { txHash: string }>) => {
      const assetIds = Object.keys(assetsWithHashes);

      return Promise.all(
        assetIds.map((assetId) => {
          const txHash =
            typeof assetsWithHashes[assetId] === 'string'
              ? (assetsWithHashes[assetId] as string)
              : (assetsWithHashes[assetId] as { txHash: string }).txHash;

          return web3.eth
            .getTransactionReceipt(txHash)
            .then((txReceipt) => {
              return {
                assetId,
                isCompleted: !!txReceipt,
              };
            })
            .catch(() => {
              return {
                assetId,
                isCompleted: true,
              };
            });
        })
      ).then((transactions) => {
        return transactions.reduce(
          (acc, curr) => {
            acc[curr.isCompleted ? 'completed' : 'incompleted'].push(curr.assetId);

            return acc;
          },
          { incompleted: [] as string[], completed: [] as string[] }
        );
      });
    };

    const updateTransactions = (
      set: (cb: (prevState: Record<string, any>) => Record<string, any>) => void,
      oldTransactionsRef: MutableRefObject<Record<string, any>>,
      statuses: {
        incompleted: string[];
        completed: string[];
      }
    ) => {
      if (statuses.incompleted.length) {
        oldTransactionsRef.current = omit(oldTransactionsRef.current, statuses.incompleted);
      }

      if (statuses.completed.length) {
        oldTransactionsRef.current = omit(oldTransactionsRef.current, statuses.completed);
        set((prevTransactions) => omit(prevTransactions, statuses.completed));
      }
    };

    const intervalId = window.setInterval(async () => {
      if (
        !Object.keys(oldListingTransactionsRef.current).length &&
        !Object.keys(oldWithdrawTransactionsRef.current).length &&
        !Object.keys(oldRentingTransactionsRef.current).length
      ) {
        window.clearInterval(intervalId);

        return;
      }

      const [listingAssetIds, withdrawAssetIds, rentingAssetIds] = await Promise.all([
        getGroupedByStatusAssetIds(oldListingTransactionsRef.current),
        getGroupedByStatusAssetIds(oldWithdrawTransactionsRef.current),
        getGroupedByStatusAssetIds(oldRentingTransactionsRef.current),
      ]);

      updateTransactions(setListingTransactions, oldListingTransactionsRef, listingAssetIds);
      updateTransactions(setWithdrawTransactions, oldWithdrawTransactionsRef, withdrawAssetIds);
      updateTransactions(setRentingTransactions, oldRentingTransactionsRef, rentingAssetIds);
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const value: ContextValue = useMemo(() => {
    return {
      withdrawTransactionIds: withdrawTransactions,
      listingTransactionIds: listingTransactions,
      rentingTransactionIds: rentingTransactions,
      ...setters,
    };
  }, [withdrawTransactions, listingTransactions, rentingTransactions, setters]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default ActiveAssetTransactionsProvider;
