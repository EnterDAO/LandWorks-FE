import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Main } from 'assets/img/hero_main.svg';
import { ReactComponent as Metaverse } from 'assets/img/main_metaverse.svg';
import { ReactComponent as Partners } from 'assets/img/partners.svg';
import { Button, Grid } from 'design-system';

import './index.scss';

export const Hero: React.FC = () => {
  return (
    <section className="landing-page-wrapper">
      <Main className="right-blocks" />
      <div className="content-container">
        <Grid container>
          <Grid item sx={{ flexDirection: 'column' }}>
            <Metaverse />
            <h2>Renting land</h2>
            <h1>Never Worked so well</h1>
            <p>
              LandWorks is a community-owned Marketplace for renting Web3 Metaverse Land, governed by EnterDAO and ENTR
              holders.
            </p>
            <Link to="/explore">
              <Button variant="gradient" btnSize="small" className="button-primary">
                Explore
              </Button>
            </Link>
          </Grid>
        </Grid>
        <Partners className="partners" />
      </div>
    </section>
  );
};
