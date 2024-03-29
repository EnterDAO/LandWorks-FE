import React, { useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use-storage';

import { JoinPrompt } from 'modules/land-works/components/joinPrompt';

export type GeneralContextType = {
  navOpen: boolean;
  setNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
  theme: string;
  isDarkTheme: boolean;
  joinPromptOpen: boolean;
  setJoinPromptOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleDarkTheme: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GeneralContext = React.createContext<GeneralContextType>({} as any);

const mqlDark = window.matchMedia('(prefers-color-scheme: dark)');
const defaultTheme = mqlDark.matches ? 'dark' : 'light';

type Props = {
  children: React.ReactNode;
};

const GeneralContextProvider: React.FC<Props> = ({ children }) => {
  const [navOpen, setNavOpen] = useState(false);
  const [joinPromptOpen, setJoinPromptOpen] = useState(false);
  const [theme, setTheme] = useLocalStorage('bb_theme', defaultTheme);

  useEffect(() => {
    if (theme) {
      document.body.setAttribute('data-theme', theme);
    } else {
      document.body.removeAttribute('data-theme');
    }
  }, [theme]);

  useEffect(() => {
    if (navOpen) {
      document.body.setAttribute('data-fixed', 'true');
    } else {
      document.body.removeAttribute('data-fixed');
    }
  }, [navOpen]);

  return (
    <GeneralContext.Provider
      value={{
        joinPromptOpen,
        setJoinPromptOpen,
        navOpen,
        setNavOpen,
        theme,
        isDarkTheme: theme === 'dark',
        toggleDarkTheme: () => {
          setTheme(theme === 'dark' ? 'light' : 'dark');
        },
      }}
    >
      {children}
      {joinPromptOpen && <JoinPrompt />}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;

export function useGeneral(): GeneralContextType {
  return React.useContext<GeneralContextType>(GeneralContext);
}
