import React, { useEffect, useState } from 'react';
import { end } from '@popperjs/core';
import { Col, Pagination, Row } from 'antd';

import { UserEntity, fetchUserLastRentPerAsset } from 'modules/land-works/api';
import LandRentingCard from 'modules/land-works/components/land-renting-card';
import LandsRentingSorter from 'modules/land-works/components/land-renting-sorter';
import { LandsPlaceSorter } from 'modules/land-works/components/lands-place-sorter';
import { useWallet } from 'wallets/wallet';

import './index.scss';

const RentingView = () => {
  const wallet = useWallet();
  const pageSizeOptions = ['6', '12', '24'];

  const [rents, setRents] = useState([] as any);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(Number(pageSizeOptions[0]));
  const [totalRents, setTotalRents] = useState(0);

  const fetchRents = async (account: string) => {
    const rents = await fetchUserLastRentPerAsset(account, page, pageSize);
    setRents(rents.data);
    setTotalRents(rents.meta.count);
  };

  useEffect(() => {
    if (wallet.account) {
      fetchRents(wallet.account);
    }
  }, [pageSize, page, wallet.account]);

  const onPlaceChange = (placeChangeEvent: any) => {
    // TODO:: some filtering here
  };

  const onRentSortChange = (sortEvent: any) => {
    // TODO:: some filtering here
  };

  const onPaginationChange = (page: number, pageSize?: number | undefined) => {
    setPage(page);
    if (pageSize) {
      setPageSize(pageSize);
    }
  };

  return (
    <div className="content-container">
      <Row className="lands-container">
        <Col span={24}>
          <Row className="filters" gutter={20} align={'middle'}>
            <Col>
              <LandsRentingSorter onRentSortChange={onRentSortChange} />
            </Col>
            <Col>
              <LandsPlaceSorter onPlaceChange={onPlaceChange} />
            </Col>
          </Row>
          <Row
            gutter={[
              { sm: 16, md: 16, lg: 32 },
              { sm: 16, md: 16, lg: 32 },
            ]}>
            {rents.map((rent: any) => (
              <LandRentingCard key={rent.id} land={rent} userAddress={wallet.account || ''} />
            ))}
          </Row>
        </Col>
      </Row>
      <Row>
        <Col span={24} className="rent-lands-pagination">
          <Pagination
            locale={{ items_per_page: '' }}
            current={page}
            total={totalRents}
            defaultPageSize={pageSize}
            showSizeChanger
            pageSizeOptions={pageSizeOptions}
            onChange={onPaginationChange}
          />
        </Col>
      </Row>
    </div>
  );
};

export default RentingView;
