import React from 'react';

import { Grid } from 'design-system';
import { DiamondIcon, InteractiveIcon, OriginalityIcon, ProfileIcon } from 'design-system/icons';
import { SectionTitle, SubTitle, WithGreyBorder } from 'modules/grants-program/styled';

import { teamMembers } from './data';
import { TeamDescription, TeamMemberCard } from './styled';

export const JuryAndScoring: React.FC = () => {
  return (
    <div id={'gp-id-2'}>
      <SectionTitle>Jury panel and scoring</SectionTitle>
      <SubTitle sx={{ mb: 8 }}>The jury panel consists of:</SubTitle>

      <Grid container spacing={6} mb={13}>
        {teamMembers.map((teamMember) => {
          return (
            <Grid key={teamMember.fullName} item flexGrow={1} flexBasis={{ xs: '100%', xl: '50%' }}>
              <TeamMemberCard teamMember={teamMember} />
            </Grid>
          );
        })}
      </Grid>

      <SubTitle>The scoring will be based on several factors:</SubTitle>
      <Grid container flexDirection={'column'} rowSpacing={3} mb={26}>
        <Grid item display={'flex'} flexDirection={'row'} alignItems="center">
          <WithGreyBorder>
            <DiamondIcon width={36} />
          </WithGreyBorder>
          <TeamDescription>
            <h1>Quality</h1>
            <p>Professional high-quality builds would be scored higher</p>
          </TeamDescription>
        </Grid>
        <Grid item display={'flex'} flexDirection={'row'} alignItems="center">
          <WithGreyBorder>
            <InteractiveIcon width={36} />
          </WithGreyBorder>
          <TeamDescription>
            <h1>Interactiveness</h1>
            <p>Highly interactive scenes would be scored higher</p>
          </TeamDescription>
        </Grid>
        <Grid item display={'flex'} flexDirection={'row'} alignItems="center">
          <WithGreyBorder>
            <OriginalityIcon width={36} height={36} />
          </WithGreyBorder>
          <TeamDescription>
            <h1>Originality</h1>
            <p>Original and creative scenes would be scored higher</p>
          </TeamDescription>
        </Grid>
      </Grid>
    </div>
  );
};
