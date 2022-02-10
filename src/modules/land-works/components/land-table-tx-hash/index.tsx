import { getEtherscanTxUrl, shortenAddr } from 'web3/utils';

interface ILandTableTxHashProps {
  txHash: string;
}

const LandTableTxHash: React.FC<ILandTableTxHashProps> = ({ txHash }) => {
  return (
    <a href={getEtherscanTxUrl(txHash)} target="_blank" rel="noreferrer">
      {shortenAddr(txHash)}
    </a>
  );
};

export default LandTableTxHash;
