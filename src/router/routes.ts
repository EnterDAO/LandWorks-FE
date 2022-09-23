import { generatePath, useRouteMatch } from 'react-router-dom';

export const LANDING_ROUTES = {
  home: '/',
  docs: '/docs',
  faq: '/faq',
  sceneBuilder: '/scene-builder',
  sceneBuilderJoin: '/scene-builder/join',
  sceneBuilderBuilder: '/scene-builder/builder/:builderName',
  grantsProgram: '/grants-program',
};

export const APP_ROOT_ROUTE = '/app';

export const APP_ROUTES = {
  explore: APP_ROOT_ROUTE,
  myProperties: APP_ROOT_ROUTE + '/my-properties',
  property: APP_ROOT_ROUTE + '/property/:tokenId',
  faq: APP_ROOT_ROUTE + LANDING_ROUTES.faq,
  sceneBuilder: APP_ROOT_ROUTE + LANDING_ROUTES.sceneBuilder,
  sceneBuilderJoin: APP_ROOT_ROUTE + LANDING_ROUTES.sceneBuilderJoin,
  sceneBuilderBuilder: APP_ROOT_ROUTE + LANDING_ROUTES.sceneBuilderBuilder,
  grantsProgram: APP_ROOT_ROUTE + LANDING_ROUTES.grantsProgram,
};

export const useIsAppRoute = (): boolean => !!useRouteMatch(APP_ROOT_ROUTE);
export const useSceneBuilderBuilderPath = (builderName: string): string => {
  const isAppRoute = useIsAppRoute();

  return generatePath(isAppRoute ? APP_ROUTES.sceneBuilderBuilder : LANDING_ROUTES.sceneBuilderBuilder, {
    builderName,
  });
};

export const getPropertyPath = (propertyId: string): string => {
  return generatePath(APP_ROUTES.property, {
    tokenId: propertyId,
  });
};
