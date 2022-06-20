import React from 'react';
import { Box } from '@mui/material';

import { ReactComponent as AdventageBg } from 'assets/img/AdventageBg.svg';
import RentingView from 'assets/img/RentingView.png';
import { Grid, IconButton } from 'design-system';
import { PlusIcon } from 'design-system/icons';
import {
  ImageWrapper,
  StyledBox,
  StyledRoot,
  StyledSubtitle,
  StyledText,
} from 'modules/landing/components/Advantages/styled';

export const Advantages: React.FC = () => {
  return (
    <div className="content-container why">
      <StyledRoot>
        <Grid container direction="column" justifyItems="center" justifyContent="center" alignItems="center">
          <StyledText>WHY RENTING?</StyledText>
          <Grid item xs={4} textAlign="center">
            <h2>Advantages of Renting</h2>
          </Grid>
          <Grid item xs={4}>
            <StyledSubtitle>Everything leads to renting...</StyledSubtitle>
          </Grid>
        </Grid>
        <ImageWrapper>
          <AdventageBg />
          <img src={RentingView} alt="" />
        </ImageWrapper>

        <Grid container rowSpacing={10} justifyContent="space-around">
          <Grid item xs={5} display="flex" flexDirection="row" alignItems="center">
            <StyledBox>
              <IconButton variant="circular" btnSize="small" colorVariant="light" icon={<PlusIcon />} />
            </StyledBox>
            <Box maxWidth="70%">
              <h2>Affordability</h2>
              <p>You can rent a land that you cannot afford otherwise.</p>
            </Box>
          </Grid>
          <Grid item xs={5} display="flex" flexDirection="row" alignItems="center">
            <StyledBox>
              <IconButton variant="circular" btnSize="small" colorVariant="light" icon={<PlusIcon />} />
            </StyledBox>
            <Box maxWidth="70%">
              <h2>Accessibility</h2>
              <p>You can rent a land that you cannot afford otherwise.</p>
            </Box>
          </Grid>

          <Grid item xs={5} display="flex" flexDirection="row" alignItems="center">
            <StyledBox>
              <IconButton variant="circular" btnSize="small" colorVariant="light" icon={<PlusIcon />} />
            </StyledBox>
            <Box maxWidth="70%">
              <h2>Trust-less</h2>
              <p>Renting is fully decentralised by utilizing our audited protocol. No middleman. No hassle.</p>
            </Box>
          </Grid>
          <Grid item xs={5} display="flex" flexDirection="row" alignItems="center">
            <StyledBox>
              <IconButton variant="circular" btnSize="small" colorVariant="light" icon={<PlusIcon />} />
            </StyledBox>
            <Box maxWidth="70%">
              <h2>Flexibility</h2>
              <p>Rent for as short as a day to host an event or as long as an year@</p>
            </Box>
          </Grid>
        </Grid>
      </StyledRoot>
    </div>
  );
};
