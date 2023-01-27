/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { ChangeEvent, useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import useSWR from 'swr';
import Web3 from 'web3';
import ERC20Contract from 'web3/contracts/ERC20Contract';
import Erc20Contract from 'web3/erc20Contract';
import { refreshWeb3Token } from 'web3/token';
import { DEFAULT_ADDRESS, ONE_ADDRESS, ZERO_BIG_NUMBER, getNonHumanValue } from 'web3/utils';

import listingAdImgSrc from 'assets/img/listing-ad.jpg';
import landNotFoundImageSrc from 'assets/land-not-found.svg';
import Typography from 'components/common/Typography';
import ExternalLink from 'components/custom/external-link';
import Image from 'components/custom/image';
import Stepper, { Step, StepLabel } from 'components/styled/stepper';
import { Box, Button, Checkbox, ControlledSelect, Grid, Stack } from 'design-system';
import { WarningIcon } from 'design-system/icons';
import { ToastType, showToastNotification } from 'helpers/toast-notifcations';
import useGetAssetsForBuyingQuery, { MarketplaceAsset } from 'hooks/useGetAssetsForBuyingQuery';
import useGetIsMounted from 'hooks/useGetIsMounted';
import { BaseNFT, CryptoVoxelNFT, DecentralandNFT, Option } from 'modules/interface';
import ListNewSummary from 'modules/land-works/components/land-works-list-new-summary';
import SelectedListCard from 'modules/land-works/components/land-works-selected-feature-card';
import { addIconToMetaverse, currencyData } from 'modules/land-works/components/lands-explore-filters/filters-data';
import RentPeriod from 'modules/land-works/components/lands-input-rent-period';
import RentPrice from 'modules/land-works/components/lands-input-rent-price';
import { SuccessModal, TxModal } from 'modules/land-works/components/lands-list-modal';
import { useContractRegistry } from 'modules/land-works/providers/contract-provider';
import { useErc20 } from 'modules/land-works/providers/erc20-provider';
import { useMetaverseQueryParam } from 'modules/land-works/views/my-properties-view/MetaverseSelect';
import useGetAccountNonListedAssetsQuery from 'modules/land-works/views/my-properties-view/useGetAccountNotListedAssets';
import { useActiveAssetTransactions } from 'providers/ActiveAssetTransactionsProvider/ActiveAssetTransactionsProvider';
import { useEthWeb3 } from 'providers/eth-web3-provider';
import { useGeneral } from 'providers/general-provider';
import { getTokenPrice } from 'providers/known-tokens-provider';
import { MY_PROPERTIES_ROUTE_TABS, getMyPropertiesPath } from 'router/routes';

import config from '../../../../config';
import { useWallet } from '../../../../wallets/wallet';
import { PaymentToken, createAssetAdvertisement, fetchMetaverses, fetchTokenPayments } from '../../api';
import { useLandworks } from '../../providers/landworks-provider';
import SelectedFeatureCoords from '../land-works-selected-feature-coords';
import AssetList, { BuyAssetList } from './AssetList';
import BuyAndListConfirmModal from './BuyAndListConfirmModal';
import LoadingAssetList from './LoadingAssetList';
import MarketplaceAssetSummary from './MarketplaceAssetSummary/MarketplaceAssetSummary';
import SortSelect, { SortType } from './SortSelect';

import { getTimeType, secondsToDuration, sessionStorageHandler } from 'utils';
import { DAY_IN_SECONDS, MONTH_IN_SECONDS, WEEK_IN_SECONDS } from 'utils/date';

import {
  AtMostRentPeriodOptions,
  DEFAULT_LIST_MAX_FUTURE_PERIOD,
  DEFAULT_LIST_MAX_PERIOD,
  DEFAULT_MIN_PERIOD,
  FEE_PRECISION,
  MaxRentPeriodOptions,
  MinRentPeriodOptions,
  listTypes,
} from 'modules/land-works/constants';
import { THEME_COLORS } from 'themes/theme-constants';

import './index.scss';

const SignTransactionMessage = 'Signing transaction...';
const MineTransactionMessage = 'Listing property...';

enum StepId {
  Asset = 0,
  RentPeriod = 1,
  RentPrice = 2,
  Advertisement = 3,
  Summary = 4,
}

interface IProps {
  closeModal?: () => void;
  asset?: BaseNFT;
}

const useAccountBalance = (account: string) => {
  const { web3 } = useEthWeb3();
  const { data, error } = useSWR(account || null, web3.eth.getBalance);

  return {
    data: data || '0',
    isLoading: !data && !error,
    error,
  };
};

const useERC20Contract = (contractAddress: string) => {
  const { web3 } = useEthWeb3();

  return useMemo(() => new ERC20Contract(web3, contractAddress), [contractAddress, web3]);
};

// const useAccountERC20 = (erc20ContractAddress: string, account: string) => {
//   const { web3 } = useEthWeb3();

//   const contract = useMemo(() => new ERC20Contract(web3, erc20ContractAddress), [erc20ContractAddress, web3]);

//   const { data: balance } = useSWR(account, (a) => contract.balanceOf(a));
//   const { data: allowance } = useSWR()

//   return {
//     balance,
//   }
// }

const useAccountERC20Balance = (contract: ERC20Contract, account: string) => {
  const { data, error } = useSWR(account, (a) => contract.balanceOf(a));

  return {
    data: data || '0',
    isLoading: !data && !error,
    error,
  };
};

// const useAccountERC20Allowance = (contract: ERC20Contract, )

interface ListingBuyAssetSummaryStepProps {
  asset: MarketplaceAsset;
  minRentPeriod: BigNumber;
  maxRentPeriod: BigNumber;
  rentPrice: BigNumber;
  minPeriodSelectedOption: string;
  maxPeriodSelectedOption: string;
  maxFutureSelectedOption: string;
  maxFuturePeriod: BigNumber;
  paymentToken: PaymentToken;
  onBack: () => void;
  onComplete?: () => void;
}

const fetchBuyDetails = ({
  contract,
  tokenId,
  sourceDomain,
  buyer,
}: {
  contract: string;
  tokenId: string;
  sourceDomain: string;
  buyer: string;
}): Promise<{
  path: Record<string, any>[];
  steps: {
    items: {
      data: {
        data: string;
        from: string;
        to: string;
        value: string;
      };
      status: string;
    }[];
  }[];
}> => {
  return fetch('https://api-goerli.reservoir.tools/execute/buy/v6', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tokens: [`${contract}:${tokenId}`],
      onlyPath: false,
      normalizeRoyalties: false,
      partial: false,
      skipBalanceCheck: true,
      source: sourceDomain,
      taker: buyer,
    }),
  }).then((res) => res.json());
};

