import BigNumber from 'bignumber.js';
import { AbiItem } from 'web3-utils';
import { Web3ContractAbiItem } from 'web3/web3Contract';

import { getLANDImageUrl } from '../../../../../helpers/helpers';
import { DecentralandNFT } from '../../../../interface';
import ERC721Contract from '../../erc721/ERC721Contract';
import LANDRegistryABI from './abi.json';

import { buildData } from '../../../../../utils';

export default class LANDRegistryContract extends ERC721Contract {
  constructor(abi: AbiItem[], address: string) {
    super([...(LANDRegistryABI as Web3ContractAbiItem[]), ...abi], address);
  }

  /**
   * Gets the balance of the user and all the LANDs with their metadata and coordinates.
   * @param user The address of the user.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  async getTokenData(tokenId: BigNumber): Promise<DecentralandNFT> {
    const data = await this.batch([
      {
        method: 'tokenMetadata', // LAND name
        methodArgs: [tokenId],
      },
      {
        method: 'decodeTokenId', // coordinates
        methodArgs: [tokenId],
      },
    ]);

    const metadata = buildData(data[0]);

    let name = `LAND (${data[1][0]}, ${data[1][1]})`;

    if (metadata !== null && metadata.name !== '') {
      name = `${metadata.name} - ${name}`;
    }

    return {
      id: tokenId.toString(),
      name: name,
      image: getLANDImageUrl(data[1][0], data[1][1]),
      contractAddress: this.address,
      coords: data[1],
      isLAND: true,
      metaverseName: 'Decentraland',
    };
  }
}
