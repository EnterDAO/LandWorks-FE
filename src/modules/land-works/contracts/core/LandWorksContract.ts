import BigNumber from 'bignumber.js';
import { AbiItem } from 'web3-utils';
import Web3Contract, { Web3ContractAbiItem } from 'web3/web3Contract';

import LandWorksABI from './abi.json';

export default class LandWorksContract extends Web3Contract {
  constructor(abi: AbiItem[], address: string) {
    super([...(LandWorksABI as Web3ContractAbiItem[]), ...abi], address, '');

    this.on(Web3Contract.UPDATE_ACCOUNT, () => {
      if (!this.account) {
        this.emit(Web3Contract.UPDATE_DATA);
      }
    });
  }

  /**
   * Lists an asset.
   * @param metaverseId The id of the metaverse (e.g. 1 for Decentraland).
   * @param metaverseRegistry The address of the metaverse registry (e.g. LANDRegistry or EstateRegistry).
   * @param metaverseAssetId The token ID of the ERC-721 from the metaverse registry.
   * @param minPeriod
   * @param maxPeriod
   * @param maxFutureTime
   * @param paymentToken
   * @param pricePerSecond
   */
  list(
    metaverseId: BigNumber | number,
    metaverseRegistry: string,
    metaverseAssetId: BigNumber | string,
    minPeriod: BigNumber,
    maxPeriod: BigNumber,
    maxFutureTime: BigNumber,
    paymentToken: string,
    pricePerSecond: BigNumber | string,
  ): Promise<void> {
    if (!this.account) {
      return Promise.reject();
    }

    return this.send(
      'list',
      [
        metaverseId,
        metaverseRegistry,
        metaverseAssetId,
        minPeriod,
        maxPeriod,
        maxFutureTime,
        paymentToken,
        pricePerSecond,
      ],
      {
        from: this.account,
      },
    ).then();
  }

  /**
   * Updates the conditions of an asset.
   * @param assetId The target asset.
   * @param minPeriod
   * @param maxPeriod
   * @param maxFutureTime
   * @param paymentToken The payment token for future rents.
   * @param pricePerSecond The price per second in the lowest denomination.
   */
  updateConditions(
    assetId: BigNumber,
    minPeriod: BigNumber,
    maxPeriod: BigNumber,
    maxFutureTime: BigNumber,
    paymentToken: string,
    pricePerSecond: BigNumber,
  ): Promise<void> {
    if (!this.account) {
      return Promise.reject();
    }

    return this.send('updateConditions', [assetId, minPeriod, maxPeriod, maxFutureTime, paymentToken, pricePerSecond], {
      from: this.account,
    }).then();
  }

  /**
   * Delists the asset.
   * @param assetId The target asset.
   */
  delist(assetId: BigNumber): Promise<void> {
    if (!this.account) {
      return Promise.reject();
    }
    return this.send('delist', [assetId], {
      from: this.account,
    }).then();
  }

  /**
   * Withdraws the asset.
   * @param assetId The target asset.
   */
  withdraw(assetId: BigNumber): Promise<void> {
    if (!this.account) {
      return Promise.reject();
    }
    return this.send('withdraw', [assetId], {
      from: this.account,
    }).then();
  }

  /**
   * Claims the rent fees for the given assets.
   * @param assetIds An array of asset IDs
   */
  claimMultipleRentFees(assetIds: BigNumber[] | string[]) {
    if (!this.account) {
      return Promise.reject();
    }
    return this.send('claimMultipleRentFees', [assetIds], {
      from: this.account,
    }).then();
  }

  /**
   * Rents an asset, which has ETH as fee payment. Calculates the total value based on period * pricePerSecond of the asset.
   * @param assetId The given asset.
   * @param operator The operator to be set.
   * @param period The period (in seconds) for the rent.
   * @param pricePerSecond The current price per second for rentals of the given asset.
   */
  rentDecentralandWithETH(
    assetId: BigNumber | string,
    operator: string,
    period: BigNumber,
    pricePerSecond: BigNumber,
  ): Promise<void> {
    if (!this.account) {
      return Promise.reject();
    }

    const totalFee = period.multipliedBy(pricePerSecond);

    return this.send('rentDecentraland', [assetId, period.toNumber(), operator], {
      from: this.account,
      value: totalFee,
    }).then();
  }

  /**
   * Rents an asset, which has an ERC-20 as fee payment.
   * @param assetId The given asset.
   * @param operator The operator to be set.
   * @param period The period (in seconds) for the rent.
   */
  rentDecentralandWithERC20(assetId: BigNumber | string, operator: string, period: BigNumber): Promise<void> {
    if (!this.account) {
      return Promise.reject();
    }
    return this.send('rentDecentraland', [assetId, period, operator], {
      from: this.account,
    }).then();
  }

  /**
   * Update the operator for the given rent of an asset.
   * @param assetId The target asset.
   * @param rentId The target rent.
   * @param operator The to-be-set operator.
   */
  updateOperator(assetId: BigNumber | string, rentId: BigNumber | string, operator: string): Promise<void> {
    if (!this.account) {
      return Promise.reject();
    }
    return this.send('updateOperator', [assetId, rentId, operator], {
      from: this.account,
    }).then();
  }

  /**
   * Updates the corresponding Estate/LAND operator from the given rent.
   * @param assetId The target asset id
   * @param rentId The target rent id
   */
  updateState(assetId: BigNumber | string, rentId: BigNumber | string): Promise<void> {
    if (!this.account) {
      return Promise.reject();
    }
    return this.send('updateState', [assetId, rentId], {
      from: this.account,
    }).then();
  }
}
