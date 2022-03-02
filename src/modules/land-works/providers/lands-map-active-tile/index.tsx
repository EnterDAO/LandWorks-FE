import { Dispatch, SetStateAction, createContext, useContext } from 'react';

export type DecentralandMapId = string;

export type ContextProps = {
  clickedLandId: DecentralandMapId;
  setClickedLandId?: Dispatch<SetStateAction<DecentralandMapId>>;
};

export const LandsMapActiveTileContext = createContext<ContextProps>({
  clickedLandId: '',
});

export const useLandsMapActiveTile: () => ContextProps = () => useContext(LandsMapActiveTileContext);

export default LandsMapActiveTileContext.Provider;
