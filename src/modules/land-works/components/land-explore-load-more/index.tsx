import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

import { Button, Grid, Typography } from 'design-system';

import { THEME_COLORS } from 'themes/theme-constants';

import './index.scss';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  width: '161px',
  margin: '5px 0 20px',
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: THEME_COLORS.grey02,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: THEME_COLORS.light,
  },
}));

interface ILoadMore {
  handleLoadMore: () => void;
  percentageValue: number;
  textToDisplay: string;
}
export const LoadMoreLands: React.FC<ILoadMore> = ({ handleLoadMore, percentageValue, textToDisplay }) => {
  return (
    <Grid container xs={12} direction="column" alignItems="center">
      <Grid container direction="row" justifyContent="center" alignItems="flex-start" item xs={6}>
        <Typography>{textToDisplay}</Typography>
      </Grid>
      <Grid className="progress" item xs={3}>
        <Box sx={{ flexGrow: 1 }}>
          <BorderLinearProgress variant="determinate" value={percentageValue} />
        </Box>
      </Grid>
      <Grid container direction="row" justifyContent="center" alignItems="flex-start">
        <Button className="claim-button" onClick={handleLoadMore} variant="gradient">
          Load More
        </Button>
      </Grid>
    </Grid>
  );
};
