import React from 'react';
import { Checkbox, Col, DatePicker, Row } from 'antd';

import Button from 'components/antd/button';
import Modal, { ModalProps } from 'components/antd/modal';
import Icon, { TokenIconNames } from 'components/custom/icon';

import { CustomDropdown } from '../lands-custom-select';
import { Dropdown } from '../lands-dropdown-select';
import { LandsPeriodDropdown } from '../lands-rent-period-select';

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

const MinRentPeriodOptions = [
  {
    label: 'mins',
    value: 1,
  },
  {
    label: 'hours',
    value: 2,
  },
  {
    label: 'days',
    value: 3,
  },
];

const MaxRentPeriodOptions = [
  {
    label: 'mins',
    value: 1,
  },
  {
    label: 'hours',
    value: 2,
  },
  {
    label: 'days',
    value: 3,
  },
];

const AtMostRentPeriodOptions = [
  {
    label: 'weeks',
    value: 1,
  },
  {
    label: 'hours',
    value: 2,
  },
  {
    label: 'days',
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

  const handleMinCheckboxChange = (e: any) => {
    console.log(e);
  };

  const handleMinSelectChange = (e: any) => {
    console.log(e);
  };

  const handleMinInputChange = (e: any) => {
    console.log(e);
  };

  const handleMaxCheckboxChange = (e: any) => {
    console.log(e);
  };

  const handleMaxSelectChange = (e: any) => {
    console.log(e);
  };

  const handleMaxInputChange = (e: any) => {
    console.log(e);
  };

  const handleAtMostSelectChange = (e: any) => {
    console.log(e);
  };

  const handleAtMostInputChange = (e: any) => {
    console.log(e);
  };

  return (
    <Modal
      width={750}
      className="list-modal"
      title={<p style={{ textAlign: 'left', fontSize: '18px', fontWeight: '700' }}>List Property</p>}
      {...modalProps}>
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Row>
                <Col span={24}>
                  <p className="drop-heading">Metaverse</p>
                </Col>
                <Col span={24}>
                  <Dropdown options={PlaceOptions} onChange={handlePlaceChange} initialValuе={PlaceOptions[0]} />
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={24} className="drop-heading">
                  <p className="drop-heading">Property</p>
                </Col>
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
          <Row style={{ borderBottom: '1px solid' }}>
            <Col span={8}>Rent Period</Col>
            <Col span={14}>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  min <Checkbox onChange={handleMinCheckboxChange} />
                  <LandsPeriodDropdown
                    options={MinRentPeriodOptions}
                    onChange={handleMinSelectChange}
                    onInputChange={handleMinInputChange}
                    initialValuе={MinRentPeriodOptions[0]}
                  />
                </Col>
                <Col span={12}>
                  max <Checkbox onChange={handleMaxCheckboxChange} />
                  <LandsPeriodDropdown
                    options={MaxRentPeriodOptions}
                    onChange={handleMaxSelectChange}
                    onInputChange={handleMaxInputChange}
                    initialValuе={MaxRentPeriodOptions[0]}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <span style={{ marginRight: '15px' }}>At any given time to be rented out at most</span>
          <LandsPeriodDropdown
            options={AtMostRentPeriodOptions}
            onChange={handleAtMostSelectChange}
            onInputChange={handleAtMostInputChange}
            initialValuе={AtMostRentPeriodOptions[0]}
          />
          <span style={{ marginLeft: '15px' }}>in the future</span>
          <Icon
            name="info-outlined"
            className="info-icon"
            style={{ width: '16px', height: '16px', verticalAlign: 'middle', marginLeft: '5px' }}
          />
        </Col>
        <Col span={24}>
          <Row className="price-container" gutter={[16, 16]}>
            <Col span={24}>Price</Col>
            <Col span={24}>
              <Row>
                <Col span={12}>
                  <CustomDropdown
                    options={PropertyOptions}
                    onChange={handlePropertyChange}
                    initialValuе={PropertyOptions[0]}
                  />
                  0,56652 $255 / day
                </Col>
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
