import React, { useEffect, useState } from 'react';
import { end } from '@popperjs/core';
import { Col, Pagination, Row } from 'antd';

import LandWorkCard from 'modules/land-works/components/land-works-card';
import { LandsAction } from 'modules/land-works/components/lands-action';
import { LandsAvailableSorter } from 'modules/land-works/components/lands-available-sorter';
import { ClaimModal } from 'modules/land-works/components/lands-claim-modal';
import { LandsPlaceSorter } from 'modules/land-works/components/lands-place-sorter';
import { LandsPriceSorter } from 'modules/land-works/components/lands-price-sorter';
import { SortDirection } from 'modules/land-works/components/lands-price-sorter/models/SortDirection';
import { useWallet } from 'wallets/wallet';

import { landsMockData } from './mockLands';

import './index.scss';
import { AssetEntity, fetchAssetsByMetaverseAndGteLastRentEndWithOrder, fetchUser, UserEntity } from '../../api';

const DECENTRALAND_METAVERSE = '1';
const DEFAULT_LAST_RENT_END = '0';

const Lands: React.FC = () => {
  const pageSizeOptions = ['6', '12', '24'];
  const sortColumns = ['totalRents', 'pricePerSecond', 'pricePerSecond'];
  const sortDirections = [SortDirection.DESC, SortDirection.ASC, SortDirection.DESC];
  const wallet = useWallet();

  const [lands, setLands] = useState([] as AssetEntity[]);
  const [totalLands, setTotalLands] = useState(landsMockData.length);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [sortColumn, setSortColumn] = useState(sortColumns[0]);
  const [user, setUser] = useState({} as UserEntity);

  const [lastRentEnd, setLastRentEnd] = useState(DEFAULT_LAST_RENT_END);
  const [sortDir, setSortDir] = useState(sortDirections[0]);
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

  const onSortDirectionChange = (event: any) => {
    const sortIndex = Number(event) - 1;
    setSortDir(sortDirections[sortIndex]);
    setSortColumn(sortColumns[sortIndex]);
    setPage(1);
  };

  const onSortByAvailability = (availabilityEvent: any) => {
    const checked = availabilityEvent?.target?.checked;
    if (checked !== undefined) {
      setByAvailability(checked);
    }
    setLastRentEnd(checked ? Math.round(Date.now() / 1000).toString() : DEFAULT_LAST_RENT_END);
    setPage(1);
  };

  const onPlaceChange = (placeChangeEvent: any) => {
    // TODO:: some filtering here
    console.log(placeChangeEvent);
  };

  const getAssets = async (page: number, pageSize: number, metaverse: string, lastRentEnd: string, orderColumn: string, sortDir: string) => {
    const lands = await fetchAssetsByMetaverseAndGteLastRentEndWithOrder(page, pageSize, metaverse, lastRentEnd, orderColumn, sortDir);
    console.log(lands);
    setLands(lands.data);
    setTotalLands(lands?.meta.count);
  };

  const getUser = async (account: string | undefined) => {
    let user = {} as UserEntity;
    if (account) {
      user = await fetchUser(account);
    }
    setUser(user);
  };

  useEffect(() => {
    getUser(wallet.account);
    getAssets(page, pageSize, DECENTRALAND_METAVERSE, lastRentEnd, sortColumn, sortDir);
  }, [page, pageSize, sortColumn, sortDir, byAvailability, wallet.account]);

  return (
    <div className='content-container'>
      <Row className='lands-container'>
        <Col span={24}>
          <Row justify={end} className='actions-container'>
            {/* Removed for MVP version due to lack of view for adjacent lands*/}
            {/*{wallet.account &&  (*/}
            {/*  <Col style={{ marginRight: '30px' }} className='lands-claim-container'>*/}
            {/*    <LandsAction*/}
            {/*      onButtonClick={setShowClaimModal}*/}
            {/*      buttonText={'VIEW'}*/}
            {/*      subHeading='There is avalailable'*/}
            {/*      mainHeading='Adjacent land'*/}
            {/*    />*/}
            {/*  </Col>*/}
            {/*)}*/}
            {user.hasUnclaimedRent && (
              <Col className='lands-claim-container'>
                <LandsAction
                  onButtonClick={setShowClaimModal}
                  buttonText={'CLAIM '}
                  subHeading='You have'
                  mainHeading='Unclaimed rent'
                />
              </Col>
            )}
          </Row>
          <Row className='filters' gutter={20} align={'middle'}>
            <Col>
              <LandsPriceSorter onSortDirectionChange={onSortDirectionChange} />
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
              <LandWorkCard key={land.id} land={land} />
            ))}
          </Row>
        </Col>
        <Col span={24} className='lands-pagination'>
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

      <ClaimModal onCancel={() => setShowClaimModal(false)} visible={showClaimModal}  rentFees={user?.unclaimedRentAssets}/>
    </div>
  );
};

export default Lands;
