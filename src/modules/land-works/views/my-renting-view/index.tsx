import React, { useEffect, useState } from 'react';
import { end } from '@popperjs/core';
import { Col, Row } from 'antd';

import { UserEntity, fetchUser } from 'modules/land-works/api';
import LandRentingCard from 'modules/land-works/components/land-renting-card';
import LandsRentingSorter from 'modules/land-works/components/land-renting-sorter';
import { LandsPlaceSorter } from 'modules/land-works/components/lands-place-sorter';
import { useWallet } from 'wallets/wallet';

import { landsMockData } from '../lands-view/mockLands';

const RentingView = () => {
  const wallet = useWallet();

  const [lands, setLands] = useState(landsMockData);
  const [user, setUser] = useState({} as UserEntity);

  const getUser = async (account: string | undefined) => {
    let user = {} as UserEntity;
    if (account) {
      user = await fetchUser(account);
    }
    setUser(user);
  };

  useEffect(() => {
    getUser(wallet.account);
  }, []);

  const onPlaceChange = (placeChangeEvent: any) => {
    // TODO:: some filtering here
    console.log(placeChangeEvent);
  };

  const onRentSortChange = (sortEvent: any) => {
    // TODO:: some filtering here
    console.log(sortEvent);
  };

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
          </Row>
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
            {lands.map((land: any) => (
              <LandRentingCard key={land.id} land={land} userAddress={wallet.account || ''} />
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default RentingView;
