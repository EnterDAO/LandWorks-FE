/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Checkbox, Col, Row } from 'antd';
import BigNumber from 'bignumber.js';

import Button from 'components/antd/button';
import Icon from 'components/custom/icon';
import SmallAmountTooltip from 'components/custom/smallAmountTooltip';
import { getTokenPrice } from 'components/providers/known-tokens-provider';
import { getTokenIconName } from 'helpers/helpers';
import { ToastType, showToastNotification } from 'helpers/toast-notifcations';

import config from '../../../../config';
import { useWallet } from '../../../../wallets/wallet';
import { PaymentToken, fetchTokenPayments } from '../../api';
import EditFormCardSkeleton from '../../components/land-edit-form-loader-card';
import { Dropdown } from '../../components/lands-dropdown-select';
import { EditViewLandDropdown } from '../../components/lands-edit-dropdown-select';
import { LandsEditInput } from '../../components/lands-edit-input';
import { LandsEditPeriodDropdown } from '../../components/lands-edit-rent-period-select';
import { LandsInput } from '../../components/lands-input';
import CurrencyDropdown from '../../components/lands-rent-currency-select';
import { LandsPeriodDropdown } from '../../components/lands-rent-period-select';
import { LandsTooltip } from '../../components/lands-tooltip';
import { useEstateRegistry } from '../../providers/decentraland/estate-registry-provider';
import { useLandRegistry } from '../../providers/decentraland/land-registry-provider';
import { useLandworks } from '../../providers/landworks-provider';

import { getFormattedTime, getTimeType, secondsToDuration } from '../../../../utils';
import {
  DAY_IN_SECONDS,
  HOUR_IN_SECONDS,
  MINUTE_IN_SECONDS,
  ONE_HUNDRED_YEARS_IN_SECONDS,
  THREE_WEEKS_IN_SECONDS,
  WEEK_IN_SECONDS,
} from '../../../../utils/date';
import { DEFAULT_ADDRESS, MAX_UINT_256, ZERO_BIG_NUMBER, getNonHumanValue } from '../../../../web3/utils';

import './index.scss';

const PlaceOptions = [
  {
    label: 'Decentraland',
    value: 1,
  },
];

const MinRentPeriodOptions = [
  {
    label: 'mins',
    value: MINUTE_IN_SECONDS,
  },
  {
    label: 'hours',
    value: HOUR_IN_SECONDS,
  },
  {
    label: 'days',
    value: DAY_IN_SECONDS,
  },
  {
    label: 'weeks',
    value: WEEK_IN_SECONDS,
  },
];

const MaxRentPeriodOptions = [
  {
    label: 'mins',
    value: MINUTE_IN_SECONDS,
  },
  {
    label: 'hours',
    value: HOUR_IN_SECONDS,
  },
  {
    label: 'days',
    value: DAY_IN_SECONDS,
  },
  {
    label: 'weeks',
    value: WEEK_IN_SECONDS,
  },
];

const AtMostRentPeriodOptions = [
  {
    label: 'mins',
    value: MINUTE_IN_SECONDS,
  },
  {
    label: 'hours',
    value: HOUR_IN_SECONDS,
  },
  {
    label: 'days',
    value: DAY_IN_SECONDS,
  },
  {
    label: 'weeks',
    value: WEEK_IN_SECONDS,
  },
];

type DecentralandNFT = {
  id: string;
  name: string;
  isLAND: boolean;
  landIds?: any[];
  coords: any[];
};

const DEFAULT_MIN_PERIOD = new BigNumber(1);
const DEFAULT_MAX_PERIOD = new BigNumber(3);
const DEFAULT_FUTURE_PERIOD = new BigNumber(THREE_WEEKS_IN_SECONDS);
const FEE_PRECISION = 100_000;
const DEFAULT_PROPERTY = { label: '', value: '' };

