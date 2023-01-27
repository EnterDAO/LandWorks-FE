import { AbiItem } from 'web3-utils';

const createAbiItem = (name: string, inputs: string[] = [], outputs: string[] = []): AbiItem => {
  return {
    name,
    type: 'function',
    stateMutability: 'view',
    inputs: inputs.map((type) => ({ name: '', type })),
    outputs: outputs.map((type) => ({ name: '', type })),
  };
};

const erc20Abi: AbiItem[] = [
  createAbiItem('name', [], ['string']),
  createAbiItem('symbol', [], ['string']),
  createAbiItem('decimals', [], ['uint8']),
  createAbiItem('totalSupply', [], ['uint256']),
  createAbiItem('balanceOf', ['address'], ['uint256']),
  createAbiItem('allowance', ['address', 'address'], ['uint256']),
  createAbiItem('approve', ['address', 'uint256'], ['bool']),
];

export default erc20Abi;
