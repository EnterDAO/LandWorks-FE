import { Box } from 'design-system';
import useAutoScrollToAnchor from 'hooks/useAutoScrollToAnchor';

import Footer from '../../layout/components/footer';
import { About } from './components/about';
import { Advantages } from './components/advantages';
import { Explore } from './components/explore';
import { FAQ } from './components/faq';
import { Hero } from './components/hero';

const LandingView = () => {
  useAutoScrollToAnchor();

  return (
    <Box overflow="hidden">
      <Hero />
      <About />
      <Advantages />
      <FAQ />
      <Explore />
      <Footer />
    </Box>
  );
};

export default LandingView;
