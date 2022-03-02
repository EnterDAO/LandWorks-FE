import { Dispatch, SetStateAction, createContext, useContext } from 'react';

export type SelectedTile = {
  id: string;
  type: string;
  owner: string;
};

export type ContextProps = {
  selectedTile?: SelectedTile | undefined;
  setSelectedTile?: Dispatch<SetStateAction<SelectedTile>>;
};

export const LandsMapSelectedTileContext = createContext<ContextProps>({});

export const useLandsMapSelectedTile: () => ContextProps = () => useContext(LandsMapSelectedTileContext);

export default LandsMapSelectedTileContext.Provider;
