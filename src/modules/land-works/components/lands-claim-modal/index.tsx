import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';

import Button from 'components/antd/button';
import Modal, { ModalProps } from 'components/antd/modal';
import Icon, { TokenIconNames } from 'components/custom/icon';
import { Text } from 'components/custom/typography';
import { LandClaimCheckBox } from 'modules/land-works/components/land-claim-modal-checkbox';

import './index.scss';
import { AssetEntity } from '../../api';
import { useLandworks } from '../../providers/landworks-provider';
import BigNumber from 'bignumber.js';

type Props = ModalProps & {
  rentFees?: AssetEntity[];
  renderProgress?: () => React.ReactNode;
  renderSuccess?: () => React.ReactNode;
};

const MAX_CLAIM_SELECTED_ASSETS = 3; // Can be updated to 7-8

export const ClaimModal: React.FC<Props> = props => {
  const landWorksCtx = useLandworks();
  const { landWorksContract } = landWorksCtx;

  const { rentFees, renderProgress, renderSuccess, ...modalProps } = props;

  const [assets, setAssets] = useState([] as AssetEntity[]);
  const [totalEth, setTotalEth] = useState(BigNumber.ZERO);
  const [totalUsdc, setTotalUsdc] = useState(BigNumber.ZERO);

  async function claim() {
    try {
      const assetIds = assets.map(a => new BigNumber(a.id));
      await landWorksContract?.claimMultipleRentFees(assetIds);
    } catch (e) {
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

  const hasSelectedAssets = () => {
    return assets.length > 0;
  }

  const hasReachedMaxClaimsLimit = () => {
    return assets.length > MAX_CLAIM_SELECTED_ASSETS;
  }

  function updateAssets(isChecked: boolean, asset: AssetEntity): void {
    if (isChecked) {
      setAssets([...assets, asset]);
    } else {
      setAssets(assets.filter(i => i.id !== asset.id));
    }
  }

  useEffect(() => {
    calculateTotals();
  }, [assets]);

  return (
    <Modal
      width={471}
      className='claim-modal'
      title={<p style={{ textAlign: 'center', fontSize: '16px' }}>Claim</p>}
      {...modalProps}>
      <Text type='p1' color='secondary' align='center' className='subtitle'>
        Select the properties you want to claim your rent for
      </Text>
      <Row gutter={[10, 10]}>
        {rentFees?.map(data => (
          <Col span={24}>
            <LandClaimCheckBox key={data.id} onSelected={updateAssets} data={data} />
          </Col>
        ))}
        {hasReachedMaxClaimsLimit() && <Col span={24} className='max-transaction-limit'>
          <p>You have reached the limit of max claims in one transaction.</p>
        </Col>}
        {hasSelectedAssets() && <Col span={24} className='claim-modal-footer'>
          <Row>
            <Col span={19} className='prices-container'>
              <p>
                <span className='total-label'>Total:</span>{' '}
                <span className='total-price'>
                  {totalEth.toString(10)} <Icon name='token-eth' className='eth-icon' />
                </span>{' '}
                <span className='total-price'>
                  {totalUsdc.toString(10)} <Icon name='token-usdc' className='eth-icon' />
                </span>
              </p>
            </Col>
            <Col span={5}>
              <Button
                className='claim-button'
                disabled={hasReachedMaxClaimsLimit()}
                type='primary'
                onClick={() => {
                  console.log('do claiming stuff here');
                  claim();
                }}>
                Claim
              </Button>
            </Col>
          </Row>
        </Col>}
      </Row>
    </Modal>
  );
};
