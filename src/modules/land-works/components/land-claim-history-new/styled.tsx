import { TableBody, TableHead, styled } from '@mui/material';
import { Paper, PaperProps } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { THEME_COLORS } from 'themes/theme-constants';

export const StyledTableCell = styled(TableCell)(() => ({
  '& .MuiTableCell-root': {
    borderBottom: 0,
  },
  [`&.${tableCellClasses.head}`]: {
    color: THEME_COLORS.grey03,
    borderBottom: 0,

    '&:first-of-type': {
      borderRadius: '10px 0 0 10px',
    },
    '&:last-of-type': {
      borderRadius: '0 10px 10px 0',
    },
  },
  [`&.${tableCellClasses.root}`]: {
    borderBottom: 'none',
    fontSize: '14px',
    fontWeight: '600',
    lineHeight: '30px',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: '14px',
    color: THEME_COLORS.light,
    borderBottom: 0,
  },
}));

export const StyledTableHeaderRow = styled(TableRow)(() => ({
  borderRadius: 10,
  backgroundColor: '#27273a',
}));

export const StyledTableRow = styled(TableRow)(() => ({
  margin: '10px 0',
  // borderRadius: '10px',
  // backgroundColor: '#27273a',
}));

export const StyledPaper = styled(Paper)<PaperProps>(() => ({
  padding: '30px',
  backgroundColor: '#1e1e2e',
  borderRadius: '30px',
  fontSize: '14px',
  lineHeight: '28px',
  color: '#fff',
  maxHeight: 343,
  //   overflow: 'hidden',
}));

export const StyledTableHead = styled(TableHead)(() => ({
  '& .MuiTableRow': {
    background: '#27273a',
    fontSize: '14px',
    fontWeight: '600',
    lineHeight: '28px',
    color: '#fff',
    borderRadius: '10px',
  },
}));

export const StyledTableBody = styled(TableBody)(() => ({
  '&.MuiTableBody-root': {
    height: '360px',
    overflow: 'scroll',
    width: '100%',
  },
}));
