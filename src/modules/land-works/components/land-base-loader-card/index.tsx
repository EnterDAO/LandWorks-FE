import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Col, Row } from 'antd';

import './index.scss';

const highlightColor = '#68686a';
const baseColor = '#c1c1cf';

const LandCardSkeleton: FC = () => {
  return (
    <Col>
      <Row gutter={[16, 16]} className="nft--card--skeleton">
        <Col span={24}>
          <Row gutter={[16, 16]}>
            <Col span={20}>
              <Skeleton width={'100%'} height={20} baseColor={baseColor} highlightColor={highlightColor} duration={3} />
            </Col>
            <Col span={4}>
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
      </Row>
    </Col>
  );
};

export default LandCardSkeleton;
