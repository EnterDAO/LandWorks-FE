import Web3 from 'web3';
import { PromiEvent } from 'web3-core';
import { CallOptions, Contract, ContractOptions, ContractSendMethod, SendOptions } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';

export interface MethodCallParams {
  options?: CallOptions;
  callback?: (err: Error, result: any) => void;
}

export interface MethodSendParams {
  options: SendOptions;
  callback?: (err: Error, transactionHash: string) => void;
}

abstract class EthereumContract {
  contract: Contract;

  constructor(public web3: Web3, jsonInterface: AbiItem[], address: string, options?: ContractOptions) {
    this.contract = new web3.eth.Contract(jsonInterface, address, options);
  }

  get address() {
    return this.contract.options.address;
  }

  getMethod(method: string): (...args: any[]) => ContractSendMethod {
    return this.contract.methods[method];
  }

  callMethod<T>(
    method: string,
    params: any[] = [],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    { options, callback = () => {} }: MethodCallParams = {}
  ): Promise<T> {
    return this.getMethod(method)(...params).call(options, callback);
  }

  sendMethod<T = void>(
    method: string,
    {
      params = [],
      options,
      callback,
    }: { params?: any[]; options: SendOptions; callback?: (err: Error, transactionHash: string) => void }
  ) {
    // TODO: create callback function
    return this.getMethod(method)(...params).send(options) as T extends void ? PromiEvent<Contract> : Promise<T>;
  }
}

export default EthereumContract;
