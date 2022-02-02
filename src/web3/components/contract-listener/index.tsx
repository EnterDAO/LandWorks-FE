/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
// import TxStatusModal from 'web3/components/tx-status-modal';
// import UserRejectedModal from 'web3/components/user-rejected-modal';
import Web3Contract, { Web3SendMeta, Web3SendState } from 'web3/web3Contract';

type Props = {
  contract?: Web3Contract;
  renderProgress?: (meta?: Web3SendMeta) => React.ReactNode;
  renderSuccess?: (meta?: Web3SendMeta) => React.ReactNode;
  setLandworksTxInProgress: React.Dispatch<React.SetStateAction<boolean>>;
  setTxHash: React.Dispatch<React.SetStateAction<string>>;
};

type TxStatus = {
  visible: boolean;
  state?: Web3SendState;
  meta?: Web3SendMeta;
};

const ContractListener: React.FC<Props> = (props) => {
  const { contract, /*renderProgress, renderSuccess,*/ setLandworksTxInProgress, setTxHash } = props;

  const [, /* userRejectedVisible */ setUserRejected] = React.useState(false);

  const [, /* txStatus */ setTxStatus] = React.useState<TxStatus>({
    visible: false,
    state: undefined,
    meta: undefined,
  });

  React.useEffect(() => {
    if (!contract) {
      return;
    }

    function onHash(txHash: string, meta: Web3SendMeta) {
      setLandworksTxInProgress(true);
      setTxHash(txHash);
      setTxStatus((prevState) => ({
        ...prevState,
        visible: true,
        state: meta.state,
        meta,
      }));
    }

    function onSuccess(result: any, meta: Web3SendMeta) {
      setLandworksTxInProgress(false);
      setTxHash('');
      setTxStatus((prevState) =>
        prevState.meta?.id === meta.id
          ? {
              ...prevState,
              meta: { ...meta },
              state: meta.state,
            }
          : prevState
      );
    }

    function onFail(error: any, meta: Web3SendMeta) {
      setLandworksTxInProgress(false);
      setTxHash('');
      if (error.code === 4001) {
        setUserRejected(true);
      } else {
        setTxStatus((prevState) =>
          prevState.meta?.id === meta.id
            ? {
                ...prevState,
                state: meta.state,
              }
            : prevState
        );
      }
    }

    contract.on('tx:hash', onHash);
    contract.on('tx:success', onSuccess);
    contract.on('tx:fail', onFail);

    return () => {
      contract.off('tx:hash', onHash);
      contract.off('tx:success', onSuccess);
      contract.off('tx:fail', onFail);
    };
  }, [contract, setLandworksTxInProgress]);

  // const handleUserRejectedCancel = React.useCallback(() => {
  //   setLandworksTxInProgress(false);
  //   setUserRejected(false);
  // }, []);

  // const handleStatusModalCancel = React.useCallback(() => {
  //   setLandworksTxInProgress(false);
  //   setTxStatus((prevState) => ({
  //     ...prevState,
  //     visible: false,
  //     state: undefined,
  //     txHash: undefined,
  //   }));
  // }, []);

  return (
    <>
      {/* {userRejectedVisible && <UserRejectedModal onCancel={handleUserRejectedCancel} />}
      {txStatus.visible && (
        <TxStatusModal
          state={txStatus.state}
          txHash={txStatus.meta?.txHash}
          renderProgress={() => renderProgress?.(txStatus.meta)}
          renderSuccess={() => renderSuccess?.(txStatus.meta)}
          onCancel={handleStatusModalCancel}
        />
      )} */}
    </>
  );
};

export default ContractListener;
