/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import BigNumber from 'bignumber.js';
import { AbiItem } from 'web3-utils';
import Web3Contract, { Web3ContractAbiItem } from 'web3/web3Contract';

import LandWorksABI from './abi.json';

import { isDecentralandMetaverseRegistry } from '../../../../utils';

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
    callback: () => void = () => {}
  ): Promise<any> {
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
      callback
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
    assetId: BigNumber | string,
    minPeriod: BigNumber,
    maxPeriod: BigNumber,
    maxFutureTime: BigNumber,
    paymentToken: string,
    pricePerSecond: BigNumber | string,
    callback: () => void = () => {}
  ): Promise<void> {
    if (!this.account) {
      return Promise.reject();
    }

    return this.send(
      'updateConditions',
      [assetId, minPeriod, maxPeriod, maxFutureTime, paymentToken, pricePerSecond],
      {
        from: this.account,
      },
      callback
    ).then();
  }

  /**
   * Delists the asset.
   * @param assetId The target asset.
   */
  delist(assetId: BigNumber | string, callback: () => void = () => {}): Promise<void> {
    if (!this.account) {
      return Promise.reject();
    }
    return this.send(
      'delist',
      [assetId],
      {
        from: this.account,
      },
      callback
    ).then();
  }

  /**
   * Withdraws the asset.
   * @param assetId The target asset.
   */
  withdraw(assetId: BigNumber | string, callback: () => void = () => {}): Promise<void> {
    if (!this.account) {
      return Promise.reject();
    }
    return this.send(
      'withdraw',
      [assetId],
      {
        from: this.account,
      },
      callback
    ).then();
  }

  /**
   * Claims the rent fees for the given assets.
   * @param assetIds An array of asset IDs
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  claimMultipleRentFees(assetIds: BigNumber[] | string[], callback: () => void = () => {}) {
    if (!this.account) {
      return Promise.reject();
    }

    return this.send(
      'claimMultipleRentFees',
      [assetIds],
      {
        from: this.account,
      },
      callback
    ).then();
  }

  /**
   * Rents an asset, which has ETH as fee payment. Calculates the total value based on period * pricePerSecond of the asset.
   * @param assetId The given asset.
   * @param operator The operator to be set.
   * @param period The period (in seconds) for the rent.
   * @param value The value to be sent.
   */
  rentWithETH(
    assetId: BigNumber | string,
    metaverseRegistry: string,
    operator: string,
    period: BigNumber,
    maxRentStart: number,
    paymentToken: string,
    value: BigNumber,
    callback: () => void = () => {}
  ): Promise<void> {
    if (!this.account) {
      return Promise.reject();
    }

    return this.send(
      this.rentMethod(metaverseRegistry),
      [assetId, period.toNumber(), maxRentStart, operator, paymentToken, value],
      {
        from: this.account,
        value: value,
      },
      callback
    ).then();
  }

  /**
   * Rents an asset, which has an ERC-20 as fee payment.
   * @param assetId The given asset.
   * @param operator The operator to be set.
   * @param period The period (in seconds) for the rent.
   */
  rentWithERC20(
    assetId: BigNumber | string,
    metaverseRegistry: string,
    operator: string,
    period: BigNumber,
    maxRentStart: number,
    paymentToken: string,
    value: BigNumber,
    callback: () => void = () => {}
  ): Promise<void> {
    if (!this.account) {
      return Promise.reject();
    }
    return this.send(
      this.rentMethod(metaverseRegistry),
      [assetId, period, maxRentStart, operator, paymentToken, value],
      {
        from: this.account,
      },
      callback
    ).then();
  }

  /**
   * Update the operator for the given rent of an asset.
   * @param assetId The target asset.
   * @param metaverseRegistry The target metaverseRegistry
   * @param rentId The target rent.
   * @param operator The to-be-set operator.
   */
  updateOperator(
    assetId: BigNumber | string,
    metaverseRegistry: string,
    rentId: BigNumber | string,
    operator: string,
    callback: () => void = () => {}
  ): Promise<void> {
    if (!this.account) {
      return Promise.reject();
    }
    return this.send(
      this.operatorMethod(metaverseRegistry),
      [assetId, rentId, operator],
      {
        from: this.account,
      },
      callback
    ).then();
  }

  /**
   * Updates the corresponding Estate/LAND operator from the given rent.
   * @param assetId The target asset id
   * @param metaverseRegistry The asset's metaverse registry
   * @param rentId The target rent id
   */
  updateState(
    assetId: BigNumber | string,
    metaverseRegistry: string,
    rentId: BigNumber | string,
    callback: () => void = () => {}
  ): Promise<void> {
    if (!this.account) {
      return Promise.reject();
    }
    return this.send(
      this.updateStateMethod(metaverseRegistry),
      [assetId, rentId],
      {
        from: this.account,
      },
      callback
    ).then();
  }

  /**
   * Updates the corresponding Estate/LAND/Voxel property's operator/consumer to the administrative one.
   * Reverts if there is an active rent.
   * @param assetId The target asset id
   * @param metaverseRegistry The asset's metaverse registry
   * @param callback Action to be done once transaction is submitted
   */
  updateAdministrativeState(
    assetId: BigNumber | string,
    metaverseRegistry: string,
    callback: () => void = () => {}
  ): Promise<void> {
    if (!this.account) {
      return Promise.reject();
    }

    return this.send(
      this.updateAdministrativeStateMethod(metaverseRegistry),
      [assetId],
      {
        from: this.account,
      },
      callback
    ).then();
  }

  /**
   * Returns the rent method to be called based on metaverse registry
   * @param metaverseRegistry
   */
  rentMethod(metaverseRegistry: string): string {
    return isDecentralandMetaverseRegistry(metaverseRegistry) ? 'rentDecentraland' : 'rentWithConsumer';
  }

  /**
   * Returns the update operator method to be called based on metaverse registry
   * @param metaverseRegistry
   */
  operatorMethod(metaverseRegistry: string): string {
    return isDecentralandMetaverseRegistry(metaverseRegistry) ? 'updateOperator' : 'updateConsumer';
  }

  /**
   * Returns the update state method to be called based on metaverse registry
   * @param metaverseRegistry
   */
  updateStateMethod(metaverseRegistry: string): string {
    return isDecentralandMetaverseRegistry(metaverseRegistry) ? 'updateState' : 'updateAdapterState';
  }

  /**
   * Returns the update administrative state method to be called based on metaverse registry
   */
  updateAdministrativeStateMethod(metaverseRegistry: string): string {
    return isDecentralandMetaverseRegistry(metaverseRegistry)
      ? 'updateAdministrativeState'
      : 'updateAdapterAdministrativeState';
  }
}
