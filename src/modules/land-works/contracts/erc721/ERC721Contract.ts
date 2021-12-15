import BigNumber from 'bignumber.js';
import { AbiItem } from 'web3-utils';
import Web3Contract from 'web3/web3Contract';

export default abstract class ERC721Contract extends Web3Contract {

  protected constructor(abi: AbiItem[], address: string) {
    super([...abi], address, '');

    this.on(Web3Contract.UPDATE_ACCOUNT, () => {
      if (!this.account) {
        this.emit(Web3Contract.UPDATE_DATA);
      }
    });
  }

  /**
   * Gives permission to `to` to transfer `tokenId` token to another account.
   */
  approve(
    to: string,
    tokenId: BigNumber): Promise<void> {
    if (!this.account) {
      return Promise.reject();
    }

    return this.send('approve',
      [
        to,
        tokenId
      ], {
        from: this.account,
      }).then();
  }
}
