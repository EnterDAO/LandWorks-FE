import React from 'react';

import { Grid } from 'design-system';
import { DiamondIcon, InteractiveIcon, OriginalityIcon, ProfileIcon } from 'design-system/icons';
import { SectionTitle, SubTitle, WithGreyBorder } from 'modules/grants-program/styled';

import { ImageWrapper, TeamDescription, TeamIcon } from './styled';

export const JuryAndScoring: React.FC = () => {
  return (
    <div id={'gp-id-2'}>
      <SectionTitle>Jury panel and scoring</SectionTitle>
      <SubTitle>The jury panel consists of:</SubTitle>
      <br />
      <Grid container display="flex" gap={6} mb={13} flexWrap="wrap">
        <Grid item display="flex" alignItems={'center'} flexDirection={'row'}>
          <TeamIcon>
            <ImageWrapper>
              <ProfileIcon color="#F8F8FF" />
            </ImageWrapper>
          </TeamIcon>
          <TeamDescription style={{ maxWidth: 320 }}>
            <h1>Zhivko Todorov</h1>
            <a href="https://twitter.com/zhivko">@zhivko</a>
            <p>EnterDAO’s co-founder and lead of business development</p>
          </TeamDescription>
        </Grid>
        <Grid item display="flex" alignItems={'center'} flexDirection={'row'}>
          <TeamIcon>
            <ImageWrapper>
              <ProfileIcon color="#F8F8FF" />
            </ImageWrapper>
          </TeamIcon>
          <TeamDescription style={{ maxWidth: 320 }}>
            <h1>Daniel Ivanov</h1>
            <a href="https://twitter.com/danielivanov">@danielivanov</a>
            <p>EnterDAO’s co-founder and architect of LandWorks</p>
          </TeamDescription>
        </Grid>
        <Grid item display="flex" alignItems={'center'} flexDirection={'row'}>
          <TeamIcon>
            <ImageWrapper>
              <ProfileIcon color="#F8F8FF" />
            </ImageWrapper>
          </TeamIcon>
          <TeamDescription style={{ maxWidth: 320 }}>
            <h1>Radina Talanova</h1>
            <a href="https://twitter.com/radina_nt">@radina_nt</a>
            <p>EnterDAO’s co-founder and product lead for MetaPortal</p>
          </TeamDescription>
        </Grid>
        <Grid item display="flex" alignItems={'center'} flexDirection={'row'}>
          <TeamIcon>
            <ImageWrapper>
              <ProfileIcon color="#F8F8FF" />
            </ImageWrapper>
          </TeamIcon>
          <TeamDescription style={{ maxWidth: 320 }}>
            <h1>Ivan Iliyanov</h1>
            <a href="https://twitter.com/vankiz_">@vankiz_</a>
            <p>LandWorks design lead</p>
          </TeamDescription>
        </Grid>
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
