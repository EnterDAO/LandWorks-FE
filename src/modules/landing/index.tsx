import { About } from './components/About';
import { Advantages } from './components/Advantages';
import { Connect } from './components/Connect';
import { Explore } from './components/Explore';
import { FAQ } from './components/FAQ';
import { Hero } from './components/Hero';

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
