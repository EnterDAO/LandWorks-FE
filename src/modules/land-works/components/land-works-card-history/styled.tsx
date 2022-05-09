import { TableBody, TableHead, Typography, styled } from '@mui/material';
import { Paper, PaperProps } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { TypographyProps } from '@mui/system';

export const RootStyled = styled('div')(() => ({
  backgroundColor: 'var(--theme-card-color)',
  padding: '30px',
  borderRadius: '10px',
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
    fontSize: '13px',
    color: 'var(--theme-light-color)',
    borderBottom: 0,
    fontWeight: '400',
    padding: '15px 16px',
  },
  '& a': {
    color: 'var(--toastify-color-info)',
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

export const ActiveButton = styled('div')(() => ({
  color: '#69ca7b !important',
  border: '1px solid #69ca7b !important',
  textTransform: 'uppercase',
  padding: '0 10px !important',
  borderRadius: '20px',
  textAlign: 'center',
}));

export const UpcomingButton = styled('div')(() => ({
  color: '#deb067',
  border: '1px solid #deb067',
  textTransform: 'uppercase',
  padding: '0 10px !important',
  borderRadius: '20px',
  textAlign: 'center',
}));

export const PassedButton = styled('div')(() => ({
  color: '#b9b9d3',
  border: '1px solid #b9b9d3',
  textTransform: 'uppercase',
  padding: '0 10px',
  borderRadius: '20px',
  textAlign: 'center',
}));

export const Title = styled(Typography)<TypographyProps>(() => ({
  fontSize: '30px',
  color: 'var(--theme-light-color)',
  margin: '50px 0 20px 0',
  fontWeight: 700,
}));

export const YourLabel = styled('p')(() => ({
  color: 'var(--theme-subtle-color)',
  border: '1px solid #27273a',
  padding: '0 5px',
  borderRadius: '5px',
  marginLeft: '8px',
  fontSize: '12px',
  lineHeight: '18px',
  fontWeight: '600',
  background: '#27273a',
}));

export const StyledButton = styled('button')(() => ({
  border: 'none',
  background: '#1e1e2e',
  borderRadius: '5px',
  marginLeft: '5px',
  minWidth: '48px',
  minHeight: '30px',
  textTransform: 'uppercase',
  padding: '10px',
  width: '100px',
  marginBottom: '20px',

  '& span': {
    color: 'rgb(94, 94, 94)',
    fontSize: '13px',
    marginLeft: '5px',
    fontWeight: 'bold',
  },
}));
