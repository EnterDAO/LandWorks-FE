import React, {
  FC,
  RefObject,
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

export interface HeaderContextValue {
  height: number;
  // setHeight: (height: number) => void;
  ref: RefObject<HTMLElement | null>;
}

const HeaderContext = createContext<HeaderContextValue | null>(null);

export const useHeader = () => {
  const context = useContext(HeaderContext);

  if (context === null) {
    throw new Error('Not implemented');
  }

  return context;
};

const HeaderProvider: FC = ({ children }) => {
  const ref = useRef<HTMLElement | null>(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    if (!ref.current || !window.ResizeObserver) {
      return;
    }

    setHeight(ref.current.offsetHeight);

    const resizeObserver = new ResizeObserver(([entry]) => {
      setHeight(entry.contentRect.height);
    });

    resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const value = useMemo(() => {
    return {
      height,
      ref,
    };
  }, [height]);

  return <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>;
};

export default HeaderProvider;