const ListView: React.FC = () => {
  const walletCtx = useWallet();
  const landworks = useLandworks();
  const estateRegistry = useEstateRegistry();
  const landRegistry = useLandRegistry();
  const history = useHistory();

  const { landWorksContract } = landworks;
  const { landRegistryContract } = landRegistry;
  const { estateRegistryContract } = estateRegistry;

  const [minPeriod, setMinPeriod] = useState(new BigNumber(MINUTE_IN_SECONDS));
  const [isMinPeriodSelected, setMinPeriodSelected] = useState(false);
  const [minInput, setMinInput] = useState(DEFAULT_MIN_PERIOD);
  const [minPeriodType, setMinPeriodType] = useState(BigNumber.from(MinRentPeriodOptions[0].value));
  const [minPeriodSelectedOption, setMinPeriodSelectedOption] = useState(MinRentPeriodOptions[0]); // Selected Option Value for the select menu

  const [maxPeriod, setMaxPeriod] = useState(DEFAULT_FUTURE_PERIOD);
  const [isMaxPeriodSelected, setMaxPeriodSelected] = useState(true);
  const [maxInput, setMaxInput] = useState(DEFAULT_MAX_PERIOD);
  const [maxPeriodType, setMaxPeriodType] = useState(BigNumber.from(MaxRentPeriodOptions[3].value));
  const [maxPeriodSelectedOption, setMaxPeriodSelectedOption] = useState(MaxRentPeriodOptions[3]); // Selected Option Value for the select menu

  const [maxFutureTime, setMaxFutureTime] = useState(DEFAULT_FUTURE_PERIOD);
  const [maxFutureTimeInput, setMaxFutureTimeInput] = useState(DEFAULT_MAX_PERIOD);
  const [maxFutureTimePeriod, setMaxFuturePeriodType] = useState(BigNumber.from(AtMostRentPeriodOptions[3].value));
  const [maxFutureSelectedOption, setMaxFutureSelectedOption] = useState(AtMostRentPeriodOptions[3]); // Selected Option Value for the select menu

  const [properties, setProperties] = useState([] as any[]);
  const [initialProperty, setInitialProperty] = useState(DEFAULT_PROPERTY);
  const [selectedProperty, setSelectedProperty] = useState(null as DecentralandNFT | null);

  const [paymentTokens, setPaymentTokens] = useState([] as PaymentToken[]);
  const [paymentToken, setPaymentToken] = useState({} as PaymentToken);

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

  const handlePlaceChange = (e: any) => {
    console.log(e);
  };

  const handlePropertyChange = (e: any) => {
    const property = JSON.parse(e.value);
    setSelectedProperty(property);

    const selectedProperty = properties.find((p) => p.label === property.name);
    if (selectedProperty) {
      setInitialProperty(selectedProperty);
    }
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

  const handleMinSelectChange = (e: any) => {
    const { value: val } = e;
    const value = BigNumber.from(val);

    if (isMinPeriodSelected) {
      setMinPeriodType(value);

      const parsedDate = secondsToDuration(value?.toNumber()!);
      const { timeValue, timeType } = getTimeType(parsedDate);
      const typeSuffix = timeType.substr(0, 3);
      const optionByType = MinRentPeriodOptions.find((o) => o.label.includes(typeSuffix));
      const optionIndex = MinRentPeriodOptions.indexOf(optionByType!);

      setMinPeriodSelectedOption(MinRentPeriodOptions[optionIndex]);
      setMinPeriod(minInput?.multipliedBy(value!));
    }
  };

  const handleMinInputChange = (e: any) => {
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

  const handleMaxSelectChange = (e: any) => {
    const { value: val } = e;
    const value = BigNumber.from(val);

    if (isMaxPeriodSelected) {
      setMaxPeriodType(value);

      const parsedDate = secondsToDuration(value?.toNumber()!);
      const { timeValue, timeType } = getTimeType(parsedDate);
      const typeSuffix = timeType.substr(0, 3);
      const optionByType = MaxRentPeriodOptions.find((o) => o.label.includes(typeSuffix));
      const optionIndex = MaxRentPeriodOptions.indexOf(optionByType!);

      setMaxPeriodSelectedOption(MaxRentPeriodOptions[optionIndex]);

      setMaxPeriod(maxInput?.multipliedBy(value!)!);
    }
  };

  const handleMaxInputChange = (e: any) => {
    const value = BigNumber.from(e.target.value);
    setMaxInput(value!);
    if (isMaxPeriodSelected) {
      setMaxPeriod(value?.multipliedBy(maxPeriodType!)!);
    }
  };

  const handleAtMostSelectChange = (e: any) => {
    const { value: val } = e;
    const value = BigNumber.from(val);
    setMaxFuturePeriodType(value);

    const parsedDate = secondsToDuration(value?.toNumber()!);
    const { timeValue, timeType } = getTimeType(parsedDate);
    const typeSuffix = timeType.substr(0, 3);
    const optionByType = AtMostRentPeriodOptions.find((o) => o.label.includes(typeSuffix));
    const optionIndex = AtMostRentPeriodOptions.indexOf(optionByType!);

    setMaxFutureSelectedOption(AtMostRentPeriodOptions[optionIndex]);
    setMaxFutureTime(maxFutureTimeInput?.multipliedBy(value!)!);

    // If maxPeriod chebkox is not selected, mirror the values to the maxPeriod input and dropdown
    if (!isMaxPeriodSelected) {
      setMaxPeriodType(value);

      const optionByType = MaxRentPeriodOptions.find((o) => o.label.includes(typeSuffix));
      const optionIndex = MaxRentPeriodOptions.indexOf(optionByType!);
      setMaxPeriodSelectedOption(MaxRentPeriodOptions[optionIndex]);
      setMaxPeriod(maxInput?.multipliedBy(value!)!);
    }
  };

  const handleAtMostInputChange = (e: any) => {
    const value = BigNumber.from(e.target.value);
    setMaxFutureTimeInput(value!);
    setMaxFutureTime(value?.multipliedBy(maxFutureTimePeriod!)!);

    // If maxPeriod chebkox is not selected, mirror the values to the maxPeriod input and dropdown
    if (!isMaxPeriodSelected) {
      setMaxInput(value!);
      setMaxPeriod(value?.multipliedBy(maxPeriodType!)!);
    }
  };

  const handleCurrencyChange = (e: any) => {
    setPaymentToken(e);
  };

  const handleCostEthChange = (e: any) => {
    const value = BigNumber.from(e.target.value || '');
    setTokenCost(value!);
  };

  const handleApprove = async () => {
    if (selectedProperty === null) {
      return;
    }

    try {
      let approvedAddress = DEFAULT_ADDRESS;
      if (selectedProperty.isLAND) {
        const tx = await landRegistryContract?.approve(config.contracts.landworksContract, selectedProperty.id);
        approvedAddress = await landRegistryContract?.getApproved(selectedProperty.id)!;
      } else {
        await estateRegistryContract?.approve(config.contracts.landworksContract, selectedProperty.id);
        approvedAddress = await estateRegistryContract?.getApproved(selectedProperty.id)!;
      }
      if (approvedAddress.toLowerCase() === config.contracts.landworksContract) {
        setApproveDisabled(true);
      }
    } catch (e) {
      console.log(e);
      // If there is an error enable the approve button
      setApproveDisabled(false);
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

    const metaverseRegistry = selectedProperty.isLAND
      ? config.contracts.decentraland.landRegistry
      : config.contracts.decentraland.estateRegistry;

    try {
      await landWorksContract?.list(
        PlaceOptions[0].value,
        metaverseRegistry,
        selectedProperty.id,
        minPeriod,
        maxPeriod,
        maxFutureTime,
        paymentToken.id,
        pricePerSecond.toFixed(0)
      );
      showToastNotification(
        ToastType.Success,
        'Property listed successfully! It will take a few seconds to be shown in your Lending properties page.'
      );
      setListDisabled(false);
      history.push('/lending');
    } catch (e) {
      showToastNotification(ToastType.Error, 'There was an error while listing the property.');
      console.log(e);
    }
  };

  const getUserNfts = async () => {
    if (!walletCtx.account) {
      return;
    }

    try {
      const [estates, lands] = await Promise.all([
        landRegistry.landRegistryContract?.getUserData(walletCtx.account),
        estateRegistry.estateRegistryContract?.getUserData(walletCtx.account),
      ]);
      const mergedProperties = [...estates, ...lands].map((e) => ({ label: e.name, value: JSON.stringify(e) }));
      setProperties(mergedProperties);
      if (mergedProperties.length > 0) {
        setInitialProperty(mergedProperties[0]);
        setSelectedProperty(JSON.parse(mergedProperties[0].value));
      } else {
        setInitialProperty(DEFAULT_PROPERTY);
        setSelectedProperty(null);
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

  return (
    <section className="list-view">
      {loading ? (
        <EditFormCardSkeleton />
      ) : (
        <Row>
          <Col span={24}>
            <Row className="list-view-wrapper">
              <Col span={24}>
                <h3>List property</h3>
              </Col>
              <Col span={24} style={{ margin: '10px 0' }}>
                <Row gutter={[16, 16]}>
                  <Col sm={24} md={12}>
                    <Row>
                      <Col span={24}>
                        <p className="drop-heading">Metaverse</p>
                      </Col>
                      <Col span={24}>
                        <EditViewLandDropdown
                          options={PlaceOptions}
                          onChange={handlePlaceChange}
                          initialValuе={PlaceOptions[0]}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col sm={24} md={12}>
                    <Row>
                      <Col span={24}>
                        <p className="drop-heading">Property</p>
                      </Col>
                      <Col span={24}>
                        <EditViewLandDropdown
                          options={properties}
                          onChange={handlePropertyChange}
                          initialValuе={initialProperty}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <Row className="rent-period">
                  <Col sm={24} md={8}>
                    Rent Period
                  </Col>
                  <Col sm={24} md={16}>
                    <Row gutter={[16, 16]}>
                      <Col xs={24} sm={12} className="checkbox-wrapper">
                        <Checkbox onChange={handleMinCheckboxChange} /> min
                        <LandsEditPeriodDropdown
                          options={MinRentPeriodOptions}
                          onChange={handleMinSelectChange}
                          onInputChange={handleMinInputChange}
                          initialValuе={minPeriodSelectedOption}
                          inputValue={minInput?.toNumber()}
                          disabled={!isMinPeriodSelected}
                        />
                        <LandsTooltip
                          placement="bottom"
                          trigger="hover"
                          text="The minimum period for which the property will be available to be rented by a given user. If minimum period is not set (not enabled), there won't be any restriction on the renting time, e.g the property may be rented for as low as 1 second."
                        />
                      </Col>
                      <Col xs={24} sm={12} className="checkbox-wrapper">
                        <Checkbox onChange={handleMaxCheckboxChange} checked={isMaxPeriodSelected} /> max
                        <LandsEditPeriodDropdown
                          options={MaxRentPeriodOptions}
                          onChange={handleMaxSelectChange}
                          onInputChange={handleMaxInputChange}
                          initialValuе={maxPeriodSelectedOption}
                          inputValue={maxInput?.toNumber()}
                          disabled={!isMaxPeriodSelected}
                        />
                        <LandsTooltip
                          placement="bottom"
                          trigger="hover"
                          text="The maximum period for which the property can be rented by a given user. If maximum period is not set (not enabled), the value will default to the liquidity restriction configured for the property."
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col span={24} className="future-period-wrapper">
                <div className="period-wrapper">
                  <span style={{ marginRight: '15px' }}>At any given time to be rented out at most</span>
                </div>
                <div className="period-wrapper">
                  <LandsEditPeriodDropdown
                    options={AtMostRentPeriodOptions}
                    onChange={handleAtMostSelectChange}
                    onInputChange={handleAtMostInputChange}
                    initialValuе={maxFutureSelectedOption}
                    inputValue={maxFutureTimeInput?.toNumber()}
                  />
                  <span style={{ marginLeft: '15px' }}>in the future</span>
                  <LandsTooltip
                    placement="bottom"
                    trigger="hover"
                    text="The timestamp delta after which the protocol will not allow for the property to be rented. It is a utility to lenders so that they can enforce liquidity restrictions on the property being listed. E.g if the property is popular and rented non-stop, restrictions can be made using this configuration so that you can have your property liquid (available for withdrawal). This configuration resembles the maximum time you are willing to wait in order to withdraw your property from the protocol.
"
                  />
                </div>
              </Col>
              <Col span={24}>
                <Row className="price-container" gutter={[16, 16]}>
                  <Col span={24}>Price</Col>
                  <Col span={24}>
                    <Row>
                      <Col sm={24} md={12} className="currency-wrapper">
                        <CurrencyDropdown changeHandler={handleCurrencyChange} paymentTokens={paymentTokens} />
                        <div className="price-input-wrapper">
                          <LandsEditInput
                            onInputChange={handleCostEthChange}
                            value={tokenCost?.toNumber()}
                            customClassName="price-eth-input"
                          />
                          <span>{usdPrice}$</span>
                        </div>
                        <span>/ day</span>
                      </Col>
                      <Col sm={24} md={12}>
                        <Row>
                          <Col span={10}>
                            <span className="step">1.</span>
                            <button
                              type="button"
                              className="button-primary action-btn"
                              onClick={handleApprove}
                              disabled={approveDisabled}
                            >
                              <span>APPROVE</span>
                            </button>
                          </Col>
                          <Col span={14}>
                            <span className="step">2.</span>
                            <button
                              type="button"
                              className="button-primary action-btn"
                              onClick={handleConfirmListing}
                              disabled={listDisabled}
                            >
                              <span>CONFIRM LISTING</span>
                            </button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={24}>
                    <Row>
                      <Col xs={20} sm={12} md={10} className="your-earning-container">
                        <Row>
                          <Col span={9}>
                            <Row>
                              <Col span={24}>
                                <Icon
                                  name={getTokenIconName(paymentToken.symbol || 'png/eth')}
                                  className="info-icon"
                                  style={{ width: '16px', height: '16px', verticalAlign: 'middle', marginRight: '5px' }}
                                />
                                <span className="earnings-num">
                                  <SmallAmountTooltip amount={new BigNumber(earnings || '0')} />
                                </span>
                              </Col>
                              <Col className="earnings-text">
                                <p>Your Earnings</p>
                              </Col>
                            </Row>
                          </Col>
                          <Col span={2} style={{ display: 'flex', justifyContent: 'center' }}>
                            +
                          </Col>
                          <Col span={13}>
                            <Row>
                              <Col span={24}>
                                <Icon
                                  name={getTokenIconName(paymentToken.symbol || 'png/eth')}
                                  className="info-icon"
                                  style={{ width: '16px', height: '16px', verticalAlign: 'middle', marginRight: '5px' }}
                                />
                                <span className="earnings-num">
                                  <SmallAmountTooltip amount={new BigNumber(protocolFee || '0')} />
                                </span>
                              </Col>
                              <Col className="earnings-text">
                                <p>{feePercentage}% Protocol fee</p>
                              </Col>
                              <LandsTooltip
                                placement="right"
                                trigger="hover"
                                text="Renters are charged at the time of the rent for the whole period they are renting. The earnings are to be received in the case the property is being rented. Protocol fees are charged during the rent transaction. If there are no rents, no fees will be charged."
                              />
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                {errMessage && (
                  <Row>
                    <Col span={24} className="error-wrapper">
                      {errMessage}
                    </Col>
                  </Row>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </section>
  );
};

export default ListView;
