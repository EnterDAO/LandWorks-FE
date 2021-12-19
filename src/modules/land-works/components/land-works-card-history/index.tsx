import React, { useEffect, useState } from 'react';
import { Col, Row, Table } from 'antd';
import { uniqueId } from 'lodash';

import { timestampSecondsToDate } from 'helpers/helpers';

import { useWallet } from '../../../../wallets/wallet';
import { RentEntity, fetchAssetRents, fetchAssetUserRents } from '../../api';
import LandTableTxHash from '../land-table-tx-hash';
import LandWorksTableDate from '../land-works-table-date';
import TableInput from '../land-works-table-input';
import LandTablePrice from '../land-works-table-price';

import { getNowTs } from '../../../../utils';
import { shortenAddr } from '../../../../web3/utils';

import './index.scss';

type SingleViewRentHistoryProps = {
  assetId: string;
};

const SingleViewLandHistory: React.FC<SingleViewRentHistoryProps> = ({ assetId }) => {
  const wallet = useWallet();
  const pageSizeOptions = ['5', '10', '20'];
  const [areAllSelected, setAreAllSelected] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(+pageSizeOptions[0]);
  const [rents, setRents] = useState([] as RentEntity[]);
  const [totalRents, setTotalRents] = useState(rents.length);
  const dateFormat = 'HH:mm dd.MM.yyyy';
  const columns = [
    {
      title: 'by',
      dataIndex: 'renterAddress',
      render: (text: string) => {
        let isYou = false;
        let showText = shortenAddr(text);
        if (wallet.account && wallet.account!.toLowerCase() === text.toLowerCase()) {
          isYou = true;
          showText += ` (you)`;
        }
        return <p className={`${isYou ? 'by-you-text' : 'by-text'}`}>{showText}</p>;
      },
    },
    {
      title: 'from',
      dataIndex: 'start',
      render: (start: string) => <LandWorksTableDate timestamp={start} dateFormat={dateFormat} />,
    },
    {
      title: 'to',
      dataIndex: 'end',
      render: (end: string, record: RentEntity, index: any) => {
        let isUpcoming = false;
        let isActive = false;
        const now = getNowTs();
        if (now < Number(record.start)) {
          isUpcoming = true;
        } else if (Number(record.start) <= now && now <= Number(record.end)) {
          isActive = true;
        }

        return (
          <p>
            {timestampSecondsToDate(end, dateFormat)}
            <>{isUpcoming && <span className="label upcoming">upcoming</span>}</>
            <>{isActive && <span className="label active">active</span>}</>
          </p>
        );
      },
    },
    {
      title: 'Configured operator',
      dataIndex: 'operator',
      render: (operator: string) => <TableInput text={operator} key={operator + uniqueId()} />,
    },
    {
      title: 'Tx hash',
      dataIndex: 'txHash',
      render: (txHash: string) => <LandTableTxHash txHash={txHash} />, // TODO: On click should open getEtherscanTxUrl(text) in another tab
    },
    {
      title: 'price',
      dataIndex: 'price',
      render: (amount: string, data: any) => (
        <LandTablePrice
          tokenDecimals={data.paymentToken.decimals}
          tokenSymbol={data.paymentToken.symbol}
          weiAmount={Number(data.price)}
        />
      ),
    },
  ];

  const onAllSelected = () => setAreAllSelected(true);
  const onYouSelected = () => setAreAllSelected(false);

  const showYoursSection = () => wallet.account && rents.length > 0;

  const getRents = async (assetId: string, page: number, pageSize: number) => {
    if (!assetId) {
      return [];
    }

    const rents = areAllSelected
      ? await fetchAssetRents(assetId, page, pageSize)
      : await fetchAssetUserRents(assetId, wallet.account?.toLowerCase()!, page, pageSize);

    setRents(rents.data);
    setTotalRents(rents?.meta.count);
  };

  const onPaginationChange = (page: number, newPageSize?: number | undefined) => {
    setPage(page);
    if (newPageSize) {
      setPageSize(newPageSize);

      // TODO: this will probably need to be modified to scroll you up to the beginning of the table
      if (pageSize === newPageSize || newPageSize < pageSize) {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    getRents(assetId, page, pageSize);
  }, [assetId, page, pageSize, areAllSelected, wallet.account]);

  return (
    <Row gutter={40} className="single-land-history-container">
      <Col span={24} style={{ padding: '0px' }}>
        <Row className="history">
          <Col span={24}>
            <span className="history-heading">Rent History</span>
            <button
              className="btn all-btn"
              onClick={() => {
                onAllSelected();
              }}>
              All
            </button>
            {showYoursSection() && (
              <button
                className="btn yours-btn"
                onClick={() => {
                  onYouSelected();
                }}>
                Yours
              </button>
            )}
          </Col>
          <Col span={24}>
            <Table
              columns={columns}
              dataSource={rents}
              size="small"
              className="history-table"
              pagination={{
                current: page,
                total: totalRents,
                defaultPageSize: pageSize,
                onChange: (page: number, pageSize?: number | undefined) => onPaginationChange(page, pageSize),
              }}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default SingleViewLandHistory;
