import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Col, Image, Row } from 'antd';

import Button from 'components/antd/button';
import Icon, { TokenIconNames } from 'components/custom/icon';

import LandWorkCard from '../../components/land-works-card';
import SingleViewLandHistory from '../../components/land-works-card-history';
import SingleViewLandCard from '../../components/land-works-card-single-view';
import { RentModal } from '../../components/lands-rent-modal';
import { landsMockData } from './mockLands';

import './index.scss';

const SingleLand: React.FC = () => {
  // const history = useHistory();
  // const { tokenId } = useParams<{ tokenId: string }>();
  const [lands, setLands] = useState(landsMockData.slice(0, 2));
  const [showRentModal, setShowRentModal] = useState(false);

  const handleWithdraw = () => {};

  return (
    <div className="content-container single-card-section">
      <Row className="head-nav" style={{ marginBottom: '20px' }}>
        <Button type="light" className="back-btn" onClick={() => console.log('go back')}>
          <span>
            <Icon name="arrow-back" className="eth-icon" />
            Back
          </span>
        </Button>
        <button type="button" className="button-primary" onClick={handleWithdraw}>
          <span>WITHDRAW</span>
        </button>
      </Row>
      <SingleViewLandCard setShowRentModal={setShowRentModal} />
      <SingleViewLandHistory />
      <Row className="pooling-section">
        <Col className="pooling-heading">Pooling </Col>
        <Col className="pooling-description">
          The following properties are adjacent to this property. You can rent the adjacent properties to maximise the
          land you want to build scenes/experiences on
        </Col>
        <Col span={24}>
          <Row gutter={[15, 15]} style={{ paddingTop: '27px' }}>
            {lands.map(land => (
              <LandWorkCard key={land.id} land={land} />
            ))}
          </Row>
        </Col>
      </Row>

      <RentModal onCancel={() => setShowRentModal(false)} visible={showRentModal} />
    </div>
  );
};

export default SingleLand;
