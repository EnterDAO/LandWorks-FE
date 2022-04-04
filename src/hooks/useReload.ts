import { useMemo, useState } from 'react';
import useDebounce from '@rooks/use-debounce';

type ReloadFn = () => void;

export type ReloadHook = [ReloadFn, number];

export function useReload(): ReloadHook {
  const [version, setVersion] = useState<number>(0);
  const reload = useDebounce(() => {
    setVersion((prevState) => prevState + 1);
  }, 400);

  return useMemo(() => [reload as ReloadFn, version], [version]);
}
