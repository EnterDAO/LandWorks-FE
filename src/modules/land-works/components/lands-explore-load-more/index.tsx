import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

import { Button, Grid, Typography } from 'design-system';

import { THEME_COLORS } from 'themes/theme-constants';

const BorderLinearProgress = styled(LinearProgress)(() => ({
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
  disabled: boolean;
}
export const LoadMoreLands: React.FC<ILoadMore> = ({ handleLoadMore, percentageValue, textToDisplay, disabled }) => {
  return (
    <Grid container xs={12} direction="column" alignItems="center" margin={'32px 0 36px'}>
      <Grid container direction="row" justifyContent="center" alignItems="flex-start" item xs={6}>
        <Typography>{textToDisplay}</Typography>
      </Grid>
      <Grid className="progress" item xs={3}>
        <Box sx={{ flexGrow: 1 }}>
          <BorderLinearProgress variant="determinate" value={percentageValue} />
        </Box>
      </Grid>
      <Grid container direction="row" justifyContent="center" alignItems="flex-start">
        <Button disabled={disabled} className="claim-button" onClick={handleLoadMore} variant="gradient">
          Load More
        </Button>
      </Grid>
    </Grid>
  );
};
