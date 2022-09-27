import { ReactNode } from 'react';
import { useHistory } from 'react-router-dom';

import listImgSrc from 'assets/img/about_left.svg';
import rentImgSrc from 'assets/img/about_right.svg';
import AdaptiveTypography from 'components/custom/adaptive-typography';
import { Box, Button, Grid, Stack, Typography } from 'design-system';
import { BackIcon } from 'design-system/icons';
import { LandOwner, Rent } from 'modules/landing/components/about/styled';
import { APP_ROUTES } from 'router/routes';

interface CardProps {
  title: ReactNode;
  description: ReactNode;
  actionButtonLabel: string;
  background?: string;
  to: string;
}

const Card = ({ title, description, actionButtonLabel, background, to }: CardProps) => {
  const history = useHistory();

  return (
    <Stack
      minHeight={{ xs: 220, xl: 300 }}
      border={`3px solid #27273A`}
      sx={{
        backgroundColor: '#1E1E2E',
        backgroundImage: { xl: `url(${background})` },
        backgroundSize: 'cover',
      }}
      p={4}
      py={{ xl: 12 }}
      width={1}
      borderRadius="20px"
    >
      <AdaptiveTypography variant="h3" mb={2}>
        {title}
      </AdaptiveTypography>
      <Typography variant="body1" maxWidth={350} mb="auto">
        {description}
      </Typography>

      <Button
        onClick={() => history.push(to)}
        variant="tertiary"
        btnSize="xsmall"
        sx={{ mt: 6, alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center' }}
      >
        {actionButtonLabel}{' '}
        <Box display="inline-flex" sx={{ transform: 'translateY(4px) rotate(180deg)' }}>
          <BackIcon height={20} width={20} />
        </Box>
      </Button>
    </Stack>
  );
};

export const About: React.FC = () => {
  return (
    <Box position="relative" pt={{ xs: 10, xl: 18 }} pb={{ xs: 10, xl: 21 }} className="about-wrapper">
      <Box py={0} className="content-container">
        <Box textAlign="center" mb={10}>
          <Typography variant="body2" color="var(--theme-accent-color)" mb={2}>
            IS IT FOR YOU?
          </Typography>
          <AdaptiveTypography variant="h2" mb={2}>
            There are a Lot of Opportunities
          </AdaptiveTypography>
          <Typography>You can either lend yours or rent a new Land that you want.</Typography>
        </Box>
        <Grid container rowSpacing={3} columnSpacing={8}>
          <Grid item xs={12} md={6} display="flex">
            <Card
              title={
                <>
                  Are you a <LandOwner>Land Owner</LandOwner>?
                </>
              }
              description="Earn passive income on your land by turning it into a productive asset."
              actionButtonLabel="List now"
              to={APP_ROUTES.explore}
              background={listImgSrc}
            />
          </Grid>
          <Grid item xs={12} md={6} display="flex">
            <Card
              title={
                <>
                  Do you seek to <Rent>Rent</Rent>?
                </>
              }
              description="Leverage the power of metaverse games by renting in-game land instead of buying."
              actionButtonLabel="Start renting"
              to={APP_ROUTES.explore}
              background={rentImgSrc}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
