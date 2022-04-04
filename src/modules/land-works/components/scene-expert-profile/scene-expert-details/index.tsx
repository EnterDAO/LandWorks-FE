import { FC } from 'react';

import { Button, Grid } from 'design-system';
import { AlertIcon, BlueDollarIcon, LanguagesIcon, LocationIcon, ProfileIcon02, TagIcon } from 'design-system/icons';

import { BlueBoxContainer, CardContainer, DividerStyled, PriceContainer, StyledBox, TypographyStyled } from '../styled';

import { NotionResultForProfile } from '../../scene-expert-card/types';

interface ISceneExpertDetails {
  builder: NotionResultForProfile;
}

const SceneExpertDetails: FC<ISceneExpertDetails> = ({ builder }) => {
  const greyStyle = {
    fill: '#3A3A4E',
  };

  const blueStyle = {
    fill: '#5D8FF0',
  };

  const iconStyle = {
    marginRight: '20px',
    width: '20px',
    height: '20px',
  };

  const getPrice = (price: string) => {
    let rate = '';
    if (price == '1') {
      rate = '$50 - $100';
    } else if (price == '2') {
      rate = '$100 - $150';
    } else {
      rate = '$150 - $200';
    }
    return rate;
  };

  return (
    <CardContainer className="scene-expert-card" style={{ padding: '30px' }}>
      <TypographyStyled variant="h4" marginBottom="25px" style={{ textTransform: 'uppercase' }}>
        Expert Details & Services
      </TypographyStyled>
      <StyledBox>
        <LocationIcon style={iconStyle} />
        {builder.location}
      </StyledBox>
      <StyledBox>
        <LanguagesIcon style={iconStyle} />
        {builder.languages}
      </StyledBox>
      <StyledBox>
        <TagIcon style={{ marginRight: '20px' }} />
        {builder.tags}
      </StyledBox>
      <StyledBox>
        <ProfileIcon02 style={iconStyle} />
        Freelancer
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
        <PriceContainer>
          <BlueDollarIcon style={blueStyle} />
          {builder.price === '2' || builder.price === '3' ? (
            <BlueDollarIcon style={blueStyle} />
          ) : (
            <BlueDollarIcon style={greyStyle} />
          )}
          {builder.price === '3' ? <BlueDollarIcon style={blueStyle} /> : <BlueDollarIcon style={greyStyle} />}
        </PriceContainer>
        <TypographyStyled variant="h4" style={{ margin: '20px 0 28px', textAlign: 'center' }}>
          Typically {getPrice(builder.price)} per hour
        </TypographyStyled>
        <Button variant="gradient" btnSize="medium">
          Send a message
        </Button>
      </Grid>
    </CardContainer>
  );
};

export default SceneExpertDetails;
