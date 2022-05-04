import React, { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Col, Row } from 'antd';

import './index.scss';

const highlightColor = '#68686a';
const baseColor = '#c1c1cf';

const EditFormCardSkeleton: FC = () => {
  return (
    <Col span={24} className="nft--card--skeleton">
      <Row gutter={[32, 32]}>
        <Col span={24}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Skeleton width={'100%'} height={20} baseColor={baseColor} highlightColor={highlightColor} duration={3} />
            </Col>
            <Col span={12}>
              <Skeleton width={'100%'} height={20} baseColor={baseColor} highlightColor={highlightColor} duration={3} />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row gutter={[16, 16]}>
            <Col span={8}></Col>
            <Col span={8}>
              <Skeleton width={'100%'} height={20} baseColor={baseColor} highlightColor={highlightColor} duration={3} />
            </Col>
            <Col span={8}>
              <Skeleton width={'100%'} height={20} baseColor={baseColor} highlightColor={highlightColor} duration={3} />
            </Col>
          </Row>
        </Col>

        <Col span={24}>
          <Row>
            <Col span={24}>
              <Skeleton width={'100%'} height={20} baseColor={baseColor} highlightColor={highlightColor} duration={3} />
            </Col>
          </Row>
        </Col>

        <Col span={24}>
          <Row>
            <Col span={24}>
              <Skeleton
                className="nft--card--skeleton--body"
                width={'100%'}
                height={'140px'}
                baseColor={baseColor}
                highlightColor={highlightColor}
                duration={3}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

export default EditFormCardSkeleton;
