import { Grid } from 'design-system';
import { ReactComponent as HowItWorksGraphics } from 'resources/svg/landing/how-it-works-graphics.svg';

import './index.scss';

export const HowItWorks: React.FC = () => (
  <section className="how-it-works-wrapper">
    <div className="content-container">
      <Grid container justifyItems="center" justifyContent="center" className="how-it-works-bullets">
        <Grid item sm={6} md={3} className="how-it-works-title">
          <h3>Capital efficiency for Metaverse Land</h3>
        </Grid>
        <Grid container justifyItems="center" justifyContent="center">
          <Grid item sm={10} md={4} className="left-bullets">
            <div>
              <h3>Affordability</h3>
              <p>Rent land that will otherwise be prohibitively expensive</p>
            </div>
            <div>
              <h3>Accessibility</h3>
              <p>Rent land that will otherwise be unavailable</p>
            </div>
          </Grid>
          <Grid item sm={5} md={4} className="middle-graphics">
            <HowItWorksGraphics />
          </Grid>
          <Grid item sm={10} md={4} className="right-bullets">
            <div>
              <h3>Governance</h3>
              <p>Fully decentralised. $ENTR holders govern the future of the protocol</p>
            </div>
            <div>
              <h3>Pooling adjacent land</h3>
              <p>Renters can safely pool adjacent land and utilise a bigger space for experience/scene deployment</p>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  </section>
);
