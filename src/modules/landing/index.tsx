import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { Box } from 'design-system';
import { useStickyOffset } from 'providers/sticky-offset-provider';

import { Connect } from '../../layout/components/connect';
import Footer from '../../layout/components/footer';
import { About } from './components/about';
import { Advantages } from './components/advantages';
import { Explore } from './components/explore';
import { FAQ } from './components/faq';
import { Hero } from './components/hero';

const LandingView: React.FC = () => {
  const containerElRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const stickyOffset = useStickyOffset();
  const headerOffsetRef = useRef(stickyOffset.offsets.header);

  useEffect(() => {
    headerOffsetRef.current = stickyOffset.offsets.header;
  }, [stickyOffset.offsets.header]);

  useEffect(() => {
    const containerEl = containerElRef.current;

    if (!containerEl) {
      return;
    }

    if (location.hash) {
      const anchorEl = containerEl.querySelector<HTMLDivElement>(location.hash);

      if (anchorEl) {
        window.scrollTo(0, anchorEl.offsetTop - headerOffsetRef.current);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.hash]);

  return (
    <Box ref={containerElRef} overflow="hidden">
      <Hero />
      <About />
      <Advantages />
      <FAQ />
      <Explore />
      <Connect />
      <Footer />
    </Box>
  );
};

export default LandingView;
