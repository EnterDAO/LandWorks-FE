import { Grid } from 'design-system';
import { ReactComponent as OwnersGraphics } from 'resources/svg/landing/owners-graphics.svg';
import { ReactComponent as RentersGraphics } from 'resources/svg/landing/renters-graphics.svg';

import './index.scss';

export const About: React.FC = () => (
  <section className="about-wrapper">
    <div className="content-container">
      <Grid container justifyItems="center">
        <Grid item xs={8}>
          <p className="description">
            LandWorks enables <strong>renting</strong> of land in <strong>Web3 metaverse</strong> games
          </p>
        </Grid>
      </Grid>
      <Grid container justifyItems="center" spacing={[32, 60, 100]}>
        <Grid item sm={24} md={12} lg={8} className="about-section">
          <OwnersGraphics />
          <h2>For land owners</h2>
          <p>Еarn passive income on your land by turning it into a productive asset</p>
        </Grid>
        <Grid item sm={24} md={12} lg={8} className="about-section">
          <RentersGraphics />
          <h2>For renters</h2>
          <p>
            Leverage the power of metaverse games by renting in-game land instead of buying and holding it long-term
          </p>
        </Grid>
      </Grid>
    </div>
  </section>
);
