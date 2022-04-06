import React, { useEffect, useRef, useState } from 'react';
import { DEFAULT_SLICED_HISTORY } from 'constants/modules';
import { Box } from '@mui/material';
import { uniqueId } from 'lodash';

import { EmptyIcon } from 'design-system/icons';
import { getENSName } from 'helpers/helpers';
import useIntersectionObserver from 'hooks/useElementOnScreen';
import { RentEntity, fetchUserRents } from 'modules/land-works/api';

import { useWallet } from '../../../../wallets/wallet';
import LandTableTxHash from '../land-table-tx-hash';
import LandWorksTableDate from '../land-works-table-date';
import TableInput from '../land-works-table-input';
import LandTablePrice from '../land-works-table-price';
import {
  ActiveButton,
  PassedButton,
  RootStyled,
  StyledPaper,
  StyledTableBody,
  StyledTableCell,
  StyledTableHead,
  StyledTableHeaderRow,
  StyledTableRow,
  Title,
  UpcomingButton,
} from './styled';

import { getDecentralandAssetName, getNowTs } from '../../../../utils';

const MyPropetiesHistoryTable: React.FC = () => {
  const wallet = useWallet();
  const [rents, setRents] = useState([] as RentEntity[]);
  const [totalRents, setTotalRents] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_SLICED_HISTORY);
  const [paginatedRents, setPaginatedRents] = useState([] as RentEntity[]);

  const now = getNowTs();
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, { freezeOnceInvisible: true });
  const isVisible = !!entry?.isIntersecting;

  const fetchRents = async (account: string) => {
    const rents = await fetchUserRents(account, false);

    setRents(rents.rents || []);
    setPaginatedRents(rents.rents.slice(0, DEFAULT_SLICED_HISTORY));

    setTotalRents(rents.rents.length);
  };

  useEffect(() => {
    if (wallet.account) {
      fetchRents(wallet.account);
    } else {
      setRents([]);
      setTotalRents(0);
    }
  }, [wallet.account]);

  const getEns = (operator: string) => {
    let ens = operator;
    getENSName(operator).then((result) => {
      ens = result;
    });
    return ens;
  };

  const isEditableRow = (start: string, end: string) => {
    const isActiveRent = Number(start) <= now && now < Number(end);
    const isUpcomingRent = Number(start) >= now;
    return isActiveRent || isUpcomingRent;
  };

  useEffect(() => {
    if (rents.length > paginatedRents.length && isVisible) {
      setPaginatedRents(rents.slice(0, pageSize + DEFAULT_SLICED_HISTORY));
      setPageSize((prev) => prev + DEFAULT_SLICED_HISTORY);
    }
  }, [entry]);

  return (
    <Box style={{ margin: '200px 0' }}>
      <Title>Rent History</Title>
      <RootStyled>
        {/* This wraps the table in a container that allows a better scroll  */}
        <StyledPaper>
          <table style={{ width: '100%' }} aria-label="table">
            <StyledTableHead>
              <StyledTableHeaderRow>
                <StyledTableCell align="left">Property</StyledTableCell>
                <StyledTableCell align="left">Rented from</StyledTableCell>
                <StyledTableCell align="left">Rented to</StyledTableCell>
                <StyledTableCell align="left">Tx hash</StyledTableCell>
                <StyledTableCell align="left">Cost</StyledTableCell>
                <StyledTableCell align="left">Operator</StyledTableCell>
                <StyledTableCell align="left">Status</StyledTableCell>
              </StyledTableHeaderRow>
            </StyledTableHead>

            {totalRents < 1 ? (
              <tbody
                style={{
                  height: '240px',
                  position: 'relative',
                }}
              >
                <tr>
                  <td
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
                      There is no rent history yet.
                    </span>
                  </td>
                </tr>
              </tbody>
            ) : (
              <StyledTableBody style={{ maxHeight: 260, overflowY: 'scroll' }}>
                {paginatedRents.map((data) => (
                  <StyledTableRow style={{ padding: '10px 0' }} key={data.id}>
                    <StyledTableCell align="left">
                      {getDecentralandAssetName(data.asset?.decentralandData || null)}
                    </StyledTableCell>

                    <StyledTableCell align="left">
                      <LandWorksTableDate timestamp={data.start} dateFormat={'HH:mm dd.MM.yyyy'} />
                    </StyledTableCell>

                    <StyledTableCell align="left">
                      <LandWorksTableDate timestamp={data.end} dateFormat={'HH:mm dd.MM.yyyy'} />
                    </StyledTableCell>

                    <StyledTableCell align="left">
                      <LandTableTxHash txHash={data.txHash} />
                    </StyledTableCell>

                    <StyledTableCell align="left">
                      <LandTablePrice
                        tokenDecimals={data.paymentToken.decimals}
                        tokenSymbol={data.paymentToken.symbol}
                        weiAmount={data.fee}
                        dateTimestamp={data.timestamp}
                      />
                    </StyledTableCell>

                    <StyledTableCell align="left">
                      <TableInput
                        operator={data.operator}
                        assetId={data.id}
                        rentId={data.id}
                        ens={getEns(data.operator)}
                        renter={data.renter.id}
                        key={uniqueId()}
                        isEditable={isEditableRow(data.start, data.end)}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {now < Number(data.start) && <UpcomingButton>Upcoming</UpcomingButton>}
                      {Number(data.start) < now && now < Number(data.end) && <ActiveButton>Active</ActiveButton>}
                      {Number(data.start) < now && now > Number(data.end) && <PassedButton>Passed</PassedButton>}
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

export default MyPropetiesHistoryTable;
