import { FC } from 'react';
import { Link } from 'react-router-dom';

import { Box, Grid } from 'design-system';
import { LocationIcon } from 'design-system/icons';

import { AvatarContainer, CardContainer, DividerStyled, TypeChip, TypographyStyled } from './styled';

import { NotionResultForCard } from './types';

interface ISceneExpertCard {
  builder: NotionResultForCard;
}

const SceneExpertCard: FC<ISceneExpertCard> = ({ builder }) => {
  const formatShortDescription = (desc: string) => {
    const limitStringLength = builder.shortDescription.slice(0, 105);
    const cutOff = limitStringLength.lastIndexOf(' ');
    const shortenedDescription = limitStringLength.substring(0, cutOff);
    if (desc.length > 105) {
      return `${shortenedDescription}...`;
    } else {
      return builder.shortDescription;
    }
  };

  return (
    <Link to={`/scene-expert/${builder.builderName}`}>
      <CardContainer className="scene-expert-card">
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
        <TypographyStyled variant="body1">{formatShortDescription(builder.shortDescription)}</TypographyStyled>
        <DividerStyled orientation="horizontal" />
        <Grid display="flex" justifyContent="flex-start" width="100%" container>
          <LocationIcon style={{ marginRight: '13px' }} />
          <div>{builder.location}</div>
        </Grid>
      </CardContainer>
    </Link>
  );
};

export default SceneExpertCard;
