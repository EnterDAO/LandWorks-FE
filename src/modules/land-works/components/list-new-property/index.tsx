/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import { ZERO_BIG_NUMBER, getNonHumanValue } from 'web3/utils';

import { Box, Button, ControlledSelect, Grid, Typography } from 'design-system';
import { WarningIcon } from 'design-system/icons';
import CustomizedSteppers from 'design-system/Stepper';
import { ToastType, showToastNotification } from 'helpers/toast-notifcations';
import { BaseNFT, CryptoVoxelNFT, DecentralandNFT, Option } from 'modules/interface';
import {
  EstateListingCard,
  LandListingCard,
  VoxelListingCard,
} from 'modules/land-works/components/land-works-list-card';
import ListNewSummary from 'modules/land-works/components/land-works-list-new-summary';
import SelectedListCard from 'modules/land-works/components/land-works-selected-feature-card';
import { addIconToMetaverse, currencyData } from 'modules/land-works/components/lands-explore-filters/filters-data';
import RentPeriod from 'modules/land-works/components/lands-input-rent-period';
import RentPrice from 'modules/land-works/components/lands-input-rent-price';
import { SuccessModal, TxModal } from 'modules/land-works/components/lands-list-modal';
import { useContractRegistry } from 'modules/land-works/providers/contract-provider';
import { useGeneral } from 'providers/general-provider';
import { getTokenPrice } from 'providers/known-tokens-provider';

import config from '../../../../config';
import { useWallet } from '../../../../wallets/wallet';
import { PaymentToken, fetchMetaverses, fetchTokenPayments } from '../../api';
import { useLandworks } from '../../providers/landworks-provider';
import ListingCardSkeleton from '../land-listing-skeleton';
import SelectedFeatureCoords from '../land-works-selected-feature-coords';

import { parseVoxelsAsset } from 'modules/land-works/utils';
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
  listNotificationMessage,
  listTypes,
} from 'modules/land-works/constants';

import './index.scss';

const SignTransactionMessage = 'Signing transaction...';
const MineTransactionMessage = 'Listing property...';

interface IProps {
  closeModal?: () => void;
}

