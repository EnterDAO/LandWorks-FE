import { Dispatch, SetStateAction, createContext, useContext } from 'react';

export type DecentralandMapId = string;

export type SelectedTile = {
  id: string;
  type: string;
  owner: string;
};

export type ContextProps = {
  clickedLandId: DecentralandMapId;
  setClickedLandId?: Dispatch<SetStateAction<DecentralandMapId>>;
  selectedTile?: SelectedTile | undefined;
  setSelectedTile?: Dispatch<SetStateAction<SelectedTile>>;
};

export const LandsMapTileContext = createContext<ContextProps>({
  clickedLandId: '',
});

export const useLandsMapTile: () => ContextProps = () => useContext(LandsMapTileContext);

export default LandsMapTileContext.Provider;
