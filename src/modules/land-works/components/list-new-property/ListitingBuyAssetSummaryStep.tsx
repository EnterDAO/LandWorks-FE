/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useMemo, useState } from 'react';
import BigNumber from 'bignumber.js';
import { utils } from 'ethers';
import useSWR from 'swr';
import Erc20Contract from 'web3/erc20Contract';
import { DEFAULT_ADDRESS } from 'web3/utils';

import Typography from 'components/common/Typography';
import { Box, Button, Grid, Stack } from 'design-system';
import { WarningIcon } from 'design-system/icons';
import { ToastType, showToastNotification } from 'helpers/toast-notifcations';
import { MarketplaceAsset } from 'hooks/useGetAssetsForBuyingQuery';
import useGetIsMounted from 'hooks/useGetIsMounted';
import SelectedListCard from 'modules/land-works/components/land-works-selected-feature-card';
import BuyDCLContract from 'modules/land-works/contracts/buy/BuyDCLContract';
import * as SeaportABI from 'modules/land-works/contracts/buy/seaport.json';
import { useEthWeb3 } from 'providers/eth-web3-provider';

import config from '../../../../config';
import { useWallet } from '../../../../wallets/wallet';
import { PaymentToken } from '../../api';
import { TxModal } from '../lands-list-modal';
import BuyAndListConfirmModal from './BuyAndListConfirmModal';
import MarketplaceAssetSummary from './MarketplaceAssetSummary/MarketplaceAssetSummary';

import './index.scss';

interface ListingBuyAssetSummaryStepProps {
  asset: MarketplaceAsset;
  minRentPeriod: BigNumber;
  maxRentPeriod: BigNumber;
  rentPrice: BigNumber;
  minPeriodSelectedOption: string;
  maxPeriodSelectedOption: string;
  maxFutureSelectedOption: string;
  maxFuturePeriod: BigNumber;
  pricePerSecond: BigNumber;
  paymentToken: PaymentToken;
  onBack: () => void;
  onSuccess?: (data: { tokenId: string; contract: string }) => void;
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
}): Promise<
  | {
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
    }
  | { error: string; message: string; statusCode: number }