// TODO: refactor
const ListingBuyAssetSummaryStep = ({ onBack, asset, ...summaryProps }: ListingBuyAssetSummaryStepProps) => {
  const { web3 } = useEthWeb3();
  const wallet = useWallet();
  const [isBuying, setIsBuying] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const isNativeCurrency = asset.price.currency.contract === DEFAULT_ADDRESS;
  const { data: nativeBalance, error: errorBalance } = useSWR(
    wallet.account && isNativeCurrency ? wallet.account : null,
    web3.eth.getBalance
  );
  const erc20Contract = useMemo(
    () => new ERC20Contract(web3, asset.price.currency.contract),
    [asset.price.currency.contract, web3]
  );
  const { data: erc20Balance, error: errorErc20Balance } = useSWR(
    wallet.account && !isNativeCurrency ? [erc20Contract, wallet.account] : null,
    (contract, account) => contract.balanceOf(account)
  );

  const {
    data: erc20Allowance,
    error: errorErs20Allowance,
    mutate: mutateErc20Allowance,
  } = useSWR(wallet.account && !isNativeCurrency ? [erc20Contract, wallet.account] : null, (contract, account) =>
    contract.allowance(account, config.contracts.buyContract)
  );

  const isNativeBalanceLoading = isNativeCurrency && !nativeBalance && !errorBalance;
  const isErc20BalanceLoading = !isNativeCurrency && !erc20Balance && !errorErc20Balance;
  const isErc20AllowanceLoading = !isNativeCurrency && !erc20Allowance && !errorErs20Allowance;

  const isBalanceLoading = isNativeCurrency ? isNativeBalanceLoading : isErc20BalanceLoading;
  const balance = (isNativeCurrency ? nativeBalance : erc20Balance) || '0';

  const hasInsufficientAllowance =
    !isNativeCurrency && !isErc20AllowanceLoading && new BigNumber(erc20Allowance || '0').lt(asset.price.amount.raw);
  const hasInsufficientBalance =
    isNativeCurrency && !isBalanceLoading && new BigNumber(balance).lt(asset.price.amount.raw);

  const error = useMemo(() => {
    if (hasInsufficientBalance || hasInsufficientAllowance) {
      return 'Add funds in your wallet to complete the purchase.';
    }
  }, [hasInsufficientBalance, hasInsufficientAllowance]);

  const handleApprove = async () => {
    setIsApproving(true);

    const isApproved = await erc20Contract.approve(
      config.contracts.buyContract,
      asset.price.amount.raw,
      wallet.account || ''
    );

    if (isApproved) {
      await mutateErc20Allowance(asset.price.amount.raw);
    }

    setIsApproving(false);
  };

  const handleBuyAndList = async () => {
    setIsBuying(true);

    const buyDetails = await fetchBuyDetails({
      contract: asset.contract,
      tokenId: asset.tokenId,
      buyer: wallet.account || '',
      sourceDomain: asset.source.domain,
    });

    console.log({ buyDetails });
  };

  const hasError = !!error;

  return (
    <>
      <Stack flexGrow={1} minHeight={0} mb={4}>
        <Box maxWidth={630} alignSelf="center" mt={{ xs: 4, xxl: 8 }}>
          <Grid container wrap="nowrap" p="8px" borderRadius="20px" bgcolor="var(--theme-modal-color)">
            <SelectedListCard src={asset.image} name={asset.name} withoutInfo />

            <MarketplaceAssetSummary
              asset={asset}
              {...summaryProps}
              // metaverse={availableMetaverses[selectedMetaverse - 1]}
            />
          </Grid>
        </Box>
      </Stack>

      {error && (
        <Typography
          border="1px solid var(--theme-warning-border)"
          bgcolor="#321E29"
          variant="body2"
          height={38}
          color="var(--theme-warning-color)"
          borderRadius="10px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          px="15px"
          fontWeight={500}
          maxWidth={352}
          width={1}
          mx="auto"
          mb={4}
        >
          {error}
        </Typography>
      )}

      <Grid textAlign="left" className="warning-info" mb={{ xs: 2, xxl: 4 }} mx="auto">
        <WarningIcon style={{ width: 20, height: 20 }} />
        <Grid item>
          <Typography display={{ xs: 'none', xxl: 'block' }} variant="h4">
            Keep in mind
          </Typography>
          <Typography variant="subtitle2">There is a network fee in order to list the property.</Typography>
        </Grid>
      </Grid>

      <hr className="divider" />

      <Grid container justifyContent="space-between">
        <Button variant="secondary" btnSize="medium" onClick={onBack}>
          Back
        </Button>
        <Box display="flex" gap={3} alignItems="center">
          {!isNativeCurrency && (
            <Button
              disabled={
                isBalanceLoading ||
                hasError ||
                isErc20AllowanceLoading ||
                isApproving ||
                isBuying ||
                !hasInsufficientAllowance
              }
              variant="gradient"
              btnSize="medium"
              onClick={handleApprove}
            >
              Approve
            </Button>
          )}
          <Button
            disabled={
              isBalanceLoading ||
              hasError ||
              isErc20AllowanceLoading ||
              isApproving ||
              isBuying ||
              hasInsufficientAllowance ||
              hasInsufficientBalance
            }
            variant="gradient"
            btnSize="medium"
            onClick={handleBuyAndList}
          >
            Buy and list property
          </Button>
        </Box>
      </Grid>

      <BuyAndListConfirmModal open={false} />
    </>
  );
};

export default ListingBuyAssetSummaryStep;