const ListNewProperty: React.FC<IProps> = ({ closeModal }) => {
  const { setJoinPromptOpen } = useGeneral();
  const walletCtx = useWallet();
  const landworks = useLandworks();
  const registry = useContractRegistry();
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

  const [selectedProperty, setSelectedProperty] = useState(null as BaseNFT | null);

  const [assetProperties, setAssetProperties] = useState<DecentralandNFT[]>([]);
  const [assetEstates, setAssetEstates] = useState<DecentralandNFT[]>([]);
  const [estateGroup, setEstateGroup] = useState<DecentralandNFT[]>([]);
  const [cryptoVoxelParcels, setCryptoVoxelParcels] = useState<CryptoVoxelNFT[]>([]);

  const [infoMessage, setInfoMessage] = useState<string>('');
  const [paymentTokens, setPaymentTokens] = useState([] as PaymentToken[]);
  const [paymentToken, setPaymentToken] = useState({} as PaymentToken);
  const [selectedCurrency, setSelectedCurrency] = useState(1);

  const [tokenCost, setTokenCost] = useState(new BigNumber(0));
  const [earnings, setEarnings] = useState(ZERO_BIG_NUMBER);
  const [protocolFee, setProtocolFee] = useState(ZERO_BIG_NUMBER);
  const [feePercentage, setFeePercentage] = useState(0);
  const [pricePerSecond, setPricePerSecond] = useState(ZERO_BIG_NUMBER);
  const [priceError, setPriceError] = useState('');

  const [approveDisabled, setApproveDisabled] = useState(false);
  const [listDisabled, setListDisabled] = useState(true);
  const [usdPrice, setUsdPrice] = useState('0');

  const [loading, setLoading] = useState(false);
  const [availableMetaverses, setAvailableMetaverses] = useState<Option[]>([]);
  const [selectedMetaverse, setSelectedMetaverse] = useState(
    +sessionStorageHandler('get', 'general', 'metaverse') || 1
  );
  const [activeStep, setActiveStep] = useState(0);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showSignModal, setShowSignModal] = useState(false);
  const [listedPropertyId, setListedPropertyId] = useState('');
  const [landType, setLandType] = useState(0);

  const [filteredVoxels, setFilteredVoxels] = useState<CryptoVoxelNFT[]>([]);

  const [listModalMessage, setListModalMessage] = useState(SignTransactionMessage);

  const handlePropertyChange = (selectedLand: BaseNFT) => {
    setSelectedProperty(selectedLand);
  };

  useEffect(() => {
    fetchMetaverses().then((res) => setAvailableMetaverses(addIconToMetaverse(res)));
  }, []);

  useEffect(() => {
    setInfoMessage(listNotificationMessage[activeStep]);
  }, [activeStep]);

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
    const value = BigNumber.from(e.target.value || '');
    const zeroValue = e.target.value === '';
    const dynamicValue = zeroValue ? BigNumber.from(0) : value!;
    setTokenCost(dynamicValue!);
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

  const calculatePricePerSecond = () => {
    const pricePerSecond = getNonHumanValue(tokenCost, paymentToken.decimals).dividedBy(DAY_IN_SECONDS);
    setPricePerSecond(pricePerSecond);
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
      const txReceipt = await landWorksContract?.list(
        selectedMetaverse,
        metaverseRegistry,
        id,
        minPeriod,
        maxPeriod,
        maxFutureTime,
        paymentToken.id,
        pricePerSecond.toFixed(0),
        () => {
          setListModalMessage(MineTransactionMessage);
        }
      );
      localStorage.setItem('LISTING_IN_PROGRESS', id);
      setListedPropertyId(txReceipt.events['List'].returnValues[0]);

      setShowApproveModal(false);
      setShowSignModal(false);
      setShowSuccessModal(true);
      setListDisabled(false);
    } catch (e) {
      setShowSignModal(false);
      setListDisabled(false);
      showToastNotification(ToastType.Error, 'There was an error while listing the property.');
      console.log(e);
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
      const estates = await estateRegistryContract?.getUserData(walletCtx.account);
      const cryptoVoxels = await cryptoVoxelsContract?.getUserData(walletCtx.account);
      const landsForEstates = await getLandsForEstates(estates);
      setEstateGroup(landsForEstates);
      setAssetProperties(lands);
      setAssetEstates(estates);
      if (cryptoVoxels) {
        const parsedVoxels = await parseVoxelsAsset(cryptoVoxels);
        setCryptoVoxelParcels(parsedVoxels);
        setFilteredVoxels(parsedVoxels);
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

    if (pricePerSecondisLTE) {
      setPriceError('Price per second cannot be negative or equal zero');
    } else if (pricePerSecondEqualZero) {
      setPriceError('Price per second equals to zero');
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

  useEffect(() => {
    evaluateInput();
  }, [approveDisabled, minPeriod, maxPeriod, maxFutureTime, paymentToken, selectedProperty, pricePerSecond]);

  useEffect(() => {
    calculateTotalAndFeePrecision();
    calculatePricePerSecond();
    getUsdPrice(paymentToken.symbol, tokenCost?.toNumber() || 0);
  }, [paymentToken, tokenCost]);

  useEffect(() => {
    evaluateSelectedProperty();
  }, [selectedProperty]);

  const onChangeMetaverse = (value: number) => {
    setSelectedMetaverse(value);
  };

  const onChangeType = (value: number) => {
    setLandType(value);
  };

  const showPriceInUsd = `$${usdPrice}`;

  const steps = ['Choose Land', 'Rent Period', 'Rent Price', 'Summary'];

  const getPropertyCountForMetaverse = () => {
    if (selectedMetaverse === 1) {
      return landType === 0
        ? assetProperties.length + assetEstates.length
        : landType === 1
        ? assetProperties.length
        : assetEstates.length;
    } else {
      return cryptoVoxelParcels.length;
    }
  };

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

  const onTypeChange = () => {
    if (landType === 0) {
      setFilteredVoxels(cryptoVoxelParcels);
    }
    if (selectedMetaverse === 2 && landType !== 0) {
      setFilteredVoxels(
        cryptoVoxelParcels.filter(
          (l) => l.type?.toLowerCase() === listTypes[selectedMetaverse][landType].label.toLowerCase()
        )
      );
    }
  };

  useEffect(() => {
    onTypeChange();
  }, [landType]);

  return (
    <section className="list-view">
      <Grid container direction="column" alignItems="flex-start" justifyContent="space-between" height={'100%'}>
        <Box marginBottom="10px" fontSize="25px" fontWeight={700} textAlign="center" width="100%" color="#F8F8FF">
          List Property
        </Box>
        <Grid container direction="row" alignItems="center" justifyContent="center" width={600} alignSelf="center">
          <CustomizedSteppers steps={steps} activeStep={activeStep} />
        </Grid>
        {activeStep === 0 && (
          <Grid height={'530px'} overflow="auto" display="block" container>
            <Grid container margin={'40px 0 10px'}>
              <ControlledSelect
                width={'182px'}
                value={selectedMetaverse}
                onChange={onChangeMetaverse}
                options={availableMetaverses}
              />
              <Box style={{ marginLeft: 20 }}>
                <ControlledSelect
                  width={'182px'}
                  value={landType}
                  onChange={onChangeType}
                  options={listTypes[selectedMetaverse]}
                />
              </Box>
            </Grid>

            {loading ? (
              <ListingCardSkeleton />
            ) : (
              <Grid container flexDirection="row" wrap="wrap" className="properties">
                {selectedMetaverse === 1 && (
                  <>
                    {(landType === 0 || landType === 1) &&
                      assetProperties.map((land) => (
                        <Grid key={land.id} item xs={3} margin={'0 0 10px'}>
                          <LandListingCard
                            isSelectedProperty={land.name === selectedProperty?.name}
                            handleClick={handlePropertyChange}
                            key={land.name}
                            land={land}
                          />
                        </Grid>
                      ))}
                    {(landType === 0 || landType === 2) &&
                      assetEstates.map((land) => (
                        <Grid key={land.id} item xs={3} margin={'0 0 10px'}>
                          <EstateListingCard
                            isSelectedProperty={land.name === selectedProperty?.name}
                            handleClick={handlePropertyChange}
                            key={land.name}
                            land={land}
                            landsContent={estateGroup}
                          />
                        </Grid>
                      ))}
                  </>
                )}
                {selectedMetaverse === 2 && (
                  <>
                    {filteredVoxels.map((parcel) => (
                      <Grid key={parcel.id} item xs={3} margin={'0 0 10px'}>
                        <VoxelListingCard
                          isSelectedProperty={parcel.name === selectedProperty?.name}
                          handleClick={handlePropertyChange}
                          key={parcel.name}
                          land={parcel}
                        />
                      </Grid>
                    ))}
                  </>
                )}
              </Grid>
            )}
          </Grid>
        )}

        {activeStep === 1 && (
          <Grid height={'420px'} overflow="auto" container columnSpacing={5} justifyContent="center" mt={4}>
            <Grid item xs={6}>
              <Grid
                container
                flexDirection="column"
                className="inputSection"
                minHeight={420}
                maxHeight={450}
                overflow="auto"
              >
                <Box margin="15px 0" fontSize="25px" fontWeight={700} textAlign="center" width="100%" color="#F8F8FF">
                  2. Choose rent period
                </Box>
                <Typography>Select the wanted rent period for this property.</Typography>
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
                />
              </Grid>
            </Grid>
          </Grid>
        )}
        {activeStep === 2 && (
          <Grid height={'420px'} overflow="auto" container columnSpacing={5} justifyContent="center" mt={4}>
            <Grid
              item
              xs={6}
              justifyContent="center"
              flexDirection="column"
              className="inputSection"
              maxHeight={450}
              overflow="auto"
            >
              <Box margin="15px 0" fontSize="25px" fontWeight={700} textAlign="center" width="100%" color="#F8F8FF">
                3. Select Rent Price
              </Box>
              <Typography>Select the wanted rent price for this property.</Typography>
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
                inputValue={tokenCost.toNumber()}
                error={priceError}
              />
            </Grid>
          </Grid>
        )}
        {activeStep === 3 && (
          <Grid height={'420px'} overflow="auto" container justifyContent="center">
            <Box
              margin="30px 0 15px 0"
              fontSize="25px"
              fontWeight={700}
              textAlign="center"
              width="100%"
              color="#F8F8FF"
            >
              5. Listing Summary
            </Box>
            <Grid item xs={10}>
              <Grid container wrap="nowrap" className="summaryWrapper" flexDirection="row">
                {selectedProperty && (
                  <>
                    <SelectedListCard
                      src={selectedProperty.image}
                      name={selectedProperty.name}
                      withoutInfo
                      coordinatesChild={handleCoords()}
                    />
                    <ListNewSummary
                      minPeriodSelectedOption={minPeriodSelectedOption.label}
                      maxPeriodSelectedOption={maxPeriodSelectedOption.label}
                      maxFutureSelectedOption={maxFutureSelectedOption.label}
                      minRentPeriod={minPeriod}
                      maxRentPeriod={maxPeriod}
                      maxFuturePeriod={maxFutureTime}
                      rentPrice={tokenCost}
                      paymentToken={paymentToken}
                      feeText="There is small fee upon listing the property."
                      withoutText
                      metaverse={availableMetaverses[selectedMetaverse - 1]}
                      name={selectedProperty.name}
                      coordinatesChild={handleCoords()}
                      isEstate={!(selectedProperty as DecentralandNFT).isLAND}
                    />
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
        )}
        {infoMessage.length ? (
          <Grid className="warning-info">
            <WarningIcon />
            <Grid item>
              <Typography variant="h4">Keep in mind</Typography>
              <Typography variant="subtitle2">{infoMessage}</Typography>
            </Grid>
          </Grid>
        ) : null}
        <hr className="divider" />

        {activeStep < 3 && (
          <Grid container direction="row" alignItems="center" justifyContent="space-between">
            {activeStep === 0 ? (
              <Button
                sx={{
                  cursor: 'default',
                  '&:hover': {
                    '&::before': {
                      backgroundColor: 'var(--theme-grey200-color) !important',
                    },
                  },
                }}
                variant="secondary"
                btnSize="medium"
              >
                Found in wallet ({getPropertyCountForMetaverse()})
              </Button>
            ) : (
              <Button variant="secondary" btnSize="medium" onClick={() => setActiveStep((prev) => prev - 1)}>
                Back
              </Button>
            )}
            <Button
              disabled={selectedProperty === null}
              variant="gradient"
              btnSize="medium"
              onClick={() => setActiveStep((prev) => prev + 1)}
            >
              Next Step
            </Button>
          </Grid>
        )}
        {activeStep === 3 && (
          <Grid maxHeight={'50vh'} overflow="auto" container justifyContent="space-between" mt={4}>
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
            showShareButton={true}
            showModal={showSuccessModal}
            handleClose={() => {
              sessionStorageHandler('set', 'general', 'metaverse', selectedMetaverse);
              localStorage.setItem('join_prompt', 'true');
              setShowSuccessModal(false);
              closeModal && closeModal();
              history.push('/my-properties');
              setJoinPromptOpen(true);
            }}
          />
        )}
      </Grid>
    </section>
  );
};

export default ListNewProperty;
