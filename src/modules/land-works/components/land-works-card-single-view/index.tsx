import React from 'react';
import { Col, Row, Steps } from 'antd';

import Icon from 'components/custom/icon';

import cardImage from './assets/card.png';
import vectorImage from './assets/Vector.png';

import './index.scss';

const { Step } = Steps;

const SingleViewLandCard: React.FC = () => {
  return (
    <Row gutter={40} className="single-land-card-container">
      <Col span={12}>
        <Row>
          <Col span={24} style={{ marginBottom: '20px' }}>
            <span className="card-name">Land (111, -91) </span>

            <span className="card-name-hot-label">
              <img alt="vector Icon" className="name-label" src={vectorImage}></img>
              Hot
            </span>
          </Col>
          <Col span={24}>
            <img alt="vector Icon" className="card-image" src={cardImage}></img>
          </Col>
          <Col>
            <Row className="history">
              <Col span={24} className="history-label">
                Rent History
              </Col>

              <Row gutter={[5, 5]} className="history-rows-container">
                <Col span={24}>
                  <Row>
                    <Col className="history-row">
                      <p>
                        <span className="grey-text">by</span>
                        <span className="pink-text"> comomonsur.eth</span>
                        <span className="grey-text"> from</span>
                        <span className="black-text"> 12:23:45 11.09.2021</span>
                        <span className="grey-text"> to</span>
                        <span className="black-text"> 13:00:00 15.09.2021</span>
                      </p>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Row>
                    <Col className="history-row odd">
                      <p>
                        <span className="grey-text">by</span>
                        <span className="pink-text"> comomonsur.eth</span>
                        <span className="grey-text"> from</span>
                        <span className="black-text"> 12:23:45 11.09.2021</span>
                        <span className="grey-text"> to</span>
                        <span className="black-text"> 13:00:00 15.09.2021</span>
                      </p>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Row>
                    <Col className="history-row">
                      <p>
                        <span className="grey-text">by</span>
                        <span className="pink-text"> comomonsur.eth</span>
                        <span className="grey-text"> from</span>
                        <span className="black-text"> 12:23:45 11.09.2021</span>
                        <span className="grey-text"> to</span>
                        <span className="black-text"> 13:00:00 15.09.2021</span>
                      </p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col span={12} className="properties-container">
        <Row>
          <Col span={24} className="properties-row">
            <p>The best place in the metaverse</p>
          </Col>
          <Col span={24} className="properties-row">
            <Row>
              <Col span={12}>
                <span className="land-owner">
                  BY <span className="land-owner-address">0x46587217313336fd3</span>
                </span>
              </Col>
              <Col span={12}>
                <span className="available-heading">Available now</span>{' '}
                <span className="available-period">2-5 days</span>
              </Col>
            </Row>
          </Col>
          <Col span={24} className="properties-row">
            <span className="land-operator">
              Operator{' '}
              <span className="land-operator-address">
                0x46587217313336fd3 (YOU) <Icon name="pencil-outlined" className="edit" />
              </span>
            </span>
          </Col>
          <Col span={24} className="steps-agenda">
            <Steps direction="vertical" size="small" current={0}>
              <Step
                title={
                  <button className="agenda">
                    <span className="agenda-title-container">
                      <Icon name="file-clock" className="calendar" />
                      Select end Date
                    </span>
                    <Icon name="info-outlined" className="info-icon" />
                  </button>
                }
              />
              <Step
                title={
                  <button className="agenda">
                    <span className="agenda-title-container disabled">Rent now</span>
                  </button>
                }
              />
            </Steps>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default SingleViewLandCard;
