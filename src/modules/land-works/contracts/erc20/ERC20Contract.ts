import BigNumber from 'bignumber.js';
import { AbiItem } from 'web3-utils';
import Web3Contract, { Web3ContractAbiItem } from 'web3/web3Contract';
import ERC20Abi from './abi.json';

export default class ERC20Contract extends Web3Contract {

  constructor(abi: AbiItem[], address: string) {
    super([...ERC20Abi as Web3ContractAbiItem[], ...abi], address, '');

    this.on(Web3Contract.UPDATE_ACCOUNT, () => {
      if (!this.account) {
        this.emit(Web3Contract.UPDATE_DATA);
      }
    });
  }

  /**
   * Gets the balance of the user and the allowance for a given spender (e.g. LandWorks contract).
   * @param user The address of the user.
   * @param spender The address of the spender.
   */
  getUserData(user: string, spender: string): Promise<any> {
    return this.batch([
      {
        method: 'balanceOf',
        transform: value => new BigNumber(value),
      },
      {
        method: 'allowance',
        transform: value => new BigNumber(value),
      },
    ])
      .then(([balance, allowance]) => ({ balance, allowance }));
  }

  /**
   * Sets `amount` as the allowance of `spender` over the caller's tokens.
   * @param spender The to-be-spender of the `amount`.
   * @param amount The amount to be spent.
   */
  approve(
    spender: string,
    amount: BigNumber): Promise<void> {
    if (!this.account) {
      return Promise.reject();
    }

    return this.send('approve',
      [
        spender,
        amount,
      ], {
        from: this.account,
      }).then();
  }
}
