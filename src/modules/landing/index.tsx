import { About } from 'modules/landing/components/about';
import { Hero } from 'modules/landing/components/hero';
import { HowItWorks } from 'modules/landing/components/how-it-works';

const LandingView: React.FC = () => (
  <div className="landing-wrapper">
    <Hero />
    <About />
    <HowItWorks />
  </div>
);

export default LandingView;
