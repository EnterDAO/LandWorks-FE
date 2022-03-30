import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Divider, Grid, ModalProps } from '@mui/material';
import BigNumber from 'bignumber.js';
import moment, { Moment } from 'moment';
import { RangeValue } from 'rc-picker/lib/interface';
import { ONE_ADDRESS, getEtherscanAddressUrl, getHumanValue } from 'web3/utils';

import Icon from 'components/custom/icon';
import SmallAmountTooltip from 'components/custom/smallAmountTooltip';
import config from 'config';
import { Button, Input, Modal, Tooltip } from 'design-system';
import { CalendarIcon, ProfileIcon, WarningIcon } from 'design-system/icons';
import { getTokenIconName } from 'helpers/helpers';
import { ToastType, showToastNotification } from 'helpers/toast-notifcations';
import { getTokenPrice } from 'providers/known-tokens-provider';
import { useWallet } from 'wallets/wallet';

import { AssetAvailablity, PaymentToken, fetchAssetLastRentEnd } from '../../api';
import { useErc20 } from '../../providers/erc20-provider';
import { useLandworks } from '../../providers/landworks-provider';
import { ModalLoader } from '../lands-modal-loading';
import { ModalSuccess } from '../lands-modal-success';
import { RentDatePicker } from '../lands-rent-date-picker';

import { isValidAddress } from 'utils';
import { HOUR_IN_SECONDS } from '../../../../utils/date';

import './index.scss';

type Props = ModalProps & {
  txHash?: string;
  availability?: AssetAvailablity;
  assetId?: string;
  pricePerSecond?: BigNumber;
  paymentToken?: PaymentToken;
  onSubmit: () => void;
  onCancel: () => void;
};

