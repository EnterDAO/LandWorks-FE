import React, { useEffect, useState } from 'react';
import { gql, useSubscription } from '@apollo/client';
import { Col, ConfigProvider, Empty, Row, Table } from 'antd';
import { uniqueId } from 'lodash';

import ExternalLink from 'components/custom/externalLink';
import { timestampSecondsToDate } from 'helpers/helpers';

import EmptyTable from '../../../../resources/svg/empty-table.svg';
import { useWallet } from '../../../../wallets/wallet';
import {
  ASSET_RENTS_SUBSCRIPTION,
  RentEntity,
  USER_ASSET_RENTS_SUBSCRIPTION,
  parseAssetRents,
  parseUserRents,
} from '../../api';
import LandTableTxHash from '../land-table-tx-hash';
import LandWorksTableDate from '../land-works-table-date';
import TableInput from '../land-works-table-input';
import LandTablePrice from '../land-works-table-price';

import { getNowTs } from '../../../../utils';
import { getEtherscanAddressUrl, shortenAddr } from '../../../../web3/utils';

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

  const [subscription, setSubscription] = useState(ASSET_RENTS_SUBSCRIPTION);

  useSubscription(subscription, {
    variables: {
      id: assetId,
      offset: pageSize * (page - 1),
      limit: pageSize,
      renter: wallet.account?.toLowerCase(),
    },
    onSubscriptionData: ({ subscriptionData }) => {
      if (subscriptionData.error) {
        // TODO:
      }

      if (subscriptionData.data.asset === null) {
        setRents([]);
        setTotalRents(0);
        return;
      }

      const rents = areAllSelected
        ? parseAssetRents(subscriptionData.data?.asset)
        : parseUserRents(subscriptionData.data?.asset, pageSize, page);
      // setUser(parseUser(subscriptionData.data.user));
      setRents(rents.data);
      setTotalRents(rents.meta.count);
    },
  });

  const dateFormat = 'HH:mm dd.MM.yyyy';
  const columns = [
    {
      title: 'By',
      dataIndex: 'renterAddress',
      render: (text: string) => {
        let isYou = false;
        let showText = shortenAddr(text);
        if (wallet.account && wallet.account?.toLowerCase() === text.toLowerCase()) {
          isYou = true;
          showText += ` (you)`;
        }

        return (
          <ExternalLink
            href={getEtherscanAddressUrl(text.toLowerCase())}
            className={`${isYou ? 'by-you-text' : 'by-text'}`}
          >
            {showText}
          </ExternalLink>
        );
      },
    },
    {
      title: 'From',
      dataIndex: 'start',
      render: (start: string) => <LandWorksTableDate timestamp={start} dateFormat={dateFormat} />,
    },
    {
      title: 'To',
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
      render: (operator: string, data: any) => {
        const now = getNowTs();
        const isActiveRent = Number(data.start) <= now && now < Number(data.end);
        const isUpcomingRent = Number(data.start) >= now;
        return (
          <TableInput
            operator={operator}
            assetId={assetId}
            rentId={data.id}
            renter={data.renterAddress}
            key={operator + uniqueId()}
            isEditable={isActiveRent || isUpcomingRent}
          />
        );
      },
    },
    {
      title: 'Tx hash',
      dataIndex: 'txHash',
      render: (txHash: string) => <LandTableTxHash txHash={txHash} />, // TODO: On click should open getEtherscanTxUrl(text) in another tab
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: (amount: string, data: any) => (
        <LandTablePrice
          tokenDecimals={data.paymentToken.decimals}
          tokenSymbol={data.paymentToken.symbol}
          weiAmount={data.price}
          dateTimestamp={data.timestamp}
        />
      ),
    },
  ];

  const onAllSelected = () => {
    setSubscription(ASSET_RENTS_SUBSCRIPTION);
    setAreAllSelected(true);
  };
  const onYouSelected = () => {
    setSubscription(USER_ASSET_RENTS_SUBSCRIPTION);
    setAreAllSelected(false);
  };

  const showYoursSection = () =>
    wallet.account && rents.filter((r) => r.operator.toLowerCase() === wallet.account?.toLowerCase()).length > 0;

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

  useEffect(() => {
    return () => {
      setRents([]);
      setTotalRents(0);
    };
  }, []);

  useEffect(() => {
    if (wallet.account === undefined) {
      setAreAllSelected(true);
      setSubscription(ASSET_RENTS_SUBSCRIPTION);
      setPage(1);
    }
  }, [wallet.account]);

  return (
    <Row gutter={40} className="single-land-history-container">
      <Col span={24} style={{ padding: '0px' }}>
        <Row className="history">
          <Col span={24}>
            <span className="history-heading">Rent History</span>
            <button
              className={`btn all-btn ${areAllSelected ? 'active-table-button' : ''}`}
              onClick={() => {
                onAllSelected();
              }}
            >
              All
            </button>
            {showYoursSection() && (
              <button
                className={`btn yours-btn ${!areAllSelected ? 'active-table-button' : ''}`}
                onClick={onYouSelected}
              >
                Yours
              </button>
            )}
          </Col>
          <Col span={24} className="table-wrapper">
            <ConfigProvider renderEmpty={() => <Empty image={EmptyTable} description="No rent history present" />}>
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
            </ConfigProvider>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default SingleViewLandHistory;
