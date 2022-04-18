import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSubscription } from '@apollo/client';
import { end } from '@popperjs/core';
import { Col, Row } from 'antd';

import { AssetEntity, USER_SUBSCRIPTION, UserEntity, parseUser } from 'modules/land-works/api';
import ClaimHistoryTable from 'modules/land-works/components/land-claim-history';
import LandsRentingSorter from 'modules/land-works/components/land-renting-sorter';
import LandWorksCard from 'modules/land-works/components/land-works-card';
import { LandsPlaceSorter } from 'modules/land-works/components/lands-place-sorter';
import { useWallet } from 'wallets/wallet';

import LandCardSkeleton from '../../components/land-base-loader-card';
import { LandsAction } from '../../components/lands-action';
import { ClaimModal } from '../../components/lands-claim-modal';

import './index.scss';

const MyLendingView: React.FC = () => {
  const history = useHistory();
  const wallet = useWallet();

  const [showClaimModal, setShowClaimModal] = useState(false);
  const [assets, setAssets] = useState([] as AssetEntity[]);
  const [user, setUser] = useState({} as UserEntity);
  const [claimButtonDisabled, setClaimButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(wallet.isActive);

  useSubscription(USER_SUBSCRIPTION(), {
    skip: wallet.account === undefined,
    variables: { id: wallet.account?.toLowerCase() },
    onSubscriptionData: async ({ subscriptionData }) => {
      if (subscriptionData.error) {
        // TODO:
      }

      setLoading(subscriptionData.loading);
      if (subscriptionData.data.user === null) {
        setUser({} as UserEntity);
        setAssets([]);
        return;
      }

      const user = await parseUser(subscriptionData.data.user);
      setClaimButtonDisabled(false);
      setUser(user);
      setAssets(user?.ownerAndConsumerAssets || []);
    },
  });

  useEffect(() => {
    if (wallet.account) {
      setLoading(true);
    } else {
      setUser({} as UserEntity);
      setAssets([]);
    }
  }, [wallet.account]);

  const onPlaceChange = () => {
    // TODO:: some filtering here
  };

  const onRentSortChange = (sortEvent: () => void) => {
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
                  isClaimButtonDisabled={claimButtonDisabled}
                />
              </Col>
            )}
          </Row>
          {!!assets.length && (
            <Row className="filters" gutter={20} align={'middle'}>
              <Col>
                <LandsRentingSorter onRentSortChange={onRentSortChange} />
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
            ) : assets.length ? (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              assets.map((land: any) => <LandWorksCard key={land.id} land={land} />)
            ) : (
              <div className="empty-state">
                <p>You do not have any listed properties. Fill this page by adding one</p>
                <button className="accent" onClick={() => history.push('/explore')}>
                  List property
                </button>
              </div>
            )}
          </Row>
        </Col>
      </Row>
      {!!assets.length && (
        <Row gutter={40} className="claim-history-container">
          <Col span={24} style={{ padding: '0px' }}>
            <ClaimHistoryTable />
          </Col>
        </Row>
      )}

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

export default MyLendingView;
