import { FC } from 'react';
import { Box, SxProps, Typography } from '@mui/material';

import Icon from '../icons/Icon';
import { transactionCardRootStyles } from './transaction-card-styles';

import { THEME_COLORS } from '../../themes/theme-constants';

interface TransactionCardProps {
  icon: JSX.Element;
  heading: string;
  transactionDate: string;
  timeAgo?: string;
  siteName: string;
  rightSideElement?: JSX.Element;
  onClick?(): void;
  sx?: SxProps;
}

const siteNameEllipsisOffset = 4;

const TransactionCard: FC<TransactionCardProps> = ({
  icon,
  heading,
  transactionDate,
  timeAgo,
  siteName,
  rightSideElement,
  onClick,
  sx = {},
}) => {
  const siteNameSplit = siteName.split('.');
  const siteNameDomain = `.${siteNameSplit.pop()}`;
  const siteNameWithoutDomain = siteNameSplit.join('.');

  return (
    <Box component="button" sx={[transactionCardRootStyles, ...(Array.isArray(sx) ? sx : [sx])]} onClick={onClick}>
      <Icon iconElement={icon} iconSize="s" color={THEME_COLORS.accentBlue} mr={2} />
      <Box textAlign="left" flex={1} minWidth={0}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="button" component="p" noWrap>
            {heading}
          </Typography>
          {timeAgo && (
            <Typography variant="body2" component="span" ml={2}>
              {timeAgo}
            </Typography>
          )}
        </Box>
        <Box display="flex">
          <Typography variant="body2" component="span" whiteSpace="nowrap">
            {transactionDate}
          </Typography>
          <Box component="span" ml={2} display="flex" minWidth={0}>
            <Typography variant="body2" component="span" noWrap>
              {siteNameWithoutDomain.slice(0, -siteNameEllipsisOffset)}
            </Typography>
            <Typography variant="body2" component="span" whiteSpace="nowrap">
              {siteNameWithoutDomain.slice(-siteNameEllipsisOffset)}
              {siteNameDomain}
            </Typography>
          </Box>
        </Box>
      </Box>
      {rightSideElement}
    </Box>
  );
};

export default TransactionCard;
