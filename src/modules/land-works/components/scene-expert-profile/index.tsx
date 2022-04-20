import { FC } from 'react';

import ExternalLink from 'components/custom/external-link';
import Icon from 'components/custom/icon';
import { Box, Grid } from 'design-system';

import { AvatarContainer, CardContainer, TypeChip, TypographyStyled } from './styled';

import { NotionResultForProfile } from '../scene-expert-card/types';

interface ISceneExpertProfile {
  builder: NotionResultForProfile;
}

const SceneExpertProfile: FC<ISceneExpertProfile> = ({ builder }) => {
  return (
    <CardContainer className="scene-expert-card" style={{ height: '578px' }}>
      <Grid height={185} width="100%" borderRadius="20px" overflow="hidden">
        <Box
          component="img"
          sx={{
            width: '100%',
            borderRadius: '20px',
          }}
          alt="Scene builder cover image."
          src={builder?.coverPhotoLink}
        />
      </Grid>

      <Grid padding="20px 35px 40px" position="relative">
        <AvatarContainer>
          <Box
            component="img"
            sx={{
              width: '100%',
              borderRadius: '20px',
            }}
            alt="Scene builder profile image."
            src={builder?.avatarPhotoLink}
          />
        </AvatarContainer>
        <Grid
          paddingTop="20px"
          width="100%"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid display="flex" alignItems="center">
            <TypographyStyled variant="h3">{builder?.builderName}</TypographyStyled>
            <TypeChip>{builder?.builderType}</TypeChip>
          </Grid>
          <Grid>
            {builder?.twitter && (
              <ExternalLink href={builder?.twitter}>
                <Icon name="twitter" width="20" height="20" style={{ color: 'white', marginLeft: '20px' }} />
              </ExternalLink>
            )}
            {builder?.discord && (
              <ExternalLink href={builder?.discord}>
                <Icon name="discord" width="20" height="20" style={{ color: 'white', marginLeft: '20px' }} />
              </ExternalLink>
            )}
          </Grid>
        </Grid>
        <TypographyStyled variant="h5">{builder?.definition}</TypographyStyled>
        <Grid item display="flex" textAlign="left">
          {builder?.longDescription}
        </Grid>
        {builder?.website && (
          <Grid display="flex" flexDirection="column" textAlign="left" margin="20px 0 6px" width="300px">
            <TypographyStyled variant="h4" style={{ textTransform: 'uppercase' }}>
              My Website
            </TypographyStyled>
            <a href={builder?.website}>{builder?.website}</a>
          </Grid>
        )}
      </Grid>
    </CardContainer>
  );
};

export default SceneExpertProfile;
