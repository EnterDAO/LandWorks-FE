import { getEtherscanTxUrl, shortenAddr } from 'web3/utils';

import { HashLink } from './styled';

interface ILandTableTxHashProps {
  txHash: string;
  firstSymbolsLength?: number;
}

const LandTableTxHash: React.FC<ILandTableTxHashProps> = ({ txHash, firstSymbolsLength }) => {
  return (
    <HashLink href={getEtherscanTxUrl(txHash)} target="_blank" rel="noreferrer">
      {shortenAddr(txHash, firstSymbolsLength)}
    </HashLink>
  );
};

export default LandTableTxHash;
