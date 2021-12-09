import React from 'react';

import { About } from 'modules/landing/components/about';
import { Hero } from 'modules/landing/components/hero';

const LandingView: React.FC = () => (
  <div className="landing-wrapper">
    <Hero />
    <About />
  </div>
);

export default LandingView;
