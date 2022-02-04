import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { bottom } from '@popperjs/core';
import { Card, Col, Image, Row } from 'antd';
import { ethers } from 'ethers';
import { shortenAddr } from 'web3/utils';

import { getENSName, getLandImageUrl, isDateBeforeNow as isTimestampBeforeNow, timestampSecondsToDate } from 'helpers/helpers';

import { ReactComponent as HotIcon } from '../../../../resources/svg/hot.svg';
import landImage from '../land-works-card/assets/land.png';

import { getNowTs } from '../../../../utils';

import './index.scss';

interface ILandRentingCardProps {
  land: any;
  userAddress: string;
}
const LandRentingCard: React.FC<ILandRentingCardProps> = ({ land, userAddress }) => {
  const history = useHistory();

  const getRentText = () => {
    const now = getNowTs();
    if (now >= Number(land.start) && now < Number(land.end)) {
      return 'Rent active until';
    } else {
      if (now < Number(land.start)) {
        return 'Rent starts on';
      } else {
        return 'Rent ended on';
      }
    }
  };

  const getRentDate = () => {
    const now = getNowTs();
    if (now >= Number(land.start) && now < Number(land.end)) {
      return timestampSecondsToDate(land.end);
    } else {
      if (now < Number(land.start)) {
        return timestampSecondsToDate(land.start);
      } else {
        return timestampSecondsToDate(land.end);
      }
    }
  };
  const [ens, setEns] = useState<string>();
  useEffect(() => {
    if (land.operator)
      getENSName(land.operator).then((ensName) => {
        setEns(ensName);
      });
  }, [land]);

  return (
    <Col className="rent-land-card-wrapper" xl={8} md={8} sm={12} xs={24}>
      <Card className="rent-land-card">
        <Row>
          <Col span={24}>
            <div className="rent-land-name land-name">
              <span>{land.name}</span>
              <div>
                {true && (
                  <span className="label card-name-hot-label">
                    <HotIcon className="name-label" />
                    HOT
                  </span>
                )}
                {!land.asset.decentralandData.isLAND && <span className="label card-name-estate-label">ESTATE</span>}
              </div>
            </div>
          </Col>
        </Row>
        <Row className="image-list-wrapper">
          <Image
            onClick={() => history.push(`/property/${land.asset.id}`)}
            placeholder={<Image className="rent-land-image" src={landImage} preview={false} />}
            className="rent-land-image"
            src={getLandImageUrl(land.asset)}
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
                    {ens && ens !== land.operator ? ens : shortenAddr(land.operator || ethers.constants.AddressZero)}
                    {land.operator && land.operator.toLowerCase() === userAddress.toLowerCase() && ' (YOU)'}
                  </span>
                </Row>
              </Col>
              <Col span={12}>
                <div className="rent-date-container">
                  <Row>
                    <span>{getRentText()}</span>
                  </Row>
                  <Row className="rent-date">{getRentDate()}</Row>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

export default LandRentingCard;
