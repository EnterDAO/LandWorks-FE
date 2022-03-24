import React, { useEffect, useState } from 'react';
import { useSubscription } from '@apollo/client';
import { Col, ConfigProvider, Empty, Row, Table } from 'antd';
import { uniqueId } from 'lodash';

import ExternalLink from 'components/custom/externalLink';
import { getENSName, timestampSecondsToDate } from 'helpers/helpers';

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
  const [areAllSelected, setAreAllSelected] = useState(true);
  const [rents, setRents] = useState([] as RentEntity[]);
  const [totalRents, setTotalRents] = useState(rents.length);

  const [subscription, setSubscription] = useState(ASSET_RENTS_SUBSCRIPTION);

  useSubscription(subscription, {
    variables: {
      id: assetId,
      // offset: pageSize * (page - 1),
      // limit: pageSize,
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
        : parseUserRents(subscriptionData.data?.asset, totalRents, 1);
      // setUser(parseUser(subscriptionData.data.user));
      setRents(rents.data);
      setTotalRents(rents.meta.count);
    },
  });

  const dateFormat = 'HH:mm dd.MM.yyyy';
  const columns = [
    {
      title: 'Renter',
      width: '12%',
      dataIndex: 'renterAddress',
      render: (text: string) => {
        let isYou = false;
        const shortedRenter = shortenAddr(text);
        if (wallet.account && wallet.account?.toLowerCase() === text.toLowerCase()) {
          isYou = true;
        }
        const [ens, setEns] = useState<string>();
        useEffect(() => {
          if (text)
            getENSName(text).then((ensName) => {
              setEns(ensName);
            });
        }, [text]);

        return (
          <ExternalLink href={getEtherscanAddressUrl(text.toLowerCase())} className={'by-text'}>
            <div className="renter-row">
              <p>{ens && ens !== text ? ens : shortedRenter}</p>
              {isYou && <p className="you">You</p>}
            </div>
          </ExternalLink>
        );
      },
    },
    {
      title: 'Rented from',
      dataIndex: 'start',
      render: (start: string) => <LandWorksTableDate timestamp={start} dateFormat={dateFormat} />,
    },
    {
      title: 'Rented to',
      dataIndex: 'end',
      render: (end: string) => {
        const fullDate = timestampSecondsToDate(end, dateFormat);
        const utc = fullDate.substring(fullDate.length - 6);
        const date = fullDate.substring(0, fullDate.length - 6);

        return (
          <div className="timezone">
            {date}
            <span>{utc}</span>
          </div>
        );
      },
    },
    {
      title: 'Tx hash',
      width: '10%',
      dataIndex: 'txHash',
      render: (txHash: string) => <LandTableTxHash txHash={txHash} />,
    },
    {
      title: 'Cost',
      width: '13%',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      sorter: (a: any, b: any) => a.price - b.price,
      dataIndex: 'cost',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (amount: string, data: any) => (
        <LandTablePrice
          tokenDecimals={data.paymentToken.decimals}
          tokenSymbol={data.paymentToken.symbol}
          weiAmount={data.price}
          dateTimestamp={data.timestamp}
        />
      ),
    },
    {
      title: 'Configured operator',
      shouldCellUpdate: (record: RentEntity, prevRecord: RentEntity) => {
        const isEqual = record.operator === prevRecord.operator;
        return isEqual ? false : true;
      },
      dataIndex: 'operator',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (operator: string, data: any) => {
        const now = getNowTs();
        const isActiveRent = Number(data.start) <= now && now < Number(data.end);
        const isUpcomingRent = Number(data.start) >= now;
        const [ens, setEns] = useState<string>();

        useEffect(() => {
          if (operator)
            getENSName(operator).then((ensName) => {
              setEns(ensName);
            });
        }, [operator]);
        return (
          <TableInput
            operator={operator}
            assetId={assetId}
            rentId={data.id}
            ens={ens !== operator ? ens : null}
            renter={data.renterAddress}
            key={operator + uniqueId()}
            isEditable={isActiveRent || isUpcomingRent}
          />
        );
      },
    },
    {
      title: 'Status',
      width: '12%',
      sorter: (a: { end: string }, b: { end: string }) => +a.end - +b.end,
      dataIndex: 'end',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (end: string, record: RentEntity) => {
        let isUpcoming = false;
        let isActive = false;
        const now = getNowTs();
        if (now < Number(record.start)) {
          isUpcoming = true;
        } else if (Number(record.start) <= now && now <= Number(record.end)) {
          isActive = true;
        }

        function handleClass() {
          if (isUpcoming) return 'upcoming';
          if (isActive) return 'active';
          if (!isActive && !isUpcoming) return 'passed';
        }
        return (
          <div className={`button ${handleClass()}`}>
            {isUpcoming && 'Upcoming'}
            {isActive && 'Active'}
            {!isActive && !isUpcoming && 'Passed'}
          </div>
        );
      },
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
    wallet.account && rents.filter((r) => r.operator?.toLowerCase() === wallet.account?.toLowerCase()).length > 0;

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
      // setPage(1);
    }
  }, [wallet.account]);

  return (
    <Row gutter={40} className="single-land-history-container">
      <span className="history-heading">Rent History</span>
      <Col span={24} style={{ padding: '0px' }}>
        <Row className="history">
          <Col>
            <button
              className={`btn all-btn ${areAllSelected ? 'active-table-button' : ''}`}
              onClick={() => {
                onAllSelected();
              }}
            >
              All <span>{areAllSelected && totalRents}</span>
            </button>
            {showYoursSection() && (
              <button
                className={`btn yours-btn ${!areAllSelected ? 'active-table-button' : ''}`}
                onClick={onYouSelected}
              >
                Yours <span>{!areAllSelected && totalRents}</span>
              </button>
            )}
          </Col>
          <Col span={24} className="table-wrapper">
            <ConfigProvider renderEmpty={() => <Empty image={EmptyTable} description="No rent history present" />}>
              <Table
                columns={columns}
                dataSource={rents}
                size="middle"
                className="history-table"
                pagination={false}
                scroll={{ x: 768, y: 340 }}
              />
            </ConfigProvider>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default SingleViewLandHistory;
