import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Col, Row } from 'antd';
import { Power1, gsap } from 'gsap';

import { ReactComponent as LeftBlocks } from 'resources/svg/landing/hero-left-blocks.svg';
import { ReactComponent as RightBlocks } from 'resources/svg/landing/hero-right-blocks.svg';

import './index.scss';

export const Hero: React.FC = () => {
  const history = useHistory();
  const el = useRef() as React.MutableRefObject<HTMLDivElement>;
  const tl = useRef({});
  const q = gsap.utils.selector(el);

  useEffect(() => {
    tl.current = gsap
      .timeline()
      .repeat(-1)
      .delay(2)
      .set(q('.first-ether'), { perspective: 300 })
      .set(q('.second-ether'), { perspective: 300 })
      .set(q('.third-ether'), { perspective: 300 })
      .to(q('.first-plus'), {
        opacity: 0,
        ease: Power1.easeOut,
      })
      .to(q('.first-block'), {
        strokeWidth: 4,
        stroke: '#5D8FF0',
        ease: Power1.easeOut,
      })
      .to(q('.first-pattern'), {
        opacity: 1,
        ease: Power1.easeOut,
      })
      .to(q('.second-plus'), {
        opacity: 0,
        ease: Power1.easeOut,
      })
      .to(q('.second-block'), {
        strokeWidth: 4,
        stroke: '#5D8FF0',
        ease: Power1.easeOut,
      })
      .to(q('.second-pattern'), {
        opacity: 1,
        ease: Power1.easeOut,
      })
      .to(q('.third-plus'), {
        opacity: 0,
        ease: Power1.easeOut,
      })
      .to(q('.third-block'), {
        strokeWidth: 4,
        stroke: '#5D8FF0',
        ease: Power1.easeOut,
      })
      .to(q('.third-pattern'), {
        opacity: 1,
        ease: Power1.easeOut,
      })
      .to(q('.first-ether'), {
        opacity: 1,
        y: -70,
        rotationY: 360,
      })
      .to(q('.first-ether'), {
        opacity: 0,
        y: -105,
        rotationY: 360,
      })
      .to(q('.third-ether'), {
        opacity: 1,
        y: -70,
        rotationY: 360,
      })
      .to(q('.third-ether'), {
        opacity: 0,
        y: -105,
        rotationY: 360,
      })
      .to(q('.second-ether'), {
        opacity: 1,
        y: -70,
        rotationY: 360,
      })
      .to(q('.second-ether'), {
        opacity: 0,
        y: -105,
        rotationY: 360,
      })
      .delay(2);
  }, []);

  return (
    <section className="wrapper">
      <LeftBlocks className="left-blocks" />
      <div className="right-blocks" ref={el}>
        <RightBlocks />
      </div>
      <div className="content-container">
        <Row>
          <Col>
            <h2>Metaverse land</h2>
            <h1>Renting marketplace</h1>
            <button type="button" className="button-primary" onClick={() => history.push('/land-works')}>
              <span>Launch App</span>
            </button>
          </Col>
        </Row>
      </div>
    </section>
  );
};
