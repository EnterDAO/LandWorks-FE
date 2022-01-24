import React, { useState } from 'react';
import { Col, Row } from 'antd';

import Button from 'components/antd/button';
import Modal, { ModalProps } from 'components/antd/modal';

import './index.scss';

type Props = ModalProps & {
  renderProgress?: () => React.ReactNode;
  renderSuccess?: () => React.ReactNode;
  onOk: () => Promise<void>;
  text: any;
  title?: string;
};

export const WarningModal: React.FC<Props> = (props) => {
  const { renderProgress, renderSuccess, title, onOk, text, ...modalProps } = props;

  return (
    <Modal
      width={480}
      className="warning-modal"
      title={<p style={{ textAlign: 'center' }}>{title ? title : 'Warning'}</p>}
      {...modalProps}
    >
      <Row>
        <Col span={24}>
          <p>{text}</p>
        </Col>
      </Row>
      <Row className="rent-modal-footer">
        <Button className="confirm-button" type="primary" onClick={onOk}>
          Ok
        </Button>
      </Row>
    </Modal>
  );
};
