/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Checkbox, Col, Row } from 'antd';
import BigNumber from 'bignumber.js';

import Button from 'components/antd/button';
import Icon from 'components/custom/icon';
import { getTokenPrice } from 'components/providers/known-tokens-provider';
import { getTokenIconName } from 'helpers/helpers';
import { ToastType, showToastNotification } from 'helpers/toast-notifcations';

import SmallAmountTooltip from '../../../../components/custom/smallAmountTooltip';
import { useWallet } from '../../../../wallets/wallet';
import { AssetEntity, PaymentToken, fetchAsset, fetchTokenPayments, parseAsset } from '../../api';
import EditFormCardSkeleton from '../../components/land-edit-form-loader-card';
import { Dropdown } from '../../components/lands-dropdown-select';
import { EditViewLandDropdown } from '../../components/lands-edit-dropdown-select';
import { LandsEditInput } from '../../components/lands-edit-input';
import { LandsEditPeriodDropdown } from '../../components/lands-edit-rent-period-select';
import CurrencyDropdown from '../../components/lands-rent-currency-select';
import { LandsTooltip } from '../../components/lands-tooltip';
import { WarningModal } from '../../components/lands-warning-modal';
import { useLandworks } from '../../providers/landworks-provider';

import { getFormattedTime, getTimeType, secondsToDuration } from '../../../../utils';
import {
  DAY_IN_SECONDS,
  HOUR_IN_SECONDS,
  MINUTE_IN_SECONDS,
  ONE_HUNDRED_YEARS_IN_SECONDS,
  WEEK_IN_SECONDS,
} from '../../../../utils/date';
import { MAX_UINT_256, ZERO_BIG_NUMBER, getNonHumanValue } from '../../../../web3/utils';

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

type ParsedTime = {
  timeValue: string | number;
  timeType: string;
};

const DEFAULT_MIN_PERIOD = new BigNumber(1);
const DEFAULT_MAX_PERIOD = new BigNumber(ONE_HUNDRED_YEARS_IN_SECONDS);
const FEE_PRECISION = 100_000;
const DEFAULT_PROPERTY = { label: '', value: '' };

