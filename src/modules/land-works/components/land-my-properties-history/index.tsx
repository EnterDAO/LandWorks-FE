import React from 'react';
import { Box } from '@mui/material';
import { uniqueId } from 'lodash';
import useSWR from 'swr';

import { Typography } from 'design-system';
import { EmptyIcon } from 'design-system/icons';
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
  StyledBox,
  StyledPaper,
  StyledTableBody,
  StyledTableCell,
  StyledTableHead,
  StyledTableHeaderRow,
  StyledTableRow,
  UpcomingButton,
} from './styled';

import { getAssetName, getNowTs } from '../../../../utils';

interface Props {
  metaverse: string | number;
}

const initialRents: RentEntity[] = [];

interface LandStatusProps {
  rent: RentEntity;
}

const LandStatus = ({ rent }: LandStatusProps) => {
  const now = getNowTs();

  if (now < Number(rent.start)) {
    return <UpcomingButton>Upcoming</UpcomingButton>;
  } else if (Number(rent.start) <= now && now <= Number(rent.end)) {
    return <ActiveButton>Active</ActiveButton>;
  }

  return <PassedButton>Passed</PassedButton>;
};

interface LandOperatorProps {
  rent: RentEntity;
}

const LandOperator = ({ rent }: LandOperatorProps) => {
  const now = getNowTs();
  const isActiveRent = Number(rent.start) <= now && now < Number(rent.end);
  const isUpcomingRent = Number(rent.start) >= now;
  const isEditableRow = isActiveRent || isUpcomingRent;

  return (
    <TableInput
      operator={rent.operator}
      assetId={rent.asset?.id || ''}
      metaverseRegistry={rent.asset?.metaverseRegistry?.id || ''}
      rentId={rent.id}
      renter={rent.renter.id}
      key={uniqueId()}
      isEditable={isEditableRow}
    />
  );
};

// TODO: refactor
const MyPropertiesHistoryTable: React.FC<Props> = ({ metaverse }) => {
  const wallet = useWallet();

  const { data: rents = initialRents } = useSWR<RentEntity[]>(
    wallet.account ? [wallet.account, false, metaverse] : null,
    fetchUserRents
  );

  return (
    <Box>
      <Typography variant="h2" mb={4}>
        Rent History
      </Typography>
      <RootStyled>
        {/* This wraps the table in a container that allows a better scroll  */}
        <StyledPaper>
          <table style={{ width: '100%', borderSpacing: 0 }} aria-label="table">
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

            {rents.length === 0 ? (
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
              <StyledTableBody style={{ maxHeight: 260, overflowY: 'auto' }}>
                {rents.map((data) => (
                  <StyledTableRow style={{ padding: '10px 0' }} key={data.id}>
                    <StyledTableCell align="left">
                      <StyledBox>{data.asset ? getAssetName(data.asset) : ''}</StyledBox>
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
                      <LandOperator rent={data} />
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <LandStatus rent={data} />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </StyledTableBody>
            )}
          </table>
        </StyledPaper>
      </RootStyled>
    </Box>
  );
};

export default MyPropertiesHistoryTable;
