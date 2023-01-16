import React, { ReactNode, useMemo } from 'react';

import { createSafeContext, useSafeContext } from 'utils/context';

interface ContextValue {
  zoomIn: () => void;
  zoomOut: () => void;
  zoom: number;
  minZoom: number;
  maxZoom: number;
}

const Context = createSafeContext<ContextValue>();

export const useMetaverseMap = () => useSafeContext(Context);

interface MetaverseMapProviderProps extends ContextValue {
  children: ReactNode;
}

const MetaverseMapProvider = ({ children, zoomIn, zoomOut, maxZoom, minZoom, zoom }: MetaverseMapProviderProps) => {
  const value = useMemo(() => {
    return {
      zoomIn,
      zoomOut,
      maxZoom,
      minZoom,
      zoom,
    };
  }, [zoomIn, zoomOut, maxZoom, minZoom, zoom]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default MetaverseMapProvider;
