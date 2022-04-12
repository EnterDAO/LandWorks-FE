import React, { useEffect, useRef, useState } from 'react';
import { DEFAULT_SLICED_HISTORY } from 'constants/modules';
import { useSubscription } from '@apollo/client';
import { Box } from '@mui/material';

import { EmptyIcon } from 'design-system/icons';
import useIntersectionObserver from 'hooks/useElementOnScreen';
import { ClaimHistory, USER_CLAIM_HISTORY_SUBSCRIPTION } from 'modules/land-works/api';

import { useWallet } from '../../../../wallets/wallet';
import LandTableTxHash from '../land-table-tx-hash';
import LandWorksTableDate from '../land-works-table-date';
import LandTablePrice from '../land-works-table-price';
import {
  RootStyled,
  StyledPaper,
  StyledTableBody,
  StyledTableCell,
  StyledTableHead,
  StyledTableHeaderRow,
  StyledTableRow,
  TypographyStyled,
} from './styled';

import { getAssetName } from '../../../../utils';

import { THEME_COLORS } from 'themes/theme-constants';

const ClaimHistoryTable: React.FC = () => {
  const wallet = useWallet();
  const [claimHistory, setClaimHistory] = useState([] as ClaimHistory[]);
  const [paginatedClaimHistory, setPaginatedClaimHistory] = useState([] as ClaimHistory[]);
  const [totalClaims, setTotalClaims] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_SLICED_HISTORY);
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, { freezeOnceInvisible: true });
  const isVisible = !!entry?.isIntersecting;

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
      setPaginatedClaimHistory(claimHistory.slice(0, DEFAULT_SLICED_HISTORY));
      setTotalClaims(claimHistory?.length || 0);
    },
  });

  useEffect(() => {
    if (claimHistory.length > paginatedClaimHistory.length && isVisible) {
      setPaginatedClaimHistory(claimHistory.slice(0, pageSize + DEFAULT_SLICED_HISTORY));
      setPageSize((prev) => prev + DEFAULT_SLICED_HISTORY);
    }
  }, [entry]);

  return (
    <Box style={{ margin: '200px 0' }}>
      <Box>
        <TypographyStyled variant="h1">Claim History</TypographyStyled>
      </Box>
      <RootStyled>
        {' '}
        {/* This wraps the table in a container that allows a better scroll  */}
        <StyledPaper>
          <table style={{ width: '100%' }} aria-label="table">
            <StyledTableHead>
              <StyledTableHeaderRow>
                <StyledTableCell>Property</StyledTableCell>
                <StyledTableCell align="left">Tx Hash</StyledTableCell>
                <StyledTableCell align="left">Claimed Amount</StyledTableCell>
                <StyledTableCell align="left">Claimed on</StyledTableCell>
              </StyledTableHeaderRow>
            </StyledTableHead>

            {totalClaims < 1 ? (
              <tbody
                style={{
                  height: '240px',
                  position: 'relative',
                }}
              >
                <tr>
                  <td>
                    <Box
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        position: 'absolute',
                        right: '40%',
                        bottom: '30%',
                      }}
                    >
                      <EmptyIcon />
                      <span style={{ fontSize: '18px', fontWeight: '700', color: '#f8f8ff' }}>
                        There is no claim history yet.
                      </span>
                    </Box>
                  </td>
                </tr>
              </tbody>
            ) : (
              <StyledTableBody style={{ maxHeight: 260, overflowY: 'scroll' }}>
                {paginatedClaimHistory.map((data) => (
                  <StyledTableRow style={{ padding: '10px 0' }} key={data.id}>
                    <StyledTableCell style={{ color: THEME_COLORS.light }} align="left">
                      {getAssetName(data.asset)}
                    </StyledTableCell>
                    <StyledTableCell style={{ fontWeight: '500' }} align="left">
                      <LandTableTxHash txHash={data.txHash} firstSymbolsLength={22} />
                    </StyledTableCell>
                    <StyledTableCell style={{ color: THEME_COLORS.light }} align="left">
                      <LandTablePrice
                        tokenDecimals={data.paymentToken.decimals}
                        tokenSymbol={data.paymentToken.symbol}
                        weiAmount={data.amount.toString()}
                        dateTimestamp={data.timestamp.toString()}
                      />
                    </StyledTableCell>
                    <StyledTableCell style={{ color: THEME_COLORS.grey03 }} align="left">
                      <LandWorksTableDate timestamp={data.timestamp.toString()} dateFormat={'dd MMM yyyy HH:mm'} />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </StyledTableBody>
            )}
          </table>
          <div ref={ref} />
        </StyledPaper>
      </RootStyled>
    </Box>
  );
};

export default ClaimHistoryTable;
