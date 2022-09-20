import { useMemo, useState } from 'react';

import useGetIsMounted from './useGetIsMounted';

const useBoolean = (defaultValue?: boolean) => {
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
