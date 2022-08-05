import { useHistory } from 'react-router-dom';

import { ReactComponent as LeftPart } from 'assets/img/about_left.svg';
import { ReactComponent as RightPart } from 'assets/img/about_right.svg';
import { Button, Grid } from 'design-system';
import { BackIcon } from 'design-system/icons';
import {
  LandOwner,
  Rent,
  StyledGrid,
  StyledLink,
  StyledSubtitle,
  StyledText,
} from 'modules/landing/components/about/styled';
import { routes } from 'router/routes';

import './index.scss';

export const About: React.FC = () => {
  const history = useHistory();
  const redirect = () => history.push(routes.explore);
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
                <StyledLink to={routes.explore}>
                  List now <BackIcon height={20} width={20} />
                </StyledLink>
              </Button>
            </div>
          </StyledGrid>
          <StyledGrid item sm={12} md={6}>
            <RightPart />
            <div>
              <h2>
                Do you seek to <Rent>Rent</Rent>?
              </h2>
              <p>Leverage the power of metaverse games by renting in-game land instead of buying.</p>
              <Button
                onClick={redirect}
                sx={{ position: 'absolute', bottom: '15%' }}
                variant="tertiary"
                btnSize="xsmall"
                className="button"
              >
                <StyledLink to={routes.explore}>
                  Start renting <BackIcon height={20} width={20} />
                </StyledLink>
              </Button>
            </div>
          </StyledGrid>
        </Grid>
      </div>
    </section>
  );
};
