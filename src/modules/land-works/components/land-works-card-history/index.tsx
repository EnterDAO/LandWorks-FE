import React from 'react';
import { Col, Row } from 'antd';

import './index.scss';

const SingleViewLandHistory: React.FC = () => {
  return (
    <Row gutter={40} className="single-land-history-container">
      <Col span={24}>
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
  );
};

export default SingleViewLandHistory;
