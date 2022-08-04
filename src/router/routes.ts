import { generatePath } from 'react-router-dom';

export const routes = {
  home: '/',
  docs: '/docs',
  faq: '/faq',
  sceneBuilders: '/scene-builder',
  sceneBuildersJoin: '/scene-builder/join',
  sceneBuildersBuilder: '/scene-builder/builder/:builderName',
  grantsProgram: '/grants-program',

  explore: '/explore',
  myProperties: '/my-properties',
  property: '/property/:tokenId',
};

export const getSceneBuilderBuilderPath = (builderName: string) => {
  return generatePath(routes.sceneBuildersBuilder, {
    builderName,
  });
};
