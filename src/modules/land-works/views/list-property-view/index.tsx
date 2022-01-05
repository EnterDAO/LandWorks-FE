import React from 'react';
import { Checkbox, Col, Row } from 'antd';

import Button from 'components/antd/button';
import Icon from 'components/custom/icon';

import { Dropdown } from '../../components/lands-dropdown-select';
import { LandsInput } from '../../components/lands-input';
import CurrencyDropdown from '../../components/lands-rent-currency-select';
import { LandsPeriodDropdown } from '../../components/lands-rent-period-select';

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

const ListView: React.FC = () => {
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

  const handleCurrencyChange = (e: any) => {
    console.log(e);
  };

  const handleCostEthChange = (e: any) => {
    console.log(e);
  };

  const handleCostUsdChange = (e: any) => {
    console.log(e);
  };

  const handleApprove = (e: any) => {
    console.log(e);
  };

  const handleConfirmListing = (e: any) => {
    console.log(e);
  };
  return (
    <Row gutter={[10, 10]} justify="center" className="list-view">
      <Col span={24} className="head-nav content-container">
        <Button type="light" className="back-btn" onClick={() => console.log('go back')}>
          <span>
            <Icon name="arrow-back" className="eth-icon" />
            Back
          </span>
        </Button>
      </Col>
      <Col span={16}>
        <Row className="list-view-wrapper">
          <Col span={24} style={{ margin: '10px 0' }}>
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
                  <Col span={24}>
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
            <Row className="rent-period">
              <Col span={8}>Rent Period</Col>
              <Col span={14}>
                <Row gutter={[16, 16]}>
                  <Col span={12} className="checkbox-wrapper">
                    <Checkbox onChange={handleMinCheckboxChange} /> min
                    <LandsPeriodDropdown
                      options={MinRentPeriodOptions}
                      onChange={handleMinSelectChange}
                      onInputChange={handleMinInputChange}
                      initialValuе={MinRentPeriodOptions[0]}
                    />
                  </Col>
                  <Col span={12} className="checkbox-wrapper">
                    <Checkbox onChange={handleMaxCheckboxChange} /> max
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
          <Col span={24} className="future-period-wrapper">
            <Checkbox onChange={handleMaxCheckboxChange} />
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
                  <Col span={12} className="currency-wrapper">
                    <CurrencyDropdown changeHandler={handleCurrencyChange} />
                    <div className="price-input-wrapper">
                      <LandsInput onInputChange={handleCostEthChange} customClassName="price-eth-input" />
                      <LandsInput onInputChange={handleCostUsdChange} customClassName="price-usd-input" />
                    </div>
                    <span>/ day</span>
                  </Col>
                  <Col span={12}>
                    <Row>
                      <Col span={10}>
                        <span className="step">1.</span>
                        <button type="button" className="button-primary action-btn" onClick={handleApprove}>
                          <span>APPROVE</span>
                        </button>
                      </Col>
                      <Col span={14}>
                        <span className="step">2.</span>
                        <button type="button" className="button-primary action-btn" onClick={handleConfirmListing}>
                          <span>CONFIRM LISTING</span>
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
                              name="token-eth"
                              className="info-icon"
                              style={{ width: '16px', height: '16px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                            <span className="earning-text">0,5565 </span>
                          </Col>
                          <Col>
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
                              name="token-weth"
                              className="info-icon"
                              style={{ width: '16px', height: '16px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                            <span className="earning-text">0,5565 </span>
                          </Col>
                          <Col>
                            <p>3% Protocol fee</p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ListView;
