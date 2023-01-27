/* eslint-disable @typescript-eslint/no-empty-function */
import BigNumber from 'bignumber.js';

import Web3Contract, { Web3ContractAbiItem } from '../../../../web3/web3Contract';
import abi from './abi.json';

import { DEFAULT_ADDRESS } from '../../../../web3/utils';

export interface ILandWorksList {
  metaverseId: BigNumber | number;
  metaverseRegistry: string;
  metaverseAssetId: string;
  minPeriod: BigNumber | string;
  maxPeriod: BigNumber | string;
  maxFutureTime: BigNumber | string;
  paymentToken: string;
  pricePerSecond: BigNumber | string;
  referrer: string;
}

export default class BuyDCLContract extends Web3Contract {
  constructor(address: string) {
    super(abi as Web3ContractAbiItem[], address, '');
  }

  /**
   * Executes buyETH contract function, which buys and lists an ERC-721 into LandWorks with ERC-20.
   * @param listArgs LandWorks listing arguments.
   * @param paymentToken The address of the ERC-20 payment
   * @param paymentAmount The amount of ERC-20
   * @param buyContract The address of the buy contract.
   * @param buyData The data purchase.
   * @param callback Function, executed once the transaction has been submitted
   */
  buyERC20(
    listArgs: ILandWorksList,
    paymentToken: string,
    paymentAmount: string,
    buyContract: string,
    buyData: string,
    callback: (txHash: string) => void = () => {}
  ): Promise<any> {
    listArgs.referrer = DEFAULT_ADDRESS;

    return this.send(
      'buyERC20',
      [listArgs, paymentToken, paymentAmount, buyContract, buyData],
      {
        from: this.account,
      },
      callback
    );
  }

  /**
   * Executes buyETH contract function, which buys and lists an ERC-721 into LandWorks with ETH.
   * @param listArgs LandWorks listing arguments.
   * @param paymentAmount Amount to be paid to the buyContract.
   * @param buyContract The address of the buy contract.
   * @param buyData The data purchase.
   * @param callback Function, executed once the transaction has been submitted
   */
  buyETH(
    listArgs: ILandWorksList,
    paymentAmount: BigNumber | string,
    buyContract: string,
    buyData: string,
    callback: (txHash: string) => void = () => {}
  ): Promise<any> {
    listArgs.referrer = DEFAULT_ADDRESS;

    return this.send(
      'buyETH',
      [listArgs, buyContract, buyData],
      {
        from: this.account,
        value: paymentAmount,
      },
      callback
    );
  }
}