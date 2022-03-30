import { FC } from 'react';

import { Grid } from 'design-system';
import { LocationIcon } from 'design-system/icons';

import { AvatarContainer, CardContainer, DividerStyled, TypeChip, TypographyStyled } from './styled';

const SceneExpertCard: FC = () => {
  return (
    <CardContainer className="scene-expert-card">
      <Grid height={133} width="100%" borderRadius="20px" overflow="hidden">
        <div style={{ height: '100%', width: '100%', backgroundColor: 'grey' }}></div>
        {/* <Box
          component="img"
          sx={{
            height: 133,
            width: '100%',
            borderRadius: '20px',
            // maxHeight: { xs: 110, md: 90 },
            // maxWidth: { xs: 350, md: 250 },
          }}
          alt="The property from the offer."
          src=""
        /> */}
      </Grid>
      <AvatarContainer></AvatarContainer>
      <TypographyStyled variant="h4">Anzette Muntingh</TypographyStyled>
      <TypographyStyled variant="h5">3D Artist, Scene Builder</TypographyStyled>
      <TypeChip>Individual</TypeChip>
      <TypographyStyled variant="body1">
        I'm passionate 3D Designer with experience in Metaverse, Blockchain and Digital Products.
      </TypographyStyled>
      <DividerStyled orientation="horizontal" />
      <Grid display="flex">
        <LocationIcon />
        <div>Sofia, Bulgaria</div>
      </Grid>
    </CardContainer>
  );
};

export default SceneExpertCard;
