/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import { ONE_ADDRESS } from 'web3/utils';

import { Box, Button, Grid, Modal, Typography } from 'design-system';
import { getDecentralandDataImageUrl, getEstateImageUrl } from 'helpers/helpers';
import { ToastType, showToastNotification } from 'helpers/toast-notifcations';
import DropdownSection from 'modules/land-works/components/land-works-list-input-dropdown';
import ListNewSummary from 'modules/land-works/components/land-works-list-new-summary';
import SelectedListCard from 'modules/land-works/components/land-works-selected-feature-card';
import { currencyData } from 'modules/land-works/components/lands-explore-filters/filters-data';
import RentPeriod from 'modules/land-works/components/lands-input-rent-period';
import RentPrice from 'modules/land-works/components/lands-input-rent-price';
import { getTokenPrice } from 'providers/known-tokens-provider';

import { useWallet } from '../../../../wallets/wallet';
import { AssetEntity, PaymentToken, fetchAsset, fetchTokenPayments, parseAsset } from '../../api';
import { useLandworks } from '../../providers/landworks-provider';
import EditFormCardSkeleton from '../land-editing-skeleton';
import { TxModal } from '../lands-list-modal';

import { formatBigNumberInput, getTimeType, secondsToDuration } from '../../../../utils';
import { DAY_IN_SECONDS, MONTH_IN_SECONDS } from '../../../../utils/date';
import { ZERO_BIG_NUMBER, getNonHumanValue } from '../../../../web3/utils';

import {
  AtMostRentPeriodOptions,
  DEFAULT_LIST_MAX_FUTURE_PERIOD,
  DEFAULT_LIST_MAX_PERIOD,
  DEFAULT_MAX_PERIOD,
  DEFAULT_MIN_PERIOD,
  FEE_PRECISION,
  MaxRentPeriodOptions,
  MinRentPeriodOptions,
} from 'modules/land-works/constants';

import './index.scss';

interface Props {
  openDelistPrompt: () => void;
  closeModal: () => void;
  delistText: string;
}

const EditMessage = 'Processing...';

