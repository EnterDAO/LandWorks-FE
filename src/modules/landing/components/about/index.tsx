import { useHistory } from 'react-router-dom';

import { ReactComponent as LeftPart } from 'assets/img/about_left.svg';
import { ReactComponent as RightPart } from 'assets/img/about_right.svg';
import { Button, Grid } from 'design-system';
import { BackIcon } from 'design-system/icons';
import {
  LandOwner,
  Rent,
  StyledGrid,
  StyledSubtitle,
  StyledText,
  StyledTypography,
} from 'modules/landing/components/about/styled';

import './index.scss';

export const About: React.FC = () => {
  const history = useHistory();
  const redirect = () => history.push('/explore');
  return (
    <section className="about-wrapper">
      <div className="content-container">
        <Grid container direction="column" justifyItems="center" justifyContent="center" alignItems="center">
          <StyledText>IS IT FOR YOU?</StyledText>
          <Grid item xs={4} textAlign="center">
            <h2>There are a Lot of Opportunities</h2>
          </Grid>
          <Grid item xs={4}>
            <StyledSubtitle>You can either lend yours or rent a new Land that you want.</StyledSubtitle>
          </Grid>
        </Grid>
        <Grid container justifyItems="center" marginTop={12}>
          <StyledGrid item sm={12} md={6}>
            <LeftPart />
            <div>
              <h2>
                Are you a <LandOwner>Land Owner</LandOwner>?
              </h2>
              <p>Еarn passive income on your land by turning it into a productive asset.</p>
              <Button
                onClick={redirect}
                sx={{ position: 'absolute', bottom: '15%' }}
                variant="tertiary"
                btnSize="xsmall"
                className="button"
              >
                <StyledTypography>
                  Lend now <BackIcon height={20} width={20} />
                </StyledTypography>
              </Button>
            </div>
          </StyledGrid>
          <StyledGrid item sm={12} md={6}>
            <RightPart />
            <div>
              <h2>
                Do you search to <Rent>Rent</Rent>?
              </h2>
              <p>
                Leverage the power of metaverse games by renting in-game land instead of buying and holding it
                long-term.
              </p>
              <Button
                onClick={redirect}
                sx={{ position: 'absolute', bottom: '15%' }}
                variant="tertiary"
                btnSize="xsmall"
                className="button"
              >
                <StyledTypography>
                  Start renting <BackIcon height={20} width={20} />
                </StyledTypography>
              </Button>
            </div>
          </StyledGrid>
        </Grid>
      </div>
    </section>
  );
};
