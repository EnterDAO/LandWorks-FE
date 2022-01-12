import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { end } from '@popperjs/core';
import { Col, Row } from 'antd';

import { AssetEntity, UserEntity, fetchUserAssets } from 'modules/land-works/api';
import ClaimHistoryTable from 'modules/land-works/components/land-claim-history';
import LandsRentingSorter from 'modules/land-works/components/land-renting-sorter';
import LandWorksCard from 'modules/land-works/components/land-works-card';
import { LandsPlaceSorter } from 'modules/land-works/components/lands-place-sorter';
import { useWallet } from 'wallets/wallet';

import { LandsAction } from '../../components/lands-action';
import { ClaimModal } from '../../components/lands-claim-modal';

import './index.scss';

const LendingView = () => {
  const history = useHistory();
  const wallet = useWallet();

  const [showClaimModal, setShowClaimModal] = useState(false);
  const [assets, setAssets] = useState([] as AssetEntity[]);
  const [user, setUser] = useState({} as UserEntity);

  const getUser = async (account: string) => {
    const user = await fetchUserAssets(account);
    console.log('USER:');
    console.log(user);
    // Combine consumerTo + assets and remove duplicate
    setUser(user);
    setAssets(user?.ownerAndConsumerAssets || []);
  };

  useEffect(() => {
    if (wallet.account) {
      getUser(wallet.account);
    }
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
            {user.hasUnclaimedRent && (
              <Col className="lands-claim-container">
                <LandsAction
                  onButtonClick={setShowClaimModal}
                  buttonText={'CLAIM '}
                  subHeading="You have"
                  mainHeading="Unclaimed rent"
                />
              </Col>
            )}
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
            ]}
          >
            {assets.length ? (
              assets.map((land: any) => <LandWorksCard key={land.id} land={land} />)
            ) : (
              <div className="empty-state">
                <p>You do not have any listed properties. Fill this page by adding one</p>
                <button className="accent" onClick={() => history.push('/list')}>
                  List property
                </button>
              </div>
            )}
          </Row>
        </Col>
      </Row>
      <Row gutter={40} className="claim-history-container">
        <Col span={24} style={{ padding: '0px' }}>
          <ClaimHistoryTable userAddress={wallet.account || ''} />
        </Col>
      </Row>

      <ClaimModal
        onCancel={() => setShowClaimModal(false)}
        visible={showClaimModal}
        rentFees={user?.unclaimedRentAssets}
      />
    </div>
  );
};

export default LendingView;
