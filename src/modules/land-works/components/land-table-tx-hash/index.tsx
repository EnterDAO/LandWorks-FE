import { getEtherscanTxUrl, shortenAddr } from 'web3/utils';

import ExternalLink from 'components/custom/external-link';

interface ILandTableTxHashProps {
  txHash: string;
  firstSymbolsLength?: number;
}

const LandTableTxHash: React.FC<ILandTableTxHashProps> = ({ txHash, firstSymbolsLength }) => {
  return (
    <ExternalLink fontSize="inherit" href={getEtherscanTxUrl(txHash)}>
      {shortenAddr(txHash, firstSymbolsLength)}
    </ExternalLink>
  );
};

export default LandTableTxHash;
