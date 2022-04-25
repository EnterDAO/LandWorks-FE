import React, { useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';

import Icon from 'components/custom/icon';
import SmallAmountTooltip from 'components/custom/small-amount-tooltip';
import { Text } from 'components/custom/typography';
import { Button, Grid, Modal } from 'design-system';
import { ToastType, showToastNotification } from 'helpers/toast-notifcations';
import { LandClaimCheckBox } from 'modules/land-works/components/land-claim-modal-checkbox';

import { AssetEntity } from '../../api';
import { useLandworks } from '../../providers/landworks-provider';

import './index.scss';

type Props = {
  open: boolean;
  onSubmit: () => void;
  onCancel: () => void;
  rentFees?: AssetEntity[];
};

const MAX_CLAIM_SELECTED_ASSETS = 10;

export const ClaimModal: React.FC<Props> = (props) => {
  const landWorksCtx = useLandworks();
  const { landWorksContract } = landWorksCtx;

  const { open, onCancel, onSubmit, rentFees, ...modalProps } = props;

  const [assets, setAssets] = useState([] as AssetEntity[]);
  const [totalEth, setTotalEth] = useState(BigNumber.ZERO);
  const [totalUsdc, setTotalUsdc] = useState(BigNumber.ZERO);

  const claim = async () => {
    try {
      const assetIds = assets.map((a) => new BigNumber(a.id));
      await landWorksContract?.claimMultipleRentFees(assetIds, onSubmit);
      showToastNotification(ToastType.Success, 'Rent claimed successfully!');
    } catch (e) {
      showToastNotification(ToastType.Error, 'There was an error while claiming the rent.');
      console.log(e);
    }
  };

  const calculateTotals = () => {
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
  };

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
      className="claim-modal"
      handleClose={onCancel}
      {...modalProps}
      open={open}
      title={
        <Text type="h3" weight="bold" color="primary">
          Claim
        </Text>
      }
    >
      <Text type="p1" color="secondary" align="center" className="subtitle">
        Select the properties you want to claim your rent for
      </Text>
      <Grid container>
        {rentFees?.map((data) => (
          <Grid item key={data.id}>
            <LandClaimCheckBox key={data.id} onSelected={updateAssets} data={data} />
          </Grid>
        ))}
        {hasReachedMaxClaimsLimit() && (
          <Grid item className="max-transaction-limit">
            <p>You have reached the limit of max claims in one transaction.</p>
          </Grid>
        )}
        <Grid item className="claim-modal-footer">
          <Grid container spacing={2}>
            <Grid item xs={8} className="prices-container" style={{ gap: 10 }}>
              <span className="total-label">Total:</span>{' '}
              <SmallAmountTooltip className="totalPrice" amount={totalEth} />
              <Icon name="png/eth" className="eth-icon" />
              <SmallAmountTooltip className="totalPrice" amount={totalUsdc} />
              <Icon name="token-usdc" className="eth-icon" />
            </Grid>
            <Grid item xs={4}>
              <Button
                btnSize="auto"
                className="claim-button"
                disabled={isClaimDisabled()}
                variant="primary"
                onClick={claim}
              >
                Claim
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  );
};
