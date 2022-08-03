import React, { ReactElement } from 'react';
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
import {
  Section,
  SectionTitle,
  SpecificSectionProps,
  SubSection,
  SubSectionTitle,
  WithGreyBorder,
} from 'modules/grants-program/styled';

import { StyledBox, StyledGrid, Tier, TiersRow } from './styled';

interface CardConfig {
  name: string;
  Icon: typeof GalleryIcon;
  description: string | ReactElement;
}

const categories: CardConfig[] = [
  {
    name: 'NFT gallery / shop',
    Icon: GalleryIcon,
    description: 'Enabling users to showcase and sell their tokens.',
  },
  {
    name: 'Event venue for conferences / webinars / lectures / parties',
    Icon: LectureIcon,
    description: 'Enabling users to livestream and display content.',
  },
  {
    name: 'Venue for a fashion runway show',
    Icon: GlassesIcon,
    description: 'Enabling users to showcase wearables.',
  },
  {
    name: 'Company HQ',
    Icon: CompanyIcon,
    description: 'A multipurpose venue allowing brands to establish a metaverse presence.',
  },
  {
    name: 'Sharded Minds themed scene',
    Icon: SpinIcon,
    description: (
      <>
        If you ever wanted to build something unique in Decentraland - this is your chance. Might be a place of worship
        to pray for green candles, a sculpture to commemorate Vitalik, a representation of your favorite{' '}
        <a href="https://opensea.io/collection/sharded-minds" target="_blank">
          Sharded Mind
        </a>{' '}
        or anything else your heart desires. The only requirement is that it should be related somehow to our NFT
        collection Sharded Minds.
      </>
    ),
  },
];

const tiers: CardConfig[] = [
  {
    name: 'Tier 1',
    Icon: FilledStar,
    description: (
      <>
        up to <b>2,500 USDC + 2,500 ENTR tokens</b>
      </>
    ),
  },
  {
    name: 'Tier 2',
    Icon: ThreeStars,
    description: (
      <>
        up to <b>10,000 USDC + 2,500 ENTR tokens</b>
      </>
    ),
  },
];

export const AboutSection = ({ id }: SpecificSectionProps) => {
  return (
    <Section id={id}>
      <SectionTitle>About</SectionTitle>

      <SubSection>
        <SubSectionTitle>What?</SubSectionTitle>
        <Typography>
          The Open Scene Grant Program is a grant program for building Decentraland Scenes in several categories. The
          program is funded by the EnterDAO treasury after the successful pass of the{' '}
          <a href="https://dao.enterdao.xyz/governance/proposals/1" target="_blank">
            DAO’s first governance proposal
          </a>
          . <br />
          <br /> All scenes funded through the Open Scenes Grant Program will be open-sourced and available to the
          public for anyone to use. This is the first round of the program and if successful many more are coming with
          the goal of enabling existing and new users to easily generate a variety of experiences on their rented or
          owned land.{' '}
        </Typography>
      </SubSection>

      <SubSection>
        <SubSectionTitle>Why?</SubSectionTitle>

        <Typography>
          As more people are exposed to the metaverse we are noticing a need for quality scenes being available to the
          public for hosting events, displaying their art or just having fun. Most who enter the metaverse have a very
          limited knowledge of development, or have specific specializations. In such, it prevents many creators from
          experimenting with various use cases and slows down the growth and development of the metaverse.Our renting
          platform, LandWorks, provides an easy and affordable means of accessing metaverse land, however the
          availability of quality scenes/buildings is not widespread, transparent, or accessible. That’s what we aim to
          solve with this Open Scene Grant Program - the generated builds/assets will allow for anyone to have access to
          quality Decentraland scenes for their event/gallery/show and at the same time allow for builders to amaze
          everyone with their creativity. Creators will have less hesitance with experimenting across various use cases,
          or sizes of spaces, in turn creating a turn “Wow” effect no matter where you go in the metaverse.
        </Typography>
      </SubSection>

      <SubSection>
        <SubSectionTitle>How?</SubSectionTitle>

        <Typography>
          For this first round of the grant program the grant pool will be{' '}
          <b>50,000 USDC + 50,000 ENTR given in 1:1 ratio.</b> That would mean that whatever sum you get in USDC, it
          will be matched in ENTR tokens.
        </Typography>
        <br />
        <Typography>
          Grants may be requested for any amount within one of two possible tiers, regardless of the grant category.
        </Typography>
        <br />

        <Grid mb={{ xs: 3, md: 6 }} container spacing={{ xs: 2, md: 4 }}>
          {tiers.map(({ name, Icon, description }) => {
            return (
              <Grid key={name} item display="flex" flexGrow={1} flexBasis={{ xs: '100%', xl: '50%' }}>
                <Tier>
                  <Icon width={36} height={36} />
                  <StyledBox>
                    <h1>{name}</h1>
                    <p>{description}</p>
                  </StyledBox>
                </Tier>
              </Grid>
            );
          })}
        </Grid>

        <Typography>
          We have decided to have two tiers in order to cater to builders who are in the beginning of their building
          journeys (Tier 1) and also to more professional builders or studios (Tier 2).
        </Typography>
      </SubSection>

      <SubSection>
        <SubSectionTitle>Categories:</SubSectionTitle>

        <Grid container spacing={{ xs: 4, md: 8 }}>
          {categories.map(({ name, Icon, description }) => {
            return (
              <Grid key={name} item display="flex" flexGrow={1} flexBasis={{ xs: '100%', xl: '50%' }}>
                <WithGreyBorder>
                  <Icon width={36} height={36} />
                </WithGreyBorder>
                <StyledBox>
                  <h1>{name}</h1>
                  <p>{description}</p>
                </StyledBox>
              </Grid>
            );
          })}
        </Grid>
      </SubSection>
    </Section>
  );
};
