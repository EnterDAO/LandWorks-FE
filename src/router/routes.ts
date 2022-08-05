import { generatePath } from 'react-router-dom';

export const routes = {
  home: '/',
  docs: '/docs',
  faq: '/faq',
  sceneBuilder: '/scene-builder',
  sceneBuilderJoin: '/scene-builder/join',
  sceneBuilderBuilder: '/scene-builder/builder/:builderName',
  grantsProgram: '/grants-program',

  explore: '/explore',
  myProperties: '/my-properties',
  property: '/property/:tokenId',
};

export const getSceneBuilderBuilderPath = (builderName: string) => {
  return generatePath(routes.sceneBuilderBuilder, {
    builderName,
  });
};
