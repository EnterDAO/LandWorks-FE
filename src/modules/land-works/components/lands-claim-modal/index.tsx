import React from 'react';
import { Checkbox, Col, Row } from 'antd';

import Button from 'components/antd/button';
import Modal, { ModalProps } from 'components/antd/modal';
import Icon, { TokenIconNames } from 'components/custom/icon';
import { LandClaimCheckBox } from 'modules/land-works/components/land-claim-modal-checkbox';

import './index.scss';

type Props = ModalProps & {
  txHash?: string;
  renderProgress?: () => React.ReactNode;
  renderSuccess?: () => React.ReactNode;
};

type ICheckboxInfo = {
  name: string;
  price: number;
  icon: TokenIconNames;
};

const inputsData: ICheckboxInfo[] = [
  { name: 'Land (90, -111)', price: 0.54, icon: 'token-eth' },
  { name: 'Land (90, -111)', price: 0.54, icon: 'token-usdc' },
  { name: 'Land (90, -111)', price: 0.54, icon: 'token-usdc' },
  { name: 'Land (90, -111)', price: 0.54, icon: 'token-eth' },
  { name: 'Land (90, -111)', price: 0.54, icon: 'token-usdc' },
  { name: 'Land (90, -111)', price: 0.54, icon: 'token-eth' },
];

export const ClaimModal: React.FC<Props> = props => {
  const { txHash, renderProgress, renderSuccess, ...modalProps } = props;

  return (
    <Modal width={471} className="claim-modal" title={<p style={{ textAlign: 'center' }}>Claim</p>} {...modalProps}>
      <Row gutter={[10, 10]}>
        {inputsData.map(data => (
          <Col span={24}>
            <LandClaimCheckBox data={data} />
          </Col>
        ))}
        <Col span={24} className="max-transaction-limit">
          <p>You have reached the limit of max claims in one transaction.</p>
        </Col>
        <Col span={24} className="claim-modal-footer">
          <Row>
            <Col span={19} className="prices-container">
              <p>
                <span className="total-label">Total:</span>{' '}
                <span className="total-price">
                  434 <Icon name="token-eth" className="eth-icon" />
                </span>{' '}
                <span className="total-price">
                  434 <Icon name="token-usdc" className="eth-icon" />
                </span>
              </p>
            </Col>
            <Col span={5}>
              <Button
                className="claim-button"
                type="primary"
                onClick={() => {
                  console.log('do claiming stuff here');
                }}>
                Claim
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Modal>
  );
};
