import React, { useEffect, useState } from 'react';
import { Col, Pagination, Row } from 'antd';

import LandWorkCard from 'modules/land-works/components/land-works-card';
import { LandsAvailableSorter } from 'modules/land-works/components/lands-available-sorter';
import { LandsClaim } from 'modules/land-works/components/lands-claim';
import { LandsPlaceSorter } from 'modules/land-works/components/lands-place-sorter';
import { LandsPriceSorter } from 'modules/land-works/components/lands-price-sorter';
import { SortDirection } from 'modules/land-works/components/lands-price-sorter/models/SortDirection';
import { useWallet } from 'wallets/wallet';

import { landsMockData } from './mockLands';

import './index.scss';

const Lands: React.FC = () => {
  const pageSizeOptions = ['6', '12', '24'];
  const wallet = useWallet();

  const [lands, setLands] = useState(landsMockData);
  const [totalLands, setTotalLands] = useState(landsMockData.length);

  const [sortDir, setSortDir] = useState(SortDirection.ASC);
  const [byAvailability, setByAvailability] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(+pageSizeOptions[0]);

  const onPaginationChange = (page: number, newPageSize?: number | undefined) => {
    setPage(page);
    if (newPageSize) {
      setPageSize(newPageSize);

      if (pageSize === newPageSize || newPageSize < pageSize) {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
    }
  };

  const onSortDirectionChange = (sortDir: SortDirection) => {
    if (sortDir === SortDirection.ASC) {
      setSortDir(SortDirection.DESC);
    } else {
      setSortDir(SortDirection.ASC);
    }
  };

  const onSortByAvailability = (availabilityEvent: any) => {
    const checked = availabilityEvent?.target?.checked;
    if (checked !== undefined) {
      setByAvailability(checked);
    }
    // TODO:: some filtering here
  };

  const onPlaceChange = (placeChangeEvent: any) => {
    // TODO:: some filtering here
    console.log(placeChangeEvent);
  };

  useEffect(() => {
    const offset = (page - 1) * pageSize;
    const fileredLands = landsMockData.slice(offset, offset + pageSize);
    setLands(fileredLands);
  }, [sortDir, page, pageSize]);

  return (
    <div className="content-container">
      <Row className="lands-container">
        <Col span={24}>
          <Row className="filters" gutter={20} align={'middle'}>
            <Col>
              <LandsPriceSorter sortDir={sortDir} onSortDirectionChange={onSortDirectionChange} />
            </Col>
            <Col>
              <LandsAvailableSorter availableOnly={byAvailability} onAvailableChange={onSortByAvailability} />
            </Col>
            <Col>
              <LandsPlaceSorter onPlaceChange={onPlaceChange} />
            </Col>
            {wallet.account && (
              <Col flex="auto" className="lands-claim-container">
                <LandsClaim />
              </Col>
            )}
          </Row>
          <Row
            gutter={[
              { sm: 16, md: 16, lg: 32 },
              { sm: 16, md: 16, lg: 32 },
            ]}>
            {lands.map(land => (
              <LandWorkCard key={land.id} land={land} />
            ))}
          </Row>
        </Col>
        <Col span={24} className="lands-pagination">
          <Pagination
            locale={{ items_per_page: '' }}
            current={page}
            total={totalLands}
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

export default Lands;
