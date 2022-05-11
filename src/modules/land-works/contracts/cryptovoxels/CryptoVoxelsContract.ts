import { AbiItem } from 'web3-utils';
import { Web3ContractAbiItem } from 'web3/web3Contract';

import { CryptoVoxelNFT } from '../../../interface';
import { CryptoVoxelsType } from '../../api';
import ERC721Contract from '../erc721/ERC721Contract';
import ABI from './abi.json';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatCryptoVoxelsCoords, getCoordsFromCryptoVoxelImageUrl } from 'modules/land-works/utils';

export default class CryptoVoxelsContract extends ERC721Contract {
  constructor(abi: AbiItem[], address: string) {
    super([...(ABI as Web3ContractAbiItem[]), ...abi], address);
  }

  async getUserData(user: string): Promise<CryptoVoxelNFT[]> {
    const totalTokens = await this.call('balanceOf', [user]);

    const promises = [];
    for (let i = 0; i < totalTokens; i++) {
      promises.push(this.getTokenData(user, i));
    }
    return Promise.all(promises);
  }

  async getTokenData(user: string, index: number): Promise<CryptoVoxelNFT> {
    const tokenId = await this.call('tokenOfOwnerByIndex', [user, index]); // Get the token ID
    const tokenURI = await this.call('tokenURI', [tokenId]);
    const metadata: CryptoVoxelsType = await fetch(tokenURI).then((res) => res.json());
    const place = `${metadata.attributes.island}, ${metadata.attributes.suburb}`;
    const coords = getCoordsFromCryptoVoxelImageUrl(metadata.image);
    const formattedCoords = formatCryptoVoxelsCoords(coords);
    return {
      id: tokenId,
      name: metadata.name,
      image: metadata.image,
      contractAddress: this.address,
      place,
      formattedCoords,
      metaverseName: 'Voxels',
    };
  }
}
