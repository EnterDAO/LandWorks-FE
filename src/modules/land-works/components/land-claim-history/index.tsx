import React, { useState } from 'react';
import { useSubscription } from '@apollo/client';
import { Col, ConfigProvider, Empty, Row, Table } from 'antd';

import { AssetEntity, ClaimHistory, USER_CLAIM_HISTORY_SUBSCRIPTION } from 'modules/land-works/api';

import EmptyTable from '../../../../resources/svg/empty-table.svg';
import { useWallet } from '../../../../wallets/wallet';
import LandTableTxHash from '../land-table-tx-hash';
import LandWorksTableDate from '../land-works-table-date';
import LandTablePrice from '../land-works-table-price';

import { getDecentralandAssetName } from '../../../../utils';

import './index.scss';

const ClaimHistoryTable: React.FC = () => {
  const wallet = useWallet();
  const pageSizeOptions = ['5', '10', '20'];
  const [claimHistory, setClaimHistory] = useState([] as ClaimHistory[]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(Number(pageSizeOptions[0]));
  const [totalClaims, setTotalClaims] = useState(0);

  useSubscription(USER_CLAIM_HISTORY_SUBSCRIPTION, {
    skip: wallet.account === undefined,
    variables: { id: wallet.account?.toLowerCase() },
    onSubscriptionData: ({ subscriptionData }) => {
      if (subscriptionData.error) {
        // TODO:
      }

      const claimHistory = subscriptionData.data?.user?.claimHistory?.map((history: ClaimHistory) => ({
        ...history,
        key: history.id,
      }));
      setClaimHistory(claimHistory);
      setTotalClaims(claimHistory?.length || 0);
    },
  });

  const onPaginationChange = (page: number, newPageSize?: number | undefined) => {
    setPage(page);
    if (newPageSize) {
      setPageSize(newPageSize);

      // TODO: this will probably need to be modified to scroll you up to the beginning of the table
      // if (pageSize === newPageSize || newPageSize < pageSize) {
      //   window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      // }
    }
  };

  const columns = [
    {
      title: 'Property',
      dataIndex: 'asset',
      render: (asset: any) => {
        console.log(asset);
        const properyName = getDecentralandAssetName(asset.decentralandData);
        return <p>{properyName || 'Unknown property'}</p>;
      },
    },
    {
      title: 'Tx hash',
      dataIndex: 'txHash',
      render: (txHash: string) => <LandTableTxHash txHash={txHash} />,
    },
    {
      title: 'Amount',
      dataIndex: ['amount'],
      render: (amount: string, data: any) => (
        <LandTablePrice
          tokenDecimals={data.paymentToken.decimals}
          tokenSymbol={data.paymentToken.symbol}
          weiAmount={data.amount}
          dateTimestamp={data.timestamp}
        />
      ),
    },
    {
      title: 'Date',
      dataIndex: 'timestamp',
      render: (timestamp: string) => <LandWorksTableDate timestamp={timestamp} dateFormat={'HH:mm:ss dd.MM.yyyy'} />,
    },
  ];

  return (
    <Row className="history">
      <Col span={24}>
        <span className="history-heading">Claim History</span>
      </Col>
      <Col className="table-wrapper" span={24}>
        <ConfigProvider renderEmpty={() => <Empty image={EmptyTable} description="No claim history present" />}>
          <Table
            columns={columns}
            dataSource={claimHistory}
            size="small"
            className="history-table"
            pagination={{
              current: page,
              total: totalClaims,
              defaultPageSize: pageSize,
              onChange: (page: number, pageSize?: number | undefined) => onPaginationChange(page, pageSize),
            }}
          />
        </ConfigProvider>
      </Col>
    </Row>
  );
};

export default ClaimHistoryTable;
