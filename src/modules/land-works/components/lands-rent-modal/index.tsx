import React, { useEffect, useState } from 'react';
import { Col, Input, Row } from 'antd';
import BigNumber from 'bignumber.js';
import moment from 'moment';

import Button from 'components/antd/button';
import Modal, { ModalProps } from 'components/antd/modal';
import Icon from 'components/custom/icon';
import SmallAmountTooltip from 'components/custom/smallAmountTooltip';
import { getTokenIconName, timestampSecondsToDate } from 'helpers/helpers';
import { ToastType, showToastNotification } from 'helpers/toast-notifcations';

import { getTokenPrice } from '../../../../components/providers/known-tokens-provider';
import config from '../../../../config';
import { useWallet } from '../../../../wallets/wallet';
import Erc20Contract from '../../../../web3/erc20Contract';
import { AssetAvailablity, PaymentToken } from '../../api';
import { useLandworks } from '../../providers/landworks-provider';
import { RentDatePicker } from '../lands-rent-date-picker';

import { getFormattedTime, isValidAddress } from '../../../../utils';
import { ONE_ADDRESS, getHumanValue } from '../../../../web3/utils';

import './index.scss';
import {LandsTooltip} from "../lands-tooltip";

type Props = ModalProps & {
  txHash?: string;
  availability?: AssetAvailablity;
  assetId?: string;
  pricePerSecond?: BigNumber;
  paymentToken?: PaymentToken;
  renderProgress?: () => React.ReactNode;
  renderSuccess?: () => React.ReactNode;
};

