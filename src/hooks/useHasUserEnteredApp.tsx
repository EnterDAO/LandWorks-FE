import { useEffect, useRef } from 'react';
import { useRouteMatch } from 'react-router-dom';

import { routes } from 'router/routes';

const useHasUserEnteredApp = (): boolean => {
  const isExploreRoute = !!useRouteMatch({
    path: routes.explore,
  });
  const isHomeRoute = !!useRouteMatch({
    path: routes.home,
    exact: true,
  });

  const hasUserEnteredApp = useRef(isExploreRoute);

  useEffect(() => {
    if (isExploreRoute) {
      hasUserEnteredApp.current = true;
    } else if (isHomeRoute) {
      hasUserEnteredApp.current = false;
    }
  }, [isExploreRoute, isHomeRoute]);

  return (isExploreRoute || hasUserEnteredApp.current) && !isHomeRoute;
};

export default useHasUserEnteredApp;
