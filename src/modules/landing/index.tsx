import { About } from 'modules/landing/components/About';
import { Advantages } from 'modules/landing/components/Advantages';
import { Connect } from 'modules/landing/components/Connect';
import { Explore } from 'modules/landing/components/Explore';
import { FAQ } from 'modules/landing/components/FAQ';
import { Hero } from 'modules/landing/components/Hero';

const LandingView: React.FC = () => (
  <div className="landing-wrapper">
    <Hero />
    <About />
    <Advantages />
    <FAQ />
    <Explore />
    <Connect />
  </div>
);

export default LandingView;
