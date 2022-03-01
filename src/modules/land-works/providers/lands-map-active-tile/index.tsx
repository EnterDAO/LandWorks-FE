import { Dispatch, SetStateAction, createContext, useContext } from 'react';

export type DecentralndMapId = string;

export type ContextProps = {
  clickedLandId: DecentralndMapId;
  setClickedLandId?: Dispatch<SetStateAction<DecentralndMapId>>;
};

export const LandsMapActiveTileContext = createContext<ContextProps>({
  clickedLandId: '',
});

export const useLandsMapActiveTile: () => ContextProps = () => useContext(LandsMapActiveTileContext);

export default LandsMapActiveTileContext.Provider;
