import {} from 'design-system';

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useSubscription } from '@apollo/client';
import TablePaginationUnstyled from '@mui/base/TablePaginationUnstyled';
import { TableRow } from '@mui/material';
import { styled } from '@mui/system';
import BigNumber from 'bignumber.js';

import { ClaimHistory, USER_CLAIM_HISTORY_SUBSCRIPTION } from 'modules/land-works/api';

import EmptyTable from '../../../../resources/svg/empty-table.svg';
import { useWallet } from '../../../../wallets/wallet';
import LandTableTxHash from '../land-table-tx-hash';
import LandWorksTableDate from '../land-works-table-date';
import LandTablePrice from '../land-works-table-price';
import { StyledPaper, StyledTableCell, StyledTableHead, StyledTableHeaderRow, StyledTableRow } from './styled';

import { getDecentralandAssetName } from '../../../../utils';
import { THEME_COLORS } from 'themes/theme-constants';

const ClaimHistoryTableNew: React.FC = () => {
  const wallet = useWallet();
  const pageSizeOptions = ['5', '10', '20'];
  const [claimHistory, setClaimHistory] = useState([] as ClaimHistory[]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(Number(pageSizeOptions[0]));
  const [totalClaims, setTotalClaims] = useState(0);

  const data = [
    {
      id: 'aj',
      asset: 'name',
      amount: BigNumber.from(1),
      paymentToken: 'Eth',
      txHash: '263eggqy828e189ye8qe',
      timestamp: 2635116663737,
    },
    {
      id: 'aj',
      asset: 'name',
      amount: BigNumber.from(1),
      paymentToken: 'Eth',
      txHash: '263eggqy828e189ye8qe',
      timestamp: 2635116663737,
    },
    {
      id: 'aj',
      asset: 'name',
      amount: BigNumber.from(1),
      paymentToken: 'Eth',
      txHash: '263eggqy828e189ye8qe',
      timestamp: 2635116663737,
    },
    {
      id: 'aj',
      asset: 'name',
      amount: BigNumber.from(1),
      paymentToken: 'Eth',
      txHash: '263eggqy828e189ye8qe',
      timestamp: 2635116663737,
    },
    {
      id: 'aj',
      asset: 'name',
      amount: BigNumber.from(1),
      paymentToken: 'Eth',
      txHash: '263eggqy828e189ye8qe',
      timestamp: 2635116663737,
    },
  ];

  useSubscription(USER_CLAIM_HISTORY_SUBSCRIPTION, {
    skip: wallet.account === undefined,
    variables: { id: wallet.account?.toLowerCase() },
    onSubscriptionData: ({ subscriptionData }) => {
      if (subscriptionData.error) {
        // TODO:
      }

      const claimHistory = subscriptionData.data?.user?.claimHistory?.map((history: ClaimHistory) => ({
        ...history,
        key: history.id,
      }));
      setClaimHistory(claimHistory);
      setTotalClaims(claimHistory?.length || 0);
    },
  });

  const onPaginationChange = (page: number, newPageSize?: number | undefined) => {
    setPage(page);
    if (newPageSize) {
      setPageSize(newPageSize);

      // TODO: this will probably need to be modified to scroll you up to the beginning of the table
      // if (pageSize === newPageSize || newPageSize < pageSize) {
      //   window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      // }
    }
  };

  const columns = [
    {
      title: 'Property',
      dataIndex: 'asset',
      render: (asset: any) => {
        const properyName = getDecentralandAssetName(asset.decentralandData);
        return <p>{properyName || 'Unknown property'}</p>;
      },
    },
    {
      title: 'Tx hash',
      dataIndex: 'txHash',
      render: (txHash: string) => <LandTableTxHash txHash={txHash} />,
    },
    {
      title: 'Amount',
      dataIndex: ['amount'],
      render: (amount: string, data: any) => (
        <LandTablePrice
          tokenDecimals={data.paymentToken.decimals}
          tokenSymbol={data.paymentToken.symbol}
          weiAmount={data.amount}
          dateTimestamp={data.timestamp}
        />
      ),
    },
    {
      title: 'Date',
      dataIndex: 'timestamp',
      render: (timestamp: string) => <LandWorksTableDate timestamp={timestamp} dateFormat={'HH:mm:ss dd.MM.yyyy'} />,
    },
  ];

  return (
    <StyledPaper>
      <table style={{ width: '100%', borderRadius: 10 }} aria-label="custom pagination table">
        <StyledTableHead>
          <StyledTableHeaderRow style={{ borderRadius: '10px', color: 'white' }}>
            <StyledTableCell>Property</StyledTableCell>
            <StyledTableCell align="left">Tx Hash</StyledTableCell>
            <StyledTableCell align="left">Claimed Amount</StyledTableCell>
            <StyledTableCell align="left">Claimed on</StyledTableCell>
          </StyledTableHeaderRow>
        </StyledTableHead>
        <tbody>
          {data.map((data) => (
            <StyledTableRow key={data.id}>
              <StyledTableCell style={{color: THEME_COLORS.light}} align="left">{data.id}</StyledTableCell>
              <StyledTableCell style={{color: THEME_COLORS.accentBlue}}  align="left">{data.txHash}</StyledTableCell>
              <StyledTableCell style={{color: THEME_COLORS.light}}  align="left">{data.paymentToken}</StyledTableCell>
              <StyledTableCell style={{color: THEME_COLORS.grey03}}  align="left">{data.timestamp}</StyledTableCell>
            </StyledTableRow>
          ))}
        </tbody>
      </table>
    </StyledPaper>
  );
};

export default ClaimHistoryTableNew;
