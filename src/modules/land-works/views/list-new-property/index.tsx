/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  AtMostRentPeriodOptions,
  DEFAULT_FUTURE_PERIOD,
  DEFAULT_MAX_PERIOD,
  DEFAULT_MIN_PERIOD,
  FEE_PRECISION,
  MaxRentPeriodOptions,
  MinRentPeriodOptions,
} from 'constants/modules';
import BigNumber from 'bignumber.js';
import { ZERO_BIG_NUMBER, getNonHumanValue } from 'web3/utils';

import { Button, ControlledSelect, Grid } from 'design-system';
import CustomizedSteppers from 'design-system/Stepper';
import { DecentralandNFT, Option } from 'modules/interface';
import LandWorksListCard from 'modules/land-works/components/land-works-list-card';
import DropdownSection from 'modules/land-works/components/land-works-list-input-dropdown';
import ListNewSummary from 'modules/land-works/components/land-works-list-new-summary';
import SelectedListCard from 'modules/land-works/components/land-works-selected-feature-card';
import { currencyData, landsData } from 'modules/land-works/components/lands-explore-filters/filters-data';
import RentPeriod from 'modules/land-works/components/lands-input-rent-period';
import RentPrice from 'modules/land-works/components/lands-input-rent-price';
import ApproveModal from 'modules/land-works/components/lands-list-approve-modal';
import { getTokenPrice } from 'providers/known-tokens-provider';

import config from '../../../../config';
import { useWallet } from '../../../../wallets/wallet';
import { PaymentToken, fetchTokenPayments } from '../../api';
import EditFormCardSkeleton from '../../components/land-edit-form-loader-card';
import { useEstateRegistry } from '../../providers/decentraland/estate-registry-provider';
import { useLandRegistry } from '../../providers/decentraland/land-registry-provider';
import { useLandworks } from '../../providers/landworks-provider';

import { getTimeType, secondsToDuration } from 'utils';
import { DAY_IN_SECONDS, MINUTE_IN_SECONDS } from 'utils/date';

import './index.scss';

// import { getTimeType, secondsToDuration } from '../../../../utils';

