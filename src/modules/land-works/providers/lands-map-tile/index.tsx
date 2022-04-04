import { Dispatch, SetStateAction, createContext, useContext } from 'react';

export type DecentralandMapId = string;

export type SelectedTile = {
  id: string;
  type: string;
  owner: string;
};

export type ContextProps = {
  clickedLandId: DecentralandMapId;
  setClickedLandId?: (x: number | string, y: number | string) => void;
  selectedTile?: SelectedTile | undefined;
  setSelectedTile?: Dispatch<SetStateAction<SelectedTile>>;
  showCardPreview?: boolean;
  setShowCardPreview?: Dispatch<SetStateAction<boolean>>;
};

export const LandsMapTileContext = createContext<ContextProps>({
  clickedLandId: '',
});

export const useLandsMapTile: () => ContextProps = () => useContext(LandsMapTileContext);

export default LandsMapTileContext.Provider;
