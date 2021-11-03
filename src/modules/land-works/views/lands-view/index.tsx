import React, { useEffect, useState } from 'react';
import { Col, Pagination, Row } from 'antd';

import LandWorkCard from 'modules/land-works/components/land-works-card';
import { LandsAvailableSorter } from 'modules/land-works/components/lands-available-sorter';
import { LandsPlaceSorter } from 'modules/land-works/components/lands-place-sorter';
import { LandsPriceSorter } from 'modules/land-works/components/lands-price-sorter';
import { SortDirection } from 'modules/land-works/components/lands-price-sorter/models/SortDirection';

import { landsMockData } from './mockLands';

import './index.scss';

const Lands: React.FC = () => {
  const pageSizeOptions = ['12', '24', '48'];

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

  return (
    <div className="content-container">
      <Row className="lands-container">
        <Col span={24}>
          <Row className="filters" gutter={20}>
            <Col>
              <LandsPriceSorter sortDir={sortDir} onSortDirectionChange={onSortDirectionChange} />
            </Col>
            <Col>
              <LandsAvailableSorter availableOnly={byAvailability} onAvailableChange={onSortByAvailability} />
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
            {lands.map(land => (
              <LandWorkCard key={land.id} pass={land} />
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
