import React from 'react';
import { Checkbox, Col, DatePicker, Row } from 'antd';

import Button from 'components/antd/button';
import Modal, { ModalProps } from 'components/antd/modal';
import Icon, { TokenIconNames } from 'components/custom/icon';

import { Dropdown } from '../lands-dropdown-select';

import './index.scss';

const PlaceOptions = [
  {
    label: 'Hottest first',
    value: 1,
  },
  {
    label: 'Price: low first',
    value: 2,
  },
  {
    label: 'Price: high first',
    value: 3,
  },
];

const PropertyOptions = [
  {
    label: 'Hottest first',
    value: 1,
  },
  {
    label: 'Price: low first',
    value: 2,
  },
  {
    label: 'Price: high first',
    value: 3,
  },
];

type Props = ModalProps & {
  txHash?: string;
  renderProgress?: () => React.ReactNode;
  renderSuccess?: () => React.ReactNode;
};

export const ListModal: React.FC<Props> = props => {
  const { txHash, renderProgress, renderSuccess, ...modalProps } = props;

  const handlePlaceChange = (e: any) => {
    console.log(e);
  };

  const handlePropertyChange = (e: any) => {
    console.log(e);
  };

  const handleMinChange = (e: any) => {
    console.log(e);
  };

  const handleMaxChange = (e: any) => {
    console.log(e);
  };

  return (
    <Modal
      width={750}
      className="list-modal"
      title={<p style={{ textAlign: 'center' }}>List Property</p>}
      {...modalProps}>
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <Row>
            <Col span={12}>
              <Row>
                <Col span={24}>Metaverse</Col>
                <Col span={24}>
                  <Dropdown options={PlaceOptions} onChange={handlePlaceChange} initialValuе={PlaceOptions[0]} />
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={24}>Property</Col>
                <Col span={24}>
                  <Dropdown
                    options={PropertyOptions}
                    onChange={handlePropertyChange}
                    initialValuе={PropertyOptions[0]}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row>
            <Col span={10}>Rent Period</Col>
            <Col span={12}>
              <Row>
                <Col span={12}>
                  min <Checkbox onChange={handleMinChange}>Checkbox</Checkbox>
                </Col>
                <Col span={12}>
                  max <Checkbox onChange={handleMaxChange}>Checkbox</Checkbox>
                </Col>
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
