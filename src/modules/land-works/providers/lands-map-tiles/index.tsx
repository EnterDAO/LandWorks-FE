import { Dispatch, SetStateAction, createContext, useContext } from 'react';

import { AtlasTile } from 'components/custom/Atlas/Atlas';

export type ContextProps = {
  mapTiles?: Record<string, AtlasTile> | undefined;
  setMapTiles?: Dispatch<SetStateAction<Record<string, AtlasTile>>>;
};

export const LandsMapTilesContext = createContext<ContextProps>({});

export const useLandsMapTiles: () => ContextProps = () => useContext(LandsMapTilesContext);

export default LandsMapTilesContext.Provider;
