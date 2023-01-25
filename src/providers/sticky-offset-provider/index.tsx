import React, { FC, createContext, useCallback, useContext, useLayoutEffect, useMemo, useRef, useState } from 'react';

export interface StickyOffsetContextValue<T extends string = string> {
  register: (name: T) => (el: HTMLElement | null) => void;
  offsets: Record<T, number>;
}

const StickyOffsetContext = createContext<StickyOffsetContextValue | null>(null);

export const useStickyOffset = (): StickyOffsetContextValue<'header' | 'filter' | 'exploreHeader'> => {
  const context = useContext(StickyOffsetContext);

  if (context === null) {
    throw new Error('Not implemented');
  }

  return context;
};

const StickyOffsetProvider: FC = ({ children }) => {
  const [refs, setRefs] = useState<Record<string, HTMLElement | null | undefined>>({});
  const [offsets, setOffsets] = useState<Record<string, number>>({});
  const refSettersRef = useRef<Record<string, ((el: HTMLElement | null) => void) | undefined>>({});

  const register = useCallback((name: string) => {
    return (
      refSettersRef.current[name] ||
      (refSettersRef.current[name] = (el: HTMLElement | null) => {
        setRefs((prevRefs) => {
          return {
            ...prevRefs,
            [name]: el,
          };
        });
      })
    );
  }, []);

  useLayoutEffect(() => {
    if (!window.ResizeObserver) {
      return;
    }

    const setOffset = (name: string, offset: number) => {
      setOffsets((prevOffsets) => {
        return offset !== prevOffsets[name]
          ? {
              ...prevOffsets,
              [name]: offset,
            }
          : prevOffsets;
      });
    };

    const observers = Object.entries(refs).map(([name, el]) => {
      if (!el) {
        return;
      }

      setOffset(name, el.offsetHeight);

      const resizeObserver = new ResizeObserver(([entry]) => {
        setOffset(name, entry.borderBoxSize[0].blockSize);
      });

      resizeObserver.observe(el);

      return resizeObserver;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, [refs]);

  const value = useMemo(() => {
    return {
      register,
      offsets,
    };
  }, [register, offsets]);

  return <StickyOffsetContext.Provider value={value}>{children}</StickyOffsetContext.Provider>;
};

export default StickyOffsetProvider;
