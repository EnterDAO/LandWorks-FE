import { FC } from 'react';
import { Link } from 'react-router-dom';

import { Box, Grid } from 'design-system';
import { LocationIcon } from 'design-system/icons';
import { getSceneBuilderBuilderPath } from 'router/routes';

import { AvatarContainer, CardContainer, DividerStyled, TypeChip, TypographyStyled } from './styled';

import { formatShortDescription } from '../../../../utils';

import { NotionResultForCard } from './types';

interface ISceneBuilderCard {
  builder: NotionResultForCard;
}

const SceneBuilderCard: FC<ISceneBuilderCard> = ({ builder }) => {
  return (
    <Link to={getSceneBuilderBuilderPath(builder.builderName)}>
      <CardContainer className="scene-builder-card">
        <Grid height="133px" width="100%" borderRadius="20px" overflow="hidden">
          <Box
            component="img"
            sx={{
              objectFit: 'cover',
              width: '100%',
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
        <TypographyStyled variant="body1">{formatShortDescription(builder.shortDescription)}</TypographyStyled>
        <DividerStyled orientation="horizontal" />
        <Grid display="flex" justifyContent="flex-start" width="100%" container>
          <LocationIcon style={{ marginRight: '13px' }} />
          <TypographyStyled variant="body2">{builder.location}</TypographyStyled>
        </Grid>
      </CardContainer>
    </Link>
  );
};

export default SceneBuilderCard;
