/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useSubscription } from '@apollo/client';
import { Box } from '@mui/material';
import { getEtherscanTxUrl, slicedAddr } from 'web3/utils';

import ExternalLink from 'components/custom/externalLink';
import { EmptyIcon } from 'design-system/icons';
import { ClaimHistory, USER_CLAIM_HISTORY_SUBSCRIPTION } from 'modules/land-works/api';

import { useWallet } from '../../../../wallets/wallet';
import LandWorksTableDate from '../land-works-table-date';
import LandTablePrice from '../land-works-table-price';
import {
  StyledPaper,
  StyledTableBody,
  StyledTableCell,
  StyledTableHead,
  StyledTableHeaderRow,
  StyledTableRow,
} from './styled';

import { getDecentralandAssetName } from '../../../../utils';

import { THEME_COLORS } from 'themes/theme-constants';

const ClaimHistoryTableNew: React.FC = () => {
  const wallet = useWallet();
  const [claimHistory, setClaimHistory] = useState([] as ClaimHistory[]);
  const [totalClaims, setTotalClaims] = useState(0);

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

  return (
    <Box>
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

          {totalClaims < 1 ? (
            <tbody
              style={{
                height: '240px',
                position: 'relative',
              }}
            >
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
                <span style={{ fontSize: '18px', fontWeight: '700' }}>There is no claim history yet.</span>
              </Box>
            </tbody>
          ) : (
            <StyledTableBody style={{ maxHeight: '260px', overflow: 'scroll' }}>
              {claimHistory.map((data) => (
                <StyledTableRow style={{ padding: '10px 0' }} key={data.id}>
                  <StyledTableCell style={{ color: THEME_COLORS.light }} align="left">
                    {getDecentralandAssetName(data.asset.decentralandData)}
                  </StyledTableCell>
                  <StyledTableCell style={{ fontWeight: '500', color: THEME_COLORS.accentBlue }} align="left">
                    <ExternalLink href={getEtherscanTxUrl(data.txHash)}>{slicedAddr(data.txHash)}</ExternalLink>
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
      </StyledPaper>
    </Box>
  );
};

export default ClaimHistoryTableNew;
