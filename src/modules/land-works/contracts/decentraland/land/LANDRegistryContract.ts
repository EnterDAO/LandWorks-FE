import BigNumber from 'bignumber.js';
import { AbiItem } from 'web3-utils';
import { Web3ContractAbiItem } from 'web3/web3Contract';
import ERC721Contract from '../../erc721/ERC721Contract';

import LANDRegistryABI from './abi.json';

export default class LANDRegistryContract extends ERC721Contract {

  constructor(abi: AbiItem[], address: string) {
    super([...LANDRegistryABI as Web3ContractAbiItem[], ...abi], address);
  }

  /**
   * Gets the balance of the user and all the LANDs with their metadata and coordinates.
   * @param user The address of the user.
   */
  async getUserData(user: string): Promise<any> {
    const tokens = await this.call('tokensOf', [user]);

    const promises = [];
    for (const token of tokens) {
      promises.push(this.getTokenData(token));
    }
    return Promise.all(promises);
  }

  /**
   * Returns the coordinates and metadata of the token.
   * @param tokenId
   */
  async getTokenData(tokenId: BigNumber): Promise<any> {
    const data = await this.batch([
      {
        method: 'tokenMetadata',
        methodArgs: [tokenId],
      },
      {
        method: 'decodeTokenId',
        methodArgs: [tokenId],
      },
    ]);

    return {
      id: tokenId,
      name: data[0],
      coords: data[1],
    }
  }
}
