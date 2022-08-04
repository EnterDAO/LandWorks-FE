import { generatePath, useRouteMatch } from 'react-router-dom';

export const mainRoutes = {
  home: '/',
  faq: '/faq',
  docs: '/docs',
  sceneBuilders: '/scene-builder',
  sceneBuildersJoin: '/scene-builder/join',
  sceneBuildersBuilder: '/scene-builder/builder/:builderName',
  grantsProgram: '/grants-program',
};

export const appRoutes = {
  explore: '/app',
  myProperties: '/app/my-properties',
  property: '/app/property/:tokenId',
  faq: '/app/faq',
  sceneBuilders: '/app/scene-builder',
  sceneBuildersJoin: '/app/scene-builder/join',
  sceneBuildersBuilder: '/app/scene-builder/builder/:builderName',
  grantsProgram: '/app/grants-program',
};

export const useIsAppRoute = () => {
  return !!useRouteMatch({
    path: appRoutes.explore,
  });
};

// TODO: find better way for handling sub routes
export const usePath = (route: string, params?: Record<string, string>) => {
  const isAppRoute = useIsAppRoute();
  const path = isAppRoute && !route.startsWith(appRoutes.explore) ? `${appRoutes.explore}${route}` : route;

  return generatePath(path, params);
};
