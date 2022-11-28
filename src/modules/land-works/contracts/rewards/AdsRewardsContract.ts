import Web3Contract, { Web3ContractAbiItem } from 'web3/web3Contract';

import adsRewardsContractAbi from './abi.json';

export default class AdsRewardsContract extends Web3Contract {
  constructor(address: string) {
    super(adsRewardsContractAbi as Web3ContractAbiItem[], address, '');
  }

  claim(walletAddress: string, amount: string, proof: string[]): Promise<any> {
    return this.send('claim', [walletAddress, amount, proof], {
      from: walletAddress,
    });
  }
}
