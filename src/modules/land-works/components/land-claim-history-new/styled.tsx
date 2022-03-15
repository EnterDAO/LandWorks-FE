import { TableHead, TableHeadProps, Typography, TypographyProps, styled } from '@mui/material';
import { Paper, PaperProps, Table, TableContainer, TableContainerProps } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { THEME_COLORS } from 'themes/theme-constants';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  '& .MuiTableCell-root': {
    borderBottom: 0,
  },
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.common.black,
    color: THEME_COLORS.grey03,
    borderBottom: 0,

    '&:first-child': {
      borderRadius: '10px 0 0 10px',
    },
    '&:last-child': {
      borderRadius: '0 10px 10px 0',
    },
  },
  [`&.${tableCellClasses.root}`]: {
    borderBottom: "none"
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: THEME_COLORS.light,
    borderBottom: 0,
  },
}));

export const StyledTableHeaderRow = styled(TableRow)(({ theme }) => ({
  borderRadius: 10,
  backgroundColor: '#27273a',
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:last-child': {
    borderRadius: 10,
  },
  '&:last-child th': {
    borderRadius: 10,
  },
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
}));

export const RootStyled = styled('div')(() => ({
  position: 'absolute',
  bottom: '4%',
  right: '4%',
  display: 'block',
  backgroundColor: 'var(--theme-body-color)',
  padding: '16px',
  borderRadius: '20px',
  maxWidth: '17rem',
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
