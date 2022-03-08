import { Dispatch, SetStateAction, createContext, useContext } from 'react';

export type ContextProps = {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
};

export const LandsSearchQueryContext = createContext<ContextProps>({
  searchQuery: '',
  setSearchQuery: () => {
    return null;
  },
});

export const useLandsSearchQuery: () => ContextProps = () => useContext(LandsSearchQueryContext);

export default LandsSearchQueryContext.Provider;
