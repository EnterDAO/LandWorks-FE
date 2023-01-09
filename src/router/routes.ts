import { generatePath, useParams, useRouteMatch } from 'react-router-dom';

export const LANDING_ROUTES = {
  home: '/',
  docs: '/docs',
  faq: '/faq',
  sceneBuilder: '/scene-builder',
  sceneBuilderJoin: '/scene-builder/join',
  myProperties: '/my-properties/:tab?',
  sceneBuilderBuilder: '/scene-builder/builder/:builderName',
  grantsProgram: '/grants-program',
  property: '/property/:tokenId',
};

export const APP_ROOT_ROUTE = '/app';

export const APP_ROUTES = {
  explore: APP_ROOT_ROUTE,
  myProperties: APP_ROOT_ROUTE + LANDING_ROUTES.myProperties,
  property: APP_ROOT_ROUTE + LANDING_ROUTES.property,
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

export const MY_PROPERTIES_ROUTE_TABS = {
  rented: 'rented',
  listed: 'listed',
  notListed: 'not-listed',
} as const;
export type MyPropertiesRouteTabsKey = keyof typeof MY_PROPERTIES_ROUTE_TABS;
export type MyPropertiesRouteTabsValue = typeof MY_PROPERTIES_ROUTE_TABS[MyPropertiesRouteTabsKey];

export const useMyPropertiesRouteTab = () => {
  const { tab } = useParams<{ tab?: MyPropertiesRouteTabsValue }>();
  const activeTab = tab && Object.values(MY_PROPERTIES_ROUTE_TABS).includes(tab) ? tab : undefined;

  return activeTab;
};

export const getMyPropertiesPath = (tab?: MyPropertiesRouteTabsValue): string => {
  return generatePath(APP_ROUTES.myProperties, {
    tab,
  });
};