const EditProperty: React.FC<Props> = (props) => {
  const { openDelistPrompt, closeModal, delistText } = props;

  const walletCtx = useWallet();
  const landworks = useLandworks();
  const history = useHistory();

  const { landWorksContract } = landworks;

  const [asset, setAsset] = useState<AssetEntity>({} as AssetEntity);

  const { tokenId } = useParams<{ tokenId: string }>();
  const [loading, setLoading] = useState(false);

  const [minPeriod, setMinPeriod] = useState(new BigNumber(DAY_IN_SECONDS));
  const [isMinPeriodSelected, setMinPeriodSelected] = useState(false);
  const [minInput, setMinInput] = useState(DEFAULT_MIN_PERIOD);
  const [minPeriodType, setMinPeriodType] = useState(BigNumber.from(MinRentPeriodOptions[2].value)); // in seconds
  const [minPeriodSelectedOption, setMinPeriodSelectedOption] = useState(MinRentPeriodOptions[2]); // Selected Option Value for the select menu
  const [minError, setMinError] = useState('');

  const [maxPeriod, setMaxPeriod] = useState(DEFAULT_LIST_MAX_PERIOD.multipliedBy(MONTH_IN_SECONDS));
  const [isMaxPeriodSelected, setMaxPeriodSelected] = useState(true);
  const [maxInput, setMaxInput] = useState(DEFAULT_LIST_MAX_PERIOD);
  const [maxPeriodType, setMaxPeriodType] = useState(BigNumber.from(MaxRentPeriodOptions[4].value));
  const [maxPeriodSelectedOption, setMaxPeriodSelectedOption] = useState(MaxRentPeriodOptions[4]);
  const [maxError, setMaxError] = useState(''); // Selected Option Value for the select menu

  const [maxFutureTime, setMaxFutureTime] = useState(DEFAULT_LIST_MAX_FUTURE_PERIOD.multipliedBy(MONTH_IN_SECONDS));
  const [maxFutureTimeInput, setMaxFutureTimeInput] = useState(DEFAULT_LIST_MAX_FUTURE_PERIOD);
  const [maxFutureTimePeriod, setMaxFuturePeriodType] = useState(BigNumber.from(AtMostRentPeriodOptions[4].value));
  const [maxFutureSelectedOption, setMaxFutureSelectedOption] = useState(AtMostRentPeriodOptions[4]); // Selected Option Value for the select menu
  const [maxFutureError, setMaxFutureError] = useState('');

  const [selectedProperty, setSelectedProperty] = useState(null as AssetEntity | null);

  const [showRentPeriodInput, setShowRentPeriodInput] = useState(true);
  const [showRentCurrencyInput, setShowRentCurrencyInput] = useState(true);

  const [paymentTokens, setPaymentTokens] = useState<PaymentToken[]>([]);
  const [paymentToken, setPaymentToken] = useState<PaymentToken>({} as PaymentToken);
  const [selectedCurrency, setSelectedCurrency] = useState(1);

  const [tokenCost, setTokenCost] = useState(new BigNumber(0));
  const [earnings, setEarnings] = useState(ZERO_BIG_NUMBER);
  const [protocolFee, setProtocolFee] = useState(ZERO_BIG_NUMBER);
  const [feePercentage, setFeePercentage] = useState(0);
  const [pricePerSecond, setPricePerSecond] = useState(ZERO_BIG_NUMBER);
  const [usdPrice, setUsdPrice] = useState('0');
  const [priceError, setPriceError] = useState('');

  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showTxModal, setShowTxModal] = useState(false);

  const [editTxModalMessage] = useState(EditMessage);

  const [saveDisabled, setSaveDisabled] = useState(false);

  useEffect(() => {
    // Pre-populate user properties
    setSelectedProperty(asset);
    asset?.paymentToken?.id == ONE_ADDRESS ? setSelectedCurrency(1) : setSelectedCurrency(2);
    // Pre-populate minPeriod values
    if (asset.minPeriod) {
      const minPeriod: BigNumber = new BigNumber(asset.minPeriod);
      const hasMinPeriod = minPeriod.gt(DEFAULT_MIN_PERIOD);
      if (hasMinPeriod) {
        setMinPeriod(minPeriod);
        setMinPeriodSelected(true);

        const parsedDate = secondsToDuration(minPeriod.toNumber());
        const { timeValue, timeType } = getTimeType(parsedDate);

        setMinInput(new BigNumber(timeValue.toFixed(2)));

        const typeSuffix = timeType.substr(0, 3);
        const optionByType = MinRentPeriodOptions.find((o) => o.label.includes(typeSuffix));
        const optionIndex = MinRentPeriodOptions.indexOf(optionByType!);

        setMinPeriodSelectedOption(MinRentPeriodOptions[optionIndex]);
        setMinPeriodType(BigNumber.from(optionByType?.value));
      }
    }

    // Pre-populate maxPeriod values
    if (asset.maxPeriod) {
      const maxPeriod: BigNumber = new BigNumber(asset.maxPeriod);
      setMaxPeriod(maxPeriod);
      const hasCustomMaxPeriod = maxPeriod.lt(DEFAULT_MAX_PERIOD);

      if (hasCustomMaxPeriod) {
        setMaxPeriodSelected(true);

        const parsedDate = secondsToDuration(maxPeriod.toNumber());
        const { timeValue, timeType } = getTimeType(parsedDate);

        setMaxInput(new BigNumber(timeValue.toFixed(2)));

        const typeSuffix = timeType.substr(0, 3);
        const optionByType = MaxRentPeriodOptions.find((o) => o.label.includes(typeSuffix));
        const optionIndex = MaxRentPeriodOptions.indexOf(optionByType!);

        setMaxPeriodSelectedOption(MaxRentPeriodOptions[optionIndex]);
        setMaxPeriodType(BigNumber.from(optionByType?.value));
      }
    }

    // Pre-populate at most given Time
    if (asset.maxFutureTime) {
      const maxFutureTime: BigNumber = new BigNumber(asset.maxFutureTime);
      setMaxFutureTime(maxFutureTime);
      const hasCustomMaxFutureTime = maxFutureTime.lt(DEFAULT_MAX_PERIOD);

      if (hasCustomMaxFutureTime) {
        const parsedDate = secondsToDuration(maxFutureTime.toNumber());
        const { timeValue, timeType } = getTimeType(parsedDate);
        setMaxFutureTimeInput(new BigNumber(timeValue.toFixed(2)));

        const typeSuffix = timeType.substr(0, 3);
        const optionByType = AtMostRentPeriodOptions.find((o) => o.label.includes(typeSuffix));
        const optionIndex = AtMostRentPeriodOptions.indexOf(optionByType!);

        setMaxFutureSelectedOption(AtMostRentPeriodOptions[optionIndex]);
        setMaxFuturePeriodType(BigNumber.from(optionByType?.value));
      }
    }

    // Get usd price per day for the asset
    if (asset.paymentToken) {
      getUsdPrice(asset.paymentToken?.symbol, asset.pricePerMagnitude ? asset.pricePerMagnitude.price : '');
      setPaymentToken(asset.paymentToken);
    }

    if (asset.pricePerMagnitude) {
      setTokenCost(new BigNumber(formatBigNumberInput(asset.pricePerMagnitude.price) || 0));
    }
  }, [asset]);

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

  const calculateTotalAndFeePrecision = (feePercentage: BigNumber.Value) => {
    const fee = tokenCost?.multipliedBy(feePercentage).dividedBy(FEE_PRECISION);
    const earnings = tokenCost?.minus(fee!);
    setProtocolFee(fee!);
    setEarnings(earnings!);
    setFeePercentage((100 * Number(paymentToken?.feePercentage)) / FEE_PRECISION);
  };

  const calculatePricePerSecond = () => {
    const pricePerSecond = getNonHumanValue(tokenCost, paymentToken?.decimals).dividedBy(DAY_IN_SECONDS);
    setPricePerSecond(pricePerSecond);
  };

  const getUsdPrice = (symbol: string, price: string | number | BigNumber) => {
    const ethPrice = new BigNumber(getTokenPrice(symbol) || '0');
    const ethToUsdPrice = ethPrice.multipliedBy(price);
    setUsdPrice(ethToUsdPrice.toFixed(2).replace(/\.00$/, ''));
  };

  const getPaymentTokens = async () => {
    const tokens = await fetchTokenPayments();
    setPaymentTokens(tokens);
  };

  const evaluateInput = () => {
    if (!minPeriod && isMinPeriodSelected) {
      setMinError('Min Rent Period must be set');
      setSaveDisabled(true);
    } else if (minPeriod?.gt(maxPeriod)) {
      setMinError('Min Rent Period exceeds Max Rent Period');
      setSaveDisabled(true);
    } else if (!maxPeriod && isMaxPeriodSelected) {
      setMaxError('Max Rent Period must be set');
      setSaveDisabled(true);
    } else if (maxPeriod?.gt(maxFutureTime)) {
      setMaxError('Max Rent Period exceeds Max Rent Queue');
      setSaveDisabled(true);
    } else if (!maxFutureTime) {
      setMaxFutureError('Max Rent Queue must be set');
      setSaveDisabled(true);
    } else if (pricePerSecond.eq(ZERO_BIG_NUMBER)) {
      setPriceError('Price cannot be zero');
      setSaveDisabled(true);
    } else if (pricePerSecond.toFixed(0) === '0') {
      setPriceError('Price per second equals to zero');
      setSaveDisabled(true);
    } else if (selectedProperty === null) {
      setSaveDisabled(true);
    } else {
      clearErrorMessages();
      setSaveDisabled(false);
    }
  };

  const clearErrorMessages = () => {
    setMinError('');
    setMaxError('');
    setMaxFutureError('');
    setPriceError('');
  };

  const handleSave = async () => {
    setShowWarningModal(false);
    setSaveDisabled(true);

    try {
      await landWorksContract?.updateConditions(
        asset.id,
        minPeriod,
        maxPeriod,
        maxFutureTime,
        paymentToken?.id || '',
        pricePerSecond.toFixed(0),
        () => {
          setShowTxModal(true);
        }
      );
      showToastNotification(ToastType.Success, 'Property Updated successfully!');
      setShowTxModal(false);
      closeModal();
    } catch (e) {
      setShowTxModal(false);
      console.log(e);
      showToastNotification(ToastType.Error, 'There was an error while updating the property.');
    }

    setSaveDisabled(false);
  };

  useEffect(() => {
    if (asset) {
      getPaymentTokens();
    }
  }, [walletCtx.account]);

  useEffect(() => {
    if (asset) {
      evaluateInput();
    }
  }, [minPeriod, maxPeriod, maxFutureTime, paymentToken, selectedProperty, pricePerSecond]);

  useEffect(() => {
    if (asset) {
      calculateTotalAndFeePrecision(asset?.paymentToken?.feePercentage);
      calculatePricePerSecond();
      getUsdPrice(paymentToken.symbol, tokenCost?.toNumber() || 0);
    }
  }, [paymentToken, tokenCost]);

  useEffect(() => {
    getAsset();
  }, [tokenId]);

  const getAsset = async () => {
    setLoading(true);
    const asset = await fetchAsset(tokenId);
    if (!asset) {
      history.push(`/explore`);
      return;
    }
    setAsset(await parseAsset(asset));
    setLoading(false);
  };

  const hasChangesToSave = () => {
    const changedMin = !new BigNumber(asset.minPeriod).isEqualTo(minPeriod);
    const changedMax = !new BigNumber(asset.maxPeriod).isEqualTo(maxPeriod);
    const changedMaxFuture = !new BigNumber(asset.maxFutureTime).isEqualTo(maxFutureTime);
    const changedToken = asset?.paymentToken?.symbol !== paymentToken?.symbol;
    const changedPrice = !new BigNumber(asset?.pricePerMagnitude?.price || 0).isEqualTo(tokenCost);

    return changedMin || changedMax || changedMaxFuture || changedToken || changedPrice;
  };

  const canSave = hasChangesToSave();

  const showPriceInUsd = `$${usdPrice}`;

  const estateCoords = selectedProperty?.decentralandData?.coordinates;

  return (
    <section className="list-view">
      {loading ? (
        <EditFormCardSkeleton />
      ) : (
        <Grid container direction="column" alignItems="flex-start" justifyContent="space-between" height={'100%'}>
          <Box fontSize="25px" fontWeight={700} textAlign="center" width="100%" color="#F8F8FF">
            Update Rent Conditions
          </Box>
          <Grid container maxHeight={'50vh'} overflow="auto" columnSpacing={5} justifyContent="space-between" mt={4}>
            <Grid item xs={6} flexDirection="column" className="inputSection" maxHeight={470} overflow="auto">
              <DropdownSection
                defaultOpen={true}
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
                  minOptionsValue={minPeriodSelectedOption.value}
                  maxOptionsValue={maxPeriodSelectedOption.value}
                  atMostOptionsValue={maxFutureSelectedOption.value}
                  minInputValue={minInput?.toNumber()}
                  maxInputValue={maxInput?.toNumber()}
                  atMostInputValue={maxFutureTimeInput?.toNumber()}
                  minError={minError}
                  maxError={maxError}
                  atMostError={maxFutureError}
                />
              )}
              <DropdownSection
                defaultOpen={true}
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
                </>
              )}
            </Grid>
            <Grid item xs={6} rowSpacing={5}>
              <Grid item xs={12}>
                <>
                  {selectedProperty && selectedProperty.decentralandData && (
                    <>
                      {selectedProperty.decentralandData.isLAND ? (
                        <SelectedListCard
                          src={getDecentralandDataImageUrl(selectedProperty.decentralandData)}
                          name={selectedProperty.name}
                          coordinatesChild={
                            // TODO: WHEN APPROVE FUNCTION IS SET UP
                            //<SelectedFeatureCoords asset={selectedProperty.decentralandData} />
                            <>
                              X: {selectedProperty.decentralandData.coordinates[0].x} Y:
                              {selectedProperty.decentralandData.coordinates[0].y}
                            </>
                          }
                        />
                      ) : (
                        <SelectedListCard
                          src={getEstateImageUrl(selectedProperty)}
                          name={selectedProperty.name}
                          coordinatesChild={estateCoords?.map((co) => (
                            <span key={`${co[0]}-${co[1]}`} style={{ marginRight: '8px' }}>
                              X: {co.x} Y: {co.y}
                            </span>
                          ))}
                        />
                      )}
                    </>
                  )}
                  {selectedProperty?.place && (
                    <SelectedListCard
                      src={selectedProperty.imageUrl}
                      name={selectedProperty?.name}
                      coordinatesChild={
                        <span>
                          {selectedProperty?.place[0]}, {selectedProperty?.place[1]}
                        </span>
                      }
                    />
                  )}
                </>
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
                  paymentToken={paymentToken}
                  feeText="There is a small network fee upon updating the rent conditions."
                  asset={asset}
                />
              </Grid>
            </Grid>
          </Grid>

          <hr className="divider" />

          <Grid container direction="row" alignItems="center" justifyContent="space-between">
            <Button variant="secondary" btnSize="medium" onClick={closeModal}>
              Back
            </Button>
            <Grid direction="row" alignItems="center" justifyContent="space-between">
              <Button
                disabled={false}
                variant="tertiary"
                btnSize="medium"
                onClick={openDelistPrompt}
                style={{ marginRight: 25 }}
              >
                {delistText}
              </Button>
              <Button
                disabled={saveDisabled || !canSave}
                variant="gradient"
                btnSize="medium"
                onClick={() => setShowWarningModal(true)}
              >
                Save Changes
              </Button>
            </Grid>
          </Grid>

          <Modal height={'100%'} handleClose={() => setShowWarningModal(false)} open={showWarningModal}>
            <Grid container width="410px" direction="column">
              <Typography fontSize={25} variant="h2">
                Warning
              </Typography>
              <Typography fontSize={16} fontWeight="normal" sx={{ margin: '10px 0 40px 0' }} variant="subtitle1">
                Changing the payment type will enforce the payout of any unclaimed rent accumulated for this property.
              </Typography>
              <Grid container direction="row" justifyContent="center">
                <Button variant="gradient" btnSize="small" onClick={handleSave}>
                  OK
                </Button>
              </Grid>
            </Grid>
          </Modal>
        </Grid>
      )}
      <TxModal
        textMessage={editTxModalMessage}
        showModal={showTxModal}
        handleClose={() => {
          closeModal();
          setShowTxModal(false);
        }}
      />
    </section>
  );
};

export default EditProperty;
