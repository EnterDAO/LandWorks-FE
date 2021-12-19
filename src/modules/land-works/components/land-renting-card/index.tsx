import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { bottom, end } from '@popperjs/core';
import { Card, Col, Image, Row } from 'antd';
import parse from 'date-fns/parse';
import { shortenAddr } from 'web3/utils';

import Icon from 'components/custom/icon';
import { isDateBeforeNow } from 'helpers/helpers';

import { LandCartChart } from '../land-cart-chart';
import landImage from '../land-works-card/assets/land.png';

import './index.scss';

interface ILandRentingCardProps {
  land: any;
  userAddress: string;
}
const LandRentingCard: React.FC<ILandRentingCardProps> = ({ land, userAddress }) => {
  const history = useHistory();
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {}, [land]);
  const operatorAddress = '0x75D38741878da8520d1Ae6db298A9BD994A5D241';
  const rentEndDate = parse('2022-01-31', 'yyyy-MM-dd', new Date());
  return (
    <Col className="rent-land-card-wrapper" xl={8} md={8} sm={12} xs={24}>
      <Card className="rent-land-card">
        <Row>
          <Col span={24}>
            <p className="rent-land-name">
              <span>{land.name}</span>
              {land.isHot && (
                <span className="label card-name-hot-label">
                  <Icon name="png/hot" className="name-label" />
                  HOT
                </span>
              )}
            </p>
          </Col>
        </Row>
        <Row>
          <Image
            onClick={() => history.push(`/land-works/land/${land.id}`)}
            placeholder={<Image className="rent-land-image" src={landImage} preview={false} />}
            className="rent-land-image"
            src={landImage}
            preview={false}
          />
        </Row>
        <Row>
          <Col span={24}>
            <Row className="rent-land-info-row" align={bottom}>
              <Col span={12} className="rent-operator-container">
                <Row>
                  <span>Operator</span>
                </Row>
                <Row>
                  <span className="rent-operator-address">
                    {shortenAddr(operatorAddress)}
                    {operatorAddress === userAddress && ' (YOU)'}
                  </span>
                </Row>
              </Col>
              <Col span={12}>
                <div className="rent-date-container">
                  <Row>
                    {isDateBeforeNow(rentEndDate) ? <span>Rent active until</span> : <span>Rent ended on</span>}
                  </Row>
                  <Row>{rentEndDate.toDateString()}</Row>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        {showChart && (
          <Row className="price-chart-container">
            <Col span={24}>
              <LandCartChart />
            </Col>
          </Row>
        )}
      </Card>
    </Col>
  );
};

export default LandRentingCard;
