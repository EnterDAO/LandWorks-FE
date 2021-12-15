import React from 'react';
import { Col, Row, Table } from 'antd';
import { uniqueId } from 'lodash';

import TableInput from '../land-works-table-input';

import './index.scss';

const SingleViewLandHistory: React.FC = () => {
  const isYou = true;
  const columns = [
    {
      title: 'by',
      dataIndex: 'by',
      render: (text: string) => <p className={`${isYou ? 'by-you-text' : 'by-text'}`}>{text}</p>,
    },
    {
      title: 'from',
      dataIndex: 'from',
    },
    {
      title: 'to',
      dataIndex: 'to',
      render: (text: string) => (
        <p>
          {text} <span className="label upcoming">upcoming</span>
        </p>
      ),
    },
    {
      title: 'Configured operator',
      dataIndex: 'operator',
      render: (text: string) => <TableInput text={text} key={text + uniqueId()} />,
    },
    {
      title: 'Tx hash',
      dataIndex: 'txHash',
      render: (text: string) => <p className="by-text">{text}</p>,
    },
    {
      title: 'price',
      dataIndex: 'price',
    },
  ];

  const data = [
    {
      key: '1',
      by: 'krisko.eth (you)',
      from: '12:23 11.09.21',
      to: '13:00 15.09.21',
      operator: '0X4583282111aa23',
      txHash: '0x148426fdc...ad0',
      price: 'ETH 233,45 $211.55',
    },
    {
      key: '2',
      by: 'krisko.eth (you)',
      from: '06:00 06.09.21',
      to: '06:00 07.09.21',
      operator: '0X56879908dd1ff',
      txHash: '0x4f4e0f2cb...152',
      price: 'ETH 233,45 $200',
    },
    {
      key: '3',
      by: '0X4583282111aa23',
      from: '07:00 01.09.21',
      to: '07:00 02.09.21',
      operator: 'george.eth',
      txHash: '0xb5c8bd9430b6...170a',
      price: 'ETH 250 $211.55',
    },
    {
      key: '4',
      by: '0X4583282111aa23',
      from: '06:00 06.09.21',
      to: '11:00 07.09.21',
      operator: 'dani.eth',
      txHash: '0x4f4e0f2cb72e7...152',
      price: 'ETH 233,45 $211.55',
    },
    {
      key: '5',
      by: '0X56879908dd1ff',
      from: '01:00 01.09.21',
      to: '05:00 02.09.21',
      operator: '0X4583282111aa23',
      txHash: '0xb5c8bd9430b...70a',
      price: 'ETH 250 $211.55',
    },
  ];

  return (
    <Row gutter={40} className="single-land-history-container">
      <Col span={24} style={{ padding: '0px' }}>
        <Row className="history">
          <Col span={24}>
            <span className="history-heading">Rent History</span>
            <button className="btn all-btn" onClick={() => {}}>
              All
            </button>
            <button className="btn yours-btn" onClick={() => {}}>
              Yours
            </button>
          </Col>
          <Col span={24}>
            <Table columns={columns} dataSource={data} size="small" className="history-table" />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default SingleViewLandHistory;
