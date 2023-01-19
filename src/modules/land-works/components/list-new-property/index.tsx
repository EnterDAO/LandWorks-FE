/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { ChangeEvent, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import { refreshWeb3Token } from 'web3/token';
import { ZERO_BIG_NUMBER, getNonHumanValue } from 'web3/utils';

import listingAdImgSrc from 'assets/img/listing-ad.jpg';
import landNotFoundImageSrc from 'assets/land-not-found.svg';
import Typography from 'components/common/Typography';
import ExternalLink from 'components/custom/external-link';
import Image from 'components/custom/image';
import Stepper, { Step, StepLabel } from 'components/styled/stepper';
import { Box, Button, Checkbox, ControlledSelect, Grid, Stack } from 'design-system';
import { WarningIcon } from 'design-system/icons';
import { ToastType, showToastNotification } from 'helpers/toast-notifcations';
import useGetIsMounted from 'hooks/useGetIsMounted';
import { BaseNFT, CryptoVoxelNFT, DecentralandNFT } from 'modules/interface';
import ListNewSummary from 'modules/land-works/components/land-works-list-new-summary';
import SelectedListCard from 'modules/land-works/components/land-works-selected-feature-card';
import { currencyData } from 'modules/land-works/components/lands-explore-filters/filters-data';
import RentPeriod from 'modules/land-works/components/lands-input-rent-period';
import RentPrice from 'modules/land-works/components/lands-input-rent-price';
import { SuccessModal, TxModal } from 'modules/land-works/components/lands-list-modal';
import { METAVERSES } from 'modules/land-works/data/metaverses';
import { useContractRegistry } from 'modules/land-works/providers/contract-provider';
import { useActiveAssetTransactions } from 'providers/ActiveAssetTransactionsProvider/ActiveAssetTransactionsProvider';
import { useGeneral } from 'providers/general-provider';
import { getTokenPrice } from 'providers/known-tokens-provider';
import { MY_PROPERTIES_ROUTE_TABS, getMyPropertiesPath } from 'router/routes';

import config from '../../../../config';
import { useWallet } from '../../../../wallets/wallet';
import { PaymentToken, createAssetAdvertisement, fetchTokenPayments } from '../../api';
import { useLandworks } from '../../providers/landworks-provider';
import SelectedFeatureCoords from '../land-works-selected-feature-coords';
import MetaverseSelect, { useMetaverseQueryParam } from '../MetaverseSelect';
import AssetList from './AssetList';
import LoadingAssetList from './LoadingAssetList';

import { parseVoxelsAsset } from 'modules/land-works/utils';
import { getTimeType, secondsToDuration } from 'utils';
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

const ListNewProperty: React.FC<IProps> = ({ closeModal, asset }) => {
  const { setJoinPromptOpen } = useGeneral();
  const walletCtx = useWallet();
  const landworks = useLandworks();
  const registry = useContractRegistry();
  const getIsMounted = useGetIsMounted();
  const { addListingTransaction, deleteListingTransaction } = useActiveAssetTransactions();

  const history = useHistory();

  const { landWorksContract } = landworks;
  const { landRegistryContract, estateRegistryContract, cryptoVoxelsContract } = registry;

  const [minPeriod, setMinPeriod] = useState(new BigNumber(WEEK_IN_SECONDS));
  const [isMinPeriodSelected, setMinPeriodSelected] = useState(true);
  const [minInput, setMinInput] = useState(DEFAULT_MIN_PERIOD);
  const [minPeriodType, setMinPeriodType] = useState(BigNumber.from(MinRentPeriodOptions[3].value));
  const [minPeriodSelectedOption, setMinPeriodSelectedOption] = useState(MinRentPeriodOptions[3]); // Selected Option Value for the select menu
  const [minError, setMinError] = useState('');

  const [maxPeriod, setMaxPeriod] = useState(DEFAULT_LIST_MAX_PERIOD.multipliedBy(MONTH_IN_SECONDS));
  const [isMaxPeriodSelected, setMaxPeriodSelected] = useState(true);
  const [maxInput, setMaxInput] = useState(DEFAULT_LIST_MAX_PERIOD);
  const [maxPeriodType, setMaxPeriodType] = useState(BigNumber.from(MaxRentPeriodOptions[4].value));
  const [maxPeriodSelectedOption, setMaxPeriodSelectedOption] = useState(MaxRentPeriodOptions[4]); // Selected Option Value for the select menu
  const [maxError, setMaxError] = useState('');

  const [maxFutureTime, setMaxFutureTime] = useState(DEFAULT_LIST_MAX_FUTURE_PERIOD.multipliedBy(MONTH_IN_SECONDS));
  const [maxFutureTimeInput, setMaxFutureTimeInput] = useState(DEFAULT_LIST_MAX_FUTURE_PERIOD);
  const [maxFutureTimePeriod, setMaxFuturePeriodType] = useState(BigNumber.from(AtMostRentPeriodOptions[4].value));
  const [maxFutureSelectedOption, setMaxFutureSelectedOption] = useState(AtMostRentPeriodOptions[4]); // Selected Option Value for the select menu
  const [maxFutureError, setMaxFutureError] = useState('');

  const [selectedProperty, setSelectedProperty] = useState<BaseNFT | null | undefined>(asset);

  const [assetProperties, setAssetProperties] = useState<DecentralandNFT[]>([]);
  const [assetEstates, setAssetEstates] = useState<DecentralandNFT[]>([]);
  const [estateGroup, setEstateGroup] = useState<DecentralandNFT[]>([]);
  const [cryptoVoxelParcels, setCryptoVoxelParcels] = useState<CryptoVoxelNFT[]>([]);

  const [paymentTokens, setPaymentTokens] = useState([] as PaymentToken[]);
  const [paymentToken, setPaymentToken] = useState({} as PaymentToken);
  const [selectedCurrency, setSelectedCurrency] = useState(1);

  const [tokenCost, setTokenCost] = useState<BigNumber | undefined>();
  const [earnings, setEarnings] = useState(ZERO_BIG_NUMBER);
  const [protocolFee, setProtocolFee] = useState(ZERO_BIG_NUMBER);
  const [feePercentage, setFeePercentage] = useState(0);
  const [priceError, setPriceError] = useState('');

  const [approveDisabled, setApproveDisabled] = useState(false);
  const [listDisabled, setListDisabled] = useState(true);
  const [usdPrice, setUsdPrice] = useState('0');

  const [loading, setLoading] = useState(false);
  const [selectedMetaverse] = useMetaverseQueryParam();

  const [activeStep, setActiveStep] = useState(0);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showSignModal, setShowSignModal] = useState(false);
  const [listedPropertyId, setListedPropertyId] = useState('');
  const [landType, setLandType] = useState(0);
  const [isLandProvidedForAdvertisement, setIsLandProvidedForAdvertisement] = useState(true);
  const [isCreatingAssetAdvertisement, setIsCreatingAssetAdvertisement] = useState(false);

  const [listModalMessage, setListModalMessage] = useState(SignTransactionMessage);

  const pricePerSecond = getNonHumanValue(tokenCost || BigNumber.ZERO, paymentToken.decimals).dividedBy(DAY_IN_SECONDS);

  const handlePropertyChange = (selectedLand: BaseNFT) => {
    setSelectedProperty(selectedLand);
  };

  const isDecentraland = selectedProperty?.metaverseName === 'Decentraland';
  const isVoxels = selectedProperty?.metaverseName === 'Voxels';

  const handleMinCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMinPeriodSelected(e.target.checked);
    if (e.target.checked) {
      setMinPeriod(minInput?.multipliedBy(minPeriodType!));
    } else {
      // Reset to defaults
      setMinPeriod(new BigNumber(DAY_IN_SECONDS));
      setMinInput(DEFAULT_MIN_PERIOD);
      setMinPeriodType(BigNumber.from(MinRentPeriodOptions[2].value));
      setMinPeriodSelectedOption(MinRentPeriodOptions[2]);
    }
  };

  const handleMinSelectChange = (value: number) => {
    const bigvalue = BigNumber.from(value);

    if (isMinPeriodSelected) {
      setMinPeriodType(bigvalue);

      const parsedDate = secondsToDuration(bigvalue?.toNumber()!);
      const { timeType } = getTimeType(parsedDate);
      const typeSuffix = timeType.substr(0, 4);
      const optionByType = MinRentPeriodOptions.find((o) => o.label.includes(typeSuffix));
      const optionIndex = MinRentPeriodOptions.indexOf(optionByType!);

      setMinPeriodSelectedOption(MinRentPeriodOptions[optionIndex]);
      setMinPeriod(minInput?.multipliedBy(bigvalue!));
    }
  };

  const handleMinInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = BigNumber.from(e.target.value);
    setMinInput(value!);
    if (isMinPeriodSelected) {
      setMinPeriod(value?.multipliedBy(minPeriodType!)!);
    }
  };

  const handleMaxCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMaxPeriodSelected(e.target.checked);
    if (e.target.checked) {
      setMaxPeriod(maxInput?.multipliedBy(maxPeriodType!)!);
    } else {
      // Reset to defaults
      // Max Period
      setMaxPeriod(DEFAULT_LIST_MAX_PERIOD.multipliedBy(MONTH_IN_SECONDS));
      setMaxInput(DEFAULT_LIST_MAX_PERIOD);
      setMaxPeriodType(BigNumber.from(MinRentPeriodOptions[4].value));
      setMaxPeriodSelectedOption(MinRentPeriodOptions[4]);
      // Max Future Time | At Most
      setMaxFutureTime(DEFAULT_LIST_MAX_FUTURE_PERIOD.multipliedBy(MONTH_IN_SECONDS));
      setMaxFutureTimeInput(DEFAULT_LIST_MAX_FUTURE_PERIOD);
      setMaxFuturePeriodType(BigNumber.from(MinRentPeriodOptions[4].value));
      setMaxFutureSelectedOption(MinRentPeriodOptions[4]);
    }
  };

  const handleMaxSelectChange = (value: number) => {
    const bigvalue = BigNumber.from(value);

    if (isMaxPeriodSelected) {
      setMaxPeriodType(bigvalue);

      const parsedDate = secondsToDuration(bigvalue?.toNumber()!);
      const { timeType } = getTimeType(parsedDate);
      const typeSuffix = timeType.substr(0, 4);
      const optionByType = MaxRentPeriodOptions.find((o) => o.label.includes(typeSuffix));
      const optionIndex = MaxRentPeriodOptions.indexOf(optionByType!);

      setMaxPeriodSelectedOption(MaxRentPeriodOptions[optionIndex]);
      setMaxPeriod(maxInput?.multipliedBy(bigvalue!)!);
    }
  };

  const handleMaxInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = BigNumber.from(e.target.value);

    setMaxInput(value!);

    if (isMaxPeriodSelected) {
      setMaxPeriod(value?.multipliedBy(maxPeriodType!)!);
    }
  };

  const handleAtMostSelectChange = (value: number) => {
    const bigValue = BigNumber.from(value);
    setMaxFuturePeriodType(bigValue);

    const parsedDate = secondsToDuration(bigValue?.toNumber()!);
    const { timeType } = getTimeType(parsedDate);
    const typeSuffix = timeType.substr(0, 3);
    const optionByType = AtMostRentPeriodOptions.find((o) => o.label.includes(typeSuffix));
    const optionIndex = AtMostRentPeriodOptions.indexOf(optionByType!);

    setMaxFutureSelectedOption(AtMostRentPeriodOptions[optionIndex]);
    setMaxFutureTime(maxFutureTimeInput?.multipliedBy(bigValue!)!);

    // If maxPeriod chebkox is not selected, mirror the values to the maxPeriod input and dropdown
    if (!isMaxPeriodSelected) {
      setMaxPeriodType(bigValue);

      const optionByType = MaxRentPeriodOptions.find((o) => o.label.includes(typeSuffix));
      const optionIndex = MaxRentPeriodOptions.indexOf(optionByType!);
      setMaxPeriodSelectedOption(MaxRentPeriodOptions[optionIndex]);
      setMaxPeriod(maxInput?.multipliedBy(bigValue!)!);
    }
  };

  const handleAtMostInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = BigNumber.from(e.target.value);
    setMaxFutureTimeInput(value!);
    setMaxFutureTime(value?.multipliedBy(maxFutureTimePeriod!)!);

    // If maxPeriod chebkox is not selected, mirror the values to the maxPeriod input and dropdown
    if (!isMaxPeriodSelected) {
      setMaxInput(value!);
      setMaxPeriod(value?.multipliedBy(maxPeriodType!)!);
    }
  };

  const handleCurrencyChange = (value: number) => {
    const sortIndex = Number(value) - 1;
    setSelectedCurrency(value);
    setPaymentToken(paymentTokens[sortIndex]);
  };

  const handleCostEthChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTokenCost(!e.target.value ? undefined : BigNumber.from(e.target.value));
  };

  const handleApprove = async () => {
    if (selectedProperty === null) {
      return;
    }
    try {
      let isApproved = false;
      setShowApproveModal(true);

      let registry;
      const contract = config.contracts.landworksContract;

      if (isDecentraland) {
        if (selectedProperty.contractAddress === config.contracts.decentraland.landRegistry) {
          registry = landRegistryContract;
        } else {
          registry = estateRegistryContract;
        }
      }
      if (isVoxels) {
        registry = cryptoVoxelsContract;
      }
      if (!!registry && !!contract) {
        await registry?.setApprovalForAll(contract, true);
        isApproved = await registry?.isApprovedForAll(contract)!;
      }
      if (isApproved) {
        setApproveDisabled(true);
        setShowApproveModal(false);
      }
    } catch (e) {
      setShowApproveModal(false);
      console.log(e);
      // If there is an error enable the approve button
    }
  };

  const calculateTotalAndFeePrecision = () => {
    const fee = tokenCost?.multipliedBy(paymentToken.feePercentage).dividedBy(FEE_PRECISION);
    const earnings = tokenCost?.minus(fee!);
    setProtocolFee(fee!);
    setEarnings(earnings!);
    setFeePercentage((100 * Number(paymentToken?.feePercentage)) / FEE_PRECISION);
  };

  const handleConfirmListing = async () => {
    if (selectedProperty === null) {
      return;
    }

    setListDisabled(true);

    let metaverseRegistry = '';
    let id = '';

    if (selectedProperty) {
      metaverseRegistry = selectedProperty?.contractAddress;
      id = selectedProperty.id;
    }

    if (!metaverseRegistry || !id) {
      return;
    }

    try {
      setShowSignModal(true);

      const txReceipt = await landWorksContract
        ?.list(
          selectedMetaverse,
          metaverseRegistry,
          id,
          minPeriod,
          maxPeriod,
          maxFutureTime,
          paymentToken.id,
          pricePerSecond.toFixed(0),
          (txHash) => {
            addListingTransaction(id, txHash);

            setListModalMessage(MineTransactionMessage);
          }
        )
        .then((txReceipt) => {
          return txReceipt;
        });

      setListedPropertyId(txReceipt.events['List'].returnValues[0]);

      setShowApproveModal(false);
      setShowSignModal(false);
      setShowSuccessModal(true);
      setListDisabled(false);
    } catch (e) {
      setShowSignModal(false);
      setListDisabled(false);
      showToastNotification(ToastType.Error, 'There was an error while listing the property.');
      deleteListingTransaction(id);
      console.log(e);

      return;
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const retrieveLandIds = (estate: any) => estate.landIds.landIds;

  const decodeXYForLand = (landId: BigNumber) => landRegistryContract?.getTokenData(landId);

  const getLandsForEstate = async (estate: DecentralandNFT) => {
    const landIds = retrieveLandIds(estate);
    const landPromises: Promise<DecentralandNFT>[] = landIds.map((landId: BigNumber) => decodeXYForLand(landId));
    let landsForEstate: DecentralandNFT[] = [];
    const values = await Promise.allSettled(landPromises);
    values.forEach((v) => {
      if (v.status === 'fulfilled') {
        landsForEstate = [...landsForEstate, v.value];
      }
    });
    return landsForEstate;
  };

  const getLandsForEstates = async (estates: DecentralandNFT[]) => {
    let allLandsForEstates: DecentralandNFT[] = [];
    const values = await Promise.allSettled(estates.map((e: DecentralandNFT) => getLandsForEstate(e)));
    values.forEach((v) => {
      if (v.status === 'fulfilled') {
        allLandsForEstates = [...allLandsForEstates, ...v.value];
      }
    });
    return allLandsForEstates;
  };

  const getUserNfts = async () => {
    if (!walletCtx.account) {
      setTimeout(() => setLoading(false), 1000);
      return;
    }

    try {
      const lands = await landRegistryContract?.getUserData(walletCtx.account);
      const estates = (await estateRegistryContract?.getUserData(walletCtx.account)).filter(
        (e: DecentralandNFT) => e.size > 0
      );
      const cryptoVoxels = await cryptoVoxelsContract?.getUserData(walletCtx.account);
      const landsForEstates = await getLandsForEstates(estates);
      setEstateGroup(landsForEstates);
      setAssetProperties(lands);
      setAssetEstates(estates);
      if (cryptoVoxels) {
        const parsedVoxels = await parseVoxelsAsset(cryptoVoxels);

        setCryptoVoxelParcels(parsedVoxels);
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const getPaymentTokens = async () => {
    const tokens = await fetchTokenPayments();
    setPaymentTokens(tokens);
    if (tokens.length > 0) {
      setPaymentToken(tokens[0]);
    }
  };

  const evaluateInput = () => {
    const noMinPeriod = !minPeriod && isMinPeriodSelected;
    const minPeriodLessMaxPeriod = minPeriod?.gt(maxPeriod);
    // lte - LessThanOrEqualTo
    const minPeriodIsLTE = minPeriod?.lte(ZERO_BIG_NUMBER);
    const noMaxPeriod = !maxPeriod && isMaxPeriodSelected;
    const maxPeriodLessMaxFutureTime = maxPeriod?.gt(maxFutureTime);
    const maxPeriodIsLTE = maxPeriod?.lte(ZERO_BIG_NUMBER);
    const pricePerSecondisLTE = pricePerSecond.lte(ZERO_BIG_NUMBER);
    const pricePerSecondEqualZero = pricePerSecond.toFixed(0) === '0';

    const noErrors =
      !noMinPeriod &&
      !minPeriodLessMaxPeriod &&
      !noMaxPeriod &&
      !maxPeriodLessMaxFutureTime &&
      !pricePerSecondisLTE &&
      !maxPeriodIsLTE &&
      !minPeriodIsLTE &&
      !pricePerSecondEqualZero &&
      maxFutureTime;

    if (noMinPeriod) {
      setMinError('Min period must be set');
    } else if (minPeriodLessMaxPeriod) {
      setMinError('Min period should be equal or smaller than Max period');
    } else if (minPeriodIsLTE) {
      setMinError('Min period cannot be negative or equal zero');
    } else {
      setMinError('');
    }

    if (noMaxPeriod) {
      setMaxError('Max period must be set');
    } else if (maxPeriodLessMaxFutureTime) {
      setMaxError('Max period should be equal or smaller than Max rent queue');
    } else if (maxPeriodIsLTE) {
      setMaxError('Max period cannot be negative or equal zero');
    } else {
      setMaxError('');
    }

    if (!maxFutureTime) {
      setMaxFutureError('Max rent queue must be set');
    } else if (maxFutureTime.lte(ZERO_BIG_NUMBER)) {
      setMaxFutureError('Max rent queue cannot be negative or equal zero');
    } else {
      setMaxFutureError('');
    }

    if (tokenCost) {
      if (pricePerSecondisLTE) {
        setPriceError('Price per second cannot be negative or equal zero');
      } else if (pricePerSecondEqualZero) {
        setPriceError('Price per second equals to zero');
      } else {
        setPriceError('');
      }
    } else {
      setPriceError('');
    }

    if (noErrors && approveDisabled) {
      setListDisabled(false);
    } else {
      setListDisabled(true);
    }
  };

  const evaluateSelectedProperty = async () => {
    if (selectedProperty === null) {
      return;
    }
    let isApproved = false;
    setApproveDisabled(false);

    if (isDecentraland) {
      if ((selectedProperty as DecentralandNFT).isLAND) {
        isApproved = await landRegistryContract?.isApprovedForAll(config.contracts.landworksContract)!;
      } else {
        isApproved = await estateRegistryContract?.isApprovedForAll(config.contracts.landworksContract)!;
      }
    } else if (isVoxels) {
      isApproved = await cryptoVoxelsContract?.isApprovedForAll(config.contracts.landworksContract)!;
    }

    if (isApproved) {
      setApproveDisabled(true);
    } else {
      setApproveDisabled(false);
    }
  };

  const getUsdPrice = (symbol: string, price: string | number | BigNumber) => {
    const ethPrice = new BigNumber(getTokenPrice(symbol) || '0');
    const ethToUsdPrice = ethPrice.multipliedBy(price);
    setUsdPrice(ethToUsdPrice.toFixed(2).replace(/\.00$/, ''));
  };

  useEffect(() => {
    setLoading(true);
    getUserNfts();
    getPaymentTokens();
  }, [walletCtx.account]);

  useLayoutEffect(() => {
    evaluateInput();
  }, [approveDisabled, minPeriod, maxPeriod, maxFutureTime, paymentToken, selectedProperty, pricePerSecond]);

  useEffect(() => {
    calculateTotalAndFeePrecision();
    // calculatePricePerSecond();
    getUsdPrice(paymentToken.symbol, tokenCost?.toNumber() || 0);
  }, [paymentToken, tokenCost]);

  useEffect(() => {
    evaluateSelectedProperty();
  }, [selectedProperty]);

  useEffect(() => {
    if (asset) {
      return;
    }

    setSelectedProperty(null);
  }, [selectedMetaverse, asset]);

  useEffect(() => {
    setLandType(0);
  }, [selectedMetaverse]);

  const onChangeType = (value: number) => {
    setLandType(value);
  };

  const showPriceInUsd = `$${usdPrice}`;

  const handleCoords = () => {
    if (selectedProperty && isVoxels && (selectedProperty as CryptoVoxelNFT)) {
      return <>{selectedProperty.place}</>;
    }
    if (selectedProperty && isDecentraland && (selectedProperty as DecentralandNFT).isLAND) {
      return <SelectedFeatureCoords asset={selectedProperty as DecentralandNFT} isListing={true} />;
    } else if (selectedProperty && isDecentraland) {
      return (
        <SelectedFeatureCoords asset={selectedProperty as DecentralandNFT} isListing={true} estateLands={estateGroup} />
      );
    }
  };

  const filteredVoxels = useMemo(() => {
    if (landType === 0) {
      return cryptoVoxelParcels;
    }

    return cryptoVoxelParcels.filter(
      (l) => l.type?.toLowerCase() === listTypes[selectedMetaverse][landType].label.toLowerCase()
    );
  }, [cryptoVoxelParcels, landType]);

  const filteredDecentralandProperties = useMemo(() => {
    if (landType === 1) {
      return assetProperties;
    } else if (landType === 2) {
      return assetEstates;
    }

    return [...assetProperties, ...assetEstates];
  }, [landType, assetProperties, assetEstates]);

  const handleNextButtonClick = async () => {
    if (step.id === StepId.Advertisement) {
      setIsCreatingAssetAdvertisement(true);

      try {
        await refreshWeb3Token(walletCtx?.account || '', walletCtx.provider);
        await createAssetAdvertisement({
          hasAgreedForAds: isLandProvidedForAdvertisement,
          metaverseRegistry: selectedProperty!.contractAddress,
          metaverseAssetId: selectedProperty!.id,
        });
        setActiveStep((prev) => prev + 1);
      } catch (e) {
        if (e instanceof Error) {
          showToastNotification(ToastType.Error, e.message);
        }

        console.error(e);
      } finally {
        if (getIsMounted()) {
          setIsCreatingAssetAdvertisement(false);
        }
      }
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const assets =
    {
      [METAVERSES.Decentraland]: filteredDecentralandProperties,
      [METAVERSES.Voxels]: filteredVoxels,
    }[selectedMetaverse] || [];

  const steps: {
    id: StepId;
    label: string;
    title?: string;
    subtitle?: string;
    warning?:
      | string
      | {
          title: string;
          content: string;
        };
  }[] = useMemo(() => {
    return [
      ...(!asset
        ? [
            {
              id: StepId.Asset,
              label: 'Choose Land',
            },
          ]
        : []),
      {
        id: StepId.RentPeriod,
        title: 'Choose rent period',
        label: 'Rent Period',
        subtitle: 'Select the wanted rent period for this property.',
        warning: {
          title: 'Keep in mind',
          content:
            'Once you list your property you can edit the entered rent period but you’ll have to pay a network fee.',
        },
      },
      {
        id: StepId.RentPrice,
        title: 'Select Rent Price',
        label: 'Rent Price',
        subtitle: 'Select the wanted rent price for this property.',
        warning: {
          title: 'Keep in mind',
          content:
            'Once you list your property you can edit the entered rent price but you’ll have to pay a network fee.',
        },
      },
      // NOTE: we should probably add flag like `hadAdvertizement` in metaverse object
      ...(selectedMetaverse === METAVERSES.Decentraland
        ? [
            {
              id: StepId.Advertisement,
              title: 'Advertise',
              label: 'Advertise',
              warning: 'Please note that a wallet signature will popup in order to confirm your choice.',
            },
          ]
        : []),
      {
        id: StepId.Summary,
        label: 'Summary',
        title: 'Listing Summary',
        warning: {
          title: 'Keep in mind',
          content: 'There is a network fee in order to list the property.',
        },
      },
    ];
  }, [selectedMetaverse]);

  const step = steps[activeStep];
  const { warning } = step;

  return (
    <section className="list-view">
      <Stack height={1}>
        <Typography variant="h3" mb={6} textAlign="center">
          List Property
        </Typography>

        <Stepper sx={{ width: 1, maxWidth: 736, mb: 6, mx: 'auto' }} activeStep={activeStep}>
          {steps.map(({ label }) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {(step.title || step.subtitle) && (
          <Stack alignItems="center" textAlign="center">
            <Typography variant="h3" component="h4">
              {activeStep + 1}. {step.title}
            </Typography>

            {step.subtitle && (
              <Typography fontWeight={400} mt={1}>
                {step.subtitle}
              </Typography>
            )}
          </Stack>
        )}

        <Stack flexGrow={1} minHeight={0} mb={4}>
          {step.id === StepId.Asset && (
            <>
              <Box display="flex" gap={4} mb={2}>
                <MetaverseSelect width="290px" />

                <Box>
                  <ControlledSelect
                    width="190px"
                    value={landType}
                    onChange={onChangeType}
                    options={listTypes[selectedMetaverse]}
                  />
                </Box>
              </Box>

              <Stack height={1} overflow="auto" p={2} mx={-2}>
                {loading && <LoadingAssetList />}

                {!loading &&
                  (assets.length > 0 ? (
                    <AssetList
                      assets={assets}
                      selectedAssetId={selectedProperty?.id}
                      onSelectAsset={handlePropertyChange}
                    />
                  ) : (
                    <Stack flexGrow={1} justifyContent="center" alignItems="center">
                      <Box component="img" src={landNotFoundImageSrc} width={{ xs: 128, xxl: 170 }} mb={5} />
                      <Typography variant="h1" component="p" mb={2}>
                        Land not found
                      </Typography>

                      <Typography variant="subtitle2">It seems that you don’t have any land in your wallet.</Typography>
                    </Stack>
                  ))}
              </Stack>
            </>
          )}

          {step.id === StepId.RentPeriod && (
            <Box
              alignSelf="center"
              maxWidth={{ xxl: 350 }}
              mt={{ xs: 4, xxl: 6 }}
              width={1}
              height={1}
              overflow="auto"
              px={2}
              mx={-2}
            >
              <RentPeriod
                isMinPeriodSelected={isMinPeriodSelected}
                handleMinCheckboxChange={handleMinCheckboxChange}
                handleMinSelectChange={handleMinSelectChange}
                handleMinInputChange={handleMinInputChange}
                isMaxPeriodSelected={isMaxPeriodSelected}
                handleMaxCheckboxChange={handleMaxCheckboxChange}
                handleMaxSelectChange={handleMaxSelectChange}
                handleMaxInputChange={handleMaxInputChange}
                handleAtMostInputChange={handleAtMostInputChange}
                handleAtMostSelectChange={handleAtMostSelectChange}
                minOptions={MinRentPeriodOptions}
                maxOptions={MaxRentPeriodOptions}
                atMostOptions={AtMostRentPeriodOptions}
                minOptionsValue={minPeriodSelectedOption.value}
                maxOptionsValue={maxPeriodSelectedOption.value}
                atMostOptionsValue={maxFutureSelectedOption.value}
                minInputValue={minInput?.toNumber()}
                maxInputValue={maxInput?.toNumber()}
                atMostInputValue={maxFutureTimeInput?.toNumber()}
                minError={minError}
                maxError={maxError}
                atMostError={maxFutureError}
                withoutSwitch
                layout="adaptive"
              />
            </Box>
          )}

          {step.id === StepId.RentPrice && (
            <Stack mx="auto" maxWidth={350} width={1}>
              <RentPrice
                handleCostEthChange={handleCostEthChange}
                handleCurrencyChange={handleCurrencyChange}
                showPriceInUsd={showPriceInUsd}
                paymentToken={paymentToken}
                earnings={earnings}
                protocolFee={protocolFee}
                feePercentage={feePercentage}
                options={currencyData}
                optionsValue={selectedCurrency}
                inputValue={tokenCost ? tokenCost.toNumber() : ''}
                error={priceError}
              />
            </Stack>
          )}
          {step.id === StepId.Advertisement && (
            <Stack width={1} maxWidth={670} mt={{ xs: 4, xxl: 10 }} mx="auto">
              <Grid container spacing={5}>
                <Grid item xs={6}>
                  <Image
                    width={640}
                    height={480}
                    src={listingAdImgSrc}
                    sx={{
                      width: 1,
                      borderRadius: '8px',
                    }}
                  />
                </Grid>
                <Grid item xs={6} display="flex" alignItems="center">
                  <Typography component="p" color={THEME_COLORS.grey03} variant="caption" textAlign="left">
                    We have partnered up with{' '}
                    <ExternalLink variant="link2" href="https://precisionx.com/en/">
                      PrecisionX
                    </ExternalLink>{' '}
                    to allow for ads to be displayed on your land until it gets rented. By allowing your plot to be used
                    for ads, you will be rewarded 0.025 USDC (0.05 USDC if you own a{' '}
                    <ExternalLink variant="link2" href="https://opensea.io/collection/sharded-minds">
                      Sharded Mind
                    </ExternalLink>{' '}
                    NFT) for each unique view on the ad. Full info on how the ads work can be found{' '}
                    <ExternalLink
                      variant="link2"
                      href="https://medium.com/enterdao/new-passive-income-stream-for-metaverse-landlords-8c72c68c7bb5"
                    >
                      here
                    </ExternalLink>
                    .
                    <br />
                    <br />
                    Think of it as providing your land to the an advertiser until it gets rented!
                  </Typography>
                </Grid>
              </Grid>

              <Typography
                variant="button"
                component="label"
                display="flex"
                alignItems="center"
                minHeight={45}
                borderRadius="10px"
                bgcolor="rgba(93, 143, 240, 0.12)"
                p="12px"
                mt={8}
                sx={{
                  cursor: 'pointer',
                }}
              >
                <Checkbox
                  checked={isLandProvidedForAdvertisement}
                  onChange={(e, value) => setIsLandProvidedForAdvertisement(value)}
                />
                Provide land for advertising purposes until it gets rented.
              </Typography>
            </Stack>
          )}
          {step.id === StepId.Summary && (
            <Box maxWidth={630} alignSelf="center" mt={{ xs: 4, xxl: 8 }}>
              <Grid container wrap="nowrap" p="8px" className="summaryWrapper" flexDirection="row">
                {selectedProperty && (
                  <>
                    <SelectedListCard
                      src={selectedProperty.image}
                      name={selectedProperty.name}
                      withoutInfo
                      coordinatesChild={handleCoords()}
                    />

                    <ListNewSummary
                      isAdvertisementEnabled={isLandProvidedForAdvertisement}
                      minPeriodSelectedOption={minPeriodSelectedOption.label}
                      maxPeriodSelectedOption={maxPeriodSelectedOption.label}
                      maxFutureSelectedOption={maxFutureSelectedOption.label}
                      minRentPeriod={minPeriod}
                      maxRentPeriod={maxPeriod}
                      maxFuturePeriod={maxFutureTime}
                      rentPrice={tokenCost || BigNumber.ZERO}
                      paymentToken={paymentToken}
                      feeText="There is small fee upon listing the property."
                      withoutText
                      metaverse={selectedMetaverse}
                      name={selectedProperty.name}
                      coordinatesChild={handleCoords()}
                      isEstate={!(selectedProperty as DecentralandNFT).isLAND}
                    />
                  </>
                )}
              </Grid>
            </Box>
          )}
        </Stack>

        {warning && (
          <Grid textAlign="left" className="warning-info" mb={{ xs: 2, xxl: 4 }} mx="auto">
            <WarningIcon style={{ width: 20, height: 20 }} />
            <Grid item>
              {typeof warning === 'string' ? (
                <Typography variant="subtitle2">{warning}</Typography>
              ) : (
                <>
                  <Typography display={{ xs: 'none', xxl: 'block' }} variant="h4">
                    {warning.title}
                  </Typography>
                  <Typography variant="subtitle2">{warning.content}</Typography>
                </>
              )}
            </Grid>
          </Grid>
        )}

        <hr className="divider" />

        {step.id !== StepId.Summary && (
          <Grid container direction="row" alignItems="center" justifyContent="space-between">
            {step.id === StepId.Asset ? (
              <Typography variant="body2" color="var(--theme-subtle-color)">
                Found in Wallet{' '}
                <Typography component="span" variant="inherit" color="var(--theme-light-color)">
                  {assets.length} Lands
                </Typography>
              </Typography>
            ) : (
              <Button
                variant="secondary"
                disabled={isCreatingAssetAdvertisement}
                btnSize="medium"
                onClick={() => setActiveStep((prev) => prev - 1)}
              >
                Back
              </Button>
            )}
            <Button
              disabled={
                selectedProperty === null ||
                (step.id === StepId.RentPrice && (Boolean(priceError.length) || !tokenCost)) ||
                isCreatingAssetAdvertisement
              }
              variant="gradient"
              btnSize="medium"
              onClick={handleNextButtonClick}
            >
              {isCreatingAssetAdvertisement ? 'Loading...' : 'Next Step'}
            </Button>
          </Grid>
        )}
        {step.id === StepId.Summary && (
          <Grid container justifyContent="space-between">
            <Button variant="secondary" btnSize="medium" onClick={() => setActiveStep((prev) => prev - 1)}>
              Back
            </Button>
            <Grid alignItems="center" justifyContent="space-between">
              <Button
                disabled={approveDisabled}
                variant="gradient"
                btnSize="medium"
                onClick={handleApprove}
                style={{ marginRight: 15 }}
              >
                Approve
              </Button>
              <Button disabled={listDisabled} variant="gradient" btnSize="medium" onClick={handleConfirmListing}>
                Confirm Listing
              </Button>
            </Grid>
          </Grid>
        )}
        <TxModal
          textMessage="Approving..."
          showModal={showApproveModal}
          handleClose={() => {
            setShowApproveModal(false);
          }}
        />
        <TxModal
          textMessage={listModalMessage}
          showModal={showSignModal}
          handleClose={() => {
            setShowSignModal(false);
          }}
        />
        {showSuccessModal && (
          <SuccessModal
            listedPropertyId={listedPropertyId}
            metaverseRegistry={selectedProperty?.contractAddress || ''}
            showShareButton={true}
            showModal={showSuccessModal}
            handleClose={() => {
              localStorage.setItem('join_prompt', 'true');
              setShowSuccessModal(false);
              closeModal && closeModal();
              history.push(getMyPropertiesPath(MY_PROPERTIES_ROUTE_TABS.listed));
              setJoinPromptOpen(true);
            }}
          />
        )}
      </Stack>
    </section>
  );
};

export default ListNewProperty;
