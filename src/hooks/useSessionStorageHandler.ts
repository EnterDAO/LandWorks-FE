import { useEffect } from 'react';

import { sessionStorageHandler } from 'utils';

const useSessionStorageHandler = <T extends string | number | boolean | undefined>(
  key: string,
  name: string,
  value: T
) => {
  useEffect(() => {
    sessionStorageHandler('set', key, name, value);
  }, [key, name, value]);

  return sessionStorageHandler('get', 'my-properties-filters', 'order');
};

export default useSessionStorageHandler;
