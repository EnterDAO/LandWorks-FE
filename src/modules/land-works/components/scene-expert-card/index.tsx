import { FC } from 'react';

import { Box, Grid } from 'design-system';
import { BlueDollarIcon, LocationIcon } from 'design-system/icons';

import { AvatarContainer, CardContainer, DividerStyled, TypeChip, TypographyStyled } from './styled';

import { NotionResultForCard } from './types';

interface ISceneExpertCard {
  builder: NotionResultForCard;
}

const SceneExpertCard: FC<ISceneExpertCard> = ({ builder }) => {
  const greyStyle = {
    fill: '#3A3A4E',
    marginLeft: '15px',
  };

  const blueStyle = {
    fill: '#5D8FF0',
    marginLeft: '15px',
  };

  return (
    <CardContainer className="scene-expert-card">
      <Grid height={133} width="100%" borderRadius="20px" overflow="hidden">
        <Box
          component="img"
          sx={{
            height: '100%',
            borderRadius: '20px',
          }}
          alt="The property from the offer."
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
          alt="The property from the offer."
          src={builder.avatarPhotoLink}
        />
      </AvatarContainer>
      <TypographyStyled variant="h4">{builder.builderName}</TypographyStyled>
      <TypographyStyled variant="h5">{builder.definition}</TypographyStyled>
      <TypeChip>{builder.builderType}</TypeChip>
      <TypographyStyled variant="body1">{builder.shortDescription}</TypographyStyled>
      <DividerStyled orientation="horizontal" />
      <Grid display="flex" justifyContent="space-between" width="100%" container>
        <Grid display="flex" alignItems="center">
          <LocationIcon style={{ marginRight: '13px' }} />
          <div>{builder.location}</div>
        </Grid>
        <Grid item display="flex" alignItems="center">
          <BlueDollarIcon style={blueStyle} />
          {builder.price === '2' || builder.price === '3' ? (
            <BlueDollarIcon style={blueStyle} />
          ) : (
            <BlueDollarIcon style={greyStyle} />
          )}
          {builder.price === '3' ? <BlueDollarIcon style={blueStyle} /> : <BlueDollarIcon style={greyStyle} />}
        </Grid>
      </Grid>
    </CardContainer>
  );
};

export default SceneExpertCard;