export const RentModal: React.FC<Props> = (props) => {
  const {
    txHash,
    availability,
    assetId,
    pricePerSecond,
    paymentToken,
    onCancel,
    renderProgress,
    renderSuccess,
    ...modalProps
  } = props;

  const minStartDate = moment.unix(availability?.startRentDate || 0);
  const minRentPeriod = moment.unix(availability?.minRentDate || 0);
  const maxEndDate = moment.unix(availability?.maxRentDate || 0);

  const wallet = useWallet();
  const landworks = useLandworks();

  const { landWorksContract } = landworks;

  const [editedValue, setEditedValue] = useState<string>('');
  const [period, setPeriod] = useState(0);
  const [endDate, setEndDate] = useState('');
  const [isRentDisabled, setRentDisabled] = useState(true);
  const [totalPrice, setTotalPrice] = useState(new BigNumber(0));
  const [usdPrice, setUsdPrice] = useState(new BigNumber(0));
  const [errAddressMessage, setErrAddressMessage] = useState<string>('');
  const [erc20Contract, setErc20Contract] = useState(new Erc20Contract([], ''));
  const [approveValue, setApproveValue] = useState(new BigNumber(0));

  const handleRentDateChange = (date: moment.Moment[]) => {
    // Those are the start and the end dates, upon ok press
    const start = date[0];
    const end = date[1];

    const period = end.unix() - start.unix();
    setPeriod(period);
    setEndDate(timestampSecondsToDate(end.unix().toString()));
  };

  const isYou = () => {
    return wallet.account && wallet.account.toLowerCase() === editedValue.toLowerCase();
  };

  const calculatePrices = async () => {
    const decimalPrice = getHumanValue(new BigNumber(pricePerSecond || 0), paymentToken?.decimals);
    const totalPrice = new BigNumber(period).multipliedBy(decimalPrice!);
    setTotalPrice(totalPrice);
    const usdTokenPrice = getTokenPrice(paymentToken?.symbol || 'eth');
    const usdPrice = usdTokenPrice?.multipliedBy(totalPrice || 0);
    setUsdPrice(usdPrice || new BigNumber(0));
  };

  const shouldShowApproveButton = () => {
    return paymentToken && paymentToken.id !== ONE_ADDRESS;
  };

  const handleChange = (e: any) => {
    if (isValidAddress(e.target.value)) {
      setErrAddressMessage('');
    } else {
      setErrAddressMessage('Invalid address provided');
    }
    setEditedValue(e.target.value);
  };

  const handleApprove = async () => {
    if (paymentToken === undefined || paymentToken.id !== ONE_ADDRESS) {
      return;
    }

    try {
      await erc20Contract.approve(true, config.contracts.landworksContract);
      showToastNotification(ToastType.Success, `${paymentToken.symbol} approved successfully.`);
    } catch (e) {
      console.log(e);
      showToastNotification(ToastType.Error, 'There was an error while approviing');
    }
  };

  const handleRent = async () => {
    if (!isValidForm()) {
      return;
    }

    try {
      const bnPeriod = new BigNumber(period);
      if (paymentToken?.symbol.toLowerCase() === 'eth') {
        await landWorksContract?.rentDecentralandWithETH(assetId!, editedValue, bnPeriod, approveValue, onCancel);
      } else {
        await landWorksContract?.rentDecentralandWithERC20(assetId!, editedValue, bnPeriod, onCancel);
      }
      showToastNotification(ToastType.Success, 'Property rented successfuly!');
      onCancel();
    } catch (e) {
      showToastNotification(ToastType.Error, 'There was an error while renting the property.');
      console.log(e);
    }
  };

  const isValidForm = () => {
    return isValidAddress(editedValue) && period > 0;
  };

  useEffect(() => {
    calculatePrices();
    setApproveValue(new BigNumber(period).multipliedBy(pricePerSecond!));
  }, [period]);

  useEffect(() => {
    if (wallet.account) {
      setEditedValue(wallet.account);
      erc20Contract.setAccount(wallet.account);
    } else {
      onCancel();
    }
  }, [wallet.account]);

  useEffect(() => {
    setRentDisabled(!isValidForm());
  }, [editedValue, period]);

  useEffect(() => {
    if (paymentToken) {
      const contract = new Erc20Contract([], paymentToken.id);
      if (wallet.account && wallet.provider) {
        contract.setAccount(wallet.account);
        contract.setProvider(wallet.provider);
        contract.loadAllowance(config.contracts.landworksContract).catch(Error);
      }
      setErc20Contract(contract);
    }
  }, [paymentToken]);

  return (
    <Modal
      width={450}
      className="rent-modal"
      title={<p style={{ textAlign: 'center' }}>Rent details</p>}
      onCancel={onCancel}
      {...modalProps}
    >
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <Row justify="center">
            <Col span={24}>
              <Row gutter={[16, 10]}>
                <Col span={24} className="title-period">
                  <p className="light-text">
                    Choose rent period
                    <LandsTooltip placement="bottomLeft" trigger="hover" text="The period for which the property will be rented. Properties have limitations such as minimum or maximum renting periods." />
                  </p>
                  <p className="light-text">{getFormattedTime(period)}</p>
                </Col>
                <Col span={24}>
                  <RentDatePicker
                    minStartDate={minStartDate}
                    minRentPeriod={minRentPeriod}
                    maxEndDate={maxEndDate}
                    handleRentDateChange={handleRentDateChange}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="oprator-container">
            <Col span={24} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p className="light-text oprator-text">
                Operator
                <LandsTooltip placement="bottomLeft" trigger="hover" text="The address that will be authorised to deploy scenes and experiences on the rented property during your renting period." />
              </p>
              <p>{errAddressMessage}</p>
              {isYou() && <p className="light-text">you</p>}
            </Col>
            <Col span={24}>
              <Input
                placeholder="Operator Address"
                bordered={false}
                defaultValue={editedValue}
                onChange={handleChange}
                value={editedValue}
              />
            </Col>
          </Row>
          {shouldShowApproveButton() && (
            <Row className="rent-modal-footer">
              <Col span={24} className="approve-wrapper">
                <p>1. Approve transaction</p>
                <Button type="primary" onClick={handleApprove}>
                  APPROVE
                </Button>
              </Col>
            </Row>
          )}
          <Row className="rent-modal-footer">
            <Col span={24}>
              <Button
                style={{ display: 'block' }}
                className="rent-button"
                type="primary"
                disabled={isRentDisabled}
                onClick={handleRent}
              >
                <Row justify="center">
                  <Col
                    className="rent-label-container"
                    span={8}
                    style={{ borderRight: '1px solid rgba(255, 255, 255, 0.22)' }}
                  >
                    <span className="rent-label">Rent Now </span>
                  </Col>
                  <Col className="price-col" span={16}>
                    <strong>
                      <SmallAmountTooltip amount={totalPrice} />{' '}
                      <Icon name={getTokenIconName(paymentToken?.symbol || '')} className="eth-icon" />{' '}
                    </strong>

                    <strong>
                      <span>
                        <SmallAmountTooltip amount={usdPrice} symbol="$" />
                      </span>
                    </strong>
                  </Col>
                  {/* <Col className="price-col" span={10}>
                  </Col> */}
                </Row>
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Modal>
  );
};
