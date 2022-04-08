import React, { useEffect, useRef, useState } from 'react';
import { DEFAULT_SLICED_HISTORY } from 'constants/modules';
import { useSubscription } from '@apollo/client';
import { Box } from '@mui/system';
import { uniqueId } from 'lodash';

import ExternalLink from 'components/custom/external-link';
import { EmptyIcon } from 'design-system/icons';
import { getENSName } from 'helpers/helpers';
import useIntersectionObserver from 'hooks/useElementOnScreen';

import { useWallet } from '../../../../wallets/wallet';
import {
  ASSET_RENTS_SUBSCRIPTION,
  RentEntity,
  USER_ASSET_RENTS_SUBSCRIPTION,
  parseAssetRents,
  parseUserRents,
} from '../../api';
import LandTableTxHash from '../land-table-tx-hash';
import LandWorksTableDate from '../land-works-table-date';
import TableInput from '../land-works-table-input';
import LandTablePrice from '../land-works-table-price';
import {
  ActiveButton,
  PassedButton,
  RootStyled,
  StyledButton,
  StyledPaper,
  StyledTableBody,
  StyledTableCell,
  StyledTableHead,
  StyledTableHeaderRow,
  StyledTableRow,
  Title,
  UpcomingButton,
  YourLabel,
} from './styled';

import { getNowTs } from '../../../../utils';
import { getEtherscanAddressUrl, shortenAddr } from '../../../../web3/utils';

import './index.scss';

type SingleViewRentHistoryProps = {
  assetId: string;
};

const SingleViewLandHistory: React.FC<SingleViewRentHistoryProps> = ({ assetId }) => {
  const wallet = useWallet();
  const [areAllSelected, setAreAllSelected] = useState(true);
  const [rents, setRents] = useState([] as RentEntity[]);
  const [paginatedRents, setPaginatedRents] = useState([] as RentEntity[]);
  const [totalRents, setTotalRents] = useState(rents.length);
  const [pageSize, setPageSize] = useState(DEFAULT_SLICED_HISTORY);
  const now = getNowTs();
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, { freezeOnceInvisible: true });
  const isVisible = !!entry?.isIntersecting;

  const isYou = (text: string) => {
    return wallet.account && wallet.account?.toLowerCase() === text.toLowerCase();
  };

  const [subscription, setSubscription] = useState(ASSET_RENTS_SUBSCRIPTION);

  useSubscription(subscription, {
    variables: {
      id: assetId,
      // offset: pageSize * (page - 1),
      // limit: pageSize,
      renter: wallet.account?.toLowerCase(),
    },
    onSubscriptionData: ({ subscriptionData }) => {
      if (subscriptionData.error) {
        // TODO:
      }

      if (subscriptionData.data.asset === null) {
        setRents([]);
        setTotalRents(0);
        return;
      }

      const rents = areAllSelected
        ? parseAssetRents(subscriptionData.data?.asset)
        : parseUserRents(subscriptionData.data?.asset, totalRents, 1);

      setRents(rents.data);
      setPaginatedRents(rents.data.slice(0, DEFAULT_SLICED_HISTORY));
      setTotalRents(rents.meta.count);
    },
  });

  const onAllSelected = () => {
    setSubscription(ASSET_RENTS_SUBSCRIPTION);
    setAreAllSelected(true);
  };
  const onYouSelected = () => {
    setSubscription(USER_ASSET_RENTS_SUBSCRIPTION);
    setAreAllSelected(false);
  };

  const showYoursSection = () =>
    wallet.account && rents.filter((r) => r.operator?.toLowerCase() === wallet.account?.toLowerCase()).length > 0;

  useEffect(() => {
    return () => {
      setRents([]);
      setTotalRents(0);
    };
  }, []);

  useEffect(() => {
    if (wallet.account === undefined) {
      setAreAllSelected(true);
      setSubscription(ASSET_RENTS_SUBSCRIPTION);
      // setPage(1);
    }
  }, [wallet.account]);

  const getEns = (operator: string) => {
    let ens = operator;
    getENSName(operator).then((result) => {
      ens = result;
    });
    return ens !== operator ? ens : null;
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
    <Box>
      <Title>Rent History</Title>
      <RootStyled>
        <Box>
          <StyledButton
            className={`${areAllSelected ? 'active-table-button' : ''}`}
            onClick={() => {
              onAllSelected();
            }}
          >
            All <span>{areAllSelected && totalRents}</span>
          </StyledButton>
          {showYoursSection() && (
            <StyledButton className={`${!areAllSelected ? 'active-table-button' : ''}`} onClick={onYouSelected}>
              Yours <span>{!areAllSelected && totalRents}</span>
            </StyledButton>
          )}
        </Box>
        {/* This wraps the table in a container that allows a better scroll  */}
        <StyledPaper>
          <table style={{ width: '100%' }} aria-label="table">
            <StyledTableHead>
              <StyledTableHeaderRow>
                <StyledTableCell align="left">Renter</StyledTableCell>
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
                  <StyledTableRow style={{ padding: '10px 0' }} key={data.id + uniqueId()}>
                    <StyledTableCell align="left">
                      <Box display="flex" alignItems="center">
                        <ExternalLink href={getEtherscanAddressUrl(data.renter.id)}>
                          {getEns(data.renter.id) || shortenAddr(data.renter.id) || data.renter.id}
                        </ExternalLink>
                        {isYou(data.renter.id) && <YourLabel>You</YourLabel>}
                      </Box>
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
                    {/* //TODO: add ensName */}
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

export default React.memo(SingleViewLandHistory);
