import React, { useEffect, useState } from 'react';
import { useSubscription } from '@apollo/client';
import { end } from '@popperjs/core';
import { Col, Row } from 'antd';

import LandCardSkeleton from 'modules/land-works/components/land-base-loader-card';
import LandWorkCard from 'modules/land-works/components/land-works-card';
import { LandsAction } from 'modules/land-works/components/lands-action';
import { ClaimModal } from 'modules/land-works/components/lands-claim-modal';
import { useWallet } from 'wallets/wallet';

import {
  AssetEntity,
  USER_SUBSCRIPTION,
  UserEntity,
  fetchAllListedAssetsByMetaverseAndGteLastRentEndWithOrder,
  parseUser,
} from '../../api';
import { sortColumns, sortDirections } from '../lands-view';

import './index.scss';

const DECENTRALAND_METAVERSE = '1';
const DEFAULT_LAST_RENT_END = '0';

const ExploreView: React.FC = () => {
  const wallet = useWallet();

  const [lands, setLands] = useState([] as AssetEntity[]);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [user, setUser] = useState({} as UserEntity);

  const [claimButtonDisabled, setClaimButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const getAssets = async (metaverse: string) => {
    const lands = await fetchAllListedAssetsByMetaverseAndGteLastRentEndWithOrder(
      metaverse,
      DEFAULT_LAST_RENT_END,
      sortColumns[0],
      sortDirections[0]
    );

    setLands(lands.data);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getAssets(DECENTRALAND_METAVERSE);
  }, [wallet.account]);

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
                  isClaimButtonDisabled={claimButtonDisabled}
                  mainHeading="Unclaimed rent"
                />
              </Col>
            )}
          </Row>
          <Row
            gutter={[
              { xs: 16, sm: 16, md: 16, lg: 32 },
              { xs: 16, sm: 16, md: 16, lg: 32 },
            ]}
          >
            {loading ? (
              [1, 2, 3].map((i) => <LandCardSkeleton key={i} />)
            ) : lands.length ? (
              lands.map((land) => <LandWorkCard key={land.id} land={land} />)
            ) : (
              <div>No properties are currently listed</div>
            )}
          </Row>
        </Col>
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

export default ExploreView;
