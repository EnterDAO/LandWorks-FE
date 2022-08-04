import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Background } from 'assets/img/hero_main.svg';
import { ReactComponent as Metaverse } from 'assets/img/hero_tag.svg';
import { ReactComponent as Partners } from 'assets/img/partners.svg';
//eslint-disable-next-line
//@ts-ignore
import Anim from 'assets/landing_animation.webm';
import { Button, Grid } from 'design-system';
import { routes } from 'router/routes';

import './index.scss';

export const Hero: React.FC = () => {
  return (
    <section className="landing-page-wrapper home">
      <Background className="hero-background" />

      <div className="content-container">
        <video autoPlay loop muted className="right-blocks">
          <source src={Anim} type="video/webm" />
          Sorry, your browser doesn't support embedded videos.
        </video>
        <Grid container>
          <Grid item className="left-blocks" sx={{ flexDirection: 'column' }}>
            <Metaverse />
            <h2>Renting land</h2>
            <h1>Never Worked so well</h1>
            <p>
              LandWorks is a community-owned Marketplace for renting Web3 Metaverse Land, governed by EnterDAO and the
              ENTR token.
            </p>
            <Link to={routes.explore}>
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
