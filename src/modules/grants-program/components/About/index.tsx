import React from 'react';
import { Typography } from '@mui/material';

import { Grid } from 'design-system';
import {
  CompanyIcon,
  FilledStar,
  GalleryIcon,
  GlassesIcon,
  LectureIcon,
  SpinIcon,
  ThreeStars,
} from 'design-system/icons';
import { SectionTitle, SubTitle, WithGreyBorder } from 'modules/grants-program/styled';

import { StyledBox, StyledGrid, StyledRoot, Tier, TiersRow } from './styled';

export const About: React.FC = () => {
  return (
    <StyledRoot id={'gp-id-0'}>
      <SectionTitle>About</SectionTitle>

      <SubTitle>What?</SubTitle>
      <Typography>
        The Open Scene Grant Program is a grant program for building Decentraland Scenes in several categories. The
        program is funded by the EnterDAO treasury after the successful pass of the{' '}
        <a href="https://dao.enterdao.xyz/governance/proposals/1" target="_blank">
          DAO’s first governance proposal
        </a>
        . <br />
        <br /> All scenes funded through the Open Scenes Grant Program will be open-sourced and available to the public
        for anyone to use. This is the first round of the program and if successful many more are coming with the goal
        of enabling existing and new users to easily generate a variety of experiences on their rented or owned land.{' '}
      </Typography>

      <SubTitle>Why?</SubTitle>
      <Typography>
        As more people are exposed to the metaverse we are noticing a need for quality scenes being available to the
        public for hosting events, displaying their art or just having fun. Most who enter the metaverse have a very
        limited knowledge of development, or have specific specializations. In such, it prevents many creators from
        experimenting with various use cases and slows down the growth and development of the metaverse.Our renting
        platform, LandWorks, provides an easy and affordable means of accessing metaverse land, however the availability
        of quality scenes/buildings is not widespread, transparent, or accessible. That’s what we aim to solve with this
        Open Scene Grant Program - the generated builds/assets will allow for anyone to have access to quality
        Decentraland scenes for their event/gallery/show and at the same time allow for builders to amaze everyone with
        their creativity. Creators will have less hesitance with experimenting across various use cases, or sizes of
        spaces, in turn creating a turn “Wow” effect no matter where you go in the metaverse.
      </Typography>

      <SubTitle>How?</SubTitle>
      <Typography>
        For this first round of the grant program the grant pool will be{' '}
        <b>50,000 USDC + 50,000 ENTR given in 1:1 ratio.</b> That would mean that whatever sum you get in USDC, it will
        be matched in ENTR tokens.
      </Typography>
      <br />
      <Typography>
        Grants may be requested for any amount within one of two possible tiers, regardless of the grant category.
      </Typography>
      <br />

      <TiersRow>
        <Tier>
          <FilledStar width={36} height={36} />
          <StyledBox>
            <h1>Tier 1</h1>
            <p>
              up to <b>2,500 USDC + 2,500 ENTR tokens</b>
            </p>
          </StyledBox>
        </Tier>
        <Tier>
          <ThreeStars width={36} height={36} />
          <StyledBox>
            <h1>Tier 2</h1>
            <p>
              up to <b>10,000 USDC + 2,500 ENTR tokens</b>
            </p>
          </StyledBox>
        </Tier>
      </TiersRow>
      <Typography>
        We have decided to have two tiers in order to cater to builders who are in the beginning of their building
        journeys (Tier 1) and also to more professional builders or studios (Tier 2).
      </Typography>

      <SubTitle>Categories:</SubTitle>

      <StyledGrid container flexWrap={'wrap'} gap={5.6} mb={5.6}>
        <Grid item display={'flex'} width="45%">
          <WithGreyBorder>
            <GalleryIcon width={36} height={36} />
          </WithGreyBorder>
          <StyledBox>
            <h1>NFT gallery / shop</h1>
            <p>Enabling users to showcase and sell their tokens.</p>
          </StyledBox>
        </Grid>
        <Grid item display={'flex'} width="45%">
          <WithGreyBorder>
            <LectureIcon width={36} height={36} />
          </WithGreyBorder>
          <StyledBox>
            <h1>Event venue for conferences / webinars / lectures / parties</h1>
            <p>Enabling users to livestream and display content.</p>
          </StyledBox>
        </Grid>
        <Grid item display={'flex'} width="45%">
          <WithGreyBorder>
            <GlassesIcon width={36} />
          </WithGreyBorder>
          <StyledBox>
            <h1>Venue for a fashion runway show</h1>
            <p>Enabling users to showcase wearables.</p>
          </StyledBox>
        </Grid>
        <Grid item display={'flex'} width="45%">
          <WithGreyBorder>
            <CompanyIcon width={36} height={36} />
          </WithGreyBorder>
          <StyledBox>
            <h1>Company HQ</h1>
            <p>A multipurpose venue allowing brands to establish a metaverse presence.</p>
          </StyledBox>
        </Grid>
      </StyledGrid>
      <Grid item display={'flex'}>
        <WithGreyBorder>
          <SpinIcon width={36} height={36} />
        </WithGreyBorder>
        <StyledBox>
          <h1>Sharded Minds themed scene</h1>
          <p>
            If you ever wanted to build something unique in Decentraland - this is your chance. Might be a place of
            worship to pray for green candles, a sculpture to commemorate Vitalik, a representation of your favorite{' '}
            <a href="https://opensea.io/collection/sharded-minds" target="_blank">
              Sharded Mind
            </a>{' '}
            or anything else your heart desires. The only requirement is that it should be related somehow to our NFT
            collection Sharded Minds.
          </p>
        </StyledBox>
      </Grid>
    </StyledRoot>
  );
};
