import React, { FC, useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { any } from 'lodash/fp';

import enterDaoImage from '../../../../resources/png/enterdao.png';
import { useMetapass } from '../../providers/metapass-provider';
// Temporrary card image
import cardImage from '../metapassCard/assets/woman.png';
import MintSuccessNFTCard from '../mint-success-nft-card';

import './index.scss';

interface props {
  result: any;
}

const MintSuccessComponent: FC<props> = props => {
  const { result } = props;
  const [nftsMeta, setNftsMeta] = useState<any[]>([]);
  const metapassCtx = useMetapass();
  const { getNftMeta } = metapassCtx;

  useEffect(() => {
    const transferEvents = result?.events?.Transfer;

    if (!transferEvents) return;
    // If we use bulkBuy
    const isBulkBuy = transferEvents.length;
    const ids: Array<number | string> = isBulkBuy
      ? [...transferEvents.map((event: any) => event.returnValues[2])]
      : [transferEvents.returnValues[2]];

    const getMeta = async () => {
      try {
        const metaPromises = ids.map(async id => getNftMeta(id));
        const meta = await Promise.all(metaPromises);
        setNftsMeta([...meta]);
      } catch (e) {
        // TODO:: handle errors !
        console.log(e);
      }
    };

    getMeta();
  }, [result]);

  return (
    <>
      <div className="mint-success-component-container">
        <Row>
          <Col span={24}>
            <p className="text-center congrats-heading">Success !</p>
          </Col>
        </Row>
        <Row justify="center" gutter={20} className="nft-cards-list">
          {nftsMeta.map(data => (
            <MintSuccessNFTCard data={data} key={data.name} />
          ))}
        </Row>
      </div>
    </>
  );
};

export default MintSuccessComponent;