> => {
  return fetch(`${config.reservoir.apiUrl}/execute/buy/v6`, {
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
const ListingBuyAssetSummaryStep = ({
  onBack,
  onSuccess,
  asset,
  pricePerSecond,
  ...summaryProps
}: ListingBuyAssetSummaryStepProps) => {
  const { web3 } = useEthWeb3();
  const wallet = useWallet();
  const [isBuying, setIsBuying] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const getIsMounted = useGetIsMounted();
  const [isApproving, setIsApproving] = useState(false);
  const [isTxProcessingModalOpen, setIsTxProcessingModalOpen] = useState(false);
  const isNativeCurrency = asset.price.currency.contract === DEFAULT_ADDRESS;
  const { data: nativeBalance, error: errorBalance } = useSWR(
    wallet.account && isNativeCurrency ? wallet.account : null,
    web3.eth.getBalance
  );

  const seaportABI = new utils.Interface(SeaportABI.abi);

  const erc20Contract = useMemo(() => {
    const contract = new Erc20Contract([], asset.price.currency.contract);

    contract.setProvider(wallet.provider);
    contract.setAccount(wallet.account);

    return contract;
  }, [asset.price.currency.contract, wallet.provider, wallet.account]);

  const buyDCLContract = useMemo(() => {
    const contract = new BuyDCLContract(config.contracts.buyContract);

    contract.setProvider(wallet.provider);
    contract.setAccount(wallet.account);

    return contract;
  }, [wallet.provider, wallet.account]);

  const { data: erc20Balance, error: errorErc20Balance } = useSWR<string>(
    wallet.account && !isNativeCurrency ? [erc20Contract, wallet.account, 'erc20Balance'] : null,
    (contract, account) => {
      return contract.loadBalance(account);
    }
  );

  const {
    data: erc20Allowance,
    error: errorErs20Allowance,
    mutate: mutateErc20Allowance,
  } = useSWR<string>(
    wallet.account && !isNativeCurrency ? [erc20Contract, wallet.account, 'erc20Allowance'] : null,
    (contract, account) => {
      return contract.loadAllowance(config.contracts.buyContract, account);
    }
  );

  const isNativeBalanceLoading = isNativeCurrency && !nativeBalance && !errorBalance;
  const isErc20BalanceLoading = !isNativeCurrency && !erc20Balance && !errorErc20Balance;
  const isErc20AllowanceLoading = !isNativeCurrency && !erc20Allowance && !errorErs20Allowance;

  const isBalanceLoading = isNativeCurrency ? isNativeBalanceLoading : isErc20BalanceLoading;
  const balance = (isNativeCurrency ? nativeBalance : erc20Balance) || '0';

  const hasInsufficientBalance = !isBalanceLoading && new BigNumber(balance).lt(asset.price.amount.raw);
  const hasInsufficientAllowance =
    !isNativeCurrency && !isErc20AllowanceLoading && new BigNumber(erc20Allowance || '0').lt(asset.price.amount.raw);

  const error = useMemo(() => {
    if (hasInsufficientBalance) {
      return 'Add funds in your wallet to complete the purchase.';
    }
  }, [hasInsufficientBalance]);

  const handleApprove = async () => {
    setIsApproving(true);
    setIsTxProcessingModalOpen(true);

    try {
      const approvedAmount = (await erc20Contract.approveAmount(
        asset.price.amount.raw,
        config.contracts.buyContract
      )) as any as string;

      await mutateErc20Allowance(approvedAmount);
    } catch (e: any) {
      console.log(e);
      showToastNotification(ToastType.Error, e?.message || "Couldn't approve. Try again later.");
    } finally {
      if (getIsMounted()) {
        setIsApproving(false);
        setIsTxProcessingModalOpen(false);
      }
    }
  };

  const handleBuyAndListButtonClick = () => {
    setIsConfirmModalOpen(true);
  };

  const handleBuyAndList = async () => {
    setIsConfirmModalOpen(false);
    setIsBuying(true);
    setIsTxProcessingModalOpen(true);

    try {
      const buyDetails = await fetchBuyDetails({
        contract: asset.contract,
        tokenId: asset.tokenId,
        buyer: wallet.account || '',
        sourceDomain: asset.source.domain,
      });

      if ('error' in buyDetails) {
        showToastNotification(ToastType.Error, buyDetails.message);

        return;
      }

      const seaportEncodedData = buyDetails.steps[1].items[0].data.data;
      const seaportDecodedData = seaportABI.decodeFunctionData('fulfillBasicOrder', seaportEncodedData);

      const listConfig = {
        metaverseId: 1,
        minPeriod: summaryProps.minRentPeriod.toFixed(0),
        maxPeriod: summaryProps.maxRentPeriod.toFixed(0),
        maxFutureTime: summaryProps.maxFuturePeriod.toFixed(0),
        paymentToken: summaryProps.paymentToken.id,
        pricePerSecond: pricePerSecond.toFixed(0),
        referrer: DEFAULT_ADDRESS,
      };

      const result = await (isNativeCurrency
        ? buyDCLContract.buyETH(listConfig, seaportDecodedData[0], asset.price.amount.raw)
        : buyDCLContract.buyERC20(listConfig, seaportDecodedData[0], asset.price.amount.raw));

      const tokenId: string = result.events.BuyList.returnValues[4];

      if (onSuccess) {
        onSuccess({
          tokenId,
          contract: asset.contract,
        });
      }
    } catch (e: any) {
      console.log(e);
      showToastNotification(ToastType.Error, e?.message || "Couldn't buy and list property. Try again later.");
    } finally {
      if (getIsMounted()) {
        setIsBuying(false);
        setIsTxProcessingModalOpen(false);
      }
    }
  };

  let txProcessingModalMessage = 'Processing...';

  if (isApproving) {
    txProcessingModalMessage = 'Approving...';
  } else if (isBuying) {
    txProcessingModalMessage = 'Buying and Listing...';
  }

  const hasError = !!error;

  return (
    <>
      <Stack flexGrow={1} minHeight={0} mb={4}>
        <Box maxWidth={630} alignSelf="center" mt={{ xs: 4, xxl: 8 }}>
          <Grid container wrap="nowrap" p="8px" borderRadius="20px" bgcolor="var(--theme-modal-color)">
            <SelectedListCard src={asset.image} name={asset.name} withoutInfo />

            <MarketplaceAssetSummary asset={asset} {...summaryProps} />
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
              {isApproving ? 'Approving...' : 'Approve'}
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
            onClick={handleBuyAndListButtonClick}
          >
            {isBuying ? 'Processing...' : 'Buy and list'}
          </Button>
        </Box>
      </Grid>

      <TxModal
        textMessage={txProcessingModalMessage}
        showModal={isTxProcessingModalOpen}
        handleClose={() => {
          setIsTxProcessingModalOpen(false);
        }}
      />

      <BuyAndListConfirmModal
        metaverse="Decentraland"
        price={`${asset.price.amount.native} ${asset.price.currency.symbol}`}
        onClose={() => setIsConfirmModalOpen(false)}
        open={isConfirmModalOpen}
        onConfirm={handleBuyAndList}
      />
    </>
  );
};

export default ListingBuyAssetSummaryStep;
