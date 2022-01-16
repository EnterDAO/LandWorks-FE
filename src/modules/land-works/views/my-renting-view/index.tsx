import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Col, Pagination, Row } from 'antd';

import { fetchUserRentPerAsset } from 'modules/land-works/api';
import LandRentingCard from 'modules/land-works/components/land-renting-card';
import LandsRentingSorter from 'modules/land-works/components/land-renting-sorter';
import { LandsPlaceSorter } from 'modules/land-works/components/lands-place-sorter';
import { useWallet } from 'wallets/wallet';

import { ReactComponent as InfographicRent } from '../../../../resources/svg/infographic-renting.svg';
import { LandsAvailableSorter } from '../../components/lands-available-sorter';

import './index.scss';

const RentingView = () => {
  const wallet = useWallet();
  const history = useHistory();
  const pageSizeOptions = ['6', '12', '24'];

  const [byAvailability, setByAvailability] = useState(false);
  const [rents, setRents] = useState([] as any);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(Number(pageSizeOptions[0]));
  const [totalRents, setTotalRents] = useState(0);
  const [hasRents, setHasRents] = useState(false);

  const fetchRents = async (account: string) => {
    const rents = await fetchUserRentPerAsset(account, byAvailability, page, pageSize);
    if (Object.keys(rents).length) {
      setRents(rents.data || []);
      setTotalRents(rents.meta.count);
      setHasRents(true);
    }
  };

  const onSortByAvailability = (availabilityEvent: any) => {
    const checked = availabilityEvent?.target?.checked;
    if (checked !== undefined) {
      setByAvailability(checked);
    }
    setPage(1);
  };

  useEffect(() => {
    if (wallet.account) {
      fetchRents(wallet.account);
    }
  }, [byAvailability, pageSize, page, wallet.account]);

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
          {(!!rents.length || hasRents) && (
            <Row className="filters" gutter={20} align={'middle'}>
              <Col>
                <LandsRentingSorter onRentSortChange={onRentSortChange} />
              </Col>
              <Col>
                <LandsAvailableSorter
                  availableOnly={byAvailability}
                  onAvailableChange={onSortByAvailability}
                  text="Active only"
                />
              </Col>
              <Col>
                <LandsPlaceSorter onPlaceChange={onPlaceChange} />
              </Col>
            </Row>
          )}
          <Row
            gutter={[
              { sm: 16, md: 16, lg: 32 },
              { sm: 16, md: 16, lg: 32 },
            ]}
          >
            {rents.length ? (
              rents.map((rent: any) => <LandRentingCard key={rent.id} land={rent} userAddress={wallet.account || ''} />)
            ) : (
              <div className="empty-state">
                <p>Rent history is empty, check out</p>
                <button className="accent" onClick={() => history.push('/all')}>
                  All properties
                </button>
                <InfographicRent />
              </div>
            )}
          </Row>
        </Col>
      </Row>
      <Row>
        {!!rents.length && (
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
        )}
      </Row>
    </div>
  );
};

export default RentingView;
