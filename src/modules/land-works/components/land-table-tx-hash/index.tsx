import React from 'react';
import { shortenAddr } from 'web3/utils';

interface ILandTableTxHashProps {
  txHash: string;
}
const getTxHashUrl = (txHash: string) => `https://etherscan.io/tx/${txHash}`;

const LandTableTxHash: React.FC<ILandTableTxHashProps> = ({ txHash }) => {
  return (
    <a href={getTxHashUrl(txHash)} target="_blank" rel="noreferrer">
      {shortenAddr(txHash)}
    </a>
  );
};

export default LandTableTxHash;
