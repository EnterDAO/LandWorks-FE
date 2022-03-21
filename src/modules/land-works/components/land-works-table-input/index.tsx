import React, { ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import web3 from 'web3';
import { getEtherscanAddressUrl, shortenAddr } from 'web3/utils';

import ExternalLink from 'components/custom/externalLink';
import { Button, Input, InputLabel, Modal, Typography } from 'design-system';
import { EditIcon } from 'design-system/icons';
import { getAddressFromENS } from 'helpers/helpers';
import { ToastType, showToastNotification } from 'helpers/toast-notifcations';
import { useLandworks } from 'modules/land-works/providers/landworks-provider';

import { useWallet } from '../../../../wallets/wallet';
import { ModalLoader } from '../lands-modal-loading';
import { ModalSuccess } from '../lands-modal-success';
import { StyledGrid } from './styled';

import './index.scss';

type Iprops = {
  operator: string;
  assetId: string;
  rentId: string;
  renter: string;
  ens?: string | null;
  isEditable: boolean;
};
type transactionStatus = 'loading' | 'success' | 'pending';

const TableInput: React.FC<Iprops> = ({ operator, assetId, rentId, renter, isEditable, ens }) => {
  const wallet = useWallet();
  const landWorks = useLandworks();

  const { landWorksContract } = landWorks;

  const [disabled, setDisabled] = useState<boolean>(true);
  const [newOperator, setNewOperator] = useState<string>('');
  const [transactionStatus, setTransactionStatus] = useState<transactionStatus>('pending');
  const [canEditOperator, setCanEditOperator] = useState(true);

  const shortedOperator = shortenAddr(newOperator || operator);

  const handleSave = async () => {
    if (landWorksContract) {
      setTransactionStatus('loading');
      try {
        if (!web3.utils.isAddress(newOperator)) {
          const address = await getAddressFromENS(newOperator);
          if (!address) {
            toast.error('The new operator address is invalid.', {
              position: toast.POSITION.TOP_RIGHT,
              className: 'error-toast',
              style: { borderRadius: '10px', fontSize: '14px', padding: '20px' },
            });
            setTransactionStatus('pending');
            setNewOperator('');
            return;
          }
          setNewOperator(address);
        }

        if (newOperator?.toLowerCase() === operator?.toLowerCase()) {
          toast.error('New operator is the same as the current one.', {
            position: toast.POSITION.TOP_RIGHT,
            className: 'error-toast',
            style: { borderRadius: '10px', fontSize: '14px', padding: '20px' },
          });
          setTransactionStatus('pending');
          setNewOperator('');
          return;
        }

        const rentArray = rentId.split('-');
        if (rentArray.length === 2) {
          await landWorksContract.updateOperator(assetId, rentArray[1], newOperator);
          showToastNotification(ToastType.Success, 'Operator updated successfully!');
          setTransactionStatus('success');
          setNewOperator('');
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setTransactionStatus('pending');
        showToastNotification(ToastType.Error, 'There was an error while updating the operator.');
        console.log(err.message);
        setNewOperator('');
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewOperator(e.target.value);
  };

  const handleCancel = () => {
    setDisabled(true);
    if (transactionStatus === 'pending') {
      setNewOperator(operator);
    }
  };

  const successfully = () => {
    setTransactionStatus('pending');
    setDisabled(true);
  };

  useEffect(() => {
    // Check if renter is equal to connected wallet address
    if (wallet.account && wallet.account.toLowerCase() === renter.toLowerCase() && isEditable) {
      setCanEditOperator(true);
    }
  }, [isEditable, wallet.account]);

  return (
    <div className="operator">
      <ExternalLink className="operator-input-link" target="_blank" href={getEtherscanAddressUrl(operator)}>
        {shortedOperator || ens}
      </ExternalLink>
      {!canEditOperator ? (
        <></>
      ) : disabled ? (
        <button className="edit-btn" disabled={transactionStatus === 'loading'} onClick={() => setDisabled(false)}>
          <EditIcon />
        </button>
      ) : (
        <Modal open={!disabled} height={'100%'} handleClose={handleCancel}>
          {transactionStatus === 'pending' && (
            <StyledGrid container>
              <Typography variant="h2">Change Operator</Typography>
              <Typography variant="subtitle2">
                Change current operator address. This action requires a network fee to be paid
              </Typography>

              <InputLabel>
                <p>Operator Address (or ENS)</p>
                <Input placeholder="e.g 0xabe26494hr74hrtjc0b...cBaC or vitalik.eth" onChange={handleChange} />
              </InputLabel>
              <Button variant="gradient" disabled={!newOperator.length} onClick={handleSave}>
                Change
              </Button>
            </StyledGrid>
          )}
          {transactionStatus === 'loading' && <ModalLoader href={getEtherscanAddressUrl(wallet.account) || ''} />}
          {transactionStatus === 'success' && (
            <ModalSuccess
              buttonText="close"
              title="Successfully Changed!"
              description="Nice! You’ve successfully changed operator."
              buttonEvent={successfully}
            />
          )}
        </Modal>
      )}
    </div>
  );
};

export default TableInput;
