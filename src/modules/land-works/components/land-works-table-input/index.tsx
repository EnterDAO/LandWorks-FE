import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Input } from 'antd';
import web3 from 'web3';

import Icon from 'components/custom/icon';
import { ToastType, showToastNotification } from 'helpers/toast-notifcations';
import { useLandworks } from 'modules/land-works/providers/landworks-provider';

import { useWallet } from '../../../../wallets/wallet';

import './index.scss';

type Iprops = {
  operator: string;
  assetId: string;
  rentId: string;
  renter: string;
  isRentActive: boolean;
};

const TableInput: React.FC<Iprops> = ({ operator, assetId, rentId, renter, isRentActive }) => {
  const wallet = useWallet();
  const landWorks = useLandworks();

  const { landWorksContract } = landWorks;

  const [disabled, setDisabled] = useState<boolean>(true);
  const [newOperator, setNewOperator] = useState<string>(operator);
  const [canEditOperator, setCanEditOperator] = useState(false);

  const handleSave = async () => {
    if (landWorksContract) {
      try {
        if (!web3.utils.isAddress(newOperator)) {
          toast.error('The new operator address is invalid.', {
            position: toast.POSITION.TOP_RIGHT,
            className: 'error-toast',
            style: { borderRadius: '10px', fontSize: '14px', padding: '20px' },
          });
          return;
        }

        if (newOperator.toLowerCase() === operator.toLowerCase()) {
          toast.error('New operator is the same as the current one.', {
            position: toast.POSITION.TOP_RIGHT,
            className: 'error-toast',
            style: { borderRadius: '10px', fontSize: '14px', padding: '20px' },
          });
          return;
        }

        const rentArray = rentId.split('-');
        if (rentArray.length === 2) {
          await landWorksContract.updateOperator(assetId, rentArray[1], newOperator);
          showToastNotification(ToastType.Success, 'Operator updated successfully!');

          setDisabled(true);
        }
      } catch (err: any) {
        showToastNotification(ToastType.Error, 'There was an error while updating the operator.');
        console.log(err.message);
      }
    }
  };

  const handleChange = (e: any) => {
    setNewOperator(e.target.value);
  };

  const handleCancel = () => {
    setNewOperator(operator);
    setDisabled(true);
  };

  useEffect(() => {
    // Check if renter is equal to connected wallet address
    if (wallet.account && wallet.account.toLowerCase() === renter.toLowerCase() && isRentActive) {
      setCanEditOperator(true);
    }
  }, [isRentActive, wallet.account]);

  return (
    <div className="operator">
      <Input
        placeholder="Operator Address"
        bordered={false}
        disabled={disabled}
        value={newOperator}
        style={{ color: '#5D8FF0' }}
        defaultValue={newOperator}
        onChange={handleChange}
      />
      {!canEditOperator ? (
        <></>
      ) : disabled ? (
        <button className="edit-btn" onClick={() => setDisabled(false)}>
          <Icon name="pencil-outlined" className="pencil-icon"></Icon>
        </button>
      ) : (
        <>
          <button className="edit-btn" onClick={handleSave}>
            <Icon name="check-circle-outlined" className="pencil-icon"></Icon>
          </button>
          <button className="edit-btn" onClick={handleCancel}>
            <Icon name="close-circle-outlined" className="pencil-icon"></Icon>
          </button>
        </>
      )}
    </div>
  );
};

export default TableInput;
