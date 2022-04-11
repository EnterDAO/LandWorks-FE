import { FC, useState } from 'react';

import { Button, Grid } from 'design-system';
import { AlertIcon, LanguagesIcon, LocationIcon, TagIcon } from 'design-system/icons';

import ExpertContactModal from '../../scene-expert-contact-modal';
import { BlueBoxContainer, CardContainer, DividerStyled, StyledBox, TypographyStyled } from '../styled';

import { NotionResultForProfile } from '../../scene-expert-card/types';

interface ISceneExpertDetails {
  builder: NotionResultForProfile;
}

const SceneExpertDetails: FC<ISceneExpertDetails> = ({ builder }) => {
  const [showContactModal, setShowContactModal] = useState(false);

  const iconStyle = {
    marginRight: '20px',
    width: '20px',
    height: '20px',
  };

  return (
    <CardContainer className="scene-expert-card" style={{ padding: '20px 30px', height: '578px' }}>
      <TypographyStyled variant="h4" style={{ textTransform: 'uppercase' }}>
        Expert Details & Services
      </TypographyStyled>
      <StyledBox>
        <LocationIcon style={iconStyle} />
        {builder?.location}
      </StyledBox>
      <StyledBox>
        <LanguagesIcon style={iconStyle} />
        {builder?.languages}
      </StyledBox>
      <StyledBox>
        <TagIcon className="tag-icon" style={{ minWidth: '20px', marginRight: '20px' }} />
        {builder?.tags}
      </StyledBox>
      <BlueBoxContainer>
        <AlertIcon style={{ width: '20px', height: '20px' }} />
        <Grid item width="90%" textAlign="left">
          <TypographyStyled variant="h4">Good to know</TypographyStyled>
          For more information send a message to the expert. Some details here might be missing.
        </Grid>
      </BlueBoxContainer>
      <DividerStyled sx={{ borderBottomWidth: 2 }} orientation="horizontal" />
      <Grid display="flex" flexDirection="column" alignItems="center" width="100%">
        <Button
          style={{ marginTop: '10px' }}
          variant="gradient"
          btnSize="medium"
          onClick={() => setShowContactModal(true)}
        >
          Send a message
        </Button>
      </Grid>
      <ExpertContactModal
        open={showContactModal}
        handleClose={() => setShowContactModal(false)}
        email={builder.email}
        discord={builder.discord}
        twitter={builder.twitter}
      />
    </CardContainer>
  );
};

export default SceneExpertDetails;
