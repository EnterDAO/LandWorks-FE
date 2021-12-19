import React, { useEffect, useState } from 'react';
import { end } from '@popperjs/core';
import { Col, Row } from 'antd';

import { UserEntity, fetchUserAssets } from 'modules/land-works/api';
import LandsRentingSorter from 'modules/land-works/components/land-renting-sorter';
import LandWorksCard from 'modules/land-works/components/land-works-card';
import { LandsPlaceSorter } from 'modules/land-works/components/lands-place-sorter';
import { useWallet } from 'wallets/wallet';

const LendingView = () => {
  const wallet = useWallet();

  const [lands, setLands] = useState<any>([]);
  const [user, setUser] = useState({} as UserEntity);

  const getUser = async (account: string | undefined) => {
    let user = {} as UserEntity;
    // let assetRents;
    if (account) {
      user = await fetchUserAssets(account);
      // Combine consumerTo + assets and remove duplicate
      // assetRents = await fetchAssetRents(account);
    }
    setUser(user);
    console.log(user);
    // console.log('ASSET RENTS:');
    // console.log(assetRents);
    // user.rents.forEach((rent: any) => {
    //   const rentAsset = user.assets.find(
    //     (a: any) => a.decentralandData.coordinates[0].id === rent.asset.decentralandData.coordinates[0].id,
    //   );
    //   if (rentAsset) {
    //     setLands((l: any) => [...l, rentAsset]);
    //   }
    // });
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
            {[].map((land: any) => (
              <LandWorksCard key={land.id} land={land} />
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default LendingView;
