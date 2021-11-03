import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Col, Image, Row } from 'antd';
import { getEtherscanAddressUrl, getHumanValue, shortenAddr } from 'web3/utils';

import { padMetapassTokenId } from 'modules/land-works/helpers/helpers';

import enterDaoImage from '../../../../resources/png/enterdao.png';
import landImage from './assets/land.png';
import vectorImage from './assets/Vector.png';

import './index.scss';

interface ILandWorksCardProps {
  land: any;
}
const LandWorksCard: React.FC<ILandWorksCardProps> = ({ land }) => {
  const history = useHistory();

  return (
    <Col className="land-card-wrapper" xl={8} md={8} sm={12} xs={24}>
      <Card className="land-card" onClick={() => history.push(`./${land.id}`)}>
        <Row>
          <Col span={24}>
            <p className="land-name">
              {land.name}
              <span className="name-label-container">
                <img alt="vector Icon" className="name-label" src={vectorImage}></img>
              </span>
            </p>
          </Col>
        </Row>
        <Row>
          <Image
            placeholder={<Image className="land-image" src={landImage} preview={false} />}
            className="land-image"
            src={land.imageUrl}
            preview={false}
          />
        </Row>
        <Row className="land-info-row" justify="space-between">
          <Col span={17}>
            <span className="land-name">By {shortenAddr(land.owner)}</span>
          </Col>
          <Col style={{ textAlign: 'right' }} span={7}>
            <span className="land-id">ID: #{padMetapassTokenId(land.id)}</span>
          </Col>
        </Row>
        <Row className="land-info-row" justify="space-between">
          <Col span={17}>
            <img alt="EnterDao Icon" className="enterdao-icon" src={enterDaoImage}></img>
            <span className="land-name">{land.price} / day</span>
            <img alt="EnterDao Icon" className="enterdao-icon" src={enterDaoImage}></img>
          </Col>
          <Col style={{ textAlign: 'right' }} span={7}>
            <span className="land-id">{land.availability}</span>
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

export default LandWorksCard;
