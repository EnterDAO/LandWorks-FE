// A custom hook that builds on useLocation to parse
// https://v5.reactrouter.com/web/example/query-parameters
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

// the query string for you.
function useQueryParams() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

export default useQueryParams;
