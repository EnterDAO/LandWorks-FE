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
}));

const Grid: FC<GridProps> = ({ children, xxl, ...other }) => {
  return (
    <MuiGridStyled className={`MuiGrid-grid-xxl-${xxl}`} {...other}>
      {children}
    </MuiGridStyled>
  );
};

export default Grid;
