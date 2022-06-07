import React from 'react';
import { Box } from '@mui/material';

import { ReactComponent as AdventageBg } from 'assets/img/AdventageBg.svg';
import RentingView from 'assets/img/RentingView.png';
import { Button, Grid, IconButton } from 'design-system';
import { PlusIcon } from 'design-system/icons';
import {
  ButtonRaw,
  ImageWrapper,
  StyledBox,
  StyledRoot,
  StyledSubtitle,
  StyledText,
} from 'modules/landing/components/Advantages/styled';

export const Advantages: React.FC = () => {
  return (
    <div className="content-container">
      <StyledRoot>
        <ButtonRaw>
          <Button disabled btnSize="medium" variant="secondary">
            Why lending?
          </Button>
          <Button btnSize="medium" variant="secondary">
            why renting?
          </Button>
        </ButtonRaw>
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
              <h2>Governance</h2>
              <p>You can rent a land that otherwise is unavailable to take.</p>
            </Box>
          </Grid>
          <Grid item xs={5} display="flex" flexDirection="row" alignItems="center">
            <StyledBox>
              <IconButton variant="circular" btnSize="small" colorVariant="light" icon={<PlusIcon />} />
            </StyledBox>
            <Box maxWidth="70%">
              <h2>Renting Nearby Land</h2>
              <p>Renters can safely rent nearby land and utilise a bigger space for experience/scene deployment.</p>
            </Box>
          </Grid>
        </Grid>
      </StyledRoot>
    </div>
  );
};