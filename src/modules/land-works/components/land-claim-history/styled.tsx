import { TableBody, TableHead, Typography, TypographyProps, styled } from '@mui/material';
import { Paper, PaperProps } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

export const RootStyled = styled('div')(() => ({
  backgroundColor: 'var(--theme-card-color)',
  padding: '30px',
  borderRadius: '10px',
}));

export const TypographyStyled = styled(Typography)<TypographyProps>(() => ({
  display: 'block',
  width: '100%',
  fontSize: '30px',
  fontWeight: 700,
  marginBottom: '20px',
  span: {
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--theme-subtle-color)',
  },
}));

export const StyledTableCell = styled(TableCell)(() => ({
  '& .MuiTableCell-root': {
    borderBottom: 0,
  },
  [`&.${tableCellClasses.head}`]: {
    color: 'var(--theme-subtle-color)',
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
    color: 'var(--theme-light-color)',
    borderBottom: 0,
  },
}));

export const StyledTableHeaderRow = styled(TableRow)(() => ({
  borderRadius: 10,
  backgroundColor: 'var(--theme-modal-color)',
}));

export const StyledTableRow = styled(TableRow)(() => ({
  margin: '10px 0',
}));

export const StyledPaper = styled(Paper)<PaperProps>(() => ({
  backgroundColor: 'var(--theme-card-color)',
  fontSize: '14px',
  lineHeight: '28px',
  maxHeight: 280,
  overflow: 'auto',
  boxShadow: 'none',
}));

export const StyledTableHead = styled(TableHead)(() => ({
  position: 'sticky',
  top: 0,
  '& .MuiTableRow': {
    background: 'var(--theme-modal-color)',
    fontSize: '14px',
    fontWeight: '600',
    lineHeight: '28px',
    color: 'var(--theme-light-color)',
  },
}));

export const StyledTableBody = styled(TableBody)(() => ({
  '&.MuiTableBody-root': {
    maxHeight: '280px',
    overflowY: 'auto',
    width: '100%',
  },
}));
export const StyledBox = styled('p')(() => ({
  width: '125px',
  margin: '0px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));
