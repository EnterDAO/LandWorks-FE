import React, { useState } from 'react';
import { Col, Row } from 'antd';

import Button from 'components/antd/button';
import Modal, { ModalProps } from 'components/antd/modal';

import './index.scss';

type Props = ModalProps & {
  renderProgress?: () => React.ReactNode;
  renderSuccess?: () => React.ReactNode;
  text: any;
};

export const WarningModal: React.FC<Props> = props => {
  const { renderProgress, renderSuccess, text, ...modalProps } = props;

  const [isModalVisible, setIsModalVisible] = useState(true);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal
      width={480}
      className="warning-modal"
      visible={isModalVisible}
      onOk={handleOk}
      title={<p style={{ textAlign: 'center' }}>Warning</p>}
      {...modalProps}>
      <Row>
        <Col span={24}>
          <p>{text}</p>
        </Col>
      </Row>
      <Row className="rent-modal-footer">
        <Button
          className="confirm-button"
          type="primary"
          onClick={() => {
            setIsModalVisible(false);
          }}>
          Ok
        </Button>
      </Row>
    </Modal>
  );
};
