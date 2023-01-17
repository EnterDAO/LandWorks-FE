import { Dispatch, SetStateAction, createContext, useContext } from 'react';

import { AtlasTile } from 'modules/land-works/components/atlas';

export type ContextProps = {
  mapTiles?: Record<string, AtlasTile> | undefined;
  setMapTiles?: Dispatch<SetStateAction<Record<string, AtlasTile>>>;
  selectedId?: string;
  setSelectedId?: (id?: string) => void;
};

export const LandsMapTilesContext = createContext<ContextProps>({});

export const useLandsMapTiles: () => ContextProps = () => useContext(LandsMapTilesContext);

export default LandsMapTilesContext.Provider;