const ListNewProperty: React.FC = () => {
  const walletCtx = useWallet();
  const landworks = useLandworks();
  const estateRegistry = useEstateRegistry();
  const landRegistry = useLandRegistry();
  // const history = useHistory();

  const { landWorksContract } = landworks;
  const { landRegistryContract } = landRegistry;
  const { estateRegistryContract } = estateRegistry;

  const [minPeriod, setMinPeriod] = useState(new BigNumber(MINUTE_IN_SECONDS));
  const [isMinPeriodSelected, setMinPeriodSelected] = useState(false);
  const [minInput, setMinInput] = useState(DEFAULT_MIN_PERIOD);
  const [minPeriodType, setMinPeriodType] = useState(BigNumber.from(MinRentPeriodOptions[0].value));
  const [minPeriodSelectedOption, setMinPeriodSelectedOption] = useState(MinRentPeriodOptions[0]); // Selected Option Value for the select menu

  const [maxPeriod, setMaxPeriod] = useState(DEFAULT_FUTURE_PERIOD);
  const [isMaxPeriodSelected, setMaxPeriodSelected] = useState(false);
  const [maxInput, setMaxInput] = useState(DEFAULT_MAX_PERIOD);
  const [maxPeriodType, setMaxPeriodType] = useState(BigNumber.from(MaxRentPeriodOptions[3].value));
  const [maxPeriodSelectedOption, setMaxPeriodSelectedOption] = useState(MaxRentPeriodOptions[3]); // Selected Option Value for the select menu

  const [maxFutureTime, setMaxFutureTime] = useState(DEFAULT_FUTURE_PERIOD);
  const [maxFutureTimeInput, setMaxFutureTimeInput] = useState(DEFAULT_MAX_PERIOD);
  const [maxFutureTimePeriod, setMaxFuturePeriodType] = useState(BigNumber.from(AtMostRentPeriodOptions[3].value));
  const [maxFutureSelectedOption, setMaxFutureSelectedOption] = useState(AtMostRentPeriodOptions[3]); // Selected Option Value for the select menu

  const [properties, setProperties] = useState<Option[]>([]);
  // const [initialProperty, setInitialProperty] = useState<Option>(properties[0]);
  const [selectedProperty, setSelectedProperty] = useState(null as DecentralandNFT | null);

  const [assetProperties, setAssetProperties] = useState<DecentralandNFT[]>([]);
  // const [initialAssetProperty, setInitialAssetProperty] = useState<DecentralandNFT>(DEFAULT_ASSET_PROPERTY);

  const [showRentPeriodInput, setShowRentPeriodInput] = useState(false);
  const [showRentCurrencyInput, setShowRentCurrencyInput] = useState(false);

  const [paymentTokens, setPaymentTokens] = useState([] as PaymentToken[]);
  const [paymentToken, setPaymentToken] = useState({} as PaymentToken);
  const [selectedCurrency, setSelectedCurrency] = useState(1);

  const [tokenCost, setTokenCost] = useState(new BigNumber(1));
  const [earnings, setEarnings] = useState(ZERO_BIG_NUMBER);
  const [protocolFee, setProtocolFee] = useState(ZERO_BIG_NUMBER);
  const [feePercentage, setFeePercentage] = useState(0);
  const [pricePerSecond, setPricePerSecond] = useState(ZERO_BIG_NUMBER);

  const [approveDisabled, setApproveDisabled] = useState(false);
  const [listDisabled, setListDisabled] = useState(true);
  const [usdPrice, setUsdPrice] = useState('0');

  const [errMessage, setErrMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedMetaverse, setSelectedMetaverse] = useState(1);
  //const [metaverse, setMetaverse] = useState(metaverseOptions[0]);
  const [activeStep, setActiveStep] = useState(0);
  const [showApproveModal, setShowApproveModal] = useState(false);

  // const handlePlaceChange = (newValue: SingleValue<Option>, actionMeta: ActionMeta<Option>) => {
  //   console.log(newValue, actionMeta);
  // };

  // const handlePropertyChange = (newValue: SingleValue<Option>) => {
  //   const property = newValue && JSON.parse(newValue.value as string);
  //   setSelectedProperty(property);

  //   const selectedProperty = assetProperties.find((p) => p.label === property.name);
  //   if (selectedProperty) {
  //     setInitialProperty(selectedProperty);
  //   }
  // };

  const handlePropertyChange = (selectedLand: DecentralandNFT) => {
    setSelectedProperty(selectedLand);
  };

  const handleMinCheckboxChange = (e: any) => {
    setMinPeriodSelected(e.target.checked);
    if (e.target.checked) {
      setMinPeriod(minInput?.multipliedBy(minPeriodType!));
    } else {
      // Reset to defaults
      setMinPeriod(DEFAULT_MIN_PERIOD);
      setMinInput(DEFAULT_MIN_PERIOD);
      setMinPeriodType(BigNumber.from(MinRentPeriodOptions[0].value));
      setMinPeriodSelectedOption(MinRentPeriodOptions[0]);
    }
  };

  const handleMinSelectChange = (value: number) => {
    const bigvalue = BigNumber.from(value);

    if (isMinPeriodSelected) {
      setMinPeriodType(bigvalue);

      const parsedDate = secondsToDuration(bigvalue?.toNumber()!);
      const { timeType } = getTimeType(parsedDate);
      const typeSuffix = timeType.substr(0, 3);
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

  const handleMaxCheckboxChange = (e: any) => {
    setMaxPeriodSelected(e.target.checked);
    if (e.target.checked) {
      setMaxPeriod(maxInput?.multipliedBy(maxPeriodType!)!);
    } else {
      setMaxPeriod(maxFutureTime);
      const parsedDate = secondsToDuration(maxFutureTime?.toNumber()!);
      const { timeValue, timeType } = getTimeType(parsedDate);
      setMaxInput(new BigNumber(timeValue));

      const typeSuffix = timeType.substr(0, 3);
      const optionByType = MaxRentPeriodOptions.find((o) => o.label.includes(typeSuffix));
      const optionIndex = MaxRentPeriodOptions.indexOf(optionByType!);

      setMaxPeriodSelectedOption(MaxRentPeriodOptions[optionIndex]);
      setMaxPeriodType(BigNumber.from(optionByType?.value));
    }
  };

  const handleMaxSelectChange = (value: number) => {
    const bigvalue = BigNumber.from(value);

    if (isMaxPeriodSelected) {
      setMaxPeriodType(bigvalue);

      const parsedDate = secondsToDuration(bigvalue?.toNumber()!);
      const { timeType } = getTimeType(parsedDate);
      const typeSuffix = timeType.substr(0, 3);
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

  // const handleApprove = async () => {
  //   if (selectedProperty === null) {
  //     return;
  //   }

  //   try {
  //     let approvedAddress = DEFAULT_ADDRESS;
  //     if (selectedProperty.isLAND) {
  //       await landRegistryContract?.approve(config.contracts.landworksContract, selectedProperty.id);
  //       approvedAddress = await landRegistryContract?.getApproved(selectedProperty.id)!;
  //     } else {
  //       await estateRegistryContract?.approve(config.contracts.landworksContract, selectedProperty.id);
  //       approvedAddress = await estateRegistryContract?.getApproved(selectedProperty.id)!;
  //     }
  //     if (approvedAddress.toLowerCase() === config.contracts.landworksContract) {
  //       setApproveDisabled(true);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //     // If there is an error enable the approve button
  //     setApproveDisabled(false);
  //   }
  // };

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

  // const handleConfirmListing = async () => {
  //   if (selectedProperty === null) {
  //     return;
  //   }

  //   setListDisabled(true);

  //   const metaverseRegistry = selectedProperty.isLAND
  //     ? config.contracts.decentraland.landRegistry
  //     : config.contracts.decentraland.estateRegistry;

  //   try {
  //     await landWorksContract?.list(
  //       Number(PlaceOptions[0].value),
  //       metaverseRegistry,
  //       selectedProperty.id,
  //       minPeriod,
  //       maxPeriod,
  //       maxFutureTime,
  //       paymentToken.id,
  //       pricePerSecond.toFixed(0)
  //     );
  //     showToastNotification(
  //       ToastType.Success,
  //       'Property listed successfully! It will take a few seconds to be shown in your Lending properties page.'
  //     );
  //     setListDisabled(false);
  //     history.push('/lending');
  //   } catch (e) {
  //     showToastNotification(ToastType.Error, 'There was an error while listing the property.');
  //     console.log(e);
  //   }
  // };

  const getUserNfts = async () => {
    if (!walletCtx.account) {
      return;
    }

    try {
      const lands = await landRegistry.landRegistryContract?.getUserData(walletCtx.account);
      const estates = await estateRegistry.estateRegistryContract?.getUserData(walletCtx.account);

      // TODO: improving typing
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const estatesWithLand = estates.filter((e: any) => e.landIds.estateSize > 0);

      const mergedProperties = [...lands, ...estatesWithLand].map((e) => ({
        label: e.name,
        value: JSON.stringify(e),
        coords: e.coords,
      }));
      setProperties(mergedProperties);
      setAssetProperties(lands);
      if (mergedProperties.length > 0) {
        // setInitialProperty(mergedProperties[0]);
        // setSelectedProperty(JSON.parse(mergedProperties[0].value));
      } else {
        // setInitialProperty(DEFAULT_PROPERTY);
        //setSelectedProperty(null);
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
    let isListDisabled = true;
    if (!minPeriod && isMinPeriodSelected) {
      setErrMessage('Min Period Must be set');
    } else if (minPeriod?.gt(maxPeriod)) {
      setErrMessage('Min Period exceeds Max Period');
    } else if (!maxPeriod && isMaxPeriodSelected) {
      setErrMessage('Max Period Must be set');
    } else if (maxPeriod?.gt(maxFutureTime)) {
      setErrMessage('Max Period exceeds Max Future Time');
    } else if (!maxFutureTime) {
      setErrMessage('Max Future Period Must be set');
    } else if (pricePerSecond.eq(ZERO_BIG_NUMBER)) {
      setErrMessage('Price cannot be zero');
    } else if (selectedProperty === null) {
      setErrMessage('no property selected');
    } else if (pricePerSecond.toFixed(0) === '0') {
      setErrMessage('Price per second equals to zero');
    } else if (!approveDisabled) {
      setErrMessage('');
    } else {
      setErrMessage('');
      isListDisabled = false;
    }

    setListDisabled(isListDisabled);
  };

  const evaluateSelectedProperty = async () => {
    if (selectedProperty) {
      setApproveDisabled(false);
      let approvedAddress: string;
      if (selectedProperty.isLAND) {
        approvedAddress = await landRegistryContract?.getApproved(selectedProperty.id)!;
      } else {
        approvedAddress = await estateRegistryContract?.getApproved(selectedProperty.id)!;
      }
      if (approvedAddress.toLowerCase() === config.contracts.landworksContract) {
        setApproveDisabled(true);
      } else {
        setApproveDisabled(false);
      }
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

  const onChangePlaceHandler = (value: number) => {
    // setMetaverse(metaverse);
    setSelectedMetaverse(value);
    // TODO:: some filtering here
  };

  const showPriceInEth = paymentToken.symbol === 'ETH' ? `${usdPrice}$` : '';

  const steps = ['Choose Property', 'Rent Specification'];

  return (
    <section className="list-view">
      <Grid container xs={12} direction="column" alignItems="flex-start" justifyContent="space-between" height={'100%'}>
        <Grid container direction="row" alignItems="center" justifyContent="center" width={400} alignSelf="center">
          <CustomizedSteppers steps={steps} activeStep={activeStep} />
        </Grid>
        {activeStep === 0 && (
          <>
            <Grid item margin={'40px 0 10px'}>
              <ControlledSelect
                width={'12rem'}
                value={selectedMetaverse}
                onChange={onChangePlaceHandler}
                options={landsData}
              />
            </Grid>

            {loading ? (
              <Grid width={'100%'}>
                <EditFormCardSkeleton />
              </Grid>
            ) : (
              <Grid container flexDirection="row" wrap="wrap" xs={12} className="properties">
                {assetProperties.map((land) => (
                  <Grid item xs={3} margin={'0 0 10px'}>
                    <LandWorksListCard
                      isSelectedProperty={land.name === selectedProperty?.name}
                      handleClick={handlePropertyChange}
                      key={land.name}
                      land={land}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </>
        )}

        {activeStep === 1 && (
          <Grid container xs={12} columnSpacing={5} justifyContent="space-between" mt={4}>
            <Grid item xs={6} flexDirection="column" className="inputSection" maxHeight={450} overflow="scroll">
              <DropdownSection
                variant="calendar"
                handleOpen={() => {
                  setShowRentPeriodInput(!showRentPeriodInput);
                }}
              />
              {showRentPeriodInput && (
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
                  minValue={minPeriodSelectedOption.value}
                  maxValue={maxPeriodSelectedOption.value}
                  atMostValue={maxFutureSelectedOption.value}
                />
              )}
              <DropdownSection
                variant="currency"
                handleOpen={() => {
                  setShowRentCurrencyInput(!showRentCurrencyInput);
                }}
              />
              {showRentCurrencyInput && (
                <>
                  <RentPrice
                    handleCostEthChange={handleCostEthChange}
                    handleCurrencyChange={handleCurrencyChange}
                    showPriceInEth={showPriceInEth}
                    paymentToken={paymentToken}
                    earnings={earnings}
                    protocolFee={protocolFee}
                    feePercentage={feePercentage}
                    options={currencyData}
                    value={selectedCurrency}
                  />
                </>
              )}
            </Grid>
            <Grid item xs={6} rowSpacing={5}>
              <Grid item xs={12}>
                <SelectedListCard land={selectedProperty!} />
              </Grid>
              <Grid item xs={12}>
                <ListNewSummary
                  minPeriodSelectedOption={minPeriodSelectedOption.label}
                  maxPeriodSelectedOption={maxPeriodSelectedOption.label}
                  maxFutureSelectedOption={maxFutureSelectedOption.label}
                  minRentPeriod={minPeriod}
                  maxRentPeriod={maxPeriod}
                  maxFuturePeriod={maxFutureTime}
                  rentPrice={tokenCost}
                />
              </Grid>
            </Grid>
          </Grid>
        )}

        <hr className="divider" />

        {activeStep === 0 && (
          <Grid container direction="row" alignItems="center" justifyContent="space-between">
            <Button variant="secondary" btnSize="medium">
              Found on wallet ({assetProperties.length})
            </Button>
            <Button
              disabled={selectedProperty === null}
              variant="secondary"
              btnSize="medium"
              onClick={() => setActiveStep(1)}
            >
              Next
            </Button>
          </Grid>
        )}
        {activeStep === 1 && (
          <Grid container direction="row" alignItems="center" justifyContent="space-between">
            <Button variant="secondary" btnSize="medium" onClick={() => setActiveStep(0)}>
              Back
            </Button>
            <Grid direction="row" alignItems="center" justifyContent="space-between">
              <Button
                variant="gradient"
                btnSize="medium"
                onClick={() => setShowApproveModal(true)}
                style={{ marginRight: 15 }}
              >
                Approve
              </Button>
              <Button disabled={listDisabled} variant="secondary" btnSize="medium" onClick={() => setActiveStep(0)}>
                Confirm Listing
              </Button>
            </Grid>
          </Grid>
        )}
        <ApproveModal showApproveModal={showApproveModal} setShowApproveModal={setShowApproveModal} />
      </Grid>
    </section>
  );
};

export default ListNewProperty;
