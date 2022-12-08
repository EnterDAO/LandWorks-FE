import { Grid } from '@mui/material';
import { GridProps, styled } from '@mui/system';

export const StyledBreadcrumbsGrid = styled(Grid)<GridProps>(() => ({
  background: 'var(--theme-body-color)',
  width: '100%',
  height: 115,
  display: 'flex',
  alignItems: 'center',
  padding: '0 60px',
}));
