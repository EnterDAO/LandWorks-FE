interface AddEthereumChainParameter {
  chainId: string;
  blockExplorerUrls?: string[];
  chainName?: string;
  iconUrls?: string[];
  nativeCurrency?: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls?: string[];
}

export const mainnetConfig: AddEthereumChainParameter = {
  chainId: `0x${Number(1).toString(16)}`,
  chainName: 'Ethereum Mainnet',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: [`https://mainnet.infura.io/v3/${process.env.REACT_APP_WEB3_RPC_WSS_URL}`],
  blockExplorerUrls: ['https://etherscan.io'],
};

const goerliConfig: AddEthereumChainParameter = {
  chainId: `0x${Number(5).toString(16)}`,
  chainName: 'Ethereum Testnet Goerli',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: [`https://goerli.infura.io/v3/${process.env.REACT_APP_WEB3_RPC_WSS_URL}`],
  blockExplorerUrls: ['https://goerli.etherscan.io'],
};

const rinkebyConfig: AddEthereumChainParameter = {
  chainId: `0x${Number(4).toString(16)}`,
  chainName: 'Ethereum Testnet Rinkeby',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: [`https://rinkeby.infura.io/v3/${process.env.REACT_APP_WEB3_RPC_WSS_URL}`],
  blockExplorerUrls: ['https://rinkeby.etherscan.io'],
};

export const networks = {
  mainnet: mainnetConfig,
  goerli: goerliConfig,
  rinkeby: rinkebyConfig,
};
