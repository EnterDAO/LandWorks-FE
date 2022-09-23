import { useHistory } from 'react-router-dom';

import { ReactComponent as LeftPart } from 'assets/img/about_left.svg';
import { ReactComponent as RightPart } from 'assets/img/about_right.svg';
import { Box, Button, Grid, Typography } from 'design-system';
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
    <Box position="relative" pt={{ xs: 10, xl: 18 }} pb={{ xs: 10, xl: 21 }} className="about-wrapper">
      <Box className="content-container">
        <Box textAlign="center" mb={10}>
          <Typography variant="body2" color="var(--theme-accent-color)" mb={2}>
            IS IT FOR YOU?
          </Typography>
          <Typography variant="h2" mb={2}>
            There are a Lot of Opportunities
          </Typography>
          <Typography>You can either lend yours or rent a new Land that you want.</Typography>
        </Box>
        <Grid container justifyItems="center" marginTop={12}>
          <StyledGrid item xs={12} md={6}>
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
          <StyledGrid item xs={12} md={6}>
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
      </Box>
    </Box>
  );
};