const ListView: React.FC = () => {
  const walletCtx = useWallet();
  const landworks = useLandworks();
  const location = useLocation();
  const history = useHistory();

  const { landWorksContract } = landworks;

  // const [asset, setAsset] = useState<AssetEntity>(location.state as AssetEntity);
  const [asset, setAsset] = useState<AssetEntity>({} as AssetEntity);
  const { tokenId } = useParams<{ tokenId: string }>();
  const [loading, setLoading] = useState(false);

  const [minPeriod, setMinPeriod] = useState(DEFAULT_MIN_PERIOD); // Value in seconds
  const [isMinPeriodSelected, setMinPeriodSelected] = useState(false);
  const [minInput, setMinInput] = useState(DEFAULT_MIN_PERIOD);
  const [minPeriodType, setMinPeriodType] = useState(BigNumber.from(MinRentPeriodOptions[0].value)); // in seconds
  const [minPeriodSelectedOption, setMinPeriodSelectedOption] = useState(MinRentPeriodOptions[0]); // Selected Option Value for the select menu

  const [maxPeriod, setMaxPeriod] = useState(DEFAULT_MAX_PERIOD);
  const [isMaxPeriodSelected, setMaxPeriodSelected] = useState(false);
  const [maxInput, setMaxInput] = useState(DEFAULT_MIN_PERIOD);
  const [maxPeriodType, setMaxPeriodType] = useState(BigNumber.from(MaxRentPeriodOptions[0].value));
  const [maxPeriodSelectedOption, setMaxPeriodSelectedOption] = useState(MaxRentPeriodOptions[0]); // Selected Option Value for the select menu

  const [maxFutureTime, setMaxFutureTime] = useState(DEFAULT_MAX_PERIOD);
  const [maxFutureTimeInput, setMaxFutureTimeInput] = useState(DEFAULT_MIN_PERIOD);
  const [maxFutureTimePeriod, setMaxFuturePeriodType] = useState(BigNumber.from(AtMostRentPeriodOptions[0].value));
  const [maxFutureSelectedOption, setMaxFutureSelectedOption] = useState(AtMostRentPeriodOptions[0]); // Selected Option Value for the select menu

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
  const [usdPrice, setUsdPrice] = useState('0');

  const [errMessage, setErrMessage] = useState('');
  const [showWarningModal, setShowWarningModal] = useState(false);

  const [saveDisabled, setSaveDisabled] = useState(false);

  useEffect(() => {
    // Pre-populate user properties
    const properyOption = { label: asset.name, value: JSON.stringify(asset) };
    setProperties([properyOption]);
    setInitialProperty(properyOption);
    setSelectedProperty(JSON.parse(properyOption.value));

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
      getUsdPrice(asset.paymentToken?.symbol, asset.pricePerMagnitude.price);
      setPaymentToken(asset.paymentToken);
    }

    if (asset.pricePerMagnitude) {
      setTokenCost(asset.pricePerMagnitude.price);
    }
  }, [asset]);

  const handlePlaceChange = (e: any) => {
    console.log(e);
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
      setErrMessage('Min Period Must be set');
      setSaveDisabled(true);
    } else if (minPeriod?.gt(maxPeriod)) {
      setErrMessage('Min Period exceeds Max Period');
      setSaveDisabled(true);
    } else if (!maxPeriod && isMaxPeriodSelected) {
      setErrMessage('Max Period Must be set');
      setSaveDisabled(true);
    } else if (maxPeriod?.gt(maxFutureTime)) {
      setErrMessage('Max Period exceeds Max Future Time');
      setSaveDisabled(true);
    } else if (!maxFutureTime) {
      setErrMessage('Max Future Period Must be set');
      setSaveDisabled(true);
    } else if (pricePerSecond.eq(ZERO_BIG_NUMBER)) {
      setErrMessage('Price cannot be zero');
      setSaveDisabled(true);
    } else if (selectedProperty === null) {
      setErrMessage('no property selected');
      setSaveDisabled(true);
    } else {
      setErrMessage('');
      setSaveDisabled(false);
    }
  };

  const handleSave = async () => {
    setShowWarningModal(false);
    setSaveDisabled(true);

    try {
      const updateTx = await landWorksContract?.updateConditions(
        asset.id,
        minPeriod,
        maxPeriod,
        maxFutureTime,
        paymentToken.id,
        pricePerSecond.toFixed(0)
      );
      showToastNotification(ToastType.Success, 'Property Updated successfully!');
    } catch (e) {
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
      calculateTotalAndFeePrecision();
      calculatePricePerSecond();
      getUsdPrice(asset?.paymentToken?.symbol, tokenCost?.toNumber() || 0);
    }
  }, [paymentToken, tokenCost]);

  useEffect(() => {
    getAsset();
  }, [tokenId]);

  const getAsset = async () => {
    setLoading(true);
    const asset = await fetchAsset(tokenId);
    if (!asset) {
      history.push(`/all`);
      return;
    }
    setAsset(parseAsset(asset));
    setLoading(false);
  };

  return (
    <section className="list-view">
      {loading ? (
        <EditFormCardSkeleton />
      ) : (
        <Row>
          <Col span={24}>
            <Row className="list-view-wrapper">
              <Col span={24}>
                <h3>Edit property</h3>
              </Col>
              <Col span={24} style={{ margin: '10px 0' }}>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Row>
                      <Col span={24}>
                        <p className="drop-heading">Metaverse</p>
                      </Col>
                      <Col span={24}>
                        <EditViewLandDropdown
                          options={PlaceOptions}
                          onChange={() => {
                            console.log('');
                          }}
                          initialValuе={PlaceOptions[0]}
                          disabled={true}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col span={12}>
                    <Row>
                      <Col span={24}>
                        <p className="drop-heading">Property</p>
                      </Col>
                      <Col span={24}>
                        <EditViewLandDropdown
                          options={properties}
                          onChange={() => {
                            console.log('');
                          }}
                          initialValuе={initialProperty}
                          disabled={true}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <Row className="rent-period">
                  <Col span={8}>Rent Period</Col>
                  <Col span={16}>
                    <Row gutter={[16, 16]}>
                      <Col span={12} className="checkbox-wrapper">
                        <Checkbox onChange={handleMinCheckboxChange} checked={isMinPeriodSelected} /> min
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
                      <Col span={12} className="checkbox-wrapper">
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
                <span style={{ marginRight: '15px' }}>At any given time to be rented out at most</span>
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
              </Col>
              <Col span={24}>
                <Row className="price-container" gutter={[16, 16]}>
                  <Col span={24}>Price</Col>
                  <Col span={24}>
                    <Row>
                      <Col span={12} className="currency-wrapper">
                        <CurrencyDropdown
                          changeHandler={handleCurrencyChange}
                          paymentTokens={paymentTokens}
                          value={paymentToken}
                        />
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
                      <Col span={12}>
                        <Row justify="end">
                          <Col>
                            <button
                              type="button"
                              className="button-primary action-btn"
                              onClick={() => setShowWarningModal(true)}
                              disabled={saveDisabled}
                            >
                              <span>Save</span>
                            </button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={24}>
                    <Row>
                      <Col span={10} className="your-earning-container">
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
                                  name={getTokenIconName(paymentToken.symbol || '')}
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
              </Col>
              {errMessage && (
                <Col span={24} className="error-wrapper">
                  {errMessage}
                </Col>
              )}
            </Row>
          </Col>
          <WarningModal
            onCancel={() => {
              setShowWarningModal(false);
            }}
            onOk={handleSave}
            visible={showWarningModal}
            text={
              <>
                Changing the payment type will enforce the payout of any unclaimed rent accumulated for this property.
              </>
            }
          />
        </Row>
      )}
    </section>
  );
};

export default ListView;
