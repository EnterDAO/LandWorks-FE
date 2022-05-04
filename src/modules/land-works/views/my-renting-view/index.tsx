import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { pageSizeOptions } from 'constants/modules';
import { Col, Pagination, Row } from 'antd';

import { Rent, fetchUserRentPerAsset } from 'modules/land-works/api';
import LandCardSkeleton from 'modules/land-works/components/land-base-loader-card';
import MyPropetiesHistoryTable from 'modules/land-works/components/land-my-properties-history';
import LandRentingCard from 'modules/land-works/components/land-renting-card';
import LandsRentingSorter from 'modules/land-works/components/land-renting-sorter';
import { LandsPlaceSorter } from 'modules/land-works/components/lands-place-sorter';
import { useWallet } from 'wallets/wallet';

import { ReactComponent as InfographicRent } from '../../../../resources/svg/infographic-renting.svg';
import { LandsAvailableSorter } from '../../components/lands-available-sorter';

import './index.scss';

const MyRentingView: React.FC = () => {
  const wallet = useWallet();
  const history = useHistory();

  const [byAvailability, setByAvailability] = useState(false);
  const [rents, setRents] = useState([] as Rent[]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(Number(pageSizeOptions[0]));
  const [totalRents, setTotalRents] = useState(0);
  const [hasRents, setHasRents] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchRents = async (account: string) => {
    const rents = await fetchUserRentPerAsset(account, byAvailability, page, pageSize);
    if (Object.keys(rents).length) {
      setRents(rents.data || []);
      setTotalRents(rents.meta.count);
      setHasRents(true);
    }
    setLoading(false);
  };

  const onSortByAvailability = (availabilityEvent: { target: { checked: boolean } }) => {
    const checked = availabilityEvent?.target?.checked;
    if (checked !== undefined) {
      setByAvailability(checked);
    }
    setPage(1);
  };

  useEffect(() => {
    if (wallet.account) {
      setLoading(true);
      fetchRents(wallet.account);
    }
  }, [byAvailability, pageSize, page, wallet.account]);

  useEffect(() => {
    if (!wallet.account) {
      setRents([]);
      setTotalRents(0);
      setHasRents(false);
    }
  }, [wallet.account]);

  const onPlaceChange = () => {
    // TODO:: some filtering here
  };

  const onRentSortChange = () => {
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
            <Row className="filters" gutter={20}>
              <Col>
                <LandsRentingSorter onRentSortChange={onRentSortChange} />
              </Col>
              <Col>
                <LandsAvailableSorter
                  availableOnly={byAvailability}
                  onAvailableChange={onSortByAvailability}
                  text={'Active only'}
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
            {loading ? (
              [1, 2, 3].map((i) => <LandCardSkeleton key={i} />)
            ) : rents.length ? (
              rents.map((rent: Rent) => (
                <LandRentingCard key={rent.id} land={rent} userAddress={wallet.account || ''} />
              ))
            ) : (
              <div className="empty-state">
                <p>Rent history is empty, check out</p>
                <button className="accent" onClick={() => history.push('/explore')}>
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
      <MyPropetiesHistoryTable metaverse="1" />
    </div>
  );
};

export default MyRentingView;
