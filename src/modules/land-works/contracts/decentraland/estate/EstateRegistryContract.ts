import BigNumber from 'bignumber.js';
import { AbiItem } from 'web3-utils';
import { BatchContractMethod, Web3ContractAbiItem } from 'web3/web3Contract';

import ERC721Contract from '../../erc721/ERC721Contract';
import EstateRegistryABI from './abi.json';

export default class EstateRegistryContract extends ERC721Contract {
  constructor(abi: AbiItem[], address: string) {
    super([...(EstateRegistryABI as Web3ContractAbiItem[]), ...abi], address);
  }

  /**
   * Gets the balance of the user and all the Estates with their metadata and coordinates.
   * @param user The address of the user.
   */
  async getUserData(user: string): Promise<any> {
    const totalTokens = await this.call('balanceOf', [user]);

    const promises = [];
    for (let i = 0; i < totalTokens; i++) {
      promises.push(this.getTokenData(user, i));
    }
    return Promise.all(promises);
  }

  /**
   * Gets the token by owner and index. Returns the metadata and estate size.
   * @param user
   * @param index
   */
  async getTokenData(user: string, index: number): Promise<any> {
    const tokenId = await this.call('tokenOfOwnerByIndex', [user, index]); // Get the token ID
    const promises = [this.call('getMetadata', [tokenId]), this.getEstateData(tokenId)];

    const result = await Promise.all(promises);
    let name = result[0];
    if (name === '') {
      name = `ESTATE (${result[1].estateSize} LAND)`;
    }

    return {
      id: tokenId,
      name: name,
      landIds: result[1],
      isLAND: false,
    };
  }

  /**
   * Gets the estate size and corresponding LANDs tokenIds
   * @param tokenId The target tokenId
   */
  async getEstateData(tokenId: BigNumber): Promise<any> {
    const estateSize = await this.call('getEstateSize', [tokenId]);

    const batch: BatchContractMethod[] = [];
    for (let i = 0; i < estateSize; i++) {
      batch.push({
        method: 'estateLandIds',
        methodArgs: [tokenId, i],
      });
    }
    const landIds = await this.batch(batch);

    return {
      estateSize,
      landIds,
    };
  }
}
