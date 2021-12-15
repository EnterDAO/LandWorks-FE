import React from 'react';
import { Col, DatePicker, Row } from 'antd';

import Button from 'components/antd/button';
import Modal, { ModalProps } from 'components/antd/modal';
import Icon, { TokenIconNames } from 'components/custom/icon';

import './index.scss';

type Props = ModalProps & {
  txHash?: string;
  renderProgress?: () => React.ReactNode;
  renderSuccess?: () => React.ReactNode;
};

export const ListModal: React.FC<Props> = props => {
  const { txHash, renderProgress, renderSuccess, ...modalProps } = props;

  return (
    <Modal
      width={750}
      className="list-modal"
      title={<p style={{ textAlign: 'center' }}>List Property</p>}
      {...modalProps}>
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <Row>
            <Col span={12}>Metaverse dropdown</Col>
            <Col span={12}>Property dropdown</Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row>
            <Col span={10}>Rent Period</Col>
            <Col span={12}>
              <Row>
                <Col span={12}>min</Col>
                <Col span={12}>max</Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={24}>At any given time to be rented out at most 3 weeks in the future</Col>
        <Col span={24}>
          <Row>
            <Col span={24}>Price</Col>
            <Col span={24}>
              <Row>
                <Col span={12}>ETH 0,56652 $255 / day</Col>
                <Col span={12}>
                  <Row>
                    <Col span={12}>Aprove button</Col>
                    <Col span={12}>Confirm listing</Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col span={24}>Earnings</Col>
          </Row>
        </Col>
      </Row>
    </Modal>
  );
};
