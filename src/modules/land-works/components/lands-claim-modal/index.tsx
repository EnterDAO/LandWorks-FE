import React, { useEffect, useState } from 'react';
import { useSubscription } from '@apollo/client';
import { Col, Row } from 'antd';
import BigNumber from 'bignumber.js';

import Button from 'components/antd/button';
import Modal, { ModalProps } from 'components/antd/modal';
import Icon from 'components/custom/icon';
import SmallAmountTooltip from 'components/custom/smallAmountTooltip';
import { Text } from 'components/custom/typography';
import { ToastType, showToastNotification } from 'helpers/toast-notifcations';
import { LandClaimCheckBox } from 'modules/land-works/components/land-claim-modal-checkbox';
import { useWallet } from 'wallets/wallet';

import { AssetEntity, USER_CLAIM_SUBSCRIPTION, UserEntity, parseUser } from '../../api';
import { useLandworks } from '../../providers/landworks-provider';

import './index.scss';

type Props = ModalProps & {
  onSubmit: () => void;
  rentFees?: AssetEntity[];
};

const MAX_CLAIM_SELECTED_ASSETS = 10;

export const ClaimModal: React.FC<Props> = (props) => {
  const landWorksCtx = useLandworks();
  const { landWorksContract } = landWorksCtx;

  const { onCancel, onSubmit, ...modalProps } = props;

  const [assets, setAssets] = useState([] as AssetEntity[]);
  const [totalEth, setTotalEth] = useState(BigNumber.ZERO);
  const [totalUsdc, setTotalUsdc] = useState(BigNumber.ZERO);
  const [user, setUser] = useState<UserEntity>();
  const wallet = useWallet();

  const { data: userData } = useSubscription(USER_CLAIM_SUBSCRIPTION, {
    skip: wallet.account === undefined,
    variables: { id: wallet.account?.toLowerCase() },
  });

  useEffect(() => {
    if (userData && userData.user) {
      parseUser(userData.user).then((result) => {
        setUser(result);
      });
    } else {
      setUser({} as UserEntity);
    }
  }, [userData]);

  async function claim() {
    try {
      const assetIds = assets.map((a) => new BigNumber(a.id));
      await landWorksContract?.claimMultipleRentFees(assetIds, onSubmit);
      showToastNotification(ToastType.Success, 'Rent claimed successfully!');
    } catch (e) {
      showToastNotification(ToastType.Error, 'There was an error while claiming the rent.');
      console.log(e);
    }
  }

  function calculateTotals() {
    let totalEth = BigNumber.ZERO;
    let totalUsdc = BigNumber.ZERO;
    for (const asset of assets) {
      if (asset.paymentToken.symbol === 'ETH') {
        totalEth = asset.unclaimedRentFee.plus(totalEth);
      } else {
        totalUsdc = asset.unclaimedRentFee.plus(totalUsdc);
      }
    }

    setTotalEth(totalEth);
    setTotalUsdc(totalUsdc);
  }

  const hasReachedMaxClaimsLimit = () => {
    return assets.length > MAX_CLAIM_SELECTED_ASSETS;
  };

  const isClaimDisabled = () => {
    return assets.length === 0 || hasReachedMaxClaimsLimit();
  };

  function updateAssets(isChecked: boolean, asset: AssetEntity): void {
    if (isChecked) {
      setAssets([...assets, asset]);
    } else {
      setAssets(assets.filter((i) => i.id !== asset.id));
    }
  }

  useEffect(() => {
    calculateTotals();
  }, [assets]);

  return (
    <Modal
      width={600}
      className="claim-modal"
      title={<p style={{ textAlign: 'center', fontSize: '16px' }}>Claim</p>}
      onCancel={onCancel}
      {...modalProps}
    >
      <Text type="p1" color="secondary" align="center" className="subtitle">
        Select the properties you want to claim your rent for
      </Text>
      <Row gutter={[10, 10]}>
        {user?.unclaimedRentAssets?.map((data) => (
          <Col key={data.id} span={24}>
            <LandClaimCheckBox key={data.id} onSelected={updateAssets} data={data} />
          </Col>
        ))}
        {hasReachedMaxClaimsLimit() && (
          <Col span={24} className="max-transaction-limit">
            <p>You have reached the limit of max claims in one transaction.</p>
          </Col>
        )}
        <Col span={24} className="claim-modal-footer">
          <Row>
            <Col span={19} className="prices-container" style={{ gap: 10 }}>
              <span className="total-label">Total:</span>{' '}
              <SmallAmountTooltip className="totalPrice" amount={totalEth} />
              <Icon name="png/eth" className="eth-icon" />
              <SmallAmountTooltip className="totalPrice" amount={totalUsdc} />
              <Icon name="token-usdc" className="eth-icon" />
            </Col>
            <Col span={5}>
              <Button className="claim-button" disabled={isClaimDisabled()} type="primary" onClick={claim}>
                Claim
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Modal>
  );
};
