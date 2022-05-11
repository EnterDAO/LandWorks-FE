import { FC } from 'react';

import ExternalLink from 'components/custom/external-link';
import Icon from 'components/custom/icon';
import { Box, Grid } from 'design-system';

import { ReadMore } from '../scene-builder-description-readmore';
import { AvatarContainer, CardContainer, TypeChip, TypographyStyled } from './styled';

import { NotionResultForProfile } from '../scene-builder-card/types';

interface ISceneBuilderProfile {
  builder: NotionResultForProfile;
}

const SceneBuilderProfile: FC<ISceneBuilderProfile> = ({ builder }) => {
  const hasValue = (val: string) => {
    if (val === undefined) {
      return false;
    } else if (val === '-') {
      return false;
    } else {
      return true;
    }
  };

  const hasEmail = builder?.website !== undefined && builder?.website !== '-';

  return (
    <CardContainer
      className="scene-builder-card"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      position="absolute"
      minHeight="550px"
    >
      <Grid height={185} width="100%" borderRadius="20px" overflow="hidden">
        <Box
          component="img"
          sx={{
            borderRadius: '20px',
            objectFit: 'cover',
            width: '100%',
            height: '100%',
          }}
          alt="Scene builder cover image."
          src={builder?.coverPhotoLink}
        />
      </Grid>
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
      <Grid padding="90px 35px 20px" position="relative">
        <Grid
          paddingTop="20px"
          width="100%"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid display="flex" alignItems="center" gap={'10px'}>
            <TypographyStyled variant="h3">{builder?.builderName}</TypographyStyled>
            <TypeChip>{builder?.builderType}</TypeChip>
          </Grid>
          <Grid>
            {hasValue(builder.twitter) && (
              <ExternalLink href={builder?.twitter}>
                <Icon name="twitter" width="20" height="20" style={{ color: 'white', marginLeft: '20px' }} />
              </ExternalLink>
            )}
            {hasValue(builder.discord) && (
              <ExternalLink href={builder?.discord}>
                <Icon name="discord" width="20" height="20" style={{ color: 'white', marginLeft: '20px' }} />
              </ExternalLink>
            )}
          </Grid>
        </Grid>
        <TypographyStyled variant="h5">{builder?.definition}</TypographyStyled>
        <Grid item display="flex" textAlign="left">
          <ReadMore>{builder?.longDescription}</ReadMore>
        </Grid>
        {hasEmail && (
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

export default SceneBuilderProfile;
