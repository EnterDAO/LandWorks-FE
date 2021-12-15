import React from 'react';
import { Col, Row, Steps } from 'antd';

import Icon from 'components/custom/icon';

import cardImage from './assets/card.png';

import './index.scss';

const { Step } = Steps;

const SingleViewLandCard: React.FC = () => {
  return (
    <Row gutter={40} className="single-land-card-container">
      <Col span={12}>
        <Row>
          <Col span={24}>
            <img alt="vector Icon" className="card-image" src={cardImage}></img>
          </Col>
        </Row>
      </Col>
      <Col span={12} className="properties-container">
        <Row>
          <Col span={24}>
            <span className="card-name">Land (111, -91) </span>

            <span className="label card-name-hot-label">
              <Icon name="png/hot" className="name-label" />
              HOT
            </span>
            <span className="label card-name-estate-label">ESTATE</span>
          </Col>
          <Col span={24} className="properties-row">
            <Row>
              <Col span={14}>
                <span className="land-owner">
                  BY <span className="land-owner-address">0x46587217313336fd3</span>
                </span>
                <span className="label card-name-you-label">
                  <Icon name="png/you" className="name-label" />
                  YOU
                </span>
              </Col>
              <Col span={10}>
                <span className="available-heading">Available now</span>{' '}
                <span className="available-period">2-55 days</span>
              </Col>
            </Row>
          </Col>
          <Col span={24} className="rent-section">
            <Row>
              <Col span={12}>
                <Row>
                  <Col push={5} span={19} className="eth-price-container">
                    <Icon name="png/eth" className="eth-icon" />
                    <span className="price-eth">0.336</span>
                  </Col>
                  <Col push={7} span={17} className="usd-price-container">
                    <span className="price">$220</span>
                    <span className="per-day">/ day</span>
                    <Icon name="info-outlined" className="info-icon" />
                  </Col>
                </Row>
              </Col>
              <Col push={4} span={8} className="rent-btn-container">
                <button type="button" className={`button-primary `} onClick={() => {}}>
                  <span>Rent now</span>
                </button>
              </Col>
            </Row>
          </Col>
          <Col span={24} className="properties-row operator-container">
            <Row>
              <Col span={12}>
                <Row>
                  <Col span={24} className="current-address">
                    Current operator <Icon name="info-outlined" className="info-icon" />
                  </Col>
                  <Col span={24}>
                    <p className="land-operator-address">0x46587217313336fd3</p>
                  </Col>
                </Row>
              </Col>
              <Col span={12} style={{ textAlign: 'end' }}>
                <Row>
                  <Col span={24}>
                    <p className="rented-on">Rented on 05.11.2021</p>
                  </Col>
                  <Col span={24}>
                    <p className="remaining-time">5 days, 11 hours, 5mins remaining</p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col span={24} className="operator-update-container">
            <Row>
              <Col span={15} className="info-warning-text">
                <p>
                  Update the operator to the one that you configured in order to be authorised to publish
                  scenes/experiences on it.
                </p>
              </Col>
              <Col span={9} className="update-operator-btn">
                <button type="button" onClick={() => {}}>
                  <span>UPDATE OPERATOR</span>
                </button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default SingleViewLandCard;