export const RentModal: React.FC<Props> = (props) => {
  const { availability, assetId, pricePerSecond, paymentToken, onCancel, onSubmit, ...modalProps } = props;

  // added one minute each to be able to choose if MIN & MAX
  const fixedMinStartRentDate = availability?.startRentDate || 0;
  const minStartDate = moment.unix(fixedMinStartRentDate);
  const minRentPeriod = moment.unix(availability?.minRentDate || 0);
  const maxEndDate = moment.unix(availability?.maxRentDate || 0);

  const wallet = useWallet();
  const landworks = useLandworks();
  const erc20 = useErc20();
  const history = useHistory();

  const { landWorksContract } = landworks;
  const { erc20Contract } = erc20;

  const [editedValue, setEditedValue] = useState<string>(wallet.account || '');
  const [period, setPeriod] = useState(0);
  const [endDate, setEndDate] = useState<string>();
  const [totalPrice, setTotalPrice] = useState(new BigNumber(0));
  const [usdPrice, setUsdPrice] = useState(new BigNumber(0));
  const [errMessage, setErrMessage] = useState<string>('');
  const [isActiveOperatorInput, setIsActiveOperatorInput] = useState<boolean>(false);
  const [transactionLoading, setTransactionLoading] = useState<boolean>(false);
  const [successTrunsaction, setSuccessTrunsaction] = useState<boolean>(false);

  const [value, setValue] = useState(new BigNumber(0));
  const [approveDisabled, setApproveDisabled] = useState(false);
  const [rentDisabled, setRentDisabled] = useState(false);

  const handleRentDateChange = (values: RangeValue<Moment>) => {
    // Those are the start and the end dates, upon ok press
    const start = (values as Moment[])[0];
    const end = (values as Moment[])[1];

    setEndDate(end.format('DD MMM YYYY, HH:mm'));
    const period = end.unix() - start.unix();

    end.unix() - minRentPeriod.unix() >= 0 ? setPeriod(period) : setPeriod(-1);
  };

  const isYou = () => {
    return wallet.account && wallet.account.toLowerCase() === editedValue.toLowerCase();
  };

  const calculatePrices = async () => {
    const decimalPrice = getHumanValue(new BigNumber(pricePerSecond || 0), paymentToken?.decimals);
    const totalPrice = new BigNumber(period).multipliedBy(decimalPrice as BigNumber);
    setTotalPrice(totalPrice);
    const usdTokenPrice = getTokenPrice(paymentToken?.symbol || 'eth');
    const usdPrice = usdTokenPrice?.multipliedBy(totalPrice || 0);
    setUsdPrice(usdPrice || new BigNumber(0));
  };

  const shouldShowApproveButton = () => {
    return paymentToken && paymentToken.id !== ONE_ADDRESS;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    setEditedValue(e.target.value);
  };

  const checkApprovedAmount = async () => {
    if (paymentToken?.id === ONE_ADDRESS) {
      setRentDisabled(false);
    } else {
      const balance = erc20Contract?.balance;
      if (balance == null) {
        setApproveDisabled(true);
        setRentDisabled(true);
        return;
      }
      if (balance.lt(balance)) {
        setApproveDisabled(true);
        setRentDisabled(true);
        return;
      }

      const allowance = erc20Contract?.getAllowanceOf(config.contracts.landworksContract);

      if (allowance == null) {
        setApproveDisabled(false);
        setRentDisabled(true);
      } else {
        if (value.lte(allowance)) {
          setApproveDisabled(true);
          setRentDisabled(false);
        } else {
          setApproveDisabled(false);
          setRentDisabled(true);
        }
      }
    }
  };

  const handleApprove = async () => {
    if (paymentToken === undefined || paymentToken.id === ONE_ADDRESS) {
      return;
    }
    try {
      setTransactionLoading(true);
      await erc20Contract?.approveAmount(value, config.contracts.landworksContract, () => {
        setApproveDisabled(true);
      });
      setTransactionLoading(false);
      showToastNotification(ToastType.Success, `${paymentToken.symbol} approved successfully.`);

      erc20Contract?.loadAllowance(config.contracts.landworksContract).catch(Error);
      checkApprovedAmount();
    } catch (e) {
      console.log(e);
      setTransactionLoading(false);
      showToastNotification(ToastType.Error, 'There was an error while approviing');
    }
  };

  const handleRent = async () => {
    if (!isValidForm() || !assetId || !paymentToken) {
      return;
    }
    try {
      setTransactionLoading(true);
      const bnPeriod = new BigNumber(period);
      const lastRentEnd = await fetchAssetLastRentEnd(assetId);
      const maxRentStart = lastRentEnd + HOUR_IN_SECONDS;

      if (paymentToken?.symbol.toLowerCase() === 'eth') {
        await landWorksContract?.rentDecentralandWithETH(
          assetId,
          editedValue,
          bnPeriod,
          maxRentStart,
          paymentToken.id,
          value,
          onSubmit
        );
      } else {
        await landWorksContract?.rentDecentralandWithERC20(
          assetId,
          editedValue,
          bnPeriod,
          maxRentStart,
          paymentToken.id,
          value,
          onSubmit
        );
        erc20Contract?.loadAllowance(config.contracts.landworksContract);
      }
      setTransactionLoading(false);
      setSuccessTrunsaction(true);
    } catch (e) {
      showToastNotification(ToastType.Error, 'There was an error while renting the property.');
      setTransactionLoading(false);
      console.log(e);
    }
  };

  function isValidForm(): boolean {
    return isValidAddress(editedValue) && period > 0;
  }
  const showLoader = () => transactionLoading && !successTrunsaction;
  const showSuccessModal = () => !transactionLoading && successTrunsaction;

  useEffect(() => {
    calculatePrices();
    setValue(new BigNumber(period).multipliedBy(pricePerSecond as BigNumber));
  }, [period]);

  useEffect(() => {
    if (wallet.account) {
      setEditedValue(wallet.account);
    }
  }, [wallet.account]);

  useEffect(() => {
    checkApprovedAmount();
  }, [wallet.account, value]);

  useEffect(() => {
    if (!isValidAddress(editedValue)) {
      if (editedValue === '') {
        setErrMessage('No operator address provided');
      } else {
        setErrMessage('Invalid address provided');
      }
    }
    if (paymentToken?.id !== ONE_ADDRESS) {
      const balance = erc20Contract?.balance;
      if (balance?.lt(value)) {
        setErrMessage('Insufficient balance');
      }
    }
    if (value?.isNegative()) setErrMessage('Invalid end date or time');
  }, [editedValue, value]);

  return (
    <Modal className="modal-propety" handleClose={onCancel} {...modalProps}>
      {!transactionLoading && !successTrunsaction && (
        <Grid container className="rent-modal">
          <Grid item>
            <Grid item>
              <h1 style={{ textAlign: 'center' }}>Rent Property details</h1>
              <Grid container direction="column">
                <Grid item className="title-period">
                  <CalendarIcon className="profile-icon" />
                  <span className="light-text">Choose rent period</span>
                </Grid>
                <Grid item>
                  <Divider className="divider" />
                </Grid>
                <Grid item>
                  <RentDatePicker
                    endDate={endDate}
                    minStartDate={minStartDate}
                    minRentPeriod={minRentPeriod}
                    maxEndDate={maxEndDate}
                    handleRentDateChange={handleRentDateChange}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid container className="operator-container">
              <Grid item style={{ display: 'flex' }}>
                <p className="light-text">
                  <ProfileIcon className="profile-icon" />
                  Configured Operator
                  <Tooltip
                    placement="bottom-end"
                    title="The address that will be authorised to deploy scenes and experiences on the rented property during your renting period."
                  >
                    <span>
                      <Icon name="about" className="info-icon" />
                    </span>
                  </Tooltip>
                </p>
              </Grid>
              <Divider className="divider" />
              <Grid item style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p className="operator-text">Operator address</p>
              </Grid>
              <Grid item>
                <Input
                  className="operator-input"
                  placeholder="Operator Address"
                  onFocus={() => setIsActiveOperatorInput(true)}
                  onBlur={() => setIsActiveOperatorInput(false)}
                  value={editedValue + `${isYou() && !isActiveOperatorInput ? ' (You)' : ''}`}
                  onChange={handleChange}
                />
              </Grid>
              {!isValidForm() && errMessage && <div className="error-wrapper">{errMessage}</div>}

              <Grid item className="info-warning-container info">
                <WarningIcon className="warning-icon" />
                <div className="info-warning-text">
                  <h3>Important info</h3>
                  <p>
                    In order to change the operator after you`ve already rented, you`ll need to pay a network fee.Also
                    you will need to Synchronise the configured operator with the Metaverse once your rent becomes
                    active. This is required so that the operator you've defined is updated in the metaverse as well.
                  </p>
                </div>
              </Grid>
            </Grid>
            <Divider className="divider" />
            {isValidForm() && (
              <>
                <Grid container className="rent-modal-footer">
                  <Grid item className="summary">
                    <p className="light-text">Summary</p>
                    <Grid container style={{ justifyContent: 'space-between' }}>
                      <Grid item className="rent-period">
                        <p>Rent period</p>
                        <span>
                          {minStartDate.format('DD MMM YYYY, HH:mm')} - {endDate}
                        </span>
                      </Grid>
                      <Grid item className="rent-price">
                        <p>Rent price</p>
                        <span>
                          <>
                            <Icon name={getTokenIconName(paymentToken?.symbol || '')} className="eth-icon" />{' '}
                            <SmallAmountTooltip amount={totalPrice} /> {paymentToken?.symbol || ''}{' '}
                          </>
                          <>
                            <span className="price">
                              <SmallAmountTooltip amount={usdPrice} symbol="$" />
                            </span>
                          </>
                        </span>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item className="info-warning-container info">
                    <WarningIcon className="warning-icon" />
                    <div className="info-warning-text">
                      <h3>Keep in mind</h3>
                      <p>There is a network fee in order to rent this property.</p>
                    </div>
                  </Grid>
                </Grid>
                <Grid container className="button-container">
                  {shouldShowApproveButton() && rentDisabled && (
                    <Button
                      variant="gradient"
                      className="rent-button"
                      onClick={handleApprove}
                      disabled={approveDisabled}
                    >
                      APPROVE
                    </Button>
                  )}
                  <Button
                    style={{ display: 'block' }}
                    className="rent-button"
                    variant="gradient"
                    disabled={rentDisabled}
                    onClick={handleRent}
                  >
                    <div className="rent-label-container">
                      <span className="rent-label">Rent Now </span>
                    </div>
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      )}
      {showSuccessModal() && (
        <ModalSuccess
          title="Successfully Rented!"
          buttonText="go to my properties"
          description="Nice! You’ve successfully rented this property."
          buttonEvent={() => history.push('/my-properties')}
        />
      )}
      {showLoader() && <ModalLoader href={getEtherscanAddressUrl(wallet.account) || ''} />}
    </Modal>
  );
};
