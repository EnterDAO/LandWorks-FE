import { getEtherscanTxUrl, shortenAddr } from 'web3/utils';

import { HashLink } from './styled';

interface ILandTableTxHashProps {
  txHash: string;
}

const LandTableTxHash: React.FC<ILandTableTxHashProps> = ({ txHash }) => {
  return (
    <HashLink href={getEtherscanTxUrl(txHash)} target="_blank" rel="noreferrer">
      {shortenAddr(txHash)}
    </HashLink>
  );
};

export default LandTableTxHash;
