import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { useStickyOffset } from 'providers/sticky-offset-provider';

const useAutoScrollToAnchor = () => {
  const location = useLocation();
  const stickyOffset = useStickyOffset();
  const headerOffsetRef = useRef(stickyOffset.offsets.header);
  const anchorId = location.hash.replace('#', '');

  useEffect(() => {
    headerOffsetRef.current = stickyOffset.offsets.header;
  }, [stickyOffset.offsets.header]);

  useEffect(() => {
    if (location.hash) {
      const anchorEl = document.querySelector<HTMLDivElement>(location.hash);

      if (anchorEl) {
        window.scrollTo(0, anchorEl.offsetTop - headerOffsetRef.current);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.hash]);

  return anchorId;
};

export default useAutoScrollToAnchor;
