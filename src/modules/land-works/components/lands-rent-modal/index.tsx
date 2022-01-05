import React from 'react';
import { Col, Row } from 'antd';
import moment from 'moment';

import Button from 'components/antd/button';
import Modal, { ModalProps } from 'components/antd/modal';
import Icon from 'components/custom/icon';

import { RentDatePicker } from '../lands-rent-date-picker';

import './index.scss';

type Props = ModalProps & {
  txHash?: string;
  renderProgress?: () => React.ReactNode;
  renderSuccess?: () => React.ReactNode;
};

export const RentModal: React.FC<Props> = props => {
  const { txHash, renderProgress, renderSuccess, ...modalProps } = props;

  const minStartDate = moment.unix(1641390556); // 5
  const minRentPeriod = moment.unix(1641562583); // 7
  const maxEndDate = moment.unix(1641821784); // 10

  const handleRentDateChange = (date: any) => {
    // Those are the start and the end dates, upon ok press
    console.log(date);
  };

  return (
    <Modal
      width={376}
      className="rent-modal"
      title={<p style={{ textAlign: 'center' }}>Rent details</p>}
      {...modalProps}>
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <Row justify="center">
            <Col span={12}>
              <Row gutter={[16, 10]}>
                <Col span={24}>
                  <p className="light-text">
                    Choose end date
                    <Icon name="info-outlined" className="info-icon light-text" />
                  </p>
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
            <Col span={12} style={{ textAlign: 'end' }}>
              <Row gutter={[16, 5]} style={{ paddingTop: '10px' }}>
                <Col span={24}>
                  <p className="light-text">5 days</p>
                </Col>
                <Col span={24} className="bold-white-text">
                  11.15.2021
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="oprator-container">
            <Col span={24} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p className="light-text oprator-text">
                Operator
                <Icon name="info-outlined" className="info-icon light-text" />
              </p>
              <p className="light-text">you</p>
            </Col>
            <Col span={24}>
              <p className="operator-address">0X99AA5721188BFF33</p>
            </Col>
          </Row>
          <Row className="rent-modal-footer">
            <Col span={24}>
              <Button
                className="rent-button"
                type="primary"
                onClick={() => {
                  console.log('do rent stuff here');
                }}>
                <Row>
                  <Col>
                    <span className="rent-label">Rent Now </span>
                    <strong>
                      2,231 <Icon name="token-eth" className="eth-icon" /> <span>$4446.44</span>
                    </strong>
                  </Col>
                </Row>
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Modal>
  );
};
