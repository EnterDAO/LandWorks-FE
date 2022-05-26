import React from 'react';
import useWindowEventListener from '@rooks/use-window-event-listener';

export type WindowStateContextType = {
  visibilityState: DocumentVisibilityState;
  isVisible: boolean;
};

const WindowStateContext = React.createContext<WindowStateContextType>({
  visibilityState: 'hidden',
  isVisible: false,
});

export function useWindowState(): WindowStateContextType {
  return React.useContext(WindowStateContext);
}

const WindowStateProvider: React.FC = (props) => {
  const { children } = props;

  const [visibilityState, setVisibilityState] = React.useState<DocumentVisibilityState>(
    window.document.visibilityState
  );

  useWindowEventListener('visibilitychange', () => {
    setVisibilityState(window.document.visibilityState);
  });

  return (
    <WindowStateContext.Provider
      value={{
        visibilityState,
        isVisible: visibilityState === 'visible',
      }}
    >
      {children}
    </WindowStateContext.Provider>
  );
};

export default WindowStateProvider;
