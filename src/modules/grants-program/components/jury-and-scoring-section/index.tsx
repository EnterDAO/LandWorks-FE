import React, { FC } from 'react';

import { Grid, Stack, Typography } from 'design-system';
import { DiamondIcon, InteractiveIcon, OriginalityIcon } from 'design-system/icons';
import {
  Section,
  SectionTitle,
  SpecificSectionProps,
  SubSection,
  SubSectionTitle,
  WithGreyBorder,
} from 'modules/grants-program/styled';

import { teamMembers } from './data';
import { Details, TeamMemberCard } from './styled';

export const JuryAndScoringSection: FC<SpecificSectionProps> = ({ id }) => {
  return (
    <Section id={id}>
      <SectionTitle>Jury panel and scoring</SectionTitle>
      <SubSection>
        <SubSectionTitle mb={{ xs: 6, md: 8 }}>The jury panel consists of:</SubSectionTitle>

        <Grid container spacing={{ xs: 4, md: 6 }}>
          {teamMembers.map((teamMember) => {
            return (
              <Grid key={teamMember.fullName} item flexGrow={1} flexBasis={{ xs: '100%', xl: '50%' }}>
                <TeamMemberCard teamMember={teamMember} />
              </Grid>
            );
          })}
        </Grid>
      </SubSection>

      <SubSection>
        <SubSectionTitle>The scoring will be based on several factors:</SubSectionTitle>
        <Stack spacing={3}>
          <Grid item display={'flex'} flexDirection={'row'} alignItems="center">
            <WithGreyBorder>
              <DiamondIcon width={36} />
            </WithGreyBorder>
            <Details>
              <h4>Quality</h4>
              <p>Professional high-quality builds would be scored higher</p>
            </Details>
          </Grid>
          <Grid item display={'flex'} flexDirection={'row'} alignItems="center">
            <WithGreyBorder>
              <InteractiveIcon width={36} />
            </WithGreyBorder>
            <Details>
              <h4>Interactiveness</h4>
              <p>Highly interactive scenes would be scored higher</p>
            </Details>
          </Grid>
          <Grid item display={'flex'} flexDirection={'row'} alignItems="center">
            <WithGreyBorder>
              <OriginalityIcon width={36} height={36} />
            </WithGreyBorder>
            <Details>
              <h4>Originality</h4>
              <p>Original and creative scenes would be scored higher</p>
            </Details>
          </Grid>
        </Stack>
      </SubSection>
      <SubSection>
        <SubSectionTitle>Additional guidelines (not mandatory):</SubSectionTitle>
        <Typography
          component="ul"
          sx={{
            pl: 4,
            '& ::marker': {
              color: 'inherit',
            },
          }}
        >
          <li>Common sized scenes (1x1, 1x2, 2x2) are welcomed as more users would be able to utilize them.</li>
          <li>Any availability for customization is welcomed (text placeholders, image placeholders).</li>
          <li>
            The more details you provide in you application - the better. Contexts of the build, sizing, variables, etc.
          </li>
        </Typography>
      </SubSection>
    </Section>
  );
};
