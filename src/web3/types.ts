import React from 'react';

export type TokenMeta = {
  icon: React.ReactNode;
  name: string;
  address: string;
  decimals: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Web3EventType<T extends Record<string, any>> = {
  event: string;
  id: string;
  address: string;
  blockHash: string;
  blockNumber: number;
  raw: {
    data: string;
  };
  returnValues: T;
  signature: string;
  transactionHash: string;
};
