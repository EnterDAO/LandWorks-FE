import { FC } from 'react';
import { Grid as MuiGrid, GridProps as MuiGridProps, styled } from '@mui/material';

type GridProps = MuiGridProps & {
  xxl?: number;
};

export const MuiGridStyled = styled(MuiGrid)(({ theme }) => ({
  '&.MuiGrid-grid-xxl-4': {
    [theme.breakpoints.up(1600)]: {
      maxWidth: '33.33%',
    },
  },
  '&.MuiGrid-grid-xxl-2': {
    [theme.breakpoints.up(1600)]: {
      maxWidth: '16.66%',
    },
  },
}));

const Grid: FC<GridProps> = ({ children, xxl, ...other }) => {
  return (
    <MuiGridStyled className={xxl ? `MuiGrid-grid-xxl-${xxl}` : ''} {...other}>
      {children}
    </MuiGridStyled>
  );
};

export default Grid;
