import React, { useEffect, useState } from 'react';
import { useSubscription } from '@apollo/client';
import { end } from '@popperjs/core';
import { Col, Pagination, Row } from 'antd';
import BigNumber from 'bignumber.js';

import LandWorkCard from 'modules/land-works/components/land-works-card';
import { LandsAction } from 'modules/land-works/components/lands-action';
import { LandsAvailableSorter } from 'modules/land-works/components/lands-available-sorter';
import { ClaimModal } from 'modules/land-works/components/lands-claim-modal';
import { LandsPlaceSorter } from 'modules/land-works/components/lands-place-sorter';
import { LandsPriceSorter } from 'modules/land-works/components/lands-price-sorter';
import { SortDirection } from 'modules/land-works/models/SortDirection';
import { useWallet } from 'wallets/wallet';

import { ReactComponent as HighIcon } from '../../../../resources/svg/order-high-first.svg';
import { ReactComponent as HottestIcon } from '../../../../resources/svg/order-hot.svg';
import { ReactComponent as LowIcon } from '../../../../resources/svg/order-low-first.svg';
import {
  AssetEntity,
  USER_SUBSCRIPTION,
  UserEntity,
  fetchListedAssetsByMetaverseAndGteLastRentEndWithOrder,
  parseUser,
} from '../../api';

import { getNowTs } from '../../../../utils';

import './index.scss';

const DECENTRALAND_METAVERSE = '1';
const DEFAULT_LAST_RENT_END = '0';

const data = [
  {
    label: 'Hottest first',
    value: 1,
    icon: <HottestIcon />,
  },
  {
    label: 'Price: low first',
    value: 2,
    icon: <LowIcon />,
  },
  {
    label: 'Price: high first',
    value: 3,
    icon: <HighIcon />,
  },
];

const Lands: React.FC = () => {
  const pageSizeOptions = ['6', '12', '24'];
  const sortColumns = ['totalRents', 'pricePerSecond', 'pricePerSecond'];
  const sortDirections = [SortDirection.DESC, SortDirection.ASC, SortDirection.DESC];
  const wallet = useWallet();

  const [lands, setLands] = useState([] as AssetEntity[]);
  const [totalLands, setTotalLands] = useState(lands.length);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [sortColumn, setSortColumn] = useState(sortColumns[0]);
  const [user, setUser] = useState({} as UserEntity);

  const [lastRentEnd, setLastRentEnd] = useState(DEFAULT_LAST_RENT_END);
  const [sortDir, setSortDir] = useState(sortDirections[0]);
  const [byAvailability, setByAvailability] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(+pageSizeOptions[0]);
  const [claimButtonDisabled, setClaimButtonDisabled] = useState(false);

  useSubscription(USER_SUBSCRIPTION, {
    skip: wallet.account === undefined,
    variables: { id: wallet.account?.toLowerCase() },
    onSubscriptionData: ({ subscriptionData }) => {
      if (subscriptionData.error) {
        // TODO:
      }
      if (subscriptionData.data.user === null) {
        setUser({} as UserEntity);
        return;
      }

      setClaimButtonDisabled(false);
      setUser(parseUser(subscriptionData.data.user));
    },
  });

  const onPaginationChange = (page: number, newPageSize?: number | undefined) => {
    setPage(page);
    if (newPageSize) {
      setPageSize(newPageSize);

      // if (pageSize === newPageSize || newPageSize < pageSize) {
      //   window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      // }
    }
  };

  const onSortDirectionChange = (event: any) => {
    const { value } = event;
    const sortIndex = Number(value) - 1;
    setSortDir(sortDirections[sortIndex]);
    setSortColumn(sortColumns[sortIndex]);
    setPage(1);
  };

  const onSortByAvailability = (availabilityEvent: any) => {
    const checked = availabilityEvent?.target?.checked;
    if (checked !== undefined) {
      setByAvailability(checked);
    }
    setLastRentEnd(checked ? getNowTs().toString() : DEFAULT_LAST_RENT_END);
    setPage(1);
  };

  const onPlaceChange = (placeChangeEvent: any) => {
    // TODO:: some filtering here
    console.log(placeChangeEvent);
  };

  const getAssets = async (
    page: number,
    pageSize: number,
    metaverse: string,
    lastRentEnd: string,
    orderColumn: string,
    sortDir: string
  ) => {
    const lands = await fetchListedAssetsByMetaverseAndGteLastRentEndWithOrder(
      page,
      pageSize,
      metaverse,
      lastRentEnd,
      orderColumn,
      sortDir
    );

    setLands(lands.data);
    setTotalLands(lands?.meta.count);
  };

  useEffect(() => {
    getAssets(page, pageSize, DECENTRALAND_METAVERSE, lastRentEnd, sortColumn, sortDir);
  }, [page, pageSize, sortColumn, sortDir, byAvailability, wallet.account]);

  // toast.success('Property listed successfully.', {
  //   position: toast.POSITION.TOP_RIGHT,
  //   className: 'success-toast',
  //   style: { borderRadius: '10px', fontSize: '14px', padding: '20px' },
  // });

  // toast.error('There was an error while listing the property.', {
  //   position: toast.POSITION.TOP_RIGHT,
  //   className: 'error-toast',
  //   style: { borderRadius: '10px', fontSize: '14px', padding: '20px' },
  // });

  return (
    <div className="content-container">
      <Row className="lands-container">
        <Col span={24}>
          <Row justify={end} className="actions-container">
            {/* Removed for MVP version due to lack of view for adjacent lands*/}
            {/*{wallet.account &&  (*/}
            {/*  <Col style={{ marginRight: '30px' }} className='lands-claim-container'>*/}
            {/*    <LandsAction*/}
            {/*      onButtonClick={setShowClaimModal}*/}
            {/*      buttonText={'VIEW'}*/}
            {/*      subHeading='There is avalailable'*/}
            {/*      mainHeading='Adjacent land-registry-provider'*/}
            {/*    />*/}
            {/*  </Col>*/}
            {/*)}*/}
            {user.hasUnclaimedRent && (
              <Col className="lands-claim-container">
                <LandsAction
                  onButtonClick={setShowClaimModal}
                  buttonText={'CLAIM '}
                  subHeading="You have"
                  isClaimButtonDisabled={claimButtonDisabled}
                  mainHeading="Unclaimed rent"
                />
              </Col>
            )}
          </Row>
          <Row className="filters" gutter={20}>
            <Col>
              <LandsPriceSorter onSortDirectionChange={onSortDirectionChange} data={data} />
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
              { xs: 16, sm: 16, md: 16, lg: 32 },
              { xs: 16, sm: 16, md: 16, lg: 32 },
            ]}
          >
            {lands.length ? (
              lands.map((land) => <LandWorkCard key={land.id} land={land} />)
            ) : (
              <div>No properties are currently listed</div>
            )}
          </Row>
        </Col>
        {!!lands.length && (
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
        )}
      </Row>

      <ClaimModal
        onSubmit={() => {
          setClaimButtonDisabled(true);
          setShowClaimModal(false);
        }}
        onCancel={() => setShowClaimModal(false)}
        visible={showClaimModal}
        rentFees={user?.unclaimedRentAssets}
      />
    </div>
  );
};

export default Lands;
