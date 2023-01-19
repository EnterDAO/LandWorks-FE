import { generatePath, useParams, useRouteMatch } from 'react-router-dom';

export const LANDING_ROUTES = {
  home: '/',
  docs: '/docs',
  faq: '/faq',
  metaCreators: '/meta-creators',
  metaCreatorsJoin: '/meta-creators/join',
  metaCreatorsCreator: '/meta-creators/creator/:metaCreatorId',
  myProperties: '/my-properties/:tab?',
  grantsProgram: '/grants-program',
  property: '/property/:tokenId',
  notFound: '/404',

  // old routes
  sceneBuilder: '/scene-builder',
  sceneBuilderJoin: '/scene-builder/join',
  sceneBuilderBuilder: '/scene-builder/builder/:builderName',
};

export const APP_ROOT_ROUTE = '/app';

export const APP_ROUTES = {
  explore: APP_ROOT_ROUTE,
  myProperties: APP_ROOT_ROUTE + LANDING_ROUTES.myProperties,
  property: APP_ROOT_ROUTE + LANDING_ROUTES.property,
  faq: APP_ROOT_ROUTE + LANDING_ROUTES.faq,
  grantsProgram: APP_ROOT_ROUTE + LANDING_ROUTES.grantsProgram,
  notFound: APP_ROOT_ROUTE + LANDING_ROUTES.notFound,

  metaCreators: APP_ROOT_ROUTE + LANDING_ROUTES.metaCreators,
  metaCreatorsJoin: APP_ROOT_ROUTE + LANDING_ROUTES.metaCreatorsJoin,
  metaCreatorsCreator: APP_ROOT_ROUTE + LANDING_ROUTES.metaCreatorsCreator,

  // old routes
  sceneBuilder: APP_ROOT_ROUTE + LANDING_ROUTES.sceneBuilder,
  sceneBuilderJoin: APP_ROOT_ROUTE + LANDING_ROUTES.sceneBuilderJoin,
  sceneBuilderBuilder: APP_ROOT_ROUTE + LANDING_ROUTES.sceneBuilderBuilder,
};

export const redirects = [
  [LANDING_ROUTES.sceneBuilder, LANDING_ROUTES.metaCreators],
  [LANDING_ROUTES.sceneBuilderJoin, LANDING_ROUTES.metaCreatorsJoin],
  [LANDING_ROUTES.sceneBuilderBuilder, LANDING_ROUTES.metaCreatorsCreator],
  [APP_ROUTES.sceneBuilder, APP_ROUTES.metaCreators],
  [APP_ROUTES.sceneBuilderJoin, APP_ROUTES.metaCreatorsJoin],
  [APP_ROUTES.sceneBuilderBuilder, APP_ROUTES.metaCreatorsCreator],
];

export const useIsAppRoute = (): boolean => !!useRouteMatch(APP_ROOT_ROUTE);
export const useMetaCreatorsCreatorPath = (metaCreatorId: string): string => {
  const isAppRoute = useIsAppRoute();

  return generatePath(isAppRoute ? APP_ROUTES.metaCreatorsCreator : LANDING_ROUTES.metaCreatorsCreator, {
    metaCreatorId,
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
