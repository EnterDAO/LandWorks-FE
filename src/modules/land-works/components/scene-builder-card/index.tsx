import { FC } from 'react';
import { Link } from 'react-router-dom';

import { Box, Grid } from 'design-system';
import { LocationIcon } from 'design-system/icons';

import { AvatarContainer, CardContainer, DividerStyled, TypeChip, TypographyStyled } from './styled';

import { NotionResultForCard } from './types';

interface ISceneBuilderCard {
  builder: NotionResultForCard;
}

const SceneBuilderCard: FC<ISceneBuilderCard> = ({ builder }) => {
  return (
    <Link to={`/scene-builder/${builder.builderName}`}>
      <CardContainer className="scene-builder-card">
        <Grid height={133} width="100%" borderRadius="20px" overflow="hidden">
          <Box
            component="img"
            sx={{
              height: '100%',
              borderRadius: '20px',
            }}
            alt="Scene builder cover image."
            src={builder.coverPhotoLink}
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
            src={builder.avatarPhotoLink}
          />
        </AvatarContainer>
        <TypographyStyled variant="h4">{builder.builderName}</TypographyStyled>
        <TypographyStyled variant="h5">{builder.definition}</TypographyStyled>
        <TypeChip>{builder.builderType}</TypeChip>
        <TypographyStyled variant="body1">{builder.shortDescription}</TypographyStyled>
        <DividerStyled orientation="horizontal" />
        <Grid display="flex" justifyContent="flex-start" width="100%" container>
          <LocationIcon style={{ marginRight: '13px' }} />
          <div>{builder.location}</div>
        </Grid>
      </CardContainer>
    </Link>
  );
};

export default SceneBuilderCard;
