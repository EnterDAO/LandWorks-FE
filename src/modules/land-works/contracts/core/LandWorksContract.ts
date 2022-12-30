/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import BigNumber from 'bignumber.js';
import { AbiItem } from 'web3-utils';
import Web3Contract, { Web3ContractAbiItem } from 'web3/web3Contract';

import LandWorksABI from './abi.json';

import { isDecentralandMetaverseRegistry } from '../../../../utils';
import { DEFAULT_ADDRESS } from '../../../../web3/utils';

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
   * @param callback Function, executed once the transaction has been submitted
   */
  list(
    metaverseId: BigNumber | number | string,
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
      this.listMethod(metaverseRegistry, true),
      [
        metaverseId,
        metaverseRegistry,
        metaverseAssetId,
        minPeriod,
        maxPeriod,
        maxFutureTime,
        paymentToken,
        pricePerSecond,
        DEFAULT_ADDRESS,
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
   * @param callback Function, executed once the transaction has been submitted
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
   * @param callback Function, executed once the transaction has been submitted
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
   * @param callback Function, executed once the transaction has been submitted
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
   * @param callback Function, executed once the transaction has been submitted
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
   * @param metaverseRegistry The address of the Metaverse Registry
   * @param operator The operator to be set.
   * @param period The period (in seconds) for the rent.
   * @param maxRentStart The accepted max rent start (in seconds)
   * @param paymentToken The address of the payment token
   * @param value The value to be sent.
   * @param callback Function, executed once the transaction has been submitted
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
      [assetId, period.toNumber(), maxRentStart, operator, paymentToken, value, DEFAULT_ADDRESS],
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
   * @param metaverseRegistry The address of the Metaverse Registry
   * @param operator The operator to be set.
   * @param period The period (in seconds) for the rent.
   * @param maxRentStart The accepted max rent start (in seconds)
   * @param paymentToken The address of the payment token
   * @param value The value to be sent.
   * @param callback Function, executed once the transaction has been submitted
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
      [assetId, period, maxRentStart, operator, paymentToken, value, DEFAULT_ADDRESS],
      {
        from: this.account,
      },
      callback
    ).then();
  }

  /**
   * Update the operator for the given rent of an asset.
   * @param assetId The target asset.
   * @param metaverseRegistry The address of the Metaverse Registry
   * @param rentId The target rent.
   * @param operator The to-be-set operator.
   * @param callback Function, executed once the transaction has been submitted
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
   * @param callback Function, executed once the transaction has been submitted
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
   * @param callback Function, executed once the transaction has been submitted
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
   * Returns the payment token and payment amount, which needs to be provided upon renting
   * The calculations are based on the asset id, period and referrer.
   * Depending on the referrer, the renter might receive a discount on the initial amount (period * pricePerSecond)
   * Call this whenever the referrer is != AddressZero
   * @param assetId The target asset id
   * @param period The period (in seconds) for the rent.
   * @param referrer The address of the referrer
   */
  async calculateRentFee(assetId: BigNumber | string, period: BigNumber, referrer: string): Promise<any> {
    const [paymentToken, amount] = await this.call('calculateRentFee', [assetId, period, referrer]);

    return {
      paymentToken,
      amount,
    };
  }

  /**
   * Updates the assets, which have LANDs with operators, != AddressZero
   * Applies only for asset's which represent Decentraland Estates
   * Reverts if there is an active rent.
   * @param assetIds The list of asset ids
   * @param landIds The ids of the lands, which are part of the corresponding assetId (estate)
   * @param callback Function, executed once the transaction has been submitted
   */
  clearEstateLANDOperators(
    assetIds: BigNumber[] | string[],
    landIds: BigNumber[] | string[],
    callback: () => void = () => {}
  ): Promise<void> {
    if (!this.account) {
      return Promise.reject();
    }
    return this.send(
      'clearEstateLANDOperators',
      [assetIds],
      {
        from: this.account,
      },
      callback
    ).then();
  }

  /**
   * Returns the list method to be called based on metaverse registry and user agreement for promotional scene
   * @param metaverseRegistry The address of the metaverse registry
   * @param hasUserAgreedForPromotionalScene Whether the user has agreed for promotional scene
   */
  listMethod(metaverseRegistry: string, hasUserAgreedForPromotionalScene: boolean): string {
    if (isDecentralandMetaverseRegistry(metaverseRegistry)) {
      return hasUserAgreedForPromotionalScene ? 'listDecentraland' : 'list';
    } else {
      return 'list';
    }
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
