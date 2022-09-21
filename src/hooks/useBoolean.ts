import { useMemo, useState } from 'react';

import useGetIsMounted from './useGetIsMounted';

interface UseBooleanReturn {
  value: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
  setTrue: () => void;
  setFalse: () => void;
  toggle: () => void;
  setSafeTrue: () => void;
  setSafeFalse: () => void;
}

const useBoolean = (defaultValue?: boolean): UseBooleanReturn => {
  const [value, setValue] = useState(!!defaultValue);
  const getIsMounted = useGetIsMounted();

  const controls = useMemo(
    () => ({
      setTrue: () => setValue(true),
      setFalse: () => setValue(false),
      toggle: () => setValue((x) => !x),
      setSafeFalse: () => {
        if (getIsMounted()) {
          setValue(false);
        }
      },
      setSafeTrue: () => {
        if (getIsMounted()) {
          setValue(true);
        }
      },
    }),
    [getIsMounted]
  );

  return {
    value,
    setValue,
    ...controls,
  };
};

export default useBoolean;
