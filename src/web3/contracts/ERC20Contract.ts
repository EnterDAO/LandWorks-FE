import Web3 from 'web3';
import { ContractOptions } from 'web3-eth-contract';

import { erc20Abi } from './abi';
import EthereumContract from './EthereumContract';

class ERC20Contract extends EthereumContract {
  constructor(web3: Web3, address: string, options?: ContractOptions) {
    super(web3, erc20Abi, address, options);
  }

  balanceOf(ownerAddress: string) {
    return this.callMethod<string>('balanceOf', [ownerAddress]);
  }

  decimals() {
    return this.callMethod<string>('decimals');
  }

  name() {
    return this.callMethod<string>('name');
  }

  symbol() {
    return this.callMethod<string>('symbol');
  }

  totalSupply() {
    return this.callMethod<string>('totalSupply');
  }

  approve(spenderAddress: string, amount: string, from: string) {
    console.log(this.web3.defaultAccount);
    console.log(this.contract.defaultAccount);
    console.log(this.contract.options);
    return this.sendMethod<boolean>('approve', {
      params: [spenderAddress, amount],
      options: {
        from,
      },
    });
  }

  allowance(ownerAddress: string, spenderAddress: string) {
    return this.callMethod<string>('allowance', [ownerAddress, spenderAddress]);
  }
}

export default ERC20Contract;
